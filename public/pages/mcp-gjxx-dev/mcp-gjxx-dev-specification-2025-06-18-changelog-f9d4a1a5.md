# 主要变更 - Model Context Protocol

Source: https://mcp.gjxx.dev/specification/2025-06-18/changelog
Friendly site: MCP中文文档
Group: GJXX.DEV
Fetched: 2026-06-18T02:27:29.926Z
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

本文档列出了自上一修订版 2025-03-26 以来对模型上下文协议 (MCP) 规范所做的更改。

## ​ 主要变更

- 移除对 JSON-RPC ** 批处理 **的支持 (PR #416 )

- 添加对 结构化工具输出 的支持 (PR #371 )

- 将 MCP 服务器分类为 OAuth 资源服务器 ， 添加受保护资源元数据以发现相应的授权服务器。 (PR #338 )

- 要求 MCP 客户端实现 RFC 8707 中描述的资源指示符，以防止 恶意服务器获取访问令牌。 (PR #734 )

- 澄清授权规范中的 安全注意事项 和最佳实践 以及新的 安全最佳实践页面 。

- 添加对** 引出 **的支持，使服务器能够在交互期间从用户请求额外信息。 (PR #382 )

- 在工具调用结果中添加对** 资源链接 **的支持。 (PR #603 )

- 要求在使用 HTTP 时通过 MCP-Protocol-Version 头在后续请求中 指定协商的协议版本 (PR #548 )。

- 在 生命周期操作 中将 SHOULD 更改为 MUST

## ​ 其他模式变更

- 向其他接口类型添加 _meta 字段 (PR #710 )， 并指定 正确用法 。

- 向 CompletionRequest 添加 context 字段，为完成请求提供包含先前解析变量的功能 (PR #598 )。

- 添加 title 字段用于用户友好的显示名称，以便 name 可以用作编程标识符 (PR #663 )

## ​ 完整变更日志

有关自上次协议修订以来所做所有更改的完整列表，
请参见 GitHub 。

规范 架构

⌘ I

github

Powered by This documentation is built and hosted on Mintlify, a developer documentation platform
