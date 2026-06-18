# MCP Inspector - Model Context Protocol

Source: https://mcp.gjxx.dev/docs/tools/inspector
Friendly site: MCP中文文档
Group: GJXX.DEV
Fetched: 2026-06-18T02:27:23.425Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: In-depth guide to using the MCP Inspector for testing and debugging Model Context Protocol servers

## Content

## On this page

- Getting started Installation and basic usage
- Inspecting servers from NPM or PyPi
- Inspecting locally developed servers
- Feature overview Server connection pane
- Resources tab
- Prompts tab
- Tools tab
- Notifications pane
- Best practices Development workflow
- Next steps

开发工具

# MCP Inspector

Copy page

In-depth guide to using the MCP Inspector for testing and debugging Model Context Protocol servers

Copy page

The MCP Inspector is an interactive developer tool for testing and debugging MCP servers. While the Debugging Guide covers the Inspector as part of the overall debugging toolkit, this document provides a detailed exploration of the Inspector’s features and capabilities.

## ​ Getting started

### ​ Installation and basic usage

The Inspector runs directly through npx without requiring installation:

npx @modelcontextprotocol/inspector < comman d >

npx @modelcontextprotocol/inspector < comman d > < arg 1> < arg 2>

#### ​ Inspecting servers from NPM or PyPi

A common way to start server packages from NPM or PyPi .

- NPM package
- PyPi package

npx -y @modelcontextprotocol/inspector npx < package-nam e > < arg s >
# For example
npx -y @modelcontextprotocol/inspector npx @modelcontextprotocol/server-filesystem /Users/username/Desktop

npx @modelcontextprotocol/inspector uvx < package-nam e > < arg s >
# For example
npx @modelcontextprotocol/inspector uvx mcp-server-git --repository ~/code/mcp/servers.git

#### ​ Inspecting locally developed servers

To inspect servers locally developed or downloaded as a repository, the most common
way is:

- TypeScript
- Python

npx @modelcontextprotocol/inspector node path/to/server/index.js args...

npx @modelcontextprotocol/inspector \
uv \
--directory path/to/server \
run \
package-name \
args...

Please carefully read any attached README for the most accurate instructions.

## ​ Feature overview

The Inspector provides several features for interacting with your MCP server:

### ​ Server connection pane

- Allows selecting the transport for connecting to the server

- For local servers, supports customizing the command-line arguments and environment

### ​ Resources tab

- Lists all available resources

- Shows resource metadata (MIME types, descriptions)

- Allows resource content inspection

- Supports subscription testing

### ​ Prompts tab

- Displays available prompt templates

- Shows prompt arguments and descriptions

- Enables prompt testing with custom arguments

- Previews generated messages

### ​ Tools tab

- Lists available tools

- Shows tool schemas and descriptions

- Enables tool testing with custom inputs

- Displays tool execution results

### ​ Notifications pane

- Presents all logs recorded from the server

- Shows notifications received from the server

## ​ Best practices

### ​ Development workflow

- Start Development Launch Inspector with your server

- Verify basic connectivity

- Check capability negotiation

- Iterative testing Make server changes

- Rebuild the server

- Reconnect the Inspector

- Test affected features

- Monitor messages

- Test edge cases Invalid inputs

- Missing prompt arguments

- Concurrent operations

- Verify error handling and error responses

## ​ Next steps

## Inspector Repository

Check out the MCP Inspector source code

## Debugging Guide

Learn about broader debugging strategies

Understanding Authorization in MCP

⌘ I

github

Powered by This documentation is built and hosted on Mintlify, a developer documentation platform
