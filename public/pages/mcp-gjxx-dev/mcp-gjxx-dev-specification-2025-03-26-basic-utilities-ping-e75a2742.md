# Ping - Model Context Protocol

Source: https://mcp.gjxx.dev/specification/2025-03-26/basic/utilities/ping
Friendly site: MCP中文文档
Group: GJXX.DEV
Fetched: 2026-06-18T02:28:55.066Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

## Content

## On this page

- 概述
- 消息格式
- 行为要求
- 使用模式
- 实现考虑
- 错误处理

实用工具

# Ping

Copy page

Copy page

协议修订 : 2025-03-26

Model Context Protocol 包含一个可选的ping机制，允许任何一方验证其对应方是否仍然响应且连接是否存活。

## ​ 概述

ping功能通过简单的请求/响应模式实现。客户端或服务器都可以通过发送 ping 请求来启动ping。

## ​ 消息格式

ping请求是一个没有参数的标准JSON-RPC请求：

{
"jsonrpc" : "2.0" ,
"id" : "123" ,
"method" : "ping"
}

## ​ 行为要求

- 接收者 必须 立即以空响应响应：

{
"jsonrpc" : "2.0" ,
"id" : "123" ,
"result" : {}
}

- 如果在合理超时时间内没有收到响应，发送者 可以 ： 认为连接已过时

- 终止连接

- 尝试重新连接过程

## ​ 使用模式

## ​ 实现考虑

- 实现 应该 定期发出ping以检测连接健康状况

- ping频率 应该 是可配置的

- 超时 应该 适合网络环境

- 应该 避免过度ping以减少网络开销

## ​ 错误处理

- 超时 应该 被视为连接失败

- 多个失败的ping 可以 触发连接重置

- 实现 应该 记录ping失败以进行诊断

Cancellation Progress

⌘ I

github

Powered by This documentation is built and hosted on Mintlify, a developer documentation platform
