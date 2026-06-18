# 概述 - Model Context Protocol

Source: https://mcp.gjxx.dev/specification/2025-06-18/server
Friendly site: MCP中文文档
Group: GJXX.DEV
Fetched: 2026-06-18T02:27:28.925Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

## Content

服务器功能

# 概述

Copy page

Copy page

协议修订版 ：2025-06-18

服务器通过 MCP 为语言模型添加上下文提供了基本构建块。这些原语实现了客户端、服务器和语言模型之间的丰富交互：

- 提示 ：预定义的模板或指导语言模型交互的指令

- 资源 ：为模型提供额外上下文的结构化数据或内容

- 工具 ：允许模型执行操作或检索信息的可执行函数

每个原语可以在以下控制层次结构中进行总结：

原语 | 控制 | 描述 | 示例 |

提示 | 用户控制 | 由用户选择调用的交互式模板 | 斜杠命令、菜单选项 |

资源 | 应用程序控制 | 由客户端附加和管理的上下文数据 | 文件内容、git 历史 |

工具 | 模型控制 | 暴露给 LLM 以执行操作的函数 | API POST 请求、文件写入 |

在下面更详细地探索这些关键原语：

## 提示

## 资源

## 工具

引出 提示

⌘ I

github

Powered by This documentation is built and hosted on Mintlify, a developer documentation platform
