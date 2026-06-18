# Ping - Model Context Protocol

Source: https://mcp.gjxx.dev/specification/2025-06-18/basic/utilities/ping
Friendly site: MCP中文文档
Group: GJXX.DEV
Fetched: 2026-06-18T02:28:55.337Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

## Content

## On this page

- Overview
- Message Format
- Behavior Requirements
- Usage Patterns
- Implementation Considerations
- Error Handling

实用工具

# Ping

Copy page

Copy page

Protocol Revision : 2025-06-18

The Model Context Protocol includes an optional ping mechanism that allows either party
to verify that their counterpart is still responsive and the connection is alive.

## ​ Overview

The ping functionality is implemented through a simple request/response pattern. Either
the client or server can initiate a ping by sending a ping request.

## ​ Message Format

A ping request is a standard JSON-RPC request with no parameters:

{
"jsonrpc" : "2.0" ,
"id" : "123" ,
"method" : "ping"
}

## ​ Behavior Requirements

- The receiver MUST respond promptly with an empty response:

{
"jsonrpc" : "2.0" ,
"id" : "123" ,
"result" : {}
}

- If no response is received within a reasonable timeout period, the sender MAY : Consider the connection stale

- Terminate the connection

- Attempt reconnection procedures

## ​ Usage Patterns

## ​ Implementation Considerations

- Implementations SHOULD periodically issue pings to detect connection health

- The frequency of pings SHOULD be configurable

- Timeouts SHOULD be appropriate for the network environment

- Excessive pinging SHOULD be avoided to reduce network overhead

## ​ Error Handling

- Timeouts SHOULD be treated as connection failures

- Multiple failed pings MAY trigger connection reset

- Implementations SHOULD log ping failures for diagnostics

Cancellation Progress

⌘ I

github

Powered by This documentation is built and hosted on Mintlify, a developer documentation platform
