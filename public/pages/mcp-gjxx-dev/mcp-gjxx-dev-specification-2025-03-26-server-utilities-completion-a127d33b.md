# Completion - Model Context Protocol

Source: https://mcp.gjxx.dev/specification/2025-03-26/server/utilities/completion
Friendly site: MCP中文文档
Group: GJXX.DEV
Fetched: 2026-06-18T02:28:57.754Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

## Content

## On this page

- User Interaction Model
- Capabilities
- Protocol Messages Requesting Completions
- Reference Types
- Completion Results
- Message Flow
- Data Types CompleteRequest
- CompleteResult
- Error Handling
- Implementation Considerations
- Security

实用工具

# Completion

Copy page

Copy page

Protocol Revision : 2025-03-26

The Model Context Protocol (MCP) provides a standardized way for servers to offer
argument autocompletion suggestions for prompts and resource URIs. This enables rich,
IDE-like experiences where users receive contextual suggestions while entering argument
values.

## ​ User Interaction Model

Completion in MCP is designed to support interactive user experiences similar to IDE code
completion.
For example, applications may show completion suggestions in a dropdown or popup menu as
users type, with the ability to filter and select from available options.
However, implementations are free to expose completion through any interface pattern that
suits their needs—the protocol itself does not mandate any specific user
interaction model.

## ​ Capabilities

Servers that support completions MUST declare the completions capability:

{
"capabilities" : {
"completions" : {}
}
}

## ​ Protocol Messages

### ​ Requesting Completions

To get completion suggestions, clients send a completion/complete request specifying
what is being completed through a reference type:
Request:

{
"jsonrpc" : "2.0" ,
"id" : 1 ,
"method" : "completion/complete" ,
"params" : {
"ref" : {
"type" : "ref/prompt" ,
"name" : "code_review"
},
"argument" : {
"name" : "language" ,
"value" : "py"
}
}
}

Response:

{
"jsonrpc" : "2.0" ,
"id" : 1 ,
"result" : {
"completion" : {
"values" : [ "python" , "pytorch" , "pyside" ],
"total" : 10 ,
"hasMore" : true
}
}
}

### ​ Reference Types

The protocol supports two types of completion references:

Type | Description | Example |

ref/prompt | References a prompt by name | {"type": "ref/prompt", "name": "code_review"} |

ref/resource | References a resource URI | {"type": "ref/resource", "uri": "file:///{path}"} |

### ​ Completion Results

Servers return an array of completion values ranked by relevance, with:

- Maximum 100 items per response

- Optional total number of available matches

- Boolean indicating if additional results exist

## ​ Message Flow

## ​ Data Types

### ​ CompleteRequest

- ref : A PromptReference or ResourceReference

- argument : Object containing: name : Argument name

- value : Current value

### ​ CompleteResult

- completion : Object containing: values : Array of suggestions (max 100)

- total : Optional total matches

- hasMore : Additional results flag

## ​ Error Handling

Servers SHOULD return standard JSON-RPC errors for common failure cases:

- Method not found: -32601 (Capability not supported)

- Invalid prompt name: -32602 (Invalid params)

- Missing required arguments: -32602 (Invalid params)

- Internal errors: -32603 (Internal error)

## ​ Implementation Considerations

- Servers SHOULD : Return suggestions sorted by relevance

- Implement fuzzy matching where appropriate

- Rate limit completion requests

- Validate all inputs

- Clients SHOULD : Debounce rapid completion requests

- Cache completion results where appropriate

- Handle missing or partial results gracefully

## ​ Security

Implementations MUST :

- Validate all completion inputs

- Implement appropriate rate limiting

- Control access to sensitive suggestions

- Prevent completion-based information disclosure

Tools Logging

⌘ I

github

Powered by This documentation is built and hosted on Mintlify, a developer documentation platform
