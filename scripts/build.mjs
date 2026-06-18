import crypto from "node:crypto";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const publicDir = path.join(rootDir, "public");
const cacheDir = path.join(rootDir, ".cache", "crawl");
const dataFile = path.join(rootDir, "data", "friendly-links.json");

const SITE_URL = stripTrailingSlash(process.env.SITE_URL || "https://llms.aoe.top");
const CUSTOM_DOMAIN = process.env.CUSTOM_DOMAIN || new URL(SITE_URL).hostname;
const SOURCE_URL = "https://github.com/aoe-top/api.aoe.top/blob/master/server/utils/friendly.ts";
const GENERATED_AT = new Date().toISOString();
const MAX_PAGES_PER_SITE = Number(process.env.MAX_PAGES_PER_SITE || 1200);
const MAX_TEXT_CHARS_PER_PAGE = Number(process.env.MAX_TEXT_CHARS_PER_PAGE || 200000);
const SITE_CONCURRENCY = Number(process.env.SITE_CONCURRENCY || 4);
const PAGE_CONCURRENCY = Number(process.env.PAGE_CONCURRENCY || 3);
const TIMEOUT_MS = Number(process.env.CRAWL_TIMEOUT_MS || 15000);
const CACHE_TTL_MS = Number(process.env.CACHE_TTL_MS || 1000 * 60 * 60 * 24);
const FORCE_CRAWL = process.env.FORCE_CRAWL === "1";
const LLMS_FULL_TARGET_BYTES = Number(process.env.LLMS_FULL_TARGET_BYTES || 60000);
const LLMS_FULL_PAGE_LINKS_PER_SITE = Number(process.env.LLMS_FULL_PAGE_LINKS_PER_SITE || 4);

const groupLabels = {
  aoe_top: "AOE.TOP",
  gjxx_dev: "GJXX.DEV",
  glosc_ai: "Glosc AI",
  gloss_mod: "Gloss Mod"
};

const userAgent = `AOE-LLMS-KnowledgeBot/1.0 (+${SITE_URL}/robots.txt)`;

const sensitiveTextPatterns = [
  {
    name: "Mapbox access token",
    regex: /\b(?:pk|sk)\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\b/g,
    replacement: "[REDACTED_MAPBOX_TOKEN]"
  }
];

const binaryExtensions = new Set([
  ".7z",
  ".apk",
  ".avi",
  ".bmp",
  ".css",
  ".dmg",
  ".doc",
  ".docx",
  ".eot",
  ".exe",
  ".gif",
  ".gz",
  ".ico",
  ".json",
  ".jpeg",
  ".jpg",
  ".js",
  ".map",
  ".mov",
  ".mp3",
  ".mp4",
  ".msi",
  ".otf",
  ".pdf",
  ".png",
  ".ppt",
  ".pptx",
  ".rar",
  ".svg",
  ".tar",
  ".ttf",
  ".wav",
  ".webm",
  ".webp",
  ".woff",
  ".woff2",
  ".xls",
  ".xlsx",
  ".zip"
]);

async function main() {
  const rawLinks = await loadFriendlyLinks();
  const links = rawLinks.map((link, index) => {
    const parsed = new URL(link.url);
    return {
      ...link,
      id: uniqueSiteId(link, index),
      groupLabel: groupLabels[link.group] || link.group,
      origin: parsed.origin,
      normalizedUrl: normalizeUrl(link.url)
    };
  });

  await rm(publicDir, { recursive: true, force: true });
  await mkdir(publicDir, { recursive: true });
  await mkdir(cacheDir, { recursive: true });

  const sites = await mapLimit(links, SITE_CONCURRENCY, async (site) => {
    console.log(`[crawl] ${site.name} ${site.normalizedUrl}`);
    const discovery = await discoverSite(site);
    const candidates = prioritizeCandidates(site, discovery.urls).slice(0, MAX_PAGES_PER_SITE);
    const rawPages = await mapLimit(candidates, PAGE_CONCURRENCY, (url) => capturePage(site, url));
    const pages = dedupePages(rawPages);
    const capturedPages = pages.filter(isCapturedPage);
    const failedPages = pages.filter(isFailedPage);
    console.log(`  -> ${capturedPages.length}/${pages.length} pages with text`);
    return {
      ...site,
      discovery: {
        candidateCount: discovery.urls.length,
        sitemapCount: discovery.sitemaps.length,
        robotsStatus: discovery.robotsStatus,
        notes: discovery.notes
      },
      pages,
      capturedPageCount: capturedPages.length,
      failedPageCount: failedPages.length,
      emptyTextPageCount: pages.filter(isEmptyTextPage).length,
      textChars: capturedPages.reduce((sum, page) => sum + page.textChars, 0)
    };
  });

  await writeSite(sites);
}

async function loadFriendlyLinks() {
  const candidates = [
    process.env.FRIENDLY_TS_PATH,
    path.resolve(rootDir, "../api.aoe.top/server/utils/friendly.ts")
  ].filter(Boolean);

  for (const candidate of candidates) {
    try {
      const source = await readFile(candidate, "utf8");
      const parsed = parseFriendlyTs(source);
      if (parsed.length) {
        return parsed;
      }
    } catch {
      // Fall back to the checked-in JSON snapshot.
    }
  }

  return JSON.parse(await readFile(dataFile, "utf8"));
}

function parseFriendlyTs(source) {
  const links = [];
  for (const groupMatch of source.matchAll(/public static (\w+): link\[\] = \[([\s\S]*?)\];/g)) {
    const [, group, body] = groupMatch;
    if (group === "all") continue;
    for (const linkMatch of body.matchAll(/\{\s*name:\s*"([^"]+)"\s*,\s*url:\s*"([^"]+)"/g)) {
      links.push({
        group,
        name: linkMatch[1].trim(),
        url: linkMatch[2].trim()
      });
    }
  }
  return links;
}

async function discoverSite(site) {
  const urls = new Set([site.normalizedUrl, `${site.origin}/`, `${site.origin}/llms.txt`, `${site.origin}/llms-full.txt`]);
  const sitemaps = new Set();
  const notes = [];

  const robotsUrl = `${site.origin}/robots.txt`;
  const robots = await fetchText(robotsUrl);
  let robotsStatus = robots.status || 0;
  if (robots.ok) {
    for (const sitemap of parseRobotsSitemaps(robots.body, site.origin)) {
      sitemaps.add(sitemap);
    }
  } else {
    notes.push(`robots.txt unavailable: ${robots.error || robots.status}`);
  }
  sitemaps.add(`${site.origin}/sitemap.xml`);

  const sitemapUrls = [...sitemaps].slice(0, 8);
  for (const sitemapUrl of sitemapUrls) {
    const sitemap = await fetchText(sitemapUrl);
    if (!sitemap.ok) {
      continue;
    }
    const locs = parseSitemapLocs(sitemap.body, sitemapUrl).slice(0, MAX_PAGES_PER_SITE * 4);
    for (const loc of locs) {
      if (isLikelySitemap(loc)) {
        const nested = await fetchText(loc);
        if (nested.ok) {
          for (const nestedLoc of parseSitemapLocs(nested.body, loc)) {
            if (isCrawlablePage(nestedLoc, site.origin)) {
              urls.add(normalizeUrl(nestedLoc));
            }
          }
        }
      } else if (isCrawlablePage(loc, site.origin)) {
        urls.add(normalizeUrl(loc));
      }
    }
  }

  const home = await fetchText(site.normalizedUrl);
  if (home.ok && isHtml(home)) {
    for (const link of extractInternalLinks(home.body, home.finalUrl || site.normalizedUrl, site.origin)) {
      urls.add(link);
    }
  }

  return { urls: [...urls].filter((url) => isCrawlablePage(url, site.origin)), sitemaps: sitemapUrls, robotsStatus, notes };
}

async function capturePage(site, url) {
  const result = await fetchText(url);
  const base = {
    id: uniquePageId(site.id, url),
    siteId: site.id,
    siteName: site.name,
    siteGroup: site.group,
    siteGroupLabel: site.groupLabel,
    requestedUrl: url,
    finalUrl: result.finalUrl || url,
    status: result.status || 0,
    contentType: result.contentType || "",
    fetchedAt: result.fetchedAt || GENERATED_AT,
    ok: result.ok,
    error: result.error || ""
  };

  if (!result.ok) {
    return {
      ...base,
      title: site.name,
      description: "",
      canonicalUrl: "",
      markdown: "",
      text: "",
      textChars: 0,
      truncated: false,
      links: []
    };
  }

  const extracted = isHtml(result)
    ? extractHtml(result.body, result.finalUrl || url)
    : extractTextDocument(result.body, result.finalUrl || url, site.name);

  let text = cleanText(extracted.text);
  const truncated = text.length > MAX_TEXT_CHARS_PER_PAGE;
  if (truncated) {
    text = `${text.slice(0, MAX_TEXT_CHARS_PER_PAGE)}\n\n[Content truncated at ${MAX_TEXT_CHARS_PER_PAGE} characters by MAX_TEXT_CHARS_PER_PAGE.]`;
  }

  const title = extracted.title || site.name;
  const description = extracted.description || "";
  const canonicalUrl = extracted.canonicalUrl || "";
  const markdown = pageMarkdown({ ...base, title, description, canonicalUrl, text, textChars: text.length, truncated }, site);

  return {
    ...base,
    title,
    description,
    canonicalUrl,
    markdown,
    text,
    textChars: text.length,
    truncated,
    links: extracted.links || []
  };
}

async function writeSite(sites) {
  const pages = sites.flatMap((site) => site.pages);
  const capturedPages = pages.filter(isCapturedPage);
  const stats = {
    generatedAt: GENERATED_AT,
    siteUrl: SITE_URL,
    sourceUrl: SOURCE_URL,
    maxPagesPerSite: MAX_PAGES_PER_SITE,
    siteCount: sites.length,
    pageCount: pages.length,
    capturedPageCount: capturedPages.length,
    failedPageCount: pages.filter(isFailedPage).length,
    emptyTextPageCount: pages.filter(isEmptyTextPage).length,
    textChars: capturedPages.reduce((sum, page) => sum + page.textChars, 0)
  };

  for (const site of sites) {
    for (const page of site.pages) {
      if (isCapturedPage(page)) {
        page.markdownPath = `/pages/${site.id}/${pageSlug(page.finalUrl || page.requestedUrl)}.md`;
        await writePublic(page.markdownPath, page.markdown);
      } else {
        page.markdownPath = "";
      }
    }
    site.markdownPath = `/sites/${site.id}.md`;
    await writePublic(site.markdownPath, siteMarkdown(site));
  }

  await writePublic("/index.html", indexHtml(sites, stats));
  await writePublic("/.nojekyll", "");
  if (CUSTOM_DOMAIN) {
    await writePublic("/CNAME", `${CUSTOM_DOMAIN}\n`);
  }
  await writePublic("/robots.txt", robotsTxt());
  await writePublic("/llms.txt", llmsTxt(sites, stats));
  await writePublic("/llms-full.txt", llmsFullTxt(sites, stats));
  await writePublic("/sitemap.xml", sitemapXml(sites, pages));
  await writePublic("/api/sites.json", JSON.stringify(apiSites(sites, stats), null, 2));
  await writePublic("/api/pages.json", JSON.stringify(apiPages(pages, stats), null, 2));
  await writePublic("/api/content.json", JSON.stringify(apiContent(capturedPages, stats), null, 2));
  await writePublic("/api/stats.json", JSON.stringify(stats, null, 2));

  console.log(`[write] ${stats.siteCount} sites, ${stats.capturedPageCount}/${stats.pageCount} captured pages, ${stats.textChars} text chars`);
}

function indexHtml(sites, stats) {
  const groupRows = Object.entries(groupBy(sites, (site) => site.groupLabel))
    .map(([group, groupSites]) => {
      const rows = groupSites
        .map((site) => `
          <tr>
            <td><a href="${site.markdownPath}">${escapeHtml(site.name)}</a></td>
            <td><a href="${escapeHtml(site.normalizedUrl)}">${escapeHtml(new URL(site.normalizedUrl).hostname)}</a></td>
            <td>${site.capturedPageCount}/${site.pages.length}</td>
            <td>${site.textChars.toLocaleString("en-US")}</td>
            <td><a href="/api/sites.json">JSON</a></td>
          </tr>`)
        .join("");
      return `
        <section>
          <h2>${escapeHtml(group)}</h2>
          <table>
            <thead><tr><th>Site</th><th>Origin</th><th>Pages</th><th>Text chars</th><th>Data</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </section>`;
    })
    .join("");

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>AOE Friendly Links Knowledge Base for LLMs</title>
  <meta name="description" content="A crawlable knowledge base generated from Friendly.all links in api.aoe.top.">
  <link rel="alternate" type="text/markdown" href="/llms.txt" title="LLM overview">
  <link rel="alternate" type="text/plain" href="/llms-full.txt" title="LLM full knowledge base">
  <style>
    :root {
      color-scheme: light;
      --bg: #f7f5ef;
      --panel: #ffffff;
      --ink: #17201a;
      --muted: #607067;
      --line: #d9ded6;
      --accent: #0f6b5f;
      --accent-2: #8b4e13;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: var(--bg);
      color: var(--ink);
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      line-height: 1.55;
    }
    header, main, footer { width: min(1120px, calc(100% - 32px)); margin: 0 auto; }
    header { padding: 48px 0 28px; }
    h1 { margin: 0 0 12px; font-size: clamp(32px, 5vw, 56px); line-height: 1.02; letter-spacing: 0; }
    h2 { margin: 34px 0 12px; font-size: 22px; letter-spacing: 0; }
    p { max-width: 780px; color: var(--muted); }
    a { color: var(--accent); text-decoration-thickness: 1px; text-underline-offset: 3px; }
    .toolbar { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
    .toolbar a {
      display: inline-flex;
      align-items: center;
      min-height: 40px;
      padding: 9px 12px;
      border: 1px solid var(--line);
      border-radius: 6px;
      background: var(--panel);
      color: var(--ink);
      text-decoration: none;
      font-weight: 650;
      white-space: nowrap;
    }
    .stats {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 12px;
      margin: 12px 0 28px;
    }
    .stat {
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 16px;
      min-width: 0;
    }
    .stat strong { display: block; font-size: 24px; color: var(--accent-2); }
    .stat span { color: var(--muted); font-size: 13px; }
    section { margin: 22px 0 30px; }
    table {
      width: 100%;
      border-collapse: collapse;
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: 8px;
      overflow: hidden;
    }
    th, td { padding: 10px 12px; border-bottom: 1px solid var(--line); text-align: left; vertical-align: top; }
    th { font-size: 13px; color: var(--muted); background: #eef1eb; }
    tr:last-child td { border-bottom: 0; }
    footer { padding: 24px 0 48px; color: var(--muted); font-size: 14px; }
    @media (max-width: 720px) {
      header, main, footer { width: min(100% - 22px, 1120px); }
      .stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      table { display: block; overflow-x: auto; }
      th, td { white-space: nowrap; }
    }
  </style>
</head>
<body>
  <header>
    <h1>AOE Friendly Links Knowledge Base</h1>
    <p>面向大模型检索的静态知识入口，内容来自 <code>api.aoe.top/server/utils/friendly.ts</code> 中的 ${stats.siteCount} 个站点。构建时抓取每个站点的首页、LLM 文件、sitemap 页面和同源入口，并输出 Markdown、TXT、JSON 和 sitemap。</p>
    <nav class="toolbar" aria-label="Knowledge endpoints">
      <a href="/llms.txt">llms.txt</a>
      <a href="/llms-full.txt">llms-full.txt</a>
      <a href="/api/sites.json">sites.json</a>
      <a href="/api/pages.json">pages.json</a>
      <a href="/api/content.json">content.json</a>
      <a href="/sitemap.xml">sitemap.xml</a>
    </nav>
  </header>
  <main>
    <div class="stats">
      <div class="stat"><strong>${stats.siteCount}</strong><span>Friendly sites</span></div>
      <div class="stat"><strong>${stats.capturedPageCount}</strong><span>Captured pages</span></div>
      <div class="stat"><strong>${stats.failedPageCount}</strong><span>Failed requests</span></div>
      <div class="stat"><strong>${stats.textChars.toLocaleString("en-US")}</strong><span>Text characters</span></div>
    </div>
    ${groupRows}
  </main>
  <footer>
    Generated at ${escapeHtml(GENERATED_AT)}. Source links: <a href="${SOURCE_URL}">friendly.ts</a>.
  </footer>
</body>
</html>`;
}

function llmsTxt(sites, stats) {
  const grouped = Object.entries(groupBy(sites, (site) => site.groupLabel))
    .map(([group, groupSites]) => {
      const links = groupSites.map((site) => `- [${site.name}](${SITE_URL}${site.markdownPath}): ${site.capturedPageCount} captured pages from ${site.normalizedUrl}`).join("\n");
      return `## ${group}\n\n${links}`;
    })
    .join("\n\n");

  return `# AOE Friendly Links Knowledge Base

> A crawlable knowledge base for the websites listed in api.aoe.top Friendly.all.

This site mirrors structured, LLM-friendly text for ${stats.siteCount} linked websites. It provides an overview, a compact full index, per-site Markdown files, per-page Markdown files, and JSON APIs.

Generated: ${stats.generatedAt}
Source: ${SOURCE_URL}

## Recommended Entry Points

- Full index summary: ${SITE_URL}/llms-full.txt
- Site index JSON: ${SITE_URL}/api/sites.json
- Page index JSON: ${SITE_URL}/api/pages.json
- Full content JSON: ${SITE_URL}/api/content.json
- Sitemap: ${SITE_URL}/sitemap.xml

## Crawl Policy

Search, retrieval, general web, and user-triggered AI crawlers are allowed. Listed training-only or broad AI crawlers are disallowed in robots.txt.

${grouped}
`;
}

function llmsFullTxt(sites, stats) {
  const siteIndex = Object.entries(groupBy(sites, (site) => site.groupLabel))
    .map(([group, groupSites]) => {
      const links = groupSites
        .map((site) => {
          const empty = site.emptyTextPageCount ? `, ${site.emptyTextPageCount} empty text` : "";
          return `- [${site.name}](${SITE_URL}${site.markdownPath}): ${site.capturedPageCount}/${site.pages.length} text pages${empty}; ${site.textChars} text chars; source ${site.normalizedUrl}`;
        })
        .join("\n");
      return `## ${group}\n\n${links}`;
    })
    .join("\n\n");

  const header = `# AOE Friendly Links Knowledge Base - Full Index

Generated: ${stats.generatedAt}
Source: ${SOURCE_URL}
Sites: ${stats.siteCount}
Captured pages: ${stats.capturedPageCount}/${stats.pageCount}
Empty text pages: ${stats.emptyTextPageCount}
Text characters: ${stats.textChars}

This is a compact, index-oriented summary for LLM discovery. It intentionally does not inline every crawled page body. Full extracted text remains available in per-page Markdown files and ${SITE_URL}/api/content.json.

## Content Endpoints

- Overview: ${SITE_URL}/llms.txt
- Full content JSON: ${SITE_URL}/api/content.json
- Page metadata JSON: ${SITE_URL}/api/pages.json
- Site metadata JSON: ${SITE_URL}/api/sites.json
- Sitemap: ${SITE_URL}/sitemap.xml

`;
  const selectedHeader = `\n\n## Selected Page Index\n\nRepresentative text-bearing pages are listed below. Additional page links are available from each site Markdown file and /api/pages.json.\n`;
  const footer = `\n\n## Full Text Access\n\nUse per-page Markdown links or ${SITE_URL}/api/content.json for complete captured text. Empty or failed pages remain in metadata APIs for diagnostics but are excluded from this compact index and sitemap page entries.\n`;
  let output = `${header}${siteIndex}${selectedHeader}`;
  const reserveBytes = byteLength(footer) + 256;
  let omittedCount = 0;

  for (const site of sites) {
    const selectedPages = selectLlmsFullPages(site);
    if (!selectedPages.length) {
      continue;
    }
    const lines = selectedPages
      .map((page) => `- [${page.title || page.finalUrl || page.requestedUrl}](${SITE_URL}${page.markdownPath}): ${page.textChars} chars; ${page.finalUrl || page.requestedUrl}`)
      .join("\n");
    const section = `\n### ${site.name}\n\n${lines}\n`;
    if (byteLength(output + section) + reserveBytes <= LLMS_FULL_TARGET_BYTES) {
      output += section;
    } else {
      omittedCount += selectedPages.length;
    }
  }

  if (omittedCount) {
    output += `\n${omittedCount} representative page links omitted to keep this file near ${LLMS_FULL_TARGET_BYTES} bytes. Use ${SITE_URL}/api/pages.json for the complete page index.\n`;
  }

  return trimToByteTarget(output + footer, LLMS_FULL_TARGET_BYTES);
}

function selectLlmsFullPages(site) {
  const capturedPages = site.pages.filter(isCapturedPage);
  const preferredUrls = new Set([site.normalizedUrl, `${site.origin}/`, `${site.origin}/llms.txt`].map(normalizeUrl));
  return capturedPages
    .toSorted((a, b) => {
      const aPreferred = preferredUrls.has(normalizeUrl(a.finalUrl || a.requestedUrl)) || preferredUrls.has(normalizeUrl(a.requestedUrl || ""));
      const bPreferred = preferredUrls.has(normalizeUrl(b.finalUrl || b.requestedUrl)) || preferredUrls.has(normalizeUrl(b.requestedUrl || ""));
      if (aPreferred !== bPreferred) return aPreferred ? -1 : 1;
      return scoreUrl(a.finalUrl || a.requestedUrl) - scoreUrl(b.finalUrl || b.requestedUrl) || pageTextChars(b) - pageTextChars(a);
    })
    .slice(0, LLMS_FULL_PAGE_LINKS_PER_SITE);
}

function trimToByteTarget(value, targetBytes) {
  if (byteLength(value) <= targetBytes) {
    return value;
  }
  const notice = `\n\n[Output trimmed to stay near ${targetBytes} bytes. Use ${SITE_URL}/api/pages.json and ${SITE_URL}/api/content.json for complete indexes and text.]\n`;
  let trimmed = value;
  while (byteLength(trimmed + notice) > targetBytes && trimmed.length > 0) {
    trimmed = trimmed.slice(0, Math.max(0, trimmed.length - 1000));
  }
  return `${trimmed.trimEnd()}${notice}`;
}

function byteLength(value) {
  return Buffer.byteLength(String(value), "utf8");
}

function siteMarkdown(site) {
  const capturedPages = site.pages.filter(isCapturedPage);
  const failures = site.pages.filter(isFailedPage);
  const emptyPages = site.pages.filter(isEmptyTextPage);
  const pageLinks = capturedPages
    .map((page) => `- [${page.title || page.requestedUrl}](${page.markdownPath || ""}) - ${pageContentStatus(page)} - ${page.status || "ERR"} - ${page.textChars || 0} chars - ${page.finalUrl || page.requestedUrl}`)
    .join("\n");
  const failureNotes = failures.length
    ? `\n## Fetch Failures\n\n${failures.map((page) => `- ${page.requestedUrl}: ${page.error || page.status}`).join("\n")}\n`
    : "";
  const emptyNotes = emptyPages.length
    ? `\n## Empty Text Pages\n\n${emptyPages.map((page) => `- ${page.finalUrl || page.requestedUrl}: ${pageDiagnostic(page)}`).join("\n")}\n`
    : "";

  return `# ${site.name}

- Group: ${site.groupLabel}
- Source URL: ${site.normalizedUrl}
- Origin: ${site.origin}
- Captured pages: ${capturedPages.length}/${site.pages.length}
- Empty text pages: ${emptyPages.length}
- Text characters: ${site.textChars}
- Generated: ${GENERATED_AT}

## Captured Page Index

${pageLinks || "No pages captured."}
${failureNotes}
${emptyNotes}
## Page Content

${capturedPages.map((page) => page.markdown).join("\n\n")}
`;
}

function pageMarkdown(page, site) {
  const description = page.description ? `\nDescription: ${page.description}\n` : "";
  const truncated = page.truncated ? "\nNote: page text was truncated by MAX_TEXT_CHARS_PER_PAGE.\n" : "";
  const empty = !page.text ? `\nDiagnostic: ${pageDiagnostic(page)}\n` : "";
  return `# ${page.title || site.name}

Source: ${page.finalUrl || page.requestedUrl}
Friendly site: ${site.name}
Group: ${site.groupLabel}
Fetched: ${page.fetchedAt}
Status: ${page.status}
Content-Type: ${page.contentType}
Content-Status: ${pageContentStatus(page)}
${description}${truncated}${empty}
## Content

${page.text || "_No readable text was extracted from this response._"}
`;
}

function pageFailureMarkdown(page, site) {
  return `# ${page.title || site.name}

Source: ${page.requestedUrl}
Friendly site: ${site.name}
Group: ${site.groupLabel}
Fetched: ${page.fetchedAt || GENERATED_AT}
Status: ${page.status || "request failed"}
Content-Type: ${page.contentType || ""}
Content-Status: ${pageContentStatus(page)}
Error: ${page.error || pageDiagnostic(page)}
`;
}

function isCapturedPage(page) {
  return Boolean(page?.ok) && pageTextChars(page) > 0;
}

function isEmptyTextPage(page) {
  return isSuccessfulStatus(page?.status) && pageTextChars(page) === 0;
}

function isFailedPage(page) {
  return !Boolean(page?.ok) && !isEmptyTextPage(page);
}

function isSuccessfulStatus(status) {
  return Number(status) >= 200 && Number(status) < 300;
}

function pageTextChars(page) {
  return Number(page?.textChars || page?.text?.length || 0);
}

function pageContentStatus(page) {
  if (isCapturedPage(page)) return "captured";
  if (Boolean(page?.ok) && pageTextChars(page) === 0) return "empty_text";
  if (isSuccessfulStatus(page?.status) && pageTextChars(page) === 0) return "empty_response";
  if (Number(page?.status) >= 400) return "http_error";
  if (Number(page?.status) > 0) return "unreadable_response";
  return "request_failed";
}

function pageDiagnostic(page) {
  const status = pageContentStatus(page);
  if (status === "captured") return "";
  if (status === "empty_text") return "Fetched successfully, but no readable text was extracted from the response body.";
  if (status === "empty_response") return page?.error || "HTTP success response had an empty or non-text body.";
  if (status === "http_error") return page?.error || `HTTP ${page?.status}`;
  if (status === "unreadable_response") return page?.error || "Response was not readable as text.";
  return page?.error || "Request failed before readable text could be captured.";
}

function robotsTxt() {
  return `# robots.txt for ${SITE_URL}
# General web, search, retrieval, and user-triggered AI crawlers are allowed.
# Listed training-only or broad AI crawlers are blocked below.

User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml

# Search and retrieval crawlers
User-agent: OAI-SearchBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: DuckAssistBot
Allow: /

# User-triggered crawlers
User-agent: ChatGPT-User
Allow: /

User-agent: Claude-User
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: Google-Agent
Allow: /

# Training-only or broad AI crawlers
User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: Meta-ExternalAgent
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: Applebot-Extended
Disallow: /

User-agent: Bytespider
Disallow: /

Crawl-delay: 1
`;
}

function sitemapXml(sites, pages) {
  const urls = [
    "/",
    "/llms.txt",
    "/llms-full.txt",
    "/api/sites.json",
    "/api/pages.json",
    "/api/content.json",
    "/api/stats.json",
    ...sites.map((site) => site.markdownPath),
    ...pages.filter(isCapturedPage).map((page) => page.markdownPath).filter(Boolean)
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${escapeXml(SITE_URL + url)}</loc><lastmod>${GENERATED_AT.slice(0, 10)}</lastmod></url>`).join("\n")}
</urlset>
`;
}

function apiSites(sites, stats) {
  return {
    ...stats,
    sites: sites.map((site) => ({
      id: site.id,
      group: site.group,
      groupLabel: site.groupLabel,
      name: site.name,
      url: site.normalizedUrl,
      origin: site.origin,
      markdownPath: site.markdownPath,
      capturedPageCount: site.capturedPageCount,
      failedPageCount: site.failedPageCount,
      emptyTextPageCount: site.emptyTextPageCount,
      textChars: site.textChars,
      discovery: site.discovery,
      pages: site.pages.map(pageMeta)
    }))
  };
}

function apiPages(pages, stats) {
  return {
    ...stats,
    pages: pages.map(pageMeta)
  };
}

function apiContent(pages, stats) {
  return {
    ...stats,
    pages: pages.map((page) => ({
      ...pageMeta(page),
      text: page.text
    }))
  };
}

function pageMeta(page) {
  return {
    id: page.id,
    siteId: page.siteId,
    siteName: page.siteName,
    siteGroup: page.siteGroup,
    siteGroupLabel: page.siteGroupLabel,
    title: page.title || "",
    description: page.description || "",
    requestedUrl: page.requestedUrl || "",
    finalUrl: page.finalUrl || "",
    canonicalUrl: page.canonicalUrl || "",
    status: page.status || 0,
    contentType: page.contentType || "",
    fetchedAt: page.fetchedAt || "",
    ok: Boolean(page.ok),
    error: page.error || "",
    textChars: page.textChars || 0,
    hasText: isCapturedPage(page),
    contentStatus: pageContentStatus(page),
    diagnostic: pageDiagnostic(page),
    truncated: Boolean(page.truncated),
    markdownPath: page.markdownPath || ""
  };
}

function dedupePages(pages) {
  const byFinalUrl = new Map();
  for (const page of pages) {
    const key = normalizeUrl(page.finalUrl || page.requestedUrl);
    const current = byFinalUrl.get(key);
    if (!current || pageQuality(page) > pageQuality(current)) {
      byFinalUrl.set(key, page);
    }
  }
  return [...byFinalUrl.values()];
}

function pageQuality(page) {
  return (page.ok ? 1000000 : 0) + (page.textChars || 0) - (page.status >= 400 ? 1000 : 0);
}

async function fetchText(url) {
  const normalized = normalizeUrl(url);
  const key = crypto.createHash("sha256").update(normalized).digest("hex");
  const cacheFile = path.join(cacheDir, `${key}.json`);
  const now = Date.now();

  if (!FORCE_CRAWL) {
    try {
      const cached = JSON.parse(await readFile(cacheFile, "utf8"));
      if (cached.cachedAt && now - cached.cachedAt < CACHE_TTL_MS) {
        return cached;
      }
    } catch {
      // Cache miss.
    }
  }

  const startedAt = Date.now();
  try {
    const response = await fetch(normalized, {
      redirect: "follow",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: {
        "user-agent": userAgent,
        accept: "text/html, text/markdown, text/plain, application/xml, text/xml, application/json;q=0.6, */*;q=0.2"
      }
    });
    const contentType = response.headers.get("content-type") || "";
    const isTextLike = /text|html|xml|json|markdown|javascript/i.test(contentType) || isTextUrl(normalized);
    const body = isTextLike ? await response.text() : "";
    const result = {
      ok: response.ok && Boolean(body),
      status: response.status,
      finalUrl: normalizeUrl(response.url || normalized),
      contentType,
      body,
      fetchedAt: new Date().toISOString(),
      cachedAt: now,
      elapsedMs: Date.now() - startedAt,
      error: response.ok ? (body ? "" : "Empty text response body") : response.statusText
    };
    await writeFile(cacheFile, JSON.stringify(result), "utf8");
    return result;
  } catch (error) {
    const result = {
      ok: false,
      status: 0,
      finalUrl: normalized,
      contentType: "",
      body: "",
      fetchedAt: new Date().toISOString(),
      cachedAt: now,
      elapsedMs: Date.now() - startedAt,
      error: error instanceof Error ? error.message : String(error)
    };
    await writeFile(cacheFile, JSON.stringify(result), "utf8");
    return result;
  }
}

function extractHtml(html, baseUrl) {
  const title = cleanInline(matchFirst(html, /<title[^>]*>([\s\S]*?)<\/title>/i));
  const description = cleanInline(
    matchFirst(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/i) ||
      matchFirst(html, /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["'][^>]*>/i) ||
      matchFirst(html, /<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']*)["'][^>]*>/i)
  );
  const canonicalUrl = normalizeOptionalUrl(
    matchFirst(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/i),
    baseUrl
  );
  const links = extractInternalLinks(html, baseUrl, new URL(baseUrl).origin).slice(0, 200);
  const contentHtml = pickMainHtml(html);
  const text = htmlToMarkdownish(contentHtml);
  return { title, description, canonicalUrl, links, text };
}

function extractTextDocument(body, url, fallbackTitle) {
  const text = cleanText(body);
  const firstHeading = text.match(/^#\s+(.+)$/m)?.[1];
  return {
    title: cleanInline(firstHeading || fallbackTitle || new URL(url).hostname),
    description: "",
    canonicalUrl: url,
    links: [],
    text
  };
}

function pickMainHtml(html) {
  const main = matchFirst(html, /<main\b[^>]*>([\s\S]*?)<\/main>/i);
  if (main) return main;
  const article = matchFirst(html, /<article\b[^>]*>([\s\S]*?)<\/article>/i);
  if (article) return article;
  return matchFirst(html, /<body\b[^>]*>([\s\S]*?)<\/body>/i) || html;
}

function htmlToMarkdownish(html) {
  let text = html
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, " ")
    .replace(/<canvas\b[^>]*>[\s\S]*?<\/canvas>/gi, " ")
    .replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe>/gi, " ");

  text = text.replace(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi, (_, level, inner) => `\n\n${"#".repeat(Number(level))} ${cleanInline(inner)}\n\n`);
  text = text.replace(/<li\b[^>]*>([\s\S]*?)<\/li>/gi, (_, inner) => `\n- ${cleanInline(inner)}`);
  text = text.replace(/<br\s*\/?>/gi, "\n");
  text = text.replace(/<\/(p|div|section|article|header|footer|aside|nav|tr|table|blockquote|pre)>/gi, "\n");
  text = text.replace(/<(p|div|section|article|header|footer|aside|nav|tr|table|blockquote|pre)\b[^>]*>/gi, "\n");
  text = text.replace(/<\/(td|th)>/gi, " | ");
  text = text.replace(/<[^>]+>/g, " ");
  return cleanText(text);
}

function extractInternalLinks(html, baseUrl, origin) {
  const links = new Set();
  for (const match of html.matchAll(/\bhref\s*=\s*["']([^"']+)["']/gi)) {
    const raw = decodeEntities(match[1] || "").trim();
    if (!raw || raw.startsWith("#") || raw.startsWith("mailto:") || raw.startsWith("tel:") || raw.startsWith("javascript:")) {
      continue;
    }
    try {
      const link = new URL(raw, baseUrl);
      if (link.origin === origin && isCrawlablePage(link.href, origin)) {
        links.add(normalizeUrl(link.href));
      }
    } catch {
      // Ignore invalid hrefs.
    }
  }
  return [...links];
}

function parseRobotsSitemaps(body, origin) {
  return body
    .split(/\r?\n/)
    .map((line) => line.match(/^\s*sitemap:\s*(.+)\s*$/i)?.[1])
    .filter(Boolean)
    .map((url) => normalizeOptionalUrl(url, origin))
    .filter(Boolean);
}

function parseSitemapLocs(body, sitemapUrl) {
  return [...body.matchAll(/<loc>\s*([\s\S]*?)\s*<\/loc>/gi)]
    .map((match) => normalizeOptionalUrl(decodeEntities(match[1]), sitemapUrl))
    .filter(Boolean);
}

function prioritizeCandidates(site, urls) {
  const unique = [...new Set(urls.map(normalizeUrl))].filter((url) => isCrawlablePage(url, site.origin));
  const priorities = new Map([
    [site.normalizedUrl, 0],
    [`${site.origin}/`, 1],
    [`${site.origin}/llms.txt`, 2],
    [`${site.origin}/llms-full.txt`, 3]
  ]);

  return unique.sort((a, b) => {
    const pa = priorities.get(a) ?? scoreUrl(a);
    const pb = priorities.get(b) ?? scoreUrl(b);
    return pa - pb || a.length - b.length || a.localeCompare(b);
  });
}

function scoreUrl(url) {
  const parsed = new URL(url);
  const path = parsed.pathname.toLowerCase();
  if (path.includes("about") || path.includes("project") || path.includes("docs") || path.includes("guide")) return 10;
  if (path.endsWith(".md") || path.endsWith(".txt")) return 12;
  if (path.endsWith(".html") || path === "/") return 20;
  return 30;
}

function isCrawlablePage(url, origin) {
  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) return false;
    if (parsed.origin !== origin) return false;
    const lower = parsed.pathname.toLowerCase();
    const ext = path.extname(lower);
    if (binaryExtensions.has(ext)) return false;
    if (lower.includes("/wp-admin") || lower.includes("/admin") || lower.includes("/login")) return false;
    return true;
  } catch {
    return false;
  }
}

function isLikelySitemap(url) {
  try {
    const pathname = new URL(url).pathname.toLowerCase();
    return pathname.endsWith(".xml") && pathname.includes("sitemap");
  } catch {
    return false;
  }
}

function isHtml(result) {
  return /html/i.test(result.contentType || "") || /<!doctype html|<html[\s>]/i.test(result.body || "");
}

function isTextUrl(url) {
  const ext = path.extname(new URL(url).pathname.toLowerCase());
  return [".html", ".htm", ".md", ".txt", ".xml", ".json"].includes(ext) || !ext;
}

function normalizeUrl(url) {
  const parsed = new URL(url);
  parsed.hash = "";
  parsed.search = "";
  if (parsed.pathname !== "/" && parsed.pathname.endsWith("/")) {
    parsed.pathname = parsed.pathname.slice(0, -1);
  }
  return parsed.toString();
}

function normalizeOptionalUrl(url, base) {
  if (!url) return "";
  try {
    return normalizeUrl(new URL(url.trim(), base).toString());
  } catch {
    return "";
  }
}

function uniqueSiteId(link, index) {
  const host = new URL(link.url).hostname.replace(/^www\./, "");
  const base = slugify(host) || `site-${index + 1}`;
  return base;
}

function uniquePageId(siteId, url) {
  return `${siteId}-${crypto.createHash("sha1").update(url).digest("hex").slice(0, 10)}`;
}

function pageSlug(url) {
  const parsed = new URL(url);
  const raw = `${parsed.hostname}${parsed.pathname === "/" ? "/index" : parsed.pathname}`;
  const slug = slugify(raw).replace(/-index$/, "-home") || "page";
  const hash = crypto.createHash("sha1").update(url).digest("hex").slice(0, 8);
  return `${slug}-${hash}`;
}

function slugify(value) {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function stripTrailingSlash(value) {
  return value.replace(/\/+$/, "");
}

function cleanInline(value) {
  return cleanText(String(value || "").replace(/<[^>]+>/g, " ")).replace(/\n+/g, " ");
}

function cleanText(value) {
  const cleaned = decodeEntities(String(value || ""))
    .replace(/\r/g, "\n")
    .replace(/\u00a0/g, " ")
    .split("\n")
    .map((line) => line.replace(/[ \t]+/g, " ").trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return redactSensitiveText(cleaned);
}

function redactSensitiveText(value) {
  let redacted = String(value || "");
  for (const pattern of sensitiveTextPatterns) {
    redacted = redacted.replace(pattern.regex, pattern.replacement);
  }
  return redacted;
}

function decodeEntities(value) {
  const named = {
    amp: "&",
    apos: "'",
    copy: "(c)",
    gt: ">",
    hellip: "...",
    laquo: "<<",
    ldquo: "\"",
    lsaquo: "<",
    lsquo: "'",
    lt: "<",
    mdash: "-",
    nbsp: " ",
    ndash: "-",
    quot: "\"",
    raquo: ">>",
    rdquo: "\"",
    reg: "(R)",
    rsaquo: ">",
    rsquo: "'",
    times: "x"
  };
  return String(value || "")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, num) => String.fromCodePoint(Number.parseInt(num, 10)))
    .replace(/&([a-z][a-z0-9]+);/gi, (match, name) => named[name.toLowerCase()] ?? match);
}

function matchFirst(value, regex) {
  return value.match(regex)?.[1] || "";
}

function groupBy(items, getKey) {
  return items.reduce((groups, item) => {
    const key = getKey(item);
    groups[key] ||= [];
    groups[key].push(item);
    return groups;
  }, {});
}

async function mapLimit(items, limit, mapper) {
  const results = new Array(items.length);
  let index = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (index < items.length) {
      const current = index++;
      results[current] = await mapper(items[current], current);
    }
  });
  await Promise.all(workers);
  return results;
}

async function writePublic(publicPath, content) {
  const relative = publicPath.replace(/^\/+/, "");
  const filePath = path.join(publicDir, relative);
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, content, "utf8");
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeXml(value) {
  return escapeHtml(value).replace(/'/g, "&apos;");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
