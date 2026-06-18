# 主要变更 - Model Context Protocol

Source: https://mcp.gjxx.dev/specification/2025-03-26/changelog
Friendly site: MCP中文文档
Group: GJXX.DEV
Fetched: 2026-06-18T02:27:29.902Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

## Content

## On this page

- 主要变更
- 其他模式变更
- 完整变更日志

# 主要变更

Copy page

Copy page

此文档列出了自上一版本 2024-11-05 以来对Model Context Protocol (MCP)规范所做的更改。

## ​ 主要变更

- 添加了基于OAuth 2.1的全面** 授权框架 ** (PR #133 )

- 用更灵活的** 可流式HTTP传输 **替换了之前的HTTP+SSE传输 (PR #206 )

- 添加了对JSON-RPC** 批处理 **的支持 (PR #228 )

- 添加了全面的 工具注解 以更好地描述工具行为，例如它是只读还是破坏性的 (PR #185 )

## ​ 其他模式变更

- 为 ProgressNotification 添加了 message 字段以提供描述性状态更新

- 添加了对音频数据的支持，加入了现有的文本和图像内容类型

- 添加了 completions 功能以明确表示对参数自动完成功能的支持

有关更多详细信息，请参见 更新的模式 。

## ​ 完整变更日志

有关自上次协议修订以来所做所有更改的完整列表，请 参见GitHub 。

规范 架构

⌘ I

github

Powered by This documentation is built and hosted on Mintlify, a developer documentation platform
