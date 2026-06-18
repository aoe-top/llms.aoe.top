# 资源 - Model Context Protocol

Source: https://mcp.gjxx.dev/specification/draft/server/resources
Friendly site: MCP中文文档
Group: GJXX.DEV
Fetched: 2026-06-18T02:27:30.781Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

## Content

## On this page

- 用户交互模型
- 能力
- 协议消息 列出资源
- 读取资源
- 资源模板
- 列表变更通知
- 订阅
- 消息流程
- 数据类型 资源
- 资源内容
- 文本内容
- 二进制内容
- 注解
- 常见 URI 方案 https://
- file://
- git://
- 自定义 URI 方案
- 错误处理
- 安全注意事项

服务器功能

# 资源

Copy page

Copy page

协议修订版 : draft

Model Context Protocol (MCP) 为服务器提供了一种标准化的方式来向客户端暴露资源。资源允许服务器共享为语言模型提供上下文的数据，例如文件、数据库模式或特定于应用程序的信息。每个资源都由一个 URI 唯一标识。

## ​ 用户交互模型

MCP 中的资源被设计为 应用程序驱动 的，主机应用程序根据其需求决定如何纳入上下文。
例如，应用程序可以：

- 通过 UI 元素暴露资源以进行显式选择，在树形或列表视图中

- 允许用户搜索和过滤可用资源

- 实现自动上下文包含，基于启发式或 AI 模型的选择

但是，实现可以自由地通过任何适合其需求的界面模式来暴露资源——协议本身并不强制要求任何特定的用户交互模型。

## ​ 能力

支持资源的服务器 必须 声明 resources 能力：

{
"capabilities" : {
"resources" : {
"subscribe" : true ,
"listChanged" : true
}
}
}

该能力支持两个可选功能：

- subscribe ：客户端是否可以订阅以接收单个资源变更的通知。

- listChanged ：服务器是否会在可用资源列表发生变化时发出通知。

subscribe 和 listChanged 都是可选的——服务器可以支持两者都不支持、其中之一或两者都支持：

{
"capabilities" : {
"resources" : {} // 不支持任何功能
}
}

{
"capabilities" : {
"resources" : {
"subscribe" : true // 仅支持订阅
}
}
}

{
"capabilities" : {
"resources" : {
"listChanged" : true // 仅支持列表变更通知
}
}
}

## ​ 协议消息

### ​ 列出资源

要发现可用资源，客户端发送 resources/list 请求。此操作支持 分页 。
请求：

{
"jsonrpc" : "2.0" ,
"id" : 1 ,
"method" : "resources/list" ,
"params" : {
"cursor" : "optional-cursor-value"
}
}

响应：

{
"jsonrpc" : "2.0" ,
"id" : 1 ,
"result" : {
"resources" : [
{
"uri" : "file:///project/src/main.rs" ,
"name" : "main.rs" ,
"title" : "Rust 软件应用程序主文件" ,
"description" : "主要应用程序入口点" ,
"mimeType" : "text/x-rust" ,
"icons" : [
{
"src" : "https://example.com/rust-file-icon.png" ,
"mimeType" : "image/png" ,
"sizes" : [ "48x48" ]
}
]
}
],
"nextCursor" : "next-page-cursor"
}
}

### ​ 读取资源

要检索资源内容，客户端发送 resources/read 请求：
请求：

{
"jsonrpc" : "2.0" ,
"id" : 2 ,
"method" : "resources/read" ,
"params" : {
"uri" : "file:///project/src/main.rs"
}
}

响应：

{
"jsonrpc" : "2.0" ,
"id" : 2 ,
"result" : {
"contents" : [
{
"uri" : "file:///project/src/main.rs" ,
"mimeType" : "text/x-rust" ,
"text" : "fn main() { \n println!( \" Hello world! \" ); \n }"
}
]
}
}

### ​ 资源模板

资源模板允许服务器使用 URI 模板 暴露参数化资源。参数可以通过 完成 API 进行自动完成。
请求：

{
"jsonrpc" : "2.0" ,
"id" : 3 ,
"method" : "resources/templates/list"
}

响应：

{
"jsonrpc" : "2.0" ,
"id" : 3 ,
"result" : {
"resourceTemplates" : [
{
"uriTemplate" : "file:///{path}" ,
"name" : "项目文件" ,
"title" : "📁 项目文件" ,
"description" : "访问项目目录中的文件" ,
"mimeType" : "application/octet-stream" ,
"icons" : [
{
"src" : "https://example.com/folder-icon.png" ,
"mimeType" : "image/png" ,
"sizes" : [ "48x48" ]
}
]
}
]
}
}

### ​ 列表变更通知

当可用资源列表发生变化时，声明了 listChanged 能力的服务器 应该 发送通知：

{
"jsonrpc" : "2.0" ,
"method" : "notifications/resources/list_changed"
}

### ​ 订阅

协议支持可选的资源变更订阅。客户端可以订阅特定资源，并在它们发生变化时接收通知：
订阅请求：

{
"jsonrpc" : "2.0" ,
"id" : 4 ,
"method" : "resources/subscribe" ,
"params" : {
"uri" : "file:///project/src/main.rs"
}
}

更新通知：

{
"jsonrpc" : "2.0" ,
"method" : "notifications/resources/updated" ,
"params" : {
"uri" : "file:///project/src/main.rs"
}
}

## ​ 消息流程

## ​ 数据类型

### ​ 资源

资源定义包括：

- uri ：资源的唯一标识符

- name ：资源的名称

- title ：可选的用于显示的人类可读资源名称

- description ：可选的描述

- mimeType ：可选的 MIME 类型

- size ：可选的字节大小

### ​ 资源内容

资源可以包含文本或二进制数据：

#### ​ 文本内容

{
"uri" : "file:///example.txt" ,
"mimeType" : "text/plain" ,
"text" : "资源内容"
}

#### ​ 二进制内容

{
"uri" : "file:///example.png" ,
"mimeType" : "image/png" ,
"blob" : "base64-encoded-data"
}

### ​ 注解

资源、资源模板和内容块支持可选的注解，这些注解为客户端提供关于如何使用或显示资源的提示：

- audience ：一个数组，指示此资源的预期受众。有效值为 "user" 和 "assistant" 。例如， ["user", "assistant"] 表示对两者都有用的内容。

- priority ：一个从 0.0 到 1.0 的数字，表示此资源的重要性。值为 1 表示”最重要”（实际上是必需的），而 0 表示”最不重要”（完全可选）。

- lastModified ：一个 ISO 8601 格式的时间戳，表示资源最后修改的时间（例如， "2025-01-12T15:00:58Z" ）。

带有注解的资源示例：

{
"uri" : "file:///project/README.md" ,
"name" : "README.md" ,
"title" : "项目文档" ,
"mimeType" : "text/markdown" ,
"annotations" : {
"audience" : [ "user" ],
"priority" : 0.8 ,
"lastModified" : "2025-01-12T15:00:58Z"
}
}

客户端可以使用这些注解来：

- 根据预期受众过滤资源

- 确定在上下文中包含哪些资源的优先级

- 显示修改时间或按最近程度排序

## ​ 常见 URI 方案

协议定义了几个标准 URI 方案。这个列表不是穷尽的——实现总是可以自由使用额外的自定义 URI 方案。

### ​ https://

用于表示网络上可用的资源。
服务器 应该 仅在客户端能够自行从网络直接获取和加载资源时使用此方案——也就是说，它不需要通过 MCP 服务器读取资源。
对于其他用例，服务器 应该 更倾向于使用另一个 URI 方案，或定义一个自定义的，即使服务器本身将通过互联网下载资源内容。

### ​ file://

用于标识行为类似于文件系统的资源。但是，资源不需要映射到实际的物理文件系统。
MCP 服务器 可以 使用 XDG MIME 类型 ，如 inode/directory ，来标识 file:// 资源，以表示没有标准 MIME 类型的非常规文件（如目录）。

### ​ git://

Git 版本控制集成。

### ​ 自定义 URI 方案

自定义 URI 方案 必须 符合 RFC3986 ，并考虑到上述指导。

## ​ 错误处理

服务器 应该 为常见故障情况返回标准的 JSON-RPC 错误：

- 资源未找到： -32002

- 内部错误： -32603

错误示例：

{
"jsonrpc" : "2.0" ,
"id" : 5 ,
"error" : {
"code" : -32002 ,
"message" : "资源未找到" ,
"data" : {
"uri" : "file:///nonexistent.txt"
}
}
}

## ​ 安全注意事项

- 服务器 必须 验证所有资源 URI

- 敏感资源的访问控制 应该 被实现

- 二进制数据 必须 被正确编码

- 资源权限 应该 在操作前被检查

提示词 工具

⌘ I

github

Powered by This documentation is built and hosted on Mintlify, a developer documentation platform
