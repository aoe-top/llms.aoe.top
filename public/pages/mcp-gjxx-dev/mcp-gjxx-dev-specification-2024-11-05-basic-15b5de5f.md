# 概述 - Model Context Protocol

Source: https://mcp.gjxx.dev/specification/2024-11-05/basic
Friendly site: MCP中文文档
Group: GJXX.DEV
Fetched: 2026-06-18T02:27:27.968Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

## Content

## On this page

- 协议层
- 认证
- 模式

基础协议

# 概述

Copy page

Copy page

协议修订 : 2024-11-05

MCP客户端和服务器之间的所有消息 必须 遵循 JSON-RPC 2.0 规范。该协议定义了三种基本类型的消息：

类型 | 描述 | 要求 |

请求 | 发送以启动操作的消息 | 必须包含唯一ID和方法名称 |

响应 | 发送以回复请求的消息 | 必须包含与请求相同的ID |

通知 | 无回复的单向消息 | 不能包含ID |

响应 进一步细分为 成功结果 或 错误 。结果可以遵循任何JSON对象结构，而错误必须至少包含错误代码和消息。

## ​ 协议层

Model Context Protocol 由几个关键组件组成，它们协同工作：

- 基础协议 : 核心JSON-RPC消息类型

- 生命周期管理 : 连接初始化、能力协商和会话控制

- 服务器功能 : 服务器公开的资源、提示和工具

- 客户端功能 : 客户端提供的采样和根目录列表

- 工具 : 跨领域关注点，如日志记录和参数完成

所有实现 必须 支持基础协议和生命周期管理组件。其他组件 可以 根据应用程序的具体需求实现。
这些协议层建立了清晰的关注点分离，同时实现客户端和服务器之间的丰富交互。模块化设计允许实现支持它们确切需要的功能。
有关不同组件的更多详细信息，请参见以下页面：

## 生命周期

## 资源

## 提示

## 工具

## 日志记录

## 采样

## ​ 认证

认证和授权目前不是核心MCP规范的一部分，但我们正在考虑在未来引入它们的方法。请加入我们的 GitHub Discussions 来帮助塑造协议的未来！
客户端和服务器 可以 协商自己的自定义认证和授权策略。

## ​ 模式

协议的完整规范定义为 TypeScript模式 。这是所有协议消息和结构的真相来源。
还有一个 JSON Schema ，它是从TypeScript真相来源自动生成的，用于各种自动化工具。

架构 生命周期

⌘ I

github

Powered by This documentation is built and hosted on Mintlify, a developer documentation platform
