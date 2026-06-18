# 示例服务器 - Model Context Protocol

Source: https://mcp.gjxx.dev/examples
Friendly site: MCP中文文档
Group: GJXX.DEV
Fetched: 2026-06-18T02:27:26.136Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 示例服务器和实现的列表

## Content

## On this page

- 参考实现 当前参考服务器
- 归档服务器（历史参考）
- 数据和文件系统
- 开发工具
- Web 和浏览器自动化
- 生产力和通信
- AI 和专用工具
- 官方集成
- 社区实现
- 开始使用 使用参考服务器
- 与 Claude 配置
- 其他资源

示例

# 示例服务器

Copy page

示例服务器和实现的列表

Copy page

此页面展示了各种模型上下文协议 (MCP) 服务器，这些服务器展示了协议的功能和多样性。这些服务器使大型语言模型 (LLM) 能够安全地访问工具和数据源。

## ​ 参考实现

这些官方参考服务器展示了核心 MCP 功能和 SDK 使用：

### ​ 当前参考服务器

- Everything - 具有提示、资源和工具的参考/测试服务器

- Fetch - Web 内容获取和转换以实现高效 LLM 使用

- Filesystem - 具有可配置访问控制的安全文件操作

- Git - 读取、搜索和操作 Git 仓库的工具

- Memory - 基于知识图的持久内存系统

- Sequential Thinking - 通过思维序列进行动态和反思性问题解决

- Time - 时间和时区转换功能

### ​ 归档服务器（历史参考）

⚠️ 注意 ：以下服务器已移至 servers-archived 仓库 ，不再积极维护。它们仅供历史参考。

#### ​ 数据和文件系统

- PostgreSQL - 具有模式检查功能的只读数据库访问

- SQLite - 数据库交互和商业智能功能

- Google Drive - Google Drive 的文件访问和搜索功能

#### ​ 开发工具

- Git - 读取、搜索和操作 Git 仓库的工具

- GitHub - 仓库管理、文件操作和 GitHub API 集成

- GitLab - 启用项目管理的 GitLab API 集成

- Sentry - 从 Sentry.io 检索和分析问题

#### ​ Web 和浏览器自动化

- Brave Search - 使用 Brave 的 Search API 进行 Web 和本地搜索

- Puppeteer - 浏览器自动化和 Web 抓取功能

#### ​ 生产力和通信

- Slack - 频道管理和消息功能

- Google Maps - 位置服务、方向和地点详情

#### ​ AI 和专用工具

- EverArt - 使用各种模型的 AI 图像生成

- AWS KB Retrieval - 使用 Bedrock Agent Runtime 从 AWS 知识库检索

## ​ 官方集成

访问 MCP 服务器仓库（官方集成部分） 以获取公司为其平台维护的 MCP 服务器列表。

## ​ 社区实现

访问 MCP 服务器仓库（社区部分） 以获取社区成员维护的 MCP 服务器列表。

## ​ 开始使用

### ​ 使用参考服务器

基于 TypeScript 的服务器可以直接与 npx 一起使用：

npx -y @modelcontextprotocol/server-memory

基于 Python 的服务器可以使用 uvx （推荐）或 pip ：

# 使用 uvx
uvx mcp-server-git

# 使用 pip
pip install mcp-server-git
python -m mcp_server_git

### ​ 与 Claude 配置

要将 MCP 服务器与 Claude 一起使用，请将其添加到您的配置中：

{
"mcpServers" : {
"memory" : {
"command" : "npx" ,
"args" : [ "-y" , "@modelcontextprotocol/server-memory" ]
},
"filesystem" : {
"command" : "npx" ,
"args" : [
"-y" ,
"@modelcontextprotocol/server-filesystem" ,
"/path/to/allowed/files"
]
},
"github" : {
"command" : "npx" ,
"args" : [ "-y" , "@modelcontextprotocol/server-github" ],
"env" : {
"GITHUB_PERSONAL_ACCESS_TOKEN" : "<YOUR_TOKEN>"
}
}
}
}

## ​ 其他资源

访问 MCP 服务器仓库（资源部分） 以获取与 MCP 相关的其他资源和项目的集合。
访问我们的 GitHub 讨论 以与 MCP 社区互动。

示例客户端

⌘ I

github

Powered by This documentation is built and hosted on Mintlify, a developer documentation platform
