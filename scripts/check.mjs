import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const maxLlmsBytes = 20 * 1024;
const maxLlmsFullBytes = 80 * 1024;
const secretPatterns = [
  {
    name: "Mapbox access token",
    regex: /\b(?:pk|sk)\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\b/g
  }
];
const requiredPageMetaFields = [
  "id",
  "siteId",
  "title",
  "requestedUrl",
  "finalUrl",
  "canonicalUrl",
  "status",
  "contentType",
  "fetchedAt",
  "ok",
  "error",
  "textChars",
  "truncated",
  "markdownPath"
];

const artifacts = [
  { key: "stats", path: "public/api/stats.json", kind: "json" },
  { key: "sites", path: "public/api/sites.json", kind: "json" },
  { key: "pages", path: "public/api/pages.json", kind: "json" },
  { key: "content", path: "public/api/content.json", kind: "json" },
  { key: "sitemap", path: "public/sitemap.xml", kind: "sitemap" },
  { key: "llms", path: "public/llms.txt", kind: "text" },
  { key: "llmsFull", path: "public/llms-full.txt", kind: "text" }
];

const results = [];
const warnings = [];
const loaded = new Map();

for (const artifact of artifacts) {
  const result = loadArtifact(artifact);
  loaded.set(artifact.key, result);
  record(`${artifact.path} exists and ${verbForKind(artifact.kind)}`, result.ok, result.detail);
}

check("pages.json exposes a pages array", () => {
  const pagesApi = getJson("pages");
  if (!pagesApi) return fail("pages.json is unavailable");
  if (!Array.isArray(pagesApi.pages)) return fail("pages.json does not contain a pages array");
  return pass(`${pagesApi.pages.length} pages`);
});

check("sites.json exposes a sites array", () => {
  const sitesApi = getJson("sites");
  if (!sitesApi) return fail("sites.json is unavailable");
  if (!Array.isArray(sitesApi.sites)) return fail("sites.json does not contain a sites array");
  return pass(`${sitesApi.sites.length} sites`);
});

check("content.json exposes a pages array", () => {
  const contentApi = getJson("content");
  if (!contentApi) return fail("content.json is unavailable");
  if (!Array.isArray(contentApi.pages)) return fail("content.json does not contain a pages array");
  return pass(`${contentApi.pages.length} content pages`);
});

check("llms.txt stays within overview size budget", () => {
  const llms = loaded.get("llms");
  if (!llms?.ok) return fail("llms.txt is unavailable");
  if (llms.bytes <= 0) return fail("llms.txt is empty");
  if (llms.bytes > maxLlmsBytes) return fail(`${formatBytes(llms.bytes)} > ${formatBytes(maxLlmsBytes)}`);
  return pass(`${formatBytes(llms.bytes)} <= ${formatBytes(maxLlmsBytes)}`);
});

check("llms-full.txt stays within full bundle size budget", () => {
  const llmsFull = loaded.get("llmsFull");
  if (!llmsFull?.ok) return fail("llms-full.txt is unavailable");
  if (llmsFull.bytes <= 0) return fail("llms-full.txt is empty");
  if (llmsFull.bytes > maxLlmsFullBytes) return fail(`${formatBytes(llmsFull.bytes)} > ${formatBytes(maxLlmsFullBytes)}`);
  return pass(`${formatBytes(llmsFull.bytes)} <= ${formatBytes(maxLlmsFullBytes)}`);
});

check("sitemap excludes failed and empty-text page markdown paths", () => {
  const pages = getPages();
  const sitemap = loaded.get("sitemap");
  if (!pages) return fail("pages.json is unavailable");
  if (!sitemap?.ok) return fail("sitemap.xml is unavailable");

  const sitemapPaths = new Set();
  for (const loc of sitemap.locs) {
    for (const candidate of pathCandidates(loc)) {
      sitemapPaths.add(candidate);
    }
  }

  const blockedPages = pages.filter((page) => page?.markdownPath && (!page.ok || (page.ok && !page.textChars)));
  const included = blockedPages.filter((page) => sitemapPaths.has(page.markdownPath));
  if (included.length > 0) {
    const samples = included.slice(0, 5).map((page) => {
      const reason = page.ok ? "empty text" : "failed";
      return `${page.markdownPath} (${reason})`;
    });
    return fail(`${included.length} blocked paths are present; samples: ${samples.join("; ")}`);
  }

  return pass(`${blockedPages.length} blocked paths absent`);
});

check("page markdown files exist only for captured pages", () => {
  const pages = getPages();
  if (!pages) return fail("pages.json is unavailable");

  const badMarkdownPaths = pages.filter((page) => page?.markdownPath && (!page.ok || !page.textChars));
  if (badMarkdownPaths.length > 0) {
    const samples = badMarkdownPaths
      .slice(0, 5)
      .map((page) => `${page.markdownPath} (${page.contentStatus || "not captured"})`)
      .join("; ");
    return fail(`${badMarkdownPaths.length} non-captured pages expose markdownPath; samples: ${samples}`);
  }

  const missingMarkdown = pages.filter((page) => page?.ok && page.textChars > 0 && !page.markdownPath);
  if (missingMarkdown.length > 0) {
    const samples = missingMarkdown.slice(0, 5).map((page) => page.id || page.requestedUrl).join("; ");
    return fail(`${missingMarkdown.length} captured pages missing markdownPath; samples: ${samples}`);
  }

  const missingFiles = pages.filter((page) => {
    if (!page?.markdownPath) return false;
    return !existsSync(resolve(rootDir, "public", page.markdownPath.replace(/^\/+/, "")));
  });
  if (missingFiles.length > 0) {
    const samples = missingFiles.slice(0, 5).map((page) => page.markdownPath).join("; ");
    return fail(`${missingFiles.length} markdownPath files missing; samples: ${samples}`);
  }

  const markdownCount = pages.filter((page) => page?.markdownPath).length;
  return pass(`${markdownCount} captured page markdown files`);
});

check("API counters match pages.json recomputation", () => {
  const pages = getPages();
  if (!pages) return fail("pages.json is unavailable");

  const expected = {
    pageCount: pages.length,
    capturedPageCount: pages.filter((page) => page.ok && Number(page.textChars) > 0).length,
    failedPageCount: pages.filter((page) => !page.ok).length,
    emptyTextPageCount: pages.filter((page) => page.ok && !page.textChars).length
  };

  const mismatches = [];
  for (const [name, api] of [
    ["stats.json", getJson("stats")],
    ["sites.json", getJson("sites")],
    ["pages.json", getJson("pages")],
    ["content.json", getJson("content")]
  ]) {
    if (!api) {
      mismatches.push(`${name} unavailable`);
      continue;
    }
    for (const [field, expectedValue] of Object.entries(expected)) {
      if (api[field] !== expectedValue) {
        mismatches.push(`${name}.${field}: ${api[field]} != ${expectedValue}`);
      }
    }
  }

  if (mismatches.length > 0) {
    return fail(mismatches.slice(0, 8).join("; "));
  }

  return pass(Object.entries(expected).map(([key, value]) => `${key}=${value}`).join(", "));
});

check("pageMeta fields are present for every page", () => {
  const pages = getPages();
  if (!pages) return fail("pages.json is unavailable");

  const missingRows = [];
  const missingCounts = new Map();

  pages.forEach((page, index) => {
    if (!page || typeof page !== "object" || Array.isArray(page)) {
      missingRows.push({ label: `#${index}`, missing: ["<page object>"] });
      missingCounts.set("<page object>", (missingCounts.get("<page object>") || 0) + 1);
      return;
    }

    const missing = requiredPageMetaFields.filter((field) => !Object.prototype.hasOwnProperty.call(page, field));
    if (missing.length > 0) {
      const label = typeof page.id === "string" && page.id ? page.id : `#${index}`;
      missingRows.push({ label, missing });
      for (const field of missing) {
        missingCounts.set(field, (missingCounts.get(field) || 0) + 1);
      }
    }
  });

  if (missingRows.length > 0) {
    const byField = [...missingCounts.entries()].map(([field, count]) => `${field}: ${count}`).join(", ");
    const samples = missingRows.slice(0, 5).map((row) => `${row.label} missing ${row.missing.join(", ")}`).join("; ");
    return fail(`${missingRows.length} pages missing required fields (${byField}); samples: ${samples}`);
  }

  return pass(`${pages.length} pages include ${requiredPageMetaFields.length} required fields`);
});

check("public artifacts do not contain known access tokens", () => {
  const publicDir = resolve(rootDir, "public");
  if (!existsSync(publicDir)) return fail("public directory is unavailable");

  const matches = [];
  for (const filePath of listFiles(publicDir)) {
    const relativePath = filePath.slice(rootDir.length + 1);
    const raw = readFileSync(filePath, "utf8");
    for (const pattern of secretPatterns) {
      if (pattern.regex.test(raw)) {
        matches.push(`${relativePath}: ${pattern.name}`);
      }
      pattern.regex.lastIndex = 0;
    }
    if (matches.length >= 10) break;
  }

  if (matches.length) {
    return fail(matches.join("; "));
  }

  return pass("no known token patterns found");
});

warnIf("sites with zero captured text pages", () => {
  const sitesApi = getJson("sites");
  if (!Array.isArray(sitesApi?.sites)) return "sites.json is unavailable";

  const zeroCapturedSites = sitesApi.sites.filter((site) => Number(site.capturedPageCount || 0) === 0);
  if (!zeroCapturedSites.length) return "";

  const samples = zeroCapturedSites
    .slice(0, 8)
    .map((site) => `${site.id || site.name} (${site.failedPageCount || 0} failed, ${site.emptyTextPageCount || 0} empty)`)
    .join("; ");
  const suffix = zeroCapturedSites.length > 8 ? `; +${zeroCapturedSites.length - 8} more` : "";
  return `${zeroCapturedSites.length} sites: ${samples}${suffix}`;
});

warnIf("source llms endpoints missing or empty", () => {
  const pages = getPages();
  if (!pages) return "pages.json is unavailable";

  const sourceLlmsPages = pages.filter((page) => /\/llms(?:-full)?\.txt$/i.test(pathnameOf(page.requestedUrl || "")));
  const unavailable = sourceLlmsPages.filter((page) => !page.ok || !page.textChars);
  if (!unavailable.length) return "";

  const samples = unavailable
    .slice(0, 8)
    .map((page) => `${page.siteId}:${pathnameOf(page.requestedUrl)}=${page.contentStatus || (page.ok ? "empty_text" : "failed")}`)
    .join("; ");
  const suffix = unavailable.length > 8 ? `; +${unavailable.length - 8} more` : "";
  return `${unavailable.length}/${sourceLlmsPages.length} endpoints: ${samples}${suffix}`;
});

printResults();

if (results.some((result) => !result.ok)) {
  process.exitCode = 1;
}

function loadArtifact(artifact) {
  const absolutePath = resolve(rootDir, artifact.path);
  if (!existsSync(absolutePath)) {
    return { ok: false, detail: "missing" };
  }

  try {
    const raw = readFileSync(absolutePath, "utf8");
    const bytes = statSync(absolutePath).size;

    if (artifact.kind === "json") {
      return { ok: true, raw, bytes, json: JSON.parse(raw), detail: `${formatBytes(bytes)} parsed` };
    }

    if (artifact.kind === "sitemap") {
      const locs = parseSitemap(raw);
      return { ok: true, raw, bytes, locs, detail: `${formatBytes(bytes)} read, ${locs.length} URLs parsed` };
    }

    return { ok: true, raw, bytes, detail: `${formatBytes(bytes)} read` };
  } catch (error) {
    return { ok: false, detail: error instanceof Error ? error.message : String(error) };
  }
}

function parseSitemap(raw) {
  if (!/<urlset\b/i.test(raw)) {
    throw new Error("missing <urlset>");
  }

  const locs = [...raw.matchAll(/<loc\b[^>]*>([\s\S]*?)<\/loc>/gi)]
    .map((match) => decodeXml(match[1].trim()))
    .filter(Boolean);

  if (locs.length === 0) {
    throw new Error("missing <loc> entries");
  }

  return locs;
}

function decodeXml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", "\"")
    .replaceAll("&apos;", "'");
}

function pathCandidates(loc) {
  const candidates = new Set([loc]);

  try {
    const url = new URL(loc, "https://llms.aoe.top");
    candidates.add(url.pathname);
    candidates.add(decodeURIComponent(url.pathname));
  } catch {
    // Keep the raw loc candidate; malformed sitemap URLs are covered by parse/read checks.
  }

  return candidates;
}

function listFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const absolutePath = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listFiles(absolutePath));
    } else if (entry.isFile()) {
      files.push(absolutePath);
    }
  }
  return files;
}

function pathnameOf(value) {
  try {
    return new URL(value).pathname;
  } catch {
    return value;
  }
}

function getJson(key) {
  const artifact = loaded.get(key);
  return artifact?.ok ? artifact.json : null;
}

function getPages() {
  const pagesApi = getJson("pages");
  return Array.isArray(pagesApi?.pages) ? pagesApi.pages : null;
}

function check(name, fn) {
  try {
    const result = fn();
    record(name, result.ok, result.detail);
  } catch (error) {
    record(name, false, error instanceof Error ? error.message : String(error));
  }
}

function warnIf(name, fn) {
  try {
    const detail = fn();
    if (detail) warnings.push({ name, detail });
  } catch (error) {
    warnings.push({ name, detail: error instanceof Error ? error.message : String(error) });
  }
}

function pass(detail) {
  return { ok: true, detail };
}

function fail(detail) {
  return { ok: false, detail };
}

function record(name, ok, detail = "") {
  results.push({ name, ok, detail });
}

function printResults() {
  const passed = results.filter((result) => result.ok).length;
  const failed = results.length - passed;

  console.log("AI visibility quality checks");
  for (const result of results) {
    const icon = result.ok ? "PASS" : "FAIL";
    const detail = result.detail ? ` - ${result.detail}` : "";
    console.log(`${icon} ${result.name}${detail}`);
  }
  for (const warning of warnings) {
    console.log(`WARN ${warning.name} - ${warning.detail}`);
  }
  console.log(`${passed} passed, ${failed} failed`);
  if (warnings.length) {
    console.log(`${warnings.length} warnings`);
  }
}

function verbForKind(kind) {
  if (kind === "json") return "parses";
  if (kind === "sitemap") return "parses";
  return "is readable";
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KiB`;
}
