# 消息 - Model Context Protocol

Source: https://mcp.gjxx.dev/specification/2024-11-05/basic/messages
Friendly site: MCP中文文档
Group: GJXX.DEV
Fetched: 2026-06-18T02:28:51.489Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

## Content

## On this page

- 请求
- 响应
- 通知

基础协议

# 消息

Copy page

Copy page

协议修订 : 2024-11-05

MCP中的所有消息 必须 遵循 JSON-RPC 2.0 规范。该协议定义了三种类型的消息：

## ​ 请求

请求从客户端发送到服务器或从服务器发送到客户端。

{
jsonrpc : "2.0" ;
id : string | number ;
method : string ;
params ?: {
[key: string]: unknown ;
};
}

- 请求 必须 包含字符串或整数ID。

- 与基础JSON-RPC不同，ID 不能 为 null 。

- 请求ID 不能 在同一会话中被请求者之前使用过。

## ​ 响应

响应发送以回复请求。

{
jsonrpc : "2.0" ;
id : string | number ;
result ?: {
[key: string]: unknown ;
}
error ?: {
code: number ;
message : string ;
data ?: unknown ;
}
}

- 响应 必须 包含与它们对应的请求相同的ID。

- 必须 设置 result 或 error 中的一个。响应 不能 同时设置两者。

- 错误代码 必须 是整数。

## ​ 通知

通知从客户端发送到服务器或从服务器发送到客户端。它们不期望响应。

{
jsonrpc : "2.0" ;
method : string ;
params ?: {
[key: string]: unknown ;
};
}

- 通知 不能 包含ID。

生命周期 传输

⌘ I

github

Powered by This documentation is built and hosted on Mintlify, a developer documentation platform
