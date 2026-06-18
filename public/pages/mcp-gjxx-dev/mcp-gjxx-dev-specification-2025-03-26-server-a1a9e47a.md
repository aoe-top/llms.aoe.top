# Overview - Model Context Protocol

Source: https://mcp.gjxx.dev/specification/2025-03-26/server
Friendly site: MCP中文文档
Group: GJXX.DEV
Fetched: 2026-06-18T02:27:28.720Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

## Content

服务器功能

# Overview

Copy page

Copy page

Protocol Revision : 2025-03-26

Servers provide the fundamental building blocks for adding context to language models via
MCP. These primitives enable rich interactions between clients, servers, and language
models:

- Prompts : Pre-defined templates or instructions that guide language model interactions

- Resources : Structured data or content that provides additional context to the model

- Tools : Executable functions that allow models to perform actions or retrieve information

Each primitive can be summarized in the following control hierarchy:

Primitive | Control | Description | Example |

Prompts | User-controlled | Interactive templates invoked by user choice | Slash commands, menu options |

Resources | Application-controlled | Contextual data attached and managed by the client | File contents, git history |

Tools | Model-controlled | Functions exposed to the LLM to take actions | API POST requests, file writing |

Explore these key primitives in more detail below:

## Prompts

## Resources

## Tools

Sampling Prompts

⌘ I

github

Powered by This documentation is built and hosted on Mintlify, a developer documentation platform
