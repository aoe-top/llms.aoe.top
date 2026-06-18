# Progress - Model Context Protocol

Source: https://mcp.gjxx.dev/specification/2025-06-18/basic/utilities/progress
Friendly site: MCP中文文档
Group: GJXX.DEV
Fetched: 2026-06-18T02:28:56.478Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

## Content

## On this page

- Progress Flow
- Behavior Requirements
- Implementation Notes

实用工具

# Progress

Copy page

Copy page

Protocol Revision : 2025-06-18

The Model Context Protocol (MCP) supports optional progress tracking for long-running
operations through notification messages. Either side can send progress notifications to
provide updates about operation status.

## ​ Progress Flow

When a party wants to receive progress updates for a request, it includes a
progressToken in the request metadata.

- Progress tokens MUST be a string or integer value

- Progress tokens can be chosen by the sender using any means, but MUST be unique across all active requests.

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

The receiver MAY then send progress notifications containing:

- The original progress token

- The current progress value so far

- An optional “total” value

- An optional “message” value

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

- The progress value MUST increase with each notification, even if the total is unknown.

- The progress and the total values MAY be floating point.

- The message field SHOULD provide relevant human readable progress information.

## ​ Behavior Requirements

- Progress notifications MUST only reference tokens that: Were provided in an active request

- Are associated with an in-progress operation

- Receivers of progress requests MAY : Choose not to send any progress notifications

- Send notifications at whatever frequency they deem appropriate

- Omit the total value if unknown

## ​ Implementation Notes

- Senders and receivers SHOULD track active progress tokens

- Both parties SHOULD implement rate limiting to prevent flooding

- Progress notifications MUST stop after completion

Ping 根目录

⌘ I

github

Powered by This documentation is built and hosted on Mintlify, a developer documentation platform
