# Logging - Model Context Protocol

Source: https://mcp.gjxx.dev/specification/2025-03-26/server/utilities/logging
Friendly site: MCP中文文档
Group: GJXX.DEV
Fetched: 2026-06-18T02:28:56.580Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

## Content

## On this page

- User Interaction Model
- Capabilities
- Log Levels
- Protocol Messages Setting Log Level
- Log Message Notifications
- Message Flow
- Error Handling
- Implementation Considerations
- Security

实用工具

# Logging

Copy page

Copy page

Protocol Revision : 2025-03-26

The Model Context Protocol (MCP) provides a standardized way for servers to send
structured log messages to clients. Clients can control logging verbosity by setting
minimum log levels, with servers sending notifications containing severity levels,
optional logger names, and arbitrary JSON-serializable data.

## ​ User Interaction Model

Implementations are free to expose logging through any interface pattern that suits their
needs—the protocol itself does not mandate any specific user interaction model.

## ​ Capabilities

Servers that emit log message notifications MUST declare the logging capability:

{
"capabilities" : {
"logging" : {}
}
}

## ​ Log Levels

The protocol follows the standard syslog severity levels specified in
RFC 5424 :

Level | Description | Example Use Case |

debug | Detailed debugging information | Function entry/exit points |

info | General informational messages | Operation progress updates |

notice | Normal but significant events | Configuration changes |

warning | Warning conditions | Deprecated feature usage |

error | Error conditions | Operation failures |

critical | Critical conditions | System component failures |

alert | Action must be taken immediately | Data corruption detected |

emergency | System is unusable | Complete system failure |

## ​ Protocol Messages

### ​ Setting Log Level

To configure the minimum log level, clients MAY send a logging/setLevel request:
Request:

{
"jsonrpc" : "2.0" ,
"id" : 1 ,
"method" : "logging/setLevel" ,
"params" : {
"level" : "info"
}
}

### ​ Log Message Notifications

Servers send log messages using notifications/message notifications:

{
"jsonrpc" : "2.0" ,
"method" : "notifications/message" ,
"params" : {
"level" : "error" ,
"logger" : "database" ,
"data" : {
"error" : "Connection failed" ,
"details" : {
"host" : "localhost" ,
"port" : 5432
}
}
}
}

## ​ Message Flow

## ​ Error Handling

Servers SHOULD return standard JSON-RPC errors for common failure cases:

- Invalid log level: -32602 (Invalid params)

- Configuration errors: -32603 (Internal error)

## ​ Implementation Considerations

- Servers SHOULD : Rate limit log messages

- Include relevant context in data field

- Use consistent logger names

- Remove sensitive information

- Clients MAY : Present log messages in the UI

- Implement log filtering/search

- Display severity visually

- Persist log messages

## ​ Security

- Log messages MUST NOT contain: Credentials or secrets

- Personal identifying information

- Internal system details that could aid attacks

- Implementations SHOULD : Rate limit messages

- Validate all data fields

- Control log access

- Monitor for sensitive content

Completion Pagination

⌘ I

github

Powered by This documentation is built and hosted on Mintlify, a developer documentation platform
