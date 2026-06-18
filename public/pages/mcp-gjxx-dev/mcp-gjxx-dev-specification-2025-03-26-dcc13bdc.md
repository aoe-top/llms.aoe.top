# 规范 - Model Context Protocol

Source: https://mcp.gjxx.dev/specification/2025-03-26
Friendly site: MCP中文文档
Group: GJXX.DEV
Fetched: 2026-06-18T02:27:26.945Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

## Content

## On this page

- 概述
- 关键细节 基础协议
- Features
- 其他工具
- 安全性和信任与安全 关键原则
- 实现指南
- 了解更多

# 规范

Copy page

Copy page

Model Context Protocol (MCP) 是一个开放协议，能够在 LLM 应用程序与外部数据源和工具之间实现无缝集成。无论您是在构建 AI 驱动的 IDE、增强聊天界面，还是创建自定义 AI 工作流，MCP 都提供了一种标准化的方式来将 LLM 与它们需要的上下文连接起来。
此规范定义了权威的协议要求，基于 TypeScript 模式中的
schema.ts 。
有关实现指南和示例，请访问
modelcontextprotocol.io 。
此文档中的关键词 “MUST”、“MUST NOT”、“REQUIRED”、“SHALL”、“SHALL NOT”、“SHOULD”、“SHOULD NOT”、“RECOMMENDED”、“NOT RECOMMENDED”、“MAY” 和 “OPTIONAL” 应按照 BCP 14 中所述进行解释 [ RFC2119 ] [ RFC8174 ]，当且仅当它们以全大写形式出现时，如此处所示。

## ​ 概述

MCP 为应用程序提供了一种标准化的方式来：

- 与语言模型共享上下文信息

- 向 AI 系统暴露工具和能力

- 构建可组合的集成和工作流

该协议使用 JSON-RPC 2.0 消息在以下之间建立通信：

- 主机 ：发起连接的 LLM 应用程序

- 客户端 ：主机应用程序中的连接器

- 服务器 ：提供上下文和能力的服务

MCP 从 Language Server Protocol 中汲取了一些灵感，该协议标准化了如何在整个开发工具生态系统中添加对编程语言的支持。类似地，MCP 标准化了如何将额外上下文和工具集成到 AI 应用程序生态系统中。

## ​ 关键细节

### ​ 基础协议

- JSON-RPC 消息格式

- Stateful connections

- Server and client capability negotiation

### ​ Features

Servers offer any of the following features to clients:

- Resources : Context and data, for the user or the AI model to use

- Prompts : Templated messages and workflows for users

- Tools : Functions for the AI model to execute

Clients may offer the following feature to servers:

- Sampling : Server-initiated agentic behaviors and recursive LLM interactions

### ​ 其他工具

- 配置

- 进度跟踪

- 取消

- 错误报告

- 日志记录

## ​ 安全性和信任与安全

Model Context Protocol 通过任意数据访问和代码执行路径实现了强大的功能。这种强大功能伴随着重要的安全和信任考虑，所有实现者都必须仔细处理。

### ​ 关键原则

- 用户同意和控制 用户必须明确同意并理解所有数据访问和操作

- 用户必须保留对共享哪些数据和采取哪些行动的控制权

- 实现者应提供清晰的UI来审查和授权活动

- 数据隐私 主机必须在向服务器公开用户数据之前获得明确的

用户同意

- 主机不得未经用户同意将资源数据传输到其他地方

- 用户数据应通过适当的访问控制进行保护

- 工具安全 工具代表任意代码执行，必须谨慎对待。 特别是，除非从受信任的服务器获得，否则工具行为的描述（如注释）应被视为不可信。

- 主机必须在调用任何工具之前获得明确的

用户同意

- 用户在授权使用之前应了解每个工具的作用

- LLM采样控制 用户必须明确批准任何LLM采样请求

- 用户应控制： 是否进行采样

- 将发送的实际提示

- 服务器可以看到哪些结果

- 该协议故意限制服务器对提示的可见性

### ​ 实现指南

虽然MCP本身无法在协议级别强制执行这些安全原则，但实现者 应该 ：

- 在其应用程序中构建强大的同意和授权流程

- 提供安全影响的清晰文档

- 实施适当的访问控制和数据保护

- 在其集成中遵循安全最佳实践

- 在其功能设计中考虑隐私影响

## ​ 了解更多

探索每个协议组件的详细规范：

## 架构

## 基础协议

## 服务器功能

## 客户端功能

## 贡献

主要变更

⌘ I

github

Powered by This documentation is built and hosted on Mintlify, a developer documentation platform
