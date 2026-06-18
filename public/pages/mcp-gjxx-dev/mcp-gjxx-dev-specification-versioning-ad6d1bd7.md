# 版本控制 - Model Context Protocol

Source: https://mcp.gjxx.dev/specification/versioning
Friendly site: MCP中文文档
Group: GJXX.DEV
Fetched: 2026-06-18T02:27:27.452Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

## Content

## On this page

- 修订
- 协商

关于 MCP

# 版本控制

Copy page

Copy page

模型上下文协议使用基于字符串的版本标识符，遵循 YYYY-MM-DD 格式，表示最后一次进行向后不兼容更改的日期。

只要更改保持向后兼容性，协议版本就不会递增。这允许在保持互操作性的同时进行增量改进。

## ​ 修订

修订版可能被标记为：

- Draft ：正在进行的规范，还未准备好供使用。

- Current ：当前协议版本，已准备好使用，并可能继续接收向后兼容的更改。

- Final ：过去的完整规范，不会再进行更改。

当前 协议版本是 2025-06-18 。

## ​ 协商

版本协商发生在 初始化 期间。客户端和服务器 可以 同时支持多个协议版本，但它们 必须 就单个版本达成一致以用于会话。
如果版本协商失败，该协议提供了适当的错误处理，允许客户端在找不到与服务器兼容的版本时优雅地终止连接。

客户端 连接到本地 MCP 服务器

⌘ I

github

Powered by This documentation is built and hosted on Mintlify, a developer documentation platform
