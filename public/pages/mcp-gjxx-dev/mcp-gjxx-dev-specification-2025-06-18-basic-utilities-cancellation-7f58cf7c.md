# Cancellation - Model Context Protocol

Source: https://mcp.gjxx.dev/specification/2025-06-18/basic/utilities/cancellation
Friendly site: MCP中文文档
Group: GJXX.DEV
Fetched: 2026-06-18T02:28:58.618Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

## Content

## On this page

- Cancellation Flow
- Behavior Requirements
- Timing Considerations
- Implementation Notes
- Error Handling

实用工具

# Cancellation

Copy page

Copy page

Protocol Revision : 2025-06-18

The Model Context Protocol (MCP) supports optional cancellation of in-progress requests
through notification messages. Either side can send a cancellation notification to
indicate that a previously-issued request should be terminated.

## ​ Cancellation Flow

When a party wants to cancel an in-progress request, it sends a notifications/cancelled
notification containing:

- The ID of the request to cancel

- An optional reason string that can be logged or displayed

{
"jsonrpc" : "2.0" ,
"method" : "notifications/cancelled" ,
"params" : {
"requestId" : "123" ,
"reason" : "User requested cancellation"
}
}

## ​ Behavior Requirements

- Cancellation notifications MUST only reference requests that: Were previously issued in the same direction

- Are believed to still be in-progress

- The initialize request MUST NOT be cancelled by clients

- Receivers of cancellation notifications SHOULD : Stop processing the cancelled request

- Free associated resources

- Not send a response for the cancelled request

- Receivers MAY ignore cancellation notifications if: The referenced request is unknown

- Processing has already completed

- The request cannot be cancelled

- The sender of the cancellation notification SHOULD ignore any response to the request that arrives afterward

## ​ Timing Considerations

Due to network latency, cancellation notifications may arrive after request processing
has completed, and potentially after a response has already been sent.
Both parties MUST handle these race conditions gracefully:

## ​ Implementation Notes

- Both parties SHOULD log cancellation reasons for debugging

- Application UIs SHOULD indicate when cancellation is requested

## ​ Error Handling

Invalid cancellation notifications SHOULD be ignored:

- Unknown request IDs

- Already completed requests

- Malformed notifications

This maintains the “fire and forget” nature of notifications while allowing for race
conditions in asynchronous communication.

安全最佳实践 Ping

⌘ I

github

Powered by This documentation is built and hosted on Mintlify, a developer documentation platform
