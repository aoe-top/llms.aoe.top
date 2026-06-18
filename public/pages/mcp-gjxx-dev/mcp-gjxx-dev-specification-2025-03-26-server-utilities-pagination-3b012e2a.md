# Pagination - Model Context Protocol

Source: https://mcp.gjxx.dev/specification/2025-03-26/server/utilities/pagination
Friendly site: MCP中文文档
Group: GJXX.DEV
Fetched: 2026-06-18T02:28:57.566Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

## Content

## On this page

- Pagination Model
- Response Format
- Request Format
- Pagination Flow
- Operations Supporting Pagination
- Implementation Guidelines
- Error Handling

实用工具

# Pagination

Copy page

Copy page

Protocol Revision : 2025-03-26

The Model Context Protocol (MCP) supports paginating list operations that may return
large result sets. Pagination allows servers to yield results in smaller chunks rather
than all at once.
Pagination is especially important when connecting to external services over the
internet, but also useful for local integrations to avoid performance issues with large
data sets.

## ​ Pagination Model

Pagination in MCP uses an opaque cursor-based approach, instead of numbered pages.

- The cursor is an opaque string token, representing a position in the result set

- Page size is determined by the server, and clients MUST NOT assume a fixed page size

## ​ Response Format

Pagination starts when the server sends a response that includes:

- The current page of results

- An optional nextCursor field if more results exist

{
"jsonrpc" : "2.0" ,
"id" : "123" ,
"result" : {
"resources" : [ ... ],
"nextCursor" : "eyJwYWdlIjogM30="
}
}

## ​ Request Format

After receiving a cursor, the client can continue paginating by issuing a request
including that cursor:

{
"jsonrpc" : "2.0" ,
"method" : "resources/list" ,
"params" : {
"cursor" : "eyJwYWdlIjogMn0="
}
}

## ​ Pagination Flow

## ​ Operations Supporting Pagination

The following MCP operations support pagination:

- resources/list - List available resources

- resources/templates/list - List resource templates

- prompts/list - List available prompts

- tools/list - List available tools

## ​ Implementation Guidelines

- Servers SHOULD : Provide stable cursors

- Handle invalid cursors gracefully

- Clients SHOULD : Treat a missing nextCursor as the end of results

- Support both paginated and non-paginated flows

- Clients MUST treat cursors as opaque tokens: Don’t make assumptions about cursor format

- Don’t attempt to parse or modify cursors

- Don’t persist cursors across sessions

## ​ Error Handling

Invalid cursors SHOULD result in an error with code -32602 (Invalid params).

Logging

⌘ I

github

Powered by This documentation is built and hosted on Mintlify, a developer documentation platform
