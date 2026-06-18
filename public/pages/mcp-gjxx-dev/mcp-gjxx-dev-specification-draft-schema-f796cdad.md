# 模式参考 - Model Context Protocol

Source: https://mcp.gjxx.dev/specification/draft/schema
Friendly site: MCP中文文档
Group: GJXX.DEV
Fetched: 2026-06-18T02:27:27.470Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

## Content

## On this page

- 通用类型 Annotations
- AudioContent
- BlobResourceContents
- BooleanSchema
- ClientCapabilities
- ContentBlock
- Cursor
- EmbeddedResource
- EmptyResult
- EnumSchema
- Error
- Icon
- ImageContent
- Implementation
- JSONRPCError
- JSONRPCNotification
- JSONRPCRequest
- JSONRPCResponse
- LoggingLevel
- ModelHint
- ModelPreferences
- NumberSchema
- PrimitiveSchemaDefinition
- ProgressToken
- Prompt
- PromptArgument
- PromptMessage
- PromptReference
- RequestId
- Resource
- ResourceContents
- ResourceLink
- ResourceTemplate
- ResourceTemplateReference
- Result
- Role
- Root
- SamplingMessage
- ServerCapabilities
- StringSchema
- TextContent
- TextResourceContents
- Tool
- ToolAnnotations
- completion/complete CompleteRequest
- CompleteResult
- elicitation/create ElicitRequest
- ElicitResult
- initialize InitializeRequest
- InitializeResult
- logging/setLevel SetLevelRequest
- notifications/cancelled CancelledNotification
- notifications/initialized InitializedNotification
- notifications/message LoggingMessageNotification
- notifications/progress ProgressNotification
- notifications/prompts/list_changed PromptListChangedNotification
- notifications/resources/list_changed ResourceListChangedNotification
- notifications/resources/updated ResourceUpdatedNotification
- notifications/roots/list_changed RootsListChangedNotification
- notifications/tools/list_changed ToolListChangedNotification
- ping PingRequest
- prompts/get GetPromptRequest
- GetPromptResult
- prompts/list ListPromptsRequest
- ListPromptsResult
- resources/list ListResourcesRequest
- ListResourcesResult
- resources/read ReadResourceRequest
- ReadResourceResult
- resources/subscribe SubscribeRequest
- resources/templates/list ListResourceTemplatesRequest
- ListResourceTemplatesResult
- resources/unsubscribe UnsubscribeRequest
- roots/list ListRootsRequest
- ListRootsResult
- sampling/createMessage CreateMessageRequest
- CreateMessageResult
- tools/call CallToolRequest
- CallToolResult
- tools/list ListToolsRequest
- ListToolsResult

# 模式参考

Copy page

Copy page

## ​ 通用类型

### ​ Annotations

interface Annotations {
audience ?: Role [] ;
lastModified ?: string ;
priority ?: number ;
}

客户端的可选注解。客户端可以使用注解来告知如何使用或显示对象

Optional audience

audience ?: Role []

描述此对象或数据的预期客户。

它可以包含多个条目，以指示对多个受众有用的内容（例如， [“user”, “assistant”] ）。

Optional last Modified

lastModified ?: string

资源最后修改的时间，作为ISO 8601格式的字符串。

应该是ISO 8601格式的字符串（例如，“2025-01-12T15:00:58Z”）。

示例：打开文件中的最后活动时间戳，附加资源时的时间戳等。

Optional priority

priority ?: number

描述此数据对操作服务器的重要性。

值为1表示”最重要”，并表示数据实际上是必需的，而0表示”最不重要”，并表示数据完全是可选的。

TJS-type

number

### ​ AudioContent

interface AudioContent {
_meta ?: { [ key : string ]: unknown } ;
annotations ?: Annotations ;
data : string ;
mimeType : string ;
type : “audio” ;
}

提供给或来自LLM的音频。

Optional _ meta

_meta ?: { [ key : string ]: unknown }

有关 _meta 使用说明，请参见 通用字段： _meta 。

Optional annotations

annotations ?: Annotations

客户端的可选注解。

data

data : string

base64编码的音频数据。

mime Type

mimeType : string

音频的MIME类型。不同的提供商可能支持不同的音频类型。

### ​ BlobResourceContents

interface BlobResourceContents {
_meta ?: { [ key : string ]: unknown } ;
blob : string ;
mimeType ?: string ;
uri : string ;
}

特定资源或子资源的内容。

Optional _ meta

_meta ?: { [ key : string ]: unknown }

有关 _meta 使用说明，请参见 通用字段： _meta 。

Inherited from ResourceContents . _meta

blob

blob : string

表示项目二进制数据的base64编码字符串。

Optional mime Type

mimeType ?: string

此资源的MIME类型（如果已知）。

Inherited from ResourceContents . mimeType

uri

uri : string

此资源的URI。

Inherited from ResourceContents . uri

### ​ BooleanSchema

interface BooleanSchema {
default ?: boolean ;
description ?: string ;
title ?: string ;
type : “boolean” ;
}

### ​ ClientCapabilities

interface ClientCapabilities {
elicitation ?: object ;
experimental ?: { [ key : string ]: object } ;
roots ?: { listChanged ?: boolean } ;
sampling ?: object ;
}

客户端可能支持的功能。这里定义了已知功能，但这不是封闭集合：任何客户端都可以定义自己的附加功能。

Optional elicitation

elicitation ?: object

如果客户端支持来自服务器的引出，则存在。

Optional experimental

experimental ?: { [ key : string ]: object }

客户端支持的实验性、非标准功能。

Optional roots

roots ?: { listChanged ?: boolean }

如果客户端支持列出根，则存在。

Type declaration

- Optional listChanged ?: boolean 客户端是否支持根列表更改的通知。

Optional sampling

sampling ?: object

如果客户端支持从LLM采样，则存在。

### ​ ContentBlock

ContentBlock :
| TextContent
| ImageContent
| AudioContent
| ResourceLink
| EmbeddedResource

### ​ Cursor

Cursor : string

用于表示分页位置的不透明令牌。

### ​ EmbeddedResource

interface EmbeddedResource {
_meta ?: { [ key : string ]: unknown } ;
annotations ?: Annotations ;
resource : TextResourceContents | BlobResourceContents ;
type : “resource” ;
}

嵌入到提示或工具调用结果中的资源内容。

由客户端决定如何最好地渲染嵌入资源以供LLM和/或用户使用。

Optional _ meta

_meta ?: { [ key : string ]: unknown }

有关 _meta 使用说明，请参见 通用字段： _meta 。

Optional annotations

annotations ?: Annotations

客户端的可选注解。

### ​ EmptyResult

EmptyResult : Result

表示成功但不携带数据的响应。

### ​ EnumSchema

interface EnumSchema {
default ?: string ;
description ?: string ;
enum : string [] ;
enumNames ?: string [] ;
title ?: string ;
type : “string” ;
}

### ​ Error

interface Error {
code : number ;
data ?: unknown ;
message : string ;
}

code

code : number

The error type that occurred.

Optional data

data ?: unknown

Additional information about the error. The value of this member is defined by the sender (e.g. detailed error information, nested errors etc.).

message

message : string

A short description of the error. The message SHOULD be limited to a concise single sentence.

### ​ Icon

interface Icon {
mimeType ?: string ;
sizes ?: string [] ;
src : string ;
theme ?: “light” | “dark” ;
}

An optionally-sized icon that can be displayed in a user interface.

Optional mime Type

mimeType ?: string

Optional MIME type override if the source MIME type is missing or generic.
For example: “image/png” , “image/jpeg” , or “image/svg+xml” .

Optional sizes

sizes ?: string []

Optional array of strings that specify sizes at which the icon can be used.
Each string should be in WxH format (e.g., “48x48” , “96x96” ) or “any” for scalable formats like SVG.

If not provided, the client should assume that the icon can be used at any size.

src

src : string

A standard URI pointing to an icon resource. May be an HTTP/HTTPS URL or a data: URI with Base64-encoded image data.

Consumers SHOULD takes steps to ensure URLs serving icons are from the
same domain as the client/server or a trusted domain.

Consumers SHOULD take appropriate precautions when consuming SVGs as they can contain
executable JavaScript.

Optional theme

theme ?: “light” | “dark”

Optional specifier for the theme this icon is designed for. light indicates
the icon is designed to be used with a light background, and dark indicates
the icon is designed to be used with a dark background.

If not provided, the client should assume the icon can be used with any theme.

### ​ ImageContent

interface ImageContent {
_meta ?: { [ key : string ]: unknown } ;
annotations ?: Annotations ;
data : string ;
mimeType : string ;
type : “image” ;
}

An image provided to or from an LLM.

Optional _ meta

_meta ?: { [ key : string ]: unknown }

See General fields: _meta for notes on _meta usage.

Optional annotations

annotations ?: Annotations

Optional annotations for the client.

data

data : string

The base64-encoded image data.

mime Type

mimeType : string

The MIME type of the image. Different providers may support different image types.

### ​ Implementation

interface Implementation {
icons ?: Icon [] ;
name : string ;
title ?: string ;
version : string ;
websiteUrl ?: string ;
}

Describes the MCP implementation

Optional icons

icons ?: Icon []

Optional set of sized icons that the client can display in a user interface.

Clients that support rendering icons MUST support at least the following MIME types:

- image/png - PNG images (safe, universal compatibility)
- image/jpeg (and image/jpg ) - JPEG images (safe, universal compatibility)
Clients that support rendering icons SHOULD also support:

- image/svg+xml - SVG images (scalable but requires security precautions)
- image/webp - WebP images (modern, efficient format)

Inherited from Icons.icons

name

name : string

Intended for programmatic or logical use, but used as a display name in past specs or fallback (if title isn’t present).

Inherited from BaseMetadata.name

Optional title

title ?: string

Intended for UI and end-user contexts — optimized to be human-readable and easily understood,
even by those unfamiliar with domain-specific terminology.

If not provided, the name should be used for display (except for Tool,
where annotations.title should be given precedence over using name ,
if present).

Inherited from BaseMetadata.title

Optional website Url

websiteUrl ?: string

An optional URL of the website for this implementation.

### ​ JSONRPCError

interface JSONRPCError {
error : Error ;
id : RequestId ;
jsonrpc : “2.0” ;
}

A response to a request that indicates an error occurred.

### ​ JSONRPCNotification

interface JSONRPCNotification {
jsonrpc : “2.0” ;
method : string ;
params ?: { _meta ?: { [ key : string ]: unknown } ; [ key : string ]: unknown } ;
}

A notification which does not expect a response.

Optional params

params ?: { _meta ?: { [ key : string ]: unknown } ; [ key : string ]: unknown }

Type declaration

- [ key : string ]: unknown
- Optional _meta ?: { [ key : string ]: unknown } See General fields: _meta for notes on _meta usage.

Inherited from Notification.params

### ​ JSONRPCRequest

interface JSONRPCRequest {
id : RequestId ;
jsonrpc : “2.0” ;
method : string ;
params ?: {
_meta ?: { progressToken ?: ProgressToken ; [ key : string ]: unknown } ;
[ key : string ]: unknown ;
} ;
}

A request that expects a response.

Optional params

params ?: {
_meta ?: { progressToken ?: ProgressToken ; [ key : string ]: unknown } ;
[ key : string ]: unknown ;
}

Type declaration

- [ key : string ]: unknown
- Optional _meta ?: { progressToken ?: ProgressToken ; [ key : string ]: unknown } See General fields: _meta for notes on _meta usage. Optional progressToken ?: ProgressToken If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.

Inherited from Request.params

### ​ JSONRPCResponse

interface JSONRPCResponse {
id : RequestId ;
jsonrpc : “2.0” ;
result : Result ;
}

A successful (non-error) response to a request.

### ​ LoggingLevel

LoggingLevel :
| “debug”
| “info”
| “notice”
| “warning”
| “error”
| “critical”
| “alert”
| “emergency”

The severity of a log message.

These map to syslog message severities, as specified in RFC-5424: https://datatracker.ietf.org/doc/html/rfc5424#section-6.2.1

### ​ ModelHint

interface ModelHint {
name ?: string ;
}

Hints to use for model selection.

Keys not declared here are currently left unspecified by the spec and are up
to the client to interpret.

Optional name

name ?: string

A hint for a model name.

The client SHOULD treat this as a substring of a model name; for example:

- claude-3-5-sonnet should match claude-3-5-sonnet-20241022
- sonnet should match claude-3-5-sonnet-20241022 , claude-3-sonnet-20240229 , etc.
- claude should match any Claude model
The client MAY also map the string to a different provider’s model name or a different model family, as long as it fills a similar niche; for example:

- gemini-1.5-flash could match claude-3-haiku-20240307

### ​ ModelPreferences

interface ModelPreferences {
costPriority ?: number ;
hints ?: ModelHint [] ;
intelligencePriority ?: number ;
speedPriority ?: number ;
}

The server’s preferences for model selection, requested of the client during sampling.

Because LLMs can vary along multiple dimensions, choosing the “best” model is
rarely straightforward. Different models excel in different areas—some are
faster but less capable, others are more capable but more expensive, and so
on. This interface allows servers to express their priorities across multiple
dimensions to help clients make an appropriate selection for their use case.

These preferences are always advisory. The client MAY ignore them. It is also
up to the client to decide how to interpret these preferences and how to
balance them against other considerations.

Optional cost Priority

costPriority ?: number

How much to prioritize cost when selecting a model. A value of 0 means cost
is not important, while a value of 1 means cost is the most important
factor.

TJS-type

number

Optional hints

hints ?: ModelHint []

Optional hints to use for model selection.

If multiple hints are specified, the client MUST evaluate them in order
(such that the first match is taken).

The client SHOULD prioritize these hints over the numeric priorities, but
MAY still use the priorities to select from ambiguous matches.

Optional intelligence Priority

intelligencePriority ?: number

How much to prioritize intelligence and capabilities when selecting a
model. A value of 0 means intelligence is not important, while a value of 1
means intelligence is the most important factor.

TJS-type

number

Optional speed Priority

speedPriority ?: number

How much to prioritize sampling speed (latency) when selecting a model. A
value of 0 means speed is not important, while a value of 1 means speed is
the most important factor.

TJS-type

number

### ​ NumberSchema

interface NumberSchema {
default ?: number ;
description ?: string ;
maximum ?: number ;
minimum ?: number ;
title ?: string ;
type : “number” | “integer” ;
}

### ​ PrimitiveSchemaDefinition

PrimitiveSchemaDefinition :
| StringSchema
| NumberSchema
| BooleanSchema
| EnumSchema

Restricted schema definitions that only allow primitive types
without nested objects or arrays.

### ​ ProgressToken

ProgressToken : string | number

A progress token, used to associate progress notifications with the original request.

### ​ Prompt

interface Prompt {
_meta ?: { [ key : string ]: unknown } ;
arguments ?: PromptArgument [] ;
description ?: string ;
icons ?: Icon [] ;
name : string ;
title ?: string ;
}

A prompt or prompt template that the server offers.

Optional _ meta

_meta ?: { [ key : string ]: unknown }

See General fields: _meta for notes on _meta usage.

Optional arguments

arguments ?: PromptArgument []

A list of arguments to use for templating the prompt.

Optional description

description ?: string

An optional description of what this prompt provides

Optional icons

icons ?: Icon []

Optional set of sized icons that the client can display in a user interface.

Clients that support rendering icons MUST support at least the following MIME types:

- image/png - PNG images (safe, universal compatibility)
- image/jpeg (and image/jpg ) - JPEG images (safe, universal compatibility)
Clients that support rendering icons SHOULD also support:

- image/svg+xml - SVG images (scalable but requires security precautions)
- image/webp - WebP images (modern, efficient format)

Inherited from Icons.icons

name

name : string

Intended for programmatic or logical use, but used as a display name in past specs or fallback (if title isn’t present).

Inherited from BaseMetadata.name

Optional title

title ?: string

Intended for UI and end-user contexts — optimized to be human-readable and easily understood,
even by those unfamiliar with domain-specific terminology.

If not provided, the name should be used for display (except for Tool,
where annotations.title should be given precedence over using name ,
if present).

Inherited from BaseMetadata.title

### ​ PromptArgument

interface PromptArgument {
description ?: string ;
name : string ;
required ?: boolean ;
title ?: string ;
}

Describes an argument that a prompt can accept.

Optional description

description ?: string

A human-readable description of the argument.

name

name : string

Intended for programmatic or logical use, but used as a display name in past specs or fallback (if title isn’t present).

Inherited from BaseMetadata.name

Optional required

required ?: boolean

Whether this argument must be provided.

Optional title

title ?: string

Intended for UI and end-user contexts — optimized to be human-readable and easily understood,
even by those unfamiliar with domain-specific terminology.

If not provided, the name should be used for display (except for Tool,
where annotations.title should be given precedence over using name ,
if present).

Inherited from BaseMetadata.title

### ​ PromptMessage

interface PromptMessage {
content : ContentBlock ;
role : Role ;
}

Describes a message returned as part of a prompt.

This is similar to SamplingMessage , but also supports the embedding of
resources from the MCP server.

### ​ PromptReference

interface PromptReference {
name : string ;
title ?: string ;
type : “ref/prompt” ;
}

Identifies a prompt.

name

name : string

Intended for programmatic or logical use, but used as a display name in past specs or fallback (if title isn’t present).

Inherited from BaseMetadata.name

Optional title

title ?: string

Intended for UI and end-user contexts — optimized to be human-readable and easily understood,
even by those unfamiliar with domain-specific terminology.

If not provided, the name should be used for display (except for Tool,
where annotations.title should be given precedence over using name ,
if present).

Inherited from BaseMetadata.title

### ​ RequestId

RequestId : string | number

A uniquely identifying ID for a request in JSON-RPC.

### ​ Resource

interface Resource {
_meta ?: { [ key : string ]: unknown } ;
annotations ?: Annotations ;
description ?: string ;
icons ?: Icon [] ;
mimeType ?: string ;
name : string ;
size ?: number ;
title ?: string ;
uri : string ;
}

A known resource that the server is capable of reading.

Optional _ meta

_meta ?: { [ key : string ]: unknown }

See General fields: _meta for notes on _meta usage.

Optional annotations

annotations ?: Annotations

Optional annotations for the client.

Optional description

description ?: string

A description of what this resource represents.

This can be used by clients to improve the LLM’s understanding of available resources. It can be thought of like a “hint” to the model.

Optional icons

icons ?: Icon []

Optional set of sized icons that the client can display in a user interface.

Clients that support rendering icons MUST support at least the following MIME types:

- image/png - PNG images (safe, universal compatibility)
- image/jpeg (and image/jpg ) - JPEG images (safe, universal compatibility)
Clients that support rendering icons SHOULD also support:

- image/svg+xml - SVG images (scalable but requires security precautions)
- image/webp - WebP images (modern, efficient format)

Inherited from Icons.icons

Optional mime Type

mimeType ?: string

The MIME type of this resource, if known.

name

name : string

Intended for programmatic or logical use, but used as a display name in past specs or fallback (if title isn’t present).

Inherited from BaseMetadata.name

Optional size

size ?: number

The size of the raw resource content, in bytes (i.e., before base64 encoding or any tokenization), if known.

This can be used by Hosts to display file sizes and estimate context window usage.

Optional title

title ?: string

Intended for UI and end-user contexts — optimized to be human-readable and easily understood,
even by those unfamiliar with domain-specific terminology.

If not provided, the name should be used for display (except for Tool,
where annotations.title should be given precedence over using name ,
if present).

Inherited from BaseMetadata.title

uri

uri : string

The URI of this resource.

### ​ ResourceContents

interface ResourceContents {
_meta ?: { [ key : string ]: unknown } ;
mimeType ?: string ;
uri : string ;
}

The contents of a specific resource or sub-resource.

Optional _ meta

_meta ?: { [ key : string ]: unknown }

See General fields: _meta for notes on _meta usage.

Optional mime Type

mimeType ?: string

The MIME type of this resource, if known.

uri

uri : string

The URI of this resource.

### ​ ResourceLink

interface ResourceLink {
_meta ?: { [ key : string ]: unknown } ;
annotations ?: Annotations ;
description ?: string ;
icons ?: Icon [] ;
mimeType ?: string ;
name : string ;
size ?: number ;
title ?: string ;
type : “resource_link” ;
uri : string ;
}

A resource that the server is capable of reading, included in a prompt or tool call result.

Note: resource links returned by tools are not guaranteed to appear in the results of resources/list requests.

Optional _ meta

_meta ?: { [ key : string ]: unknown }

See General fields: _meta for notes on _meta usage.

Inherited from Resource . _meta

Optional annotations

annotations ?: Annotations

Optional annotations for the client.

Inherited from Resource . annotations

Optional description

description ?: string

A description of what this resource represents.

This can be used by clients to improve the LLM’s understanding of available resources. It can be thought of like a “hint” to the model.

Inherited from Resource . description

Optional icons

icons ?: Icon []

Optional set of sized icons that the client can display in a user interface.

Clients that support rendering icons MUST support at least the following MIME types:

- image/png - PNG images (safe, universal compatibility)
- image/jpeg (and image/jpg ) - JPEG images (safe, universal compatibility)
Clients that support rendering icons SHOULD also support:

- image/svg+xml - SVG images (scalable but requires security precautions)
- image/webp - WebP images (modern, efficient format)

Inherited from Resource . icons

Optional mime Type

mimeType ?: string

The MIME type of this resource, if known.

Inherited from Resource . mimeType

name

name : string

Intended for programmatic or logical use, but used as a display name in past specs or fallback (if title isn’t present).

Inherited from Resource . name

Optional size

size ?: number

The size of the raw resource content, in bytes (i.e., before base64 encoding or any tokenization), if known.

This can be used by Hosts to display file sizes and estimate context window usage.

Inherited from Resource . size

Optional title

title ?: string

Intended for UI and end-user contexts — optimized to be human-readable and easily understood,
even by those unfamiliar with domain-specific terminology.

If not provided, the name should be used for display (except for Tool,
where annotations.title should be given precedence over using name ,
if present).

Inherited from Resource . title

uri

uri : string

The URI of this resource.

Inherited from Resource . uri

### ​ ResourceTemplate

interface ResourceTemplate {
_meta ?: { [ key : string ]: unknown } ;
annotations ?: Annotations ;
description ?: string ;
icons ?: Icon [] ;
mimeType ?: string ;
name : string ;
title ?: string ;
uriTemplate : string ;
}

A template description for resources available on the server.

Optional _ meta

_meta ?: { [ key : string ]: unknown }

See General fields: _meta for notes on _meta usage.

Optional annotations

annotations ?: Annotations

Optional annotations for the client.

Optional description

description ?: string

A description of what this template is for.

This can be used by clients to improve the LLM’s understanding of available resources. It can be thought of like a “hint” to the model.

Optional icons

icons ?: Icon []

Optional set of sized icons that the client can display in a user interface.

Clients that support rendering icons MUST support at least the following MIME types:

- image/png - PNG images (safe, universal compatibility)
- image/jpeg (and image/jpg ) - JPEG images (safe, universal compatibility)
Clients that support rendering icons SHOULD also support:

- image/svg+xml - SVG images (scalable but requires security precautions)
- image/webp - WebP images (modern, efficient format)

Inherited from Icons.icons

Optional mime Type

mimeType ?: string

The MIME type for all resources that match this template. This should only be included if all resources matching this template have the same type.

name

name : string

Intended for programmatic or logical use, but used as a display name in past specs or fallback (if title isn’t present).

Inherited from BaseMetadata.name

Optional title

title ?: string

Intended for UI and end-user contexts — optimized to be human-readable and easily understood,
even by those unfamiliar with domain-specific terminology.

If not provided, the name should be used for display (except for Tool,
where annotations.title should be given precedence over using name ,
if present).

Inherited from BaseMetadata.title

uri Template

uriTemplate : string

A URI template (according to RFC 6570) that can be used to construct resource URIs.

### ​ ResourceTemplateReference

interface ResourceTemplateReference {
type : “ref/resource” ;
uri : string ;
}

A reference to a resource or resource template definition.

uri

uri : string

The URI or URI template of the resource.

### ​ Result

interface Result {
_meta ?: { [ key : string ]: unknown } ;
[ key : string ]: unknown ;
}

Optional _ meta

_meta ?: { [ key : string ]: unknown }

See General fields: _meta for notes on _meta usage.

### ​ Role

Role : “user” | “assistant”

The sender or recipient of messages and data in a conversation.

### ​ Root

interface Root {
_meta ?: { [ key : string ]: unknown } ;
name ?: string ;
uri : string ;
}

Represents a root directory or file that the server can operate on.

Optional _ meta

_meta ?: { [ key : string ]: unknown }

See General fields: _meta for notes on _meta usage.

Optional name

name ?: string

An optional name for the root. This can be used to provide a human-readable
identifier for the root, which may be useful for display purposes or for
referencing the root in other parts of the application.

uri

uri : string

The URI identifying the root. This must start with file:// for now.
This restriction may be relaxed in future versions of the protocol to allow
other URI schemes.

### ​ SamplingMessage

interface SamplingMessage {
content : TextContent | ImageContent | AudioContent ;
role : Role ;
}

Describes a message issued to or received from an LLM API.

### ​ ServerCapabilities

interface ServerCapabilities {
completions ?: object ;
experimental ?: { [ key : string ]: object } ;
logging ?: object ;
prompts ?: { listChanged ?: boolean } ;
resources ?: { listChanged ?: boolean ; subscribe ?: boolean } ;
tools ?: { listChanged ?: boolean } ;
}

Capabilities that a server may support. Known capabilities are defined here, in this schema, but this is not a closed set: any server can define its own, additional capabilities.

Optional completions

completions ?: object

Present if the server supports argument autocompletion suggestions.

Optional experimental

experimental ?: { [ key : string ]: object }

Experimental, non-standard capabilities that the server supports.

Optional logging

logging ?: object

Present if the server supports sending log messages to the client.

Optional prompts

prompts ?: { listChanged ?: boolean }

Present if the server offers any prompt templates.

Type declaration

- Optional listChanged ?: boolean Whether this server supports notifications for changes to the prompt list.

Optional resources

resources ?: { listChanged ?: boolean ; subscribe ?: boolean }

Present if the server offers any resources to read.

Type declaration

- Optional listChanged ?: boolean Whether this server supports notifications for changes to the resource list.
- Optional subscribe ?: boolean Whether this server supports subscribing to resource updates.

Optional tools

tools ?: { listChanged ?: boolean }

Present if the server offers any tools to call.

Type declaration

- Optional listChanged ?: boolean Whether this server supports notifications for changes to the tool list.

### ​ StringSchema

interface StringSchema {
default ?: string ;
description ?: string ;
format ?: “uri” | “email” | “date” | “date-time” ;
maxLength ?: number ;
minLength ?: number ;
title ?: string ;
type : “string” ;
}

### ​ TextContent

interface TextContent {
_meta ?: { [ key : string ]: unknown } ;
annotations ?: Annotations ;
text : string ;
type : “text” ;
}

Text provided to or from an LLM.

Optional _ meta

_meta ?: { [ key : string ]: unknown }

See General fields: _meta for notes on _meta usage.

Optional annotations

annotations ?: Annotations

Optional annotations for the client.

text

text : string

The text content of the message.

### ​ TextResourceContents

interface TextResourceContents {
_meta ?: { [ key : string ]: unknown } ;
mimeType ?: string ;
text : string ;
uri : string ;
}

The contents of a specific resource or sub-resource.

Optional _ meta

_meta ?: { [ key : string ]: unknown }

See General fields: _meta for notes on _meta usage.

Inherited from ResourceContents . _meta

Optional mime Type

mimeType ?: string

The MIME type of this resource, if known.

Inherited from ResourceContents . mimeType

text

text : string

The text of the item. This must only be set if the item can actually be represented as text (not binary data).

uri

uri : string

The URI of this resource.

Inherited from ResourceContents . uri

### ​ Tool

interface Tool {
_meta ?: { [ key : string ]: unknown } ;
annotations ?: ToolAnnotations ;
description ?: string ;
icons ?: Icon [] ;
inputSchema : {
properties ?: { [ key : string ]: object } ;
required ?: string [] ;
type : “object” ;
} ;
name : string ;
outputSchema ?: {
properties ?: { [ key : string ]: object } ;
required ?: string [] ;
type : “object” ;
} ;
title ?: string ;
}

Definition for a tool the client can call.

Optional _ meta

_meta ?: { [ key : string ]: unknown }

See General fields: _meta for notes on _meta usage.

Optional annotations

annotations ?: ToolAnnotations

Optional additional tool information.

Display name precedence order is: title, annotations.title, then name.

Optional description

description ?: string

A human-readable description of the tool.

This can be used by clients to improve the LLM’s understanding of available tools. It can be thought of like a “hint” to the model.

Optional icons

icons ?: Icon []

Optional set of sized icons that the client can display in a user interface.

Clients that support rendering icons MUST support at least the following MIME types:

- image/png - PNG images (safe, universal compatibility)
- image/jpeg (and image/jpg ) - JPEG images (safe, universal compatibility)
Clients that support rendering icons SHOULD also support:

- image/svg+xml - SVG images (scalable but requires security precautions)
- image/webp - WebP images (modern, efficient format)

Inherited from Icons.icons

input Schema

inputSchema : {
properties ?: { [ key : string ]: object } ;
required ?: string [] ;
type : “object” ;
}

A JSON Schema object defining the expected parameters for the tool.

name

name : string

Intended for programmatic or logical use, but used as a display name in past specs or fallback (if title isn’t present).

Inherited from BaseMetadata.name

Optional output Schema

outputSchema ?: {
properties ?: { [ key : string ]: object } ;
required ?: string [] ;
type : “object” ;
}

An optional JSON Schema object defining the structure of the tool’s output returned in
the structuredContent field of a CallToolResult.

Optional title

title ?: string

Intended for UI and end-user contexts — optimized to be human-readable and easily understood,
even by those unfamiliar with domain-specific terminology.

If not provided, the name should be used for display (except for Tool,
where annotations.title should be given precedence over using name ,
if present).

Inherited from BaseMetadata.title

### ​ ToolAnnotations

interface ToolAnnotations {
destructiveHint ?: boolean ;
idempotentHint ?: boolean ;
openWorldHint ?: boolean ;
readOnlyHint ?: boolean ;
title ?: string ;
}

Additional properties describing a Tool to clients.

NOTE: all properties in ToolAnnotations are hints .
They are not guaranteed to provide a faithful description of
tool behavior (including descriptive properties like title ).

Clients should never make tool use decisions based on ToolAnnotations
received from untrusted servers.

Optional destructive Hint

destructiveHint ?: boolean

If true, the tool may perform destructive updates to its environment.
If false, the tool performs only additive updates.

(This property is meaningful only when readOnlyHint == false )

Default: true

Optional idempotent Hint

idempotentHint ?: boolean

If true, calling the tool repeatedly with the same arguments
will have no additional effect on its environment.

(This property is meaningful only when readOnlyHint == false )

Default: false

Optional open World Hint

openWorldHint ?: boolean

If true, this tool may interact with an “open world” of external
entities. If false, the tool’s domain of interaction is closed.
For example, the world of a web search tool is open, whereas that
of a memory tool is not.

Default: true

Optional read Only Hint

readOnlyHint ?: boolean

If true, the tool does not modify its environment.

Default: false

Optional title

title ?: string

A human-readable title for the tool.

## ​ completion/complete

### ​ CompleteRequest

interface CompleteRequest {
id : RequestId ;
jsonrpc : “2.0” ;
method : “completion/complete” ;
params : {
argument : { name : string ; value : string } ;
context ?: { arguments ?: { [ key : string ]: string } } ;
ref : PromptReference | ResourceTemplateReference ;
} ;
}

A request from the client to the server, to ask for completion options.

params

params : {
argument : { name : string ; value : string } ;
context ?: { arguments ?: { [ key : string ]: string } } ;
ref : PromptReference | ResourceTemplateReference ;
}

Type declaration

- argument : { name : string ; value : string } The argument’s information name : string The name of the argument
- value : string The value of the argument to use for completion matching.
- Optional context ?: { arguments ?: { [ key : string ]: string } } Additional, optional context for completions Optional arguments ?: { [ key : string ]: string } Previously-resolved variables in a URI template or prompt.
- ref : PromptReference | ResourceTemplateReference

Overrides JSONRPCRequest . params

### ​ CompleteResult

interface CompleteResult {
_meta ?: { [ key : string ]: unknown } ;
completion : { hasMore ?: boolean ; total ?: number ; values : string [] } ;
[ key : string ]: unknown ;
}

The server’s response to a completion/complete request

Optional _ meta

_meta ?: { [ key : string ]: unknown }

See General fields: _meta for notes on _meta usage.

Inherited from Result . _meta

completion

completion : { hasMore ?: boolean ; total ?: number ; values : string [] }

Type declaration

- Optional hasMore ?: boolean Indicates whether there are additional completion options beyond those provided in the current response, even if the exact total is unknown.
- Optional total ?: number The total number of completion options available. This can exceed the number of values actually sent in the response.
- values : string [] An array of completion values. Must not exceed 100 items.

## ​ elicitation/create

### ​ ElicitRequest

interface ElicitRequest {
id : RequestId ;
jsonrpc : “2.0” ;
method : “elicitation/create” ;
params : {
message : string ;
requestedSchema : {
properties : { [ key : string ]: PrimitiveSchemaDefinition } ;
required ?: string [] ;
type : “object” ;
} ;
} ;
}

A request from the server to elicit additional information from the user via the client.

params

params : {
message : string ;
requestedSchema : {
properties : { [ key : string ]: PrimitiveSchemaDefinition } ;
required ?: string [] ;
type : “object” ;
} ;
}

Type declaration

- message : string The message to present to the user.
- requestedSchema : { properties : { [ key : string ]: PrimitiveSchemaDefinition } ; required ?: string [] ; type : “object” ; } A restricted subset of JSON Schema. Only top-level properties are allowed, without nesting.

Overrides JSONRPCRequest . params

### ​ ElicitResult

interface ElicitResult {
_meta ?: { [ key : string ]: unknown } ;
action : “accept” | “decline” | “cancel” ;
content ?: { [ key : string ]: string | number | boolean } ;
[ key : string ]: unknown ;
}

The client’s response to an elicitation request.

Optional _ meta

_meta ?: { [ key : string ]: unknown }

See General fields: _meta for notes on _meta usage.

Inherited from Result . _meta

action

action : “accept” | “decline” | “cancel”

The user action in response to the elicitation.

- “accept”: User submitted the form/confirmed the action
- “decline”: User explicitly decline the action
- “cancel”: User dismissed without making an explicit choice

Optional content

content ?: { [ key : string ]: string | number | boolean }

The submitted form data, only present when action is “accept”.
Contains values matching the requested schema.

## ​ initialize

### ​ InitializeRequest

interface InitializeRequest {
id : RequestId ;
jsonrpc : “2.0” ;
method : “initialize” ;
params : {
capabilities : ClientCapabilities ;
clientInfo : Implementation ;
protocolVersion : string ;
} ;
}

This request is sent from the client to the server when it first connects, asking it to begin initialization.

params

params : {
capabilities : ClientCapabilities ;
clientInfo : Implementation ;
protocolVersion : string ;
}

Type declaration

- capabilities : ClientCapabilities
- clientInfo : Implementation
- protocolVersion : string The latest version of the Model Context Protocol that the client supports. The client MAY decide to support older versions as well.

Overrides JSONRPCRequest . params

### ​ InitializeResult

interface InitializeResult {
_meta ?: { [ key : string ]: unknown } ;
capabilities : ServerCapabilities ;
instructions ?: string ;
protocolVersion : string ;
serverInfo : Implementation ;
[ key : string ]: unknown ;
}

After receiving an initialize request from the client, the server sends this response.

Optional _ meta

_meta ?: { [ key : string ]: unknown }

See General fields: _meta for notes on _meta usage.

Inherited from Result . _meta

Optional instructions

instructions ?: string

Instructions describing how to use the server and its features.

This can be used by clients to improve the LLM’s understanding of available tools, resources, etc. It can be thought of like a “hint” to the model. For example, this information MAY be added to the system prompt.

protocol Version

protocolVersion : string

The version of the Model Context Protocol that the server wants to use. This may not match the version that the client requested. If the client cannot support this version, it MUST disconnect.

## ​ logging/setLevel

### ​ SetLevelRequest

interface SetLevelRequest {
id : RequestId ;
jsonrpc : “2.0” ;
method : “logging/setLevel” ;
params : { level : LoggingLevel } ;
}

A request from the client to the server, to enable or adjust logging.

params

params : { level : LoggingLevel }

Type declaration

- level : LoggingLevel The level of logging that the client wants to receive from the server. The server should send all logs at this level and higher (i.e., more severe) to the client as notifications/message.

Overrides JSONRPCRequest . params

## ​ notifications/cancelled

### ​ CancelledNotification

interface CancelledNotification {
jsonrpc : “2.0” ;
method : “notifications/cancelled” ;
params : { reason ?: string ; requestId : RequestId } ;
}

This notification can be sent by either side to indicate that it is cancelling a previously-issued request.

The request SHOULD still be in-flight, but due to communication latency, it is always possible that this notification MAY arrive after the request has already finished.

This notification indicates that the result will be unused, so any associated processing SHOULD cease.

A client MUST NOT attempt to cancel its initialize request.

params

params : { reason ?: string ; requestId : RequestId }

Type declaration

- Optional reason ?: string An optional string describing the reason for the cancellation. This MAY be logged or presented to the user.
- requestId : RequestId The ID of the request to cancel. This MUST correspond to the ID of a request previously issued in the same direction.

Overrides JSONRPCNotification . params

## ​ notifications/initialized

### ​ InitializedNotification

interface InitializedNotification {
jsonrpc : “2.0” ;
method : “notifications/initialized” ;
params ?: { _meta ?: { [ key : string ]: unknown } ; [ key : string ]: unknown } ;
}

This notification is sent from the client to the server after initialization has finished.

Optional params

params ?: { _meta ?: { [ key : string ]: unknown } ; [ key : string ]: unknown }

Type declaration

- [ key : string ]: unknown
- Optional _meta ?: { [ key : string ]: unknown } See General fields: _meta for notes on _meta usage.

Inherited from JSONRPCNotification . params

## ​ notifications/message

### ​ LoggingMessageNotification

interface LoggingMessageNotification {
jsonrpc : “2.0” ;
method : “notifications/message” ;
params : { data : unknown ; level : LoggingLevel ; logger ?: string } ;
}

JSONRPCNotification of a log message passed from server to client. If no logging/setLevel request has been sent from the client, the server MAY decide which messages to send automatically.

params

params : { data : unknown ; level : LoggingLevel ; logger ?: string }

Type declaration

- data : unknown The data to be logged, such as a string message or an object. Any JSON serializable type is allowed here.
- level : LoggingLevel The severity of this log message.
- Optional logger ?: string An optional name of the logger issuing this message.

Overrides JSONRPCNotification . params

## ​ notifications/progress

### ​ ProgressNotification

interface ProgressNotification {
jsonrpc : “2.0” ;
method : “notifications/progress” ;
params : {
message ?: string ;
progress : number ;
progressToken : ProgressToken ;
total ?: number ;
} ;
}

An out-of-band notification used to inform the receiver of a progress update for a long-running request.

params

params : {
message ?: string ;
progress : number ;
progressToken : ProgressToken ;
total ?: number ;
}

Type declaration

- Optional message ?: string An optional message describing the current progress.
- progress : number The progress thus far. This should increase every time progress is made, even if the total is unknown. TJS-type number
- progressToken : ProgressToken The progress token which was given in the initial request, used to associate this notification with the request that is proceeding.
- Optional total ?: number Total number of items to process (or total progress required), if known. TJS-type number

Overrides JSONRPCNotification . params

## ​ notifications/prompts/list_changed

### ​ PromptListChangedNotification

interface PromptListChangedNotification {
jsonrpc : “2.0” ;
method : “notifications/prompts/list_changed” ;
params ?: { _meta ?: { [ key : string ]: unknown } ; [ key : string ]: unknown } ;
}

An optional notification from the server to the client, informing it that the list of prompts it offers has changed. This may be issued by servers without any previous subscription from the client.

Optional params

params ?: { _meta ?: { [ key : string ]: unknown } ; [ key : string ]: unknown }

Type declaration

- [ key : string ]: unknown
- Optional _meta ?: { [ key : string ]: unknown } See General fields: _meta for notes on _meta usage.

Inherited from JSONRPCNotification . params

## ​ notifications/resources/list_changed

### ​ ResourceListChangedNotification

interface ResourceListChangedNotification {
jsonrpc : “2.0” ;
method : “notifications/resources/list_changed” ;
params ?: { _meta ?: { [ key : string ]: unknown } ; [ key : string ]: unknown } ;
}

An optional notification from the server to the client, informing it that the list of resources it can read from has changed. This may be issued by servers without any previous subscription from the client.

Optional params

params ?: { _meta ?: { [ key : string ]: unknown } ; [ key : string ]: unknown }

Type declaration

- [ key : string ]: unknown
- Optional _meta ?: { [ key : string ]: unknown } See General fields: _meta for notes on _meta usage.

Inherited from JSONRPCNotification . params

## ​ notifications/resources/updated

### ​ ResourceUpdatedNotification

interface ResourceUpdatedNotification {
jsonrpc : “2.0” ;
method : “notifications/resources/updated” ;
params : { uri : string } ;
}

A notification from the server to the client, informing it that a resource has changed and may need to be read again. This should only be sent if the client previously sent a resources/subscribe request.

params

params : { uri : string }

Type declaration

- uri : string The URI of the resource that has been updated. This might be a sub-resource of the one that the client actually subscribed to.

Overrides JSONRPCNotification . params

## ​ notifications/roots/list_changed

### ​ RootsListChangedNotification

interface RootsListChangedNotification {
jsonrpc : “2.0” ;
method : “notifications/roots/list_changed” ;
params ?: { _meta ?: { [ key : string ]: unknown } ; [ key : string ]: unknown } ;
}

A notification from the client to the server, informing it that the list of roots has changed.
This notification should be sent whenever the client adds, removes, or modifies any root.
The server should then request an updated list of roots using the ListRootsRequest.

Optional params

params ?: { _meta ?: { [ key : string ]: unknown } ; [ key : string ]: unknown }

Type declaration

- [ key : string ]: unknown
- Optional _meta ?: { [ key : string ]: unknown } See General fields: _meta for notes on _meta usage.

Inherited from JSONRPCNotification . params

## ​ notifications/tools/list_changed

### ​ ToolListChangedNotification

interface ToolListChangedNotification {
jsonrpc : “2.0” ;
method : “notifications/tools/list_changed” ;
params ?: { _meta ?: { [ key : string ]: unknown } ; [ key : string ]: unknown } ;
}

An optional notification from the server to the client, informing it that the list of tools it offers has changed. This may be issued by servers without any previous subscription from the client.

Optional params

params ?: { _meta ?: { [ key : string ]: unknown } ; [ key : string ]: unknown }

Type declaration

- [ key : string ]: unknown
- Optional _meta ?: { [ key : string ]: unknown } See General fields: _meta for notes on _meta usage.

Inherited from JSONRPCNotification . params

## ​ ping

### ​ PingRequest

interface PingRequest {
id : RequestId ;
jsonrpc : “2.0” ;
method : “ping” ;
params ?: {
_meta ?: { progressToken ?: ProgressToken ; [ key : string ]: unknown } ;
[ key : string ]: unknown ;
} ;
}

A ping, issued by either the server or the client, to check that the other party is still alive. The receiver must promptly respond, or else may be disconnected.

Optional params

params ?: {
_meta ?: { progressToken ?: ProgressToken ; [ key : string ]: unknown } ;
[ key : string ]: unknown ;
}

Type declaration

- [ key : string ]: unknown
- Optional _meta ?: { progressToken ?: ProgressToken ; [ key : string ]: unknown } See General fields: _meta for notes on _meta usage. Optional progressToken ?: ProgressToken If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.

Inherited from JSONRPCRequest . params

## ​ prompts/get

### ​ GetPromptRequest

interface GetPromptRequest {
id : RequestId ;
jsonrpc : “2.0” ;
method : “prompts/get” ;
params : { arguments ?: { [ key : string ]: string } ; name : string } ;
}

Used by the client to get a prompt provided by the server.

params

params : { arguments ?: { [ key : string ]: string } ; name : string }

Type declaration

- Optional arguments ?: { [ key : string ]: string } Arguments to use for templating the prompt.
- name : string The name of the prompt or prompt template.

Overrides JSONRPCRequest . params

### ​ GetPromptResult

interface GetPromptResult {
_meta ?: { [ key : string ]: unknown } ;
description ?: string ;
messages : PromptMessage [] ;
[ key : string ]: unknown ;
}

The server’s response to a prompts/get request from the client.

Optional _ meta

_meta ?: { [ key : string ]: unknown }

See General fields: _meta for notes on _meta usage.

Inherited from Result . _meta

Optional description

description ?: string

An optional description for the prompt.

## ​ prompts/list

### ​ ListPromptsRequest

interface ListPromptsRequest {
id : RequestId ;
jsonrpc : “2.0” ;
method : “prompts/list” ;
params ?: { cursor ?: string } ;
}

Sent from the client to request a list of prompts and prompt templates the server has.

Optional params

params ?: { cursor ?: string }

Type declaration

- Optional cursor ?: string An opaque token representing the current pagination position. If provided, the server should return results starting after this cursor.

Inherited from PaginatedRequest.params

### ​ ListPromptsResult

interface ListPromptsResult {
_meta ?: { [ key : string ]: unknown } ;
nextCursor ?: string ;
prompts : Prompt [] ;
[ key : string ]: unknown ;
}

The server’s response to a prompts/list request from the client.

Optional _ meta

_meta ?: { [ key : string ]: unknown }

See General fields: _meta for notes on _meta usage.

Inherited from PaginatedResult._meta

Optional next Cursor

nextCursor ?: string

An opaque token representing the pagination position after the last returned result.
If present, there may be more results available.

Inherited from PaginatedResult.nextCursor

## ​ resources/list

### ​ ListResourcesRequest

interface ListResourcesRequest {
id : RequestId ;
jsonrpc : “2.0” ;
method : “resources/list” ;
params ?: { cursor ?: string } ;
}

Sent from the client to request a list of resources the server has.

Optional params

params ?: { cursor ?: string }

Type declaration

- Optional cursor ?: string An opaque token representing the current pagination position. If provided, the server should return results starting after this cursor.

Inherited from PaginatedRequest.params

### ​ ListResourcesResult

interface ListResourcesResult {
_meta ?: { [ key : string ]: unknown } ;
nextCursor ?: string ;
resources : Resource [] ;
[ key : string ]: unknown ;
}

The server’s response to a resources/list request from the client.

Optional _ meta

_meta ?: { [ key : string ]: unknown }

See General fields: _meta for notes on _meta usage.

Inherited from PaginatedResult._meta

Optional next Cursor

nextCursor ?: string

An opaque token representing the pagination position after the last returned result.
If present, there may be more results available.

Inherited from PaginatedResult.nextCursor

## ​ resources/read

### ​ ReadResourceRequest

interface ReadResourceRequest {
id : RequestId ;
jsonrpc : “2.0” ;
method : “resources/read” ;
params : { uri : string } ;
}

Sent from the client to the server, to read a specific resource URI.

params

params : { uri : string }

Type declaration

- uri : string The URI of the resource to read. The URI can use any protocol; it is up to the server how to interpret it.

Overrides JSONRPCRequest . params

### ​ ReadResourceResult

interface ReadResourceResult {
_meta ?: { [ key : string ]: unknown } ;
contents : ( TextResourceContents | BlobResourceContents ) [] ;
[ key : string ]: unknown ;
}

The server’s response to a resources/read request from the client.

Optional _ meta

_meta ?: { [ key : string ]: unknown }

See General fields: _meta for notes on _meta usage.

Inherited from Result . _meta

## ​ resources/subscribe

### ​ SubscribeRequest

interface SubscribeRequest {
id : RequestId ;
jsonrpc : “2.0” ;
method : “resources/subscribe” ;
params : { uri : string } ;
}

Sent from the client to request resources/updated notifications from the server whenever a particular resource changes.

params

params : { uri : string }

Type declaration

- uri : string The URI of the resource to subscribe to. The URI can use any protocol; it is up to the server how to interpret it.

Overrides JSONRPCRequest . params

## ​ resources/templates/list

### ​ ListResourceTemplatesRequest

interface ListResourceTemplatesRequest {
id : RequestId ;
jsonrpc : “2.0” ;
method : “resources/templates/list” ;
params ?: { cursor ?: string } ;
}

Sent from the client to request a list of resource templates the server has.

Optional params

params ?: { cursor ?: string }

Type declaration

- Optional cursor ?: string An opaque token representing the current pagination position. If provided, the server should return results starting after this cursor.

Inherited from PaginatedRequest.params

### ​ ListResourceTemplatesResult

interface ListResourceTemplatesResult {
_meta ?: { [ key : string ]: unknown } ;
nextCursor ?: string ;
resourceTemplates : ResourceTemplate [] ;
[ key : string ]: unknown ;
}

The server’s response to a resources/templates/list request from the client.

Optional _ meta

_meta ?: { [ key : string ]: unknown }

See General fields: _meta for notes on _meta usage.

Inherited from PaginatedResult._meta

Optional next Cursor

nextCursor ?: string

An opaque token representing the pagination position after the last returned result.
If present, there may be more results available.

Inherited from PaginatedResult.nextCursor

## ​ resources/unsubscribe

### ​ UnsubscribeRequest

interface UnsubscribeRequest {
id : RequestId ;
jsonrpc : “2.0” ;
method : “resources/unsubscribe” ;
params : { uri : string } ;
}

Sent from the client to request cancellation of resources/updated notifications from the server. This should follow a previous resources/subscribe request.

params

params : { uri : string }

Type declaration

- uri : string The URI of the resource to unsubscribe from.

Overrides JSONRPCRequest . params

## ​ roots/list

### ​ ListRootsRequest

interface ListRootsRequest {
id : RequestId ;
jsonrpc : “2.0” ;
method : “roots/list” ;
params ?: {
_meta ?: { progressToken ?: ProgressToken ; [ key : string ]: unknown } ;
[ key : string ]: unknown ;
} ;
}

Sent from the server to request a list of root URIs from the client. Roots allow
servers to ask for specific directories or files to operate on. A common example
for roots is providing a set of repositories or directories a server should operate
on.

This request is typically used when the server needs to understand the file system
structure or access specific locations that the client has permission to read from.

Optional params

params ?: {
_meta ?: { progressToken ?: ProgressToken ; [ key : string ]: unknown } ;
[ key : string ]: unknown ;
}

Type declaration

- [ key : string ]: unknown
- Optional _meta ?: { progressToken ?: ProgressToken ; [ key : string ]: unknown } See General fields: _meta for notes on _meta usage. Optional progressToken ?: ProgressToken If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.

Inherited from JSONRPCRequest . params

### ​ ListRootsResult

interface ListRootsResult {
_meta ?: { [ key : string ]: unknown } ;
roots : Root [] ;
[ key : string ]: unknown ;
}

The client’s response to a roots/list request from the server.
This result contains an array of Root objects, each representing a root directory
or file that the server can operate on.

Optional _ meta

_meta ?: { [ key : string ]: unknown }

See General fields: _meta for notes on _meta usage.

Inherited from Result . _meta

## ​ sampling/createMessage

### ​ CreateMessageRequest

interface CreateMessageRequest {
id : RequestId ;
jsonrpc : “2.0” ;
method : “sampling/createMessage” ;
params : {
includeContext ?: “none” | “thisServer” | “allServers” ;
maxTokens : number ;
messages : SamplingMessage [] ;
metadata ?: object ;
modelPreferences ?: ModelPreferences ;
stopSequences ?: string [] ;
systemPrompt ?: string ;
temperature ?: number ;
} ;
}

A request from the server to sample an LLM via the client. The client has full discretion over which model to select. The client should also inform the user before beginning sampling, to allow them to inspect the request (human in the loop) and decide whether to approve it.

params

params : {
includeContext ?: “none” | “thisServer” | “allServers” ;
maxTokens : number ;
messages : SamplingMessage [] ;
metadata ?: object ;
modelPreferences ?: ModelPreferences ;
stopSequences ?: string [] ;
systemPrompt ?: string ;
temperature ?: number ;
}

Type declaration

- Optional includeContext ?: “none” | “thisServer” | “allServers” A request to include context from one or more MCP servers (including the caller), to be attached to the prompt. The client MAY ignore this request.
- maxTokens : number The requested maximum number of tokens to sample (to prevent runaway completions). The client MAY choose to sample fewer tokens than the requested maximum.
- messages : SamplingMessage []
- Optional metadata ?: object Optional metadata to pass through to the LLM provider. The format of this metadata is provider-specific.
- Optional modelPreferences ?: ModelPreferences The server’s preferences for which model to select. The client MAY ignore these preferences.
- Optional stopSequences ?: string []
- Optional systemPrompt ?: string An optional system prompt the server wants to use for sampling. The client MAY modify or omit this prompt.
- Optional temperature ?: number TJS-type number

Overrides JSONRPCRequest . params

### ​ CreateMessageResult

interface CreateMessageResult {
_meta ?: { [ key : string ]: unknown } ;
content : TextContent | ImageContent | AudioContent ;
model : string ;
role : Role ;
stopReason ?: string ;
[ key : string ]: unknown ;
}

The client’s response to a sampling/create_message request from the server. The client should inform the user before returning the sampled message, to allow them to inspect the response (human in the loop) and decide whether to allow the server to see it.

Optional _ meta

_meta ?: { [ key : string ]: unknown }

See General fields: _meta for notes on _meta usage.

Inherited from Result . _meta

model

model : string

The name of the model that generated the message.

Optional stop Reason

stopReason ?: string

The reason why sampling stopped, if known.

## ​ tools/call

### ​ CallToolRequest

interface CallToolRequest {
id : RequestId ;
jsonrpc : “2.0” ;
method : “tools/call” ;
params : { arguments ?: { [ key : string ]: unknown } ; name : string } ;
}

Used by the client to invoke a tool provided by the server.

### ​ CallToolResult

interface CallToolResult {
_meta ?: { [ key : string ]: unknown } ;
content : ContentBlock [] ;
isError ?: boolean ;
structuredContent ?: { [ key : string ]: unknown } ;
[ key : string ]: unknown ;
}

The server’s response to a tool call.

Optional _ meta

_meta ?: { [ key : string ]: unknown }

See General fields: _meta for notes on _meta usage.

Inherited from Result . _meta

content

content : ContentBlock []

A list of content objects that represent the unstructured result of the tool call.

Optional is Error

isError ?: boolean

Whether the tool call ended in an error.

If not set, this is assumed to be false (the call was successful).

Any errors that originate from the tool SHOULD be reported inside the result
object, with isError set to true, not as an MCP protocol-level error
response. Otherwise, the LLM would not be able to see that an error occurred
and self-correct.

However, any errors in finding the tool, an error indicating that the
server does not support tool calls, or any other exceptional conditions,
should be reported as an MCP error response.

Optional structured Content

structuredContent ?: { [ key : string ]: unknown }

An optional JSON object that represents the structured result of the tool call.

## ​ tools/list

### ​ ListToolsRequest

interface ListToolsRequest {
id : RequestId ;
jsonrpc : “2.0” ;
method : “tools/list” ;
params ?: { cursor ?: string } ;
}

Sent from the client to request a list of tools the server has.

Optional params

params ?: { cursor ?: string }

Type declaration

- Optional cursor ?: string An opaque token representing the current pagination position. If provided, the server should return results starting after this cursor.

Inherited from PaginatedRequest.params

### ​ ListToolsResult

interface ListToolsResult {
_meta ?: { [ key : string ]: unknown } ;
nextCursor ?: string ;
tools : Tool [] ;
[ key : string ]: unknown ;
}

The server’s response to a tools/list request from the client.

Optional _ meta

_meta ?: { [ key : string ]: unknown }

See General fields: _meta for notes on _meta usage.

Inherited from PaginatedResult._meta

Optional next Cursor

nextCursor ?: string

An opaque token representing the pagination position after the last returned result.
If present, there may be more results available.

Inherited from PaginatedResult.nextCursor

分页

⌘ I

github

Powered by This documentation is built and hosted on Mintlify, a developer documentation platform
