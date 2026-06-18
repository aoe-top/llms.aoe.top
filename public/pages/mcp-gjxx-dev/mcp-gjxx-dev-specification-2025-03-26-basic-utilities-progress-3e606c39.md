# Progress - Model Context Protocol

Source: https://mcp.gjxx.dev/specification/2025-03-26/basic/utilities/progress
Friendly site: MCP中文文档
Group: GJXX.DEV
Fetched: 2026-06-18T02:28:56.373Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

## Content

## On this page

- 进度流程
- 行为要求
- 实现说明

实用工具

# Progress

Copy page

Copy page

协议修订 : 2025-03-26

Model Context Protocol (MCP) 通过通知消息支持长时间运行操作的可选进度跟踪。任何一方都可以发送进度通知以提供操作状态更新。

## ​ 进度流程

当一方想要_接收_请求的进度更新时，它在请求元数据中包含 progressToken 。

- 进度令牌 必须 是字符串或整数值

- 进度令牌可以由发送者使用任何方式选择，但 必须 在所有活动请求中唯一。

{
"jsonrpc" : "2.0" ,
"id" : 1 ,
"method" : "some_method" ,
"params" : {
"_meta" : {
"progressToken" : "abc123"
}
}
}

接收者 可以 随后发送包含以下内容的进度通知：

- 原始进度令牌

- 到目前为止的当前进度值

- 可选的”total”值

- 可选的”message”值

{
"jsonrpc" : "2.0" ,
"method" : "notifications/progress" ,
"params" : {
"progressToken" : "abc123" ,
"progress" : 50 ,
"total" : 100 ,
"message" : "Reticulating splines..."
}
}

- progress 值 必须 随着每次通知而增加，即使总数未知。

- progress 和 total 值 可以 是浮点数。

- message 字段 应该 提供相关的人类可读进度信息。

## ​ 行为要求

- 进度通知 必须 仅引用： 在活动请求中提供的令牌

- 与正在进行的操作关联的令牌

- 进度请求的接收者 可以 ： 选择不发送任何进度通知

- 以他们认为合适的任何频率发送通知

- 如果未知则省略总数值

## ​ 实现说明

- 发送者和接收者 应该 跟踪活动进度令牌

- 双方 应该 实施速率限制以防止泛滥

- 进度通知 必须 在完成后停止

Ping Roots

⌘ I

github

Powered by This documentation is built and hosted on Mintlify, a developer documentation platform
