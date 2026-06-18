# 构建 MCP 服务器 - Model Context Protocol

Source: https://mcp.gjxx.dev/docs/develop/build-server
Friendly site: MCP中文文档
Group: GJXX.DEV
Fetched: 2026-06-18T02:27:24.616Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 开始构建您自己的服务器，用于 Claude for Desktop 和其他客户端。

## Content

## On this page

- 我们将构建什么
- 核心 MCP 概念
- What’s happening under the hood
- Troubleshooting
- Next steps

开发者指南

# 构建 MCP 服务器

Copy page

开始构建您自己的服务器，用于 Claude for Desktop 和其他客户端。

Copy page

在本教程中，我们将构建一个简单的 MCP 天气服务器并将其连接到主机 Claude for Desktop。

### ​ 我们将构建什么

我们将构建一个服务器，暴露两个工具： get_alerts 和 get_forecast 。然后我们将服务器连接到 MCP 主机（在本例中是 Claude for Desktop）：

服务器可以连接到任何客户端。我们在这里选择 Claude for Desktop 是为了简单起见，但我们也有关于 构建您自己的客户端 的指南以及 此处其他客户端的列表 。

### ​ 核心 MCP 概念

MCP 服务器可以提供三种主要类型的功能：

- 资源 ：客户端可以读取的文件式数据（如 API 响应或文件内容）

- 工具 ：LLM 可以调用的函数（需要用户批准）

- 提示 ：帮助用户完成特定任务的预写模板

本教程将主要关注工具。

- Python
- Node
- Java
- Kotlin
- C#

让我们开始构建我们的天气服务器！ 您可以在此处找到我们将构建的完整代码。

### ​ 先决知识

此快速入门假设您熟悉：

- Python

- Claude 等 LLM

### ​ MCP 服务器中的日志记录

在实现 MCP 服务器时，请注意如何处理日志记录： 对于基于 STDIO 的服务器： 永远不要写入标准输出（stdout）。这包括：

- Python 中的 print() 语句

- console.log() in JavaScript

- fmt.Println() in Go

- Similar stdout functions in other languages
Writing to stdout will corrupt the JSON-RPC messages and break your server. For HTTP-based servers: Standard output logging is fine since it doesn’t interfere with HTTP responses.

### ​ Best Practices

- 使用写入 stderr 或文件的日志库。

- 工具名称应遵循 此处 指定的格式。

### ​ Quick Examples

# ❌ Bad (STDIO)
print ( "Processing request" )

# ✅ Good (STDIO)
import logging
logging.info( "Processing request" )

### ​ System requirements

- 已安装 Python 3.10 或更高版本。

- 您必须使用 Python MCP SDK 1.2.0 或更高版本。

### ​ Set up your environment

首先，让我们安装 uv 并设置我们的 Python 项目和环境：

macOS/Linux

Windows

curl -LsSf https://astral.sh/uv/install.sh | sh

之后请确保重启终端，以确保 uv 命令被识别。 现在，让我们创建并设置项目：

macOS/Linux

Windows

# 为我们的项目创建一个新目录
uv init weather
cd weather

# 创建虚拟环境并激活它
uv venv
source .venv/bin/activate

# 安装依赖
uv add "mcp[cli]" httpx

# 创建我们的服务器文件
touch weather.py

现在让我们深入构建您的服务器。

## ​ Building your server

### ​ Importing packages and setting up the instance

将这些添加到您的 weather.py 顶部：

from typing import Any
import httpx
from mcp.server.fastmcp import FastMCP

# Initialize FastMCP server
mcp = FastMCP( "weather" )

# Constants
NWS_API_BASE = "https://api.weather.gov"
USER_AGENT = "weather-app/1.0"

FastMCP 类使用 Python 类型提示和文档字符串来自动生成工具定义，使创建和维护 MCP 工具变得容易。

### ​ Helper functions

接下来，让我们添加用于查询和格式化美国国家气象局 API 数据的辅助函数：

async def make_nws_request ( url : str ) -> dict[ str , Any] | None :
"""Make a request to the NWS API with proper error handling."""
headers = {
"User-Agent" : USER_AGENT ,
"Accept" : "application/geo+json"
}
async with httpx.AsyncClient() as client:
try :
response = await client.get(url, headers = headers, timeout = 30.0 )
response.raise_for_status()
return response.json()
except Exception :
return None

def format_alert ( feature : dict ) -> str :
"""Format an alert feature into a readable string."""
props = feature[ "properties" ]
return f """
Event: { props.get( 'event' , 'Unknown' ) }
Area: { props.get( 'areaDesc' , 'Unknown' ) }
Severity: { props.get( 'severity' , 'Unknown' ) }
Description: { props.get( 'description' , 'No description available' ) }
Instructions: { props.get( 'instruction' , 'No specific instructions provided' ) }
"""

### ​ Implementing tool execution

工具执行处理器负责实际执行每个工具的逻辑。让我们添加它：

@mcp.tool ()
async def get_alerts ( state : str ) -> str :
"""Get weather alerts for a US state.

Args:
state: Two-letter US state code (e.g. CA, NY)
"""
url = f " { NWS_API_BASE } /alerts/active/area/ { state } "
data = await make_nws_request(url)

if not data or "features" not in data:
return "Unable to fetch alerts or no alerts found."

if not data[ "features" ]:
return "No active alerts for this state."

alerts = [format_alert(feature) for feature in data[ "features" ]]
return " \n --- \n " .join(alerts)

@mcp.tool ()
async def get_forecast ( latitude : float , longitude : float ) -> str :
"""Get weather forecast for a location.

Args:
latitude: Latitude of the location
longitude: Longitude of the location
"""
# First get the forecast grid endpoint
points_url = f " { NWS_API_BASE } /points/ { latitude } , { longitude } "
points_data = await make_nws_request(points_url)

if not points_data:
return "Unable to fetch forecast data for this location."

# Get the forecast URL from the points response
forecast_url = points_data[ "properties" ][ "forecast" ]
forecast_data = await make_nws_request(forecast_url)

if not forecast_data:
return "Unable to fetch detailed forecast."

# Format the periods into a readable forecast
periods = forecast_data[ "properties" ][ "periods" ]
forecasts = []
for period in periods[: 5 ]: # Only show next 5 periods
forecast = f """
{ period[ 'name' ] } :
Temperature: { period[ 'temperature' ] } ° { period[ 'temperatureUnit' ] }
Wind: { period[ 'windSpeed' ] } { period[ 'windDirection' ] }
Forecast: { period[ 'detailedForecast' ] }
"""
forecasts.append(forecast)

return " \n --- \n " .join(forecasts)

### ​ Running the server

最后，让我们初始化并运行服务器：

def main ():
# Initialize and run the server
mcp.run( transport = 'stdio' )

if __name__ == "__main__" :
main()

您的服务器完成了！运行 uv run weather.py 来启动 MCP 服务器，它将监听来自 MCP 主机的消息。 现在让我们使用现有的 MCP 主机 Claude for Desktop 来测试您的服务器。

## ​ Testing your server with Claude for Desktop

Claude for Desktop 尚未在 Linux 上可用。Linux 用户可以继续进行 构建客户端 教程来构建连接到我们刚构建的服务器的 MCP 客户端。

首先，确保您已安装 Claude for Desktop。 您可以在此处安装最新版本。 如果您已经安装了 Claude for Desktop， 请确保它已更新到最新版本。 我们需要为要使用的任何 MCP 服务器配置 Claude for Desktop。为此，请在文本编辑器中打开您的 Claude for Desktop 应用程序配置，位于 ~/Library/Application Support/Claude/claude_desktop_config.json 。如果文件不存在，请确保创建它。 例如，如果您安装了 VS Code ：

macOS/Linux

Windows

code ~/Library/Application \ Support/Claude/claude_desktop_config.json

然后，您将在 mcpServers 键中添加您的服务器。只有在至少配置了一个服务器时，MCP UI 元素才会显示在 Claude for Desktop 中。 在这种情况下，我们将像这样添加我们的单个天气服务器：

macOS/Linux

Windows

{
"mcpServers" : {
"weather" : {
"command" : "uv" ,
"args" : [
"--directory" ,
"/ABSOLUTE/PATH/TO/PARENT/FOLDER/weather" ,
"run" ,
"weather.py"
]
}
}
}

您可能需要在 command 字段中放置 uv 可执行文件的完整路径。您可以通过运行 which uv 在 macOS/Linux 上或 where uv 在 Windows 上获取此路径。

确保传入服务器的绝对路径。您可以通过运行 pwd 在 macOS/Linux 上或 cd 在 Windows 命令提示符上获取此路径。在 Windows 上，请记住要在 JSON 路径中使用双反斜杠 ( \\ ) 或正斜杠 ( / )。

这告诉 Claude for Desktop：

- 有一个名为 “weather” 的 MCP 服务器

- 通过运行 uv --directory /ABSOLUTE/PATH/TO/PARENT/FOLDER/weather run weather.py 来启动它
保存文件，然后重新启动 Claude for Desktop 。

让我们开始构建我们的天气服务器！ 您可以在此处找到我们将构建的完整代码。

### ​ Prerequisite knowledge

此快速入门假设您熟悉：

- TypeScript

- Claude 等 LLM

### ​ Logging in MCP Servers

在实现 MCP 服务器时，请注意如何处理日志记录： 对于基于 STDIO 的服务器： 永远不要写入标准输出（stdout）。这包括：

- Python 中的 print() 语句

- JavaScript 中的 console.log()

- Go 中的 fmt.Println()

- 其他语言中类似的 stdout 函数
写入 stdout 将破坏 JSON-RPC 消息并破坏您的服务器。 对于基于 HTTP 的服务器： 标准输出日志记录是可以的，因为它不会干扰 HTTP 响应。

### ​ Best Practices

- 使用写入 stderr 或文件的日志库，例如 Python 中的 logging 。

- 对于 JavaScript，请特别小心 - console.log() 默认写入 stdout

### ​ Quick Examples

// ❌ Bad (STDIO)
console . log ( "Server started" );

// ✅ Good (STDIO)
console . error ( "Server started" ); // stderr is safe

### ​ System requirements

对于 TypeScript，请确保安装了最新版本的 Node。

### ​ Set up your environment

首先，如果您还没有安装 Node.js 和 npm，请从 nodejs.org 下载它们。
验证您的 Node.js 安装：

node --version
npm --version

对于本教程，您需要 Node.js 版本 16 或更高版本。 现在，让我们创建并设置项目：

macOS/Linux

Windows

# 为我们的项目创建一个新目录
mkdir weather
cd weather

# 初始化一个新的 npm 项目
npm init -y

# 安装依赖
npm install @modelcontextprotocol/sdk zod@3
npm install -D @types/node typescript

# 创建我们的文件
mkdir src
touch src/index.ts

更新您的 package.json 以添加 type: “module” 和构建脚本：

package.json

{
"type" : "module" ,
"bin" : {
"weather" : "./build/index.js"
},
"scripts" : {
"build" : "tsc && chmod 755 build/index.js"
},
"files" : [ "build" ]
}

在项目的根目录中创建 tsconfig.json ：

tsconfig.json

{
"compilerOptions" : {
"target" : "ES2022" ,
"module" : "Node16" ,
"moduleResolution" : "Node16" ,
"outDir" : "./build" ,
"rootDir" : "./src" ,
"strict" : true ,
"esModuleInterop" : true ,
"skipLibCheck" : true ,
"forceConsistentCasingInFileNames" : true
},
"include" : [ "src/**/*" ],
"exclude" : [ "node_modules" ]
}

现在让我们深入构建您的服务器。

## ​ Building your server

### ​ Importing packages and setting up the instance

将这些添加到您的 src/index.ts 顶部：

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js" ;
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js" ;
import { z } from "zod" ;

const NWS_API_BASE = "https://api.weather.gov" ;
const USER_AGENT = "weather-app/1.0" ;

// Create server instance
const server = new McpServer ({
name: "weather" ,
version: "1.0.0" ,
capabilities: {
resources: {},
tools: {},
},
});

### ​ Helper functions

接下来，让我们添加用于查询和格式化美国国家气象局 API 数据的辅助函数：

// Helper function for making NWS API requests
async function makeNWSRequest < T >( url : string ) : Promise < T | null > {
const headers = {
"User-Agent" : USER_AGENT ,
Accept: "application/geo+json" ,
};

try {
const response = await fetch ( url , { headers });
if ( ! response . ok ) {
throw new Error ( `HTTP error! status: ${ response . status } ` );
}
return ( await response . json ()) as T ;
} catch ( error ) {
console . error ( "Error making NWS request:" , error );
return null ;
}
}

interface AlertFeature {
properties : {
event ?: string ;
areaDesc ?: string ;
severity ?: string ;
status ?: string ;
headline ?: string ;
};
}

// Format alert data
function formatAlert ( feature : AlertFeature ) : string {
const props = feature . properties ;
return [
`Event: ${ props . event || "Unknown" } ` ,
`Area: ${ props . areaDesc || "Unknown" } ` ,
`Severity: ${ props . severity || "Unknown" } ` ,
`Status: ${ props . status || "Unknown" } ` ,
`Headline: ${ props . headline || "No headline" } ` ,
"---" ,
]. join ( " \n " );
}

interface ForecastPeriod {
name ?: string ;
temperature ?: number ;
temperatureUnit ?: string ;
windSpeed ?: string ;
windDirection ?: string ;
shortForecast ?: string ;
}

interface AlertsResponse {
features : AlertFeature [];
}

interface PointsResponse {
properties : {
forecast ?: string ;
};
}

interface ForecastResponse {
properties : {
periods : ForecastPeriod [];
};
}

### ​ Implementing tool execution

工具执行处理器负责实际执行每个工具的逻辑。让我们添加它：

// Register weather tools
server . tool (
"get_alerts" ,
"Get weather alerts for a state" ,
{
state: z . string (). length ( 2 ). describe ( "Two-letter state code (e.g. CA, NY)" ),
},
async ({ state }) => {
const stateCode = state . toUpperCase ();
const alertsUrl = ` ${ NWS_API_BASE } /alerts?area= ${ stateCode } ` ;
const alertsData = await makeNWSRequest < AlertsResponse >( alertsUrl );

if ( ! alertsData ) {
return {
content: [
{
type: "text" ,
text: "Failed to retrieve alerts data" ,
},
],
};
}

const features = alertsData . features || [];
if ( features . length === 0 ) {
return {
content: [
{
type: "text" ,
text: `No active alerts for ${ stateCode } ` ,
},
],
};
}

const formattedAlerts = features . map ( formatAlert );
const alertsText = `Active alerts for ${ stateCode } : \n\n ${ formattedAlerts . join ( " \n " ) } ` ;

return {
content: [
{
type: "text" ,
text: alertsText ,
},
],
};
},
);

server . tool (
"get_forecast" ,
"Get weather forecast for a location" ,
{
latitude: z . number (). min ( - 90 ). max ( 90 ). describe ( "Latitude of the location" ),
longitude: z
. number ()
. min ( - 180 )
. max ( 180 )
. describe ( "Longitude of the location" ),
},
async ({ latitude , longitude }) => {
// Get grid point data
const pointsUrl = ` ${ NWS_API_BASE } /points/ ${ latitude . toFixed ( 4 ) } , ${ longitude . toFixed ( 4 ) } ` ;
const pointsData = await makeNWSRequest < PointsResponse >( pointsUrl );

if ( ! pointsData ) {
return {
content: [
{
type: "text" ,
text: `Failed to retrieve grid point data for coordinates: ${ latitude } , ${ longitude } . This location may not be supported by the NWS API (only US locations are supported).` ,
},
],
};
}

const forecastUrl = pointsData . properties ?. forecast ;
if ( ! forecastUrl ) {
return {
content: [
{
type: "text" ,
text: "Failed to get forecast URL from grid point data" ,
},
],
};
}

// Get forecast data
const forecastData = await makeNWSRequest < ForecastResponse >( forecastUrl );
if ( ! forecastData ) {
return {
content: [
{
type: "text" ,
text: "Failed to retrieve forecast data" ,
},
],
};
}

const periods = forecastData . properties ?. periods || [];
if ( periods . length === 0 ) {
return {
content: [
{
type: "text" ,
text: "No forecast periods available" ,
},
],
};
}

// Format forecast periods
const formattedForecast = periods . map (( period : ForecastPeriod ) =>
[
` ${ period . name || "Unknown" } :` ,
`Temperature: ${ period . temperature || "Unknown" } ° ${ period . temperatureUnit || "F" } ` ,
`Wind: ${ period . windSpeed || "Unknown" } ${ period . windDirection || "" } ` ,
` ${ period . shortForecast || "No forecast available" } ` ,
"---" ,
]. join ( " \n " ),
);

const forecastText = `Forecast for ${ latitude } , ${ longitude } : \n\n ${ formattedForecast . join ( " \n " ) } ` ;

return {
content: [
{
type: "text" ,
text: forecastText ,
},
],
};
},
);

### ​ Running the server

最后，实现运行服务器的主函数：

async function main () {
const transport = new StdioServerTransport ();
await server . connect ( transport );
console . error ( "Weather MCP Server running on stdio" );
}

main (). catch (( error ) => {
console . error ( "Fatal error in main():" , error );
process . exit ( 1 );
});

确保运行 npm run build 来构建您的服务器！这是让您的服务器连接的重要步骤。 现在让我们使用现有的 MCP 主机 Claude for Desktop 来测试您的服务器。

## ​ Testing your server with Claude for Desktop

Claude for Desktop 尚未在 Linux 上可用。Linux 用户可以继续进行 构建客户端 教程来构建连接到我们刚构建的服务器的 MCP 客户端。

首先，确保您已安装 Claude for Desktop。 您可以在此处安装最新版本。 如果您已经安装了 Claude for Desktop， 请确保它已更新到最新版本。 我们需要为要使用的任何 MCP 服务器配置 Claude for Desktop。为此，请在文本编辑器中打开您的 Claude for Desktop 应用程序配置，位于 ~/Library/Application Support/Claude/claude_desktop_config.json 。如果文件不存在，请确保创建它。 例如，如果您安装了 VS Code ：

macOS/Linux

Windows

code ~/Library/Application \ Support/Claude/claude_desktop_config.json

然后，您将在 mcpServers 键中添加您的服务器。只有在至少配置了一个服务器时，MCP UI 元素才会显示在 Claude for Desktop 中。 在这种情况下，我们将像这样添加我们的单个天气服务器：

macOS/Linux

Windows

{
"mcpServers" : {
"weather" : {
"command" : "node" ,
"args" : [ "/ABSOLUTE/PATH/TO/PARENT/FOLDER/weather/build/index.js" ]
}
}
}

这告诉 Claude for Desktop：

- 有一个名为 “weather” 的 MCP 服务器

- 通过运行 node /ABSOLUTE/PATH/TO/PARENT/FOLDER/weather/build/index.js 来启动它
保存文件，然后重新启动 Claude for Desktop 。

这是基于 Spring AI MCP 自动配置和引导启动器的快速入门演示。
要学习如何手动创建同步和异步 MCP 服务器，请查阅 Java SDK Server 文档。

让我们开始构建我们的天气服务器！
您可以在此处找到我们将构建的完整代码。 有关更多信息，请参阅 MCP Server Boot Starter 参考文档。
对于手动 MCP 服务器实现，请参阅 MCP Server Java SDK 文档 。

### ​ Logging in MCP Servers

在实现 MCP 服务器时，请注意如何处理日志记录： 对于基于 STDIO 的服务器： 永远不要写入标准输出（stdout）。这包括：

- Python 中的 print() 语句

- JavaScript 中的 console.log()

- Go 中的 fmt.Println()

- 其他语言中类似的 stdout 函数
写入 stdout 将破坏 JSON-RPC 消息并破坏您的服务器。 对于基于 HTTP 的服务器： 标准输出日志记录是可以的，因为它不会干扰 HTTP 响应。

### ​ Best Practices

- 使用写入 stderr 或文件的日志库。

- 确保任何配置的日志库不会写入 STDOUT

### ​ System requirements

- 已安装 Java 17 或更高版本。

- Spring Boot 3.3.x 或更高版本

### ​ Set up your environment

使用 Spring Initializer 来引导项目。 您需要添加以下依赖：

Maven

Gradle

< dependencies >
< dependency >
< groupId > org.springframework.ai </ groupId >
< artifactId > spring-ai-starter-mcp-server </ artifactId >
</ dependency >

< dependency >
< groupId > org.springframework </ groupId >
< artifactId > spring-web </ artifactId >
</ dependency >
</ dependencies >

然后通过设置应用程序属性来配置您的应用程序：

application.properties

application.yml

spring.main.bannerMode =off
logging.pattern.console =

服务器配置属性 记录了所有可用属性。 现在让我们深入构建您的服务器。

## ​ Building your server

### ​ Weather Service

让我们实现一个 WeatherService.java ，它使用 REST 客户端从美国国家气象局 API 查询数据：

@ Service
public class WeatherService {

private final RestClient restClient ;

public WeatherService () {
this . restClient = RestClient . builder ()
. baseUrl ( "https://api.weather.gov" )
. defaultHeader ( "Accept" , "application/geo+json" )
. defaultHeader ( "User-Agent" , "WeatherApiClient/1.0 (your@email.com)" )
. build ();
}

@ Tool ( description = "Get weather forecast for a specific latitude/longitude" )
public String getWeatherForecastByLocation (
double latitude , // Latitude coordinate
double longitude // Longitude coordinate
) {
// Returns detailed forecast including:
// - Temperature and unit
// - Wind speed and direction
// - Detailed forecast description
}

@ Tool ( description = "Get weather alerts for a US state" )
public String getAlerts (
@ ToolParam ( description = "Two-letter US state code (e.g. CA, NY)" ) String state
) {
// Returns active alerts including:
// - Event type
// - Affected area
// - Severity
// - Description
// - Safety instructions
}

// ......
}

@Service 注解将自动在您的应用程序上下文中注册服务。
Spring AI @Tool 注解，使创建和维护 MCP 工具变得容易。 自动配置将自动使用 MCP 服务器注册这些工具。

### ​ Create your Boot Application

@ SpringBootApplication
public class McpServerApplication {

public static void main ( String [] args ) {
SpringApplication . run ( McpServerApplication . class , args);
}

@ Bean
public ToolCallbackProvider weatherTools ( WeatherService weatherService ) {
return MethodToolCallbackProvider . builder (). toolObjects (weatherService). build ();
}
}

使用 MethodToolCallbackProvider 工具将 @Tools 转换为 MCP 服务器使用的可操作回调。

### ​ Running the server

最后，让我们构建服务器：

./mvnw clean install

这将在 target 文件夹中生成一个 mcp-weather-stdio-server-0.0.1-SNAPSHOT.jar 文件。 现在让我们使用现有的 MCP 主机 Claude for Desktop 来测试您的服务器。

## ​ Testing your server with Claude for Desktop

Claude for Desktop 尚未在 Linux 上可用。

首先，确保您已安装 Claude for Desktop。
您可以在此处安装最新版本。 如果您已经安装了 Claude for Desktop， 请确保它已更新到最新版本。 我们需要为要使用的任何 MCP 服务器配置 Claude for Desktop。
为此，请在文本编辑器中打开您的 Claude for Desktop 应用程序配置，位于 ~/Library/Application Support/Claude/claude_desktop_config.json 。
如果文件不存在，请确保创建它。 例如，如果您安装了 VS Code ：

macOS/Linux

Windows

code ~/Library/Application \ Support/Claude/claude_desktop_config.json

然后，您将在 mcpServers 键中添加您的服务器。
只有在至少配置了一个服务器时，MCP UI 元素才会显示在 Claude for Desktop 中。 在这种情况下，我们将像这样添加我们的单个天气服务器：

macOS/Linux

Windows

{
"mcpServers" : {
"spring-ai-mcp-weather" : {
"command" : "java" ,
"args" : [
"-Dspring.ai.mcp.server.stdio=true" ,
"-jar" ,
"/ABSOLUTE/PATH/TO/PARENT/FOLDER/mcp-weather-stdio-server-0.0.1-SNAPSHOT.jar"
]
}
}
}

确保传入服务器的绝对路径。

这告诉 Claude for Desktop：

- 有一个名为 “my-weather-server” 的 MCP 服务器

- 通过运行 java -jar /ABSOLUTE/PATH/TO/PARENT/FOLDER/mcp-weather-stdio-server-0.0.1-SNAPSHOT.jar 来启动它
保存文件，然后重新启动 Claude for Desktop 。

## ​ Testing your server with Java client

### ​ Create an MCP Client manually

使用 McpClient 连接到服务器：

var stdioParams = ServerParameters . builder ( "java" )
. args ( "-jar" , "/ABSOLUTE/PATH/TO/PARENT/FOLDER/mcp-weather-stdio-server-0.0.1-SNAPSHOT.jar" )
. build ();

var stdioTransport = new StdioClientTransport (stdioParams);

var mcpClient = McpClient . sync (stdioTransport). build ();

mcpClient . initialize ();

ListToolsResult toolsList = mcpClient . listTools ();

CallToolResult weather = mcpClient . callTool (
new CallToolRequest ( "getWeatherForecastByLocation" ,
Map . of ( "latitude" , "47.6062" , "longitude" , "-122.3321" )));

CallToolResult alert = mcpClient . callTool (
new CallToolRequest ( "getAlerts" , Map . of ( "state" , "NY" )));

mcpClient . closeGracefully ();

### ​ Use MCP Client Boot Starter

使用 spring-ai-starter-mcp-client 依赖创建一个新的引导启动器应用程序：

< dependency >
< groupId > org.springframework.ai </ groupId >
< artifactId > spring-ai-starter-mcp-client </ artifactId >
</ dependency >

并设置 spring.ai.mcp.client.stdio.servers-configuration 属性指向您的 claude_desktop_config.json 。
您可以重用现有的 Anthropic Desktop 配置：

spring.ai.mcp.client.stdio.servers-configuration =file:PATH/TO/claude_desktop_config.json

当您启动客户端应用程序时，自动配置将从 claude_desktop_config.json 自动创建 MCP 客户端。 有关更多信息，请参阅 MCP Client Boot Starters 参考文档。

## ​ More Java MCP Server examples

starter-webflux-server 演示了如何使用 SSE 传输创建 MCP 服务器。
它展示了如何使用 Spring Boot 的自动配置功能定义和注册 MCP 工具、资源和提示。

让我们开始构建我们的天气服务器！ 您可以在此处找到我们将构建的完整代码。

### ​ Prerequisite knowledge

此快速入门假设您熟悉：

- Kotlin

- Claude 等 LLM

### ​ System requirements

- 已安装 Java 17 或更高版本。

### ​ Set up your environment

首先，如果您还没有安装 java 和 gradle ，请安装它们。
您可以从 官方 Oracle JDK 网站 下载 java 。
验证您的 java 安装：

java --version

现在，让我们创建并设置项目：

macOS/Linux

Windows

# 为我们的项目创建一个新目录
mkdir weather
cd weather

# 初始化一个新的 kotlin 项目
gradle init

运行 gradle init 后，您将看到创建项目的选项。
选择 Application 作为项目类型， Kotlin 作为编程语言， Java 17 作为 Java 版本。 或者，您可以使用 IntelliJ IDEA 项目向导 创建 Kotlin 应用程序。 创建项目后，添加以下依赖：

build.gradle.kts

build.gradle

val mcpVersion = "0.4.0"
val slf4jVersion = "2.0.9"
val ktorVersion = "3.1.1"

dependencies {
implementation ( "io.modelcontextprotocol:kotlin-sdk: $mcpVersion " )
implementation ( "org.slf4j:slf4j-nop: $slf4jVersion " )
implementation ( "io.ktor:ktor-client-content-negotiation: $ktorVersion " )
implementation ( "io.ktor:ktor-serialization-kotlinx-json: $ktorVersion " )
}

还要将以下插件添加到您的构建脚本中：

build.gradle.kts

build.gradle

plugins {
kotlin ( "plugin.serialization" ) version "your_version_of_kotlin"
id ( "com.github.johnrengelman.shadow" ) version "8.1.1"
}

现在让我们深入构建您的服务器。

## ​ Building your server

### ​ Setting up the instance

添加服务器初始化函数：

// Main function to run the MCP server
fun `run mcp server` () {
// Create the MCP Server instance with a basic implementation
val server = Server (
Implementation (
name = "weather" , // Tool name is "weather"
version = "1.0.0" // Version of the implementation
),
ServerOptions (
capabilities = ServerCapabilities (tools = ServerCapabilities. Tools (listChanged = true ))
)
)

// Create a transport using standard IO for server communication
val transport = StdioServerTransport (
System.` in `. asInput (),
System.out. asSink (). buffered ()
)

runBlocking {
server. connect (transport)
val done = Job ()
server. onClose {
done. complete ()
}
done. join ()
}
}

### ​ Weather API helper functions

接下来，让我们添加用于查询和转换美国国家气象局 API 响应的函数和数据类：

// Extension function to fetch forecast information for given latitude and longitude
suspend fun HttpClient . getForecast (latitude: Double , longitude: Double ): List < String > {
val points = this . get ( "/points/ $latitude , $longitude " ). body < Points >()
val forecast = this . get (points.properties.forecast). body < Forecast >()
return forecast.properties.periods. map { period ->
"""
${ period.name } :
Temperature: ${ period.temperature } ${ period.temperatureUnit }
Wind: ${ period.windSpeed } ${ period.windDirection }
Forecast: ${ period.detailedForecast }
""" . trimIndent ()
}
}

// Extension function to fetch weather alerts for a given state
suspend fun HttpClient . getAlerts (state: String ): List < String > {
val alerts = this . get ( "/alerts/active/area/ $state " ). body < Alert >()
return alerts.features. map { feature ->
"""
Event: ${ feature.properties.event }
Area: ${ feature.properties.areaDesc }
Severity: ${ feature.properties.severity }
Description: ${ feature.properties.description }
Instruction: ${ feature.properties.instruction }
""" . trimIndent ()
}
}

@Serializable
data class Points (
val properties: Properties
) {
@Serializable
data class Properties ( val forecast: String )
}

@Serializable
data class Forecast (
val properties: Properties
) {
@Serializable
data class Properties ( val periods: List < Period >)

@Serializable
data class Period (
val number: Int , val name: String , val startTime: String , val endTime: String ,
val isDaytime: Boolean , val temperature: Int , val temperatureUnit: String ,
val temperatureTrend: String , val probabilityOfPrecipitation: JsonObject ,
val windSpeed: String , val windDirection: String ,
val shortForecast: String , val detailedForecast: String ,
)
}

@Serializable
data class Alert (
val features: List < Feature >
) {
@Serializable
data class Feature (
val properties: Properties
)

@Serializable
data class Properties (
val event: String , val areaDesc: String , val severity: String ,
val description: String , val instruction: String ?,
)
}

### ​ Implementing tool execution

工具执行处理器负责实际执行每个工具的逻辑。让我们添加它：

// Create an HTTP client with a default request configuration and JSON content negotiation
val httpClient = HttpClient {
defaultRequest {
url ( "https://api.weather.gov" )
headers {
append ( "Accept" , "application/geo+json" )
append ( "User-Agent" , "WeatherApiClient/1.0" )
}
contentType (ContentType.Application.Json)
}
// Install content negotiation plugin for JSON serialization/deserialization
install (ContentNegotiation) { json ( Json { ignoreUnknownKeys = true }) }
}

// Register a tool to fetch weather alerts by state
server. addTool (
name = "get_alerts" ,
description = """
Get weather alerts for a US state. Input is Two-letter US state code (e.g. CA, NY)
""" . trimIndent (),
inputSchema = Tool. Input (
properties = buildJsonObject {
putJsonObject ( "state" ) {
put ( "type" , "string" )
put ( "description" , "Two-letter US state code (e.g. CA, NY)" )
}
},
required = listOf ( "state" )
)
) { request ->
val state = request.arguments[ "state" ]?.jsonPrimitive?.content
if (state == null ) {
return @addTool CallToolResult (
content = listOf ( TextContent ( "The 'state' parameter is required." ))
)
}

val alerts = httpClient. getAlerts (state)

CallToolResult (content = alerts. map { TextContent (it) })
}

// Register a tool to fetch weather forecast by latitude and longitude
server. addTool (
name = "get_forecast" ,
description = """
Get weather forecast for a specific latitude/longitude
""" . trimIndent (),
inputSchema = Tool. Input (
properties = buildJsonObject {
putJsonObject ( "latitude" ) { put ( "type" , "number" ) }
putJsonObject ( "longitude" ) { put ( "type" , "number" ) }
},
required = listOf ( "latitude" , "longitude" )
)
) { request ->
val latitude = request.arguments[ "latitude" ]?.jsonPrimitive?.doubleOrNull
val longitude = request.arguments[ "longitude" ]?.jsonPrimitive?.doubleOrNull
if (latitude == null || longitude == null ) {
return @addTool CallToolResult (
content = listOf ( TextContent ( "The 'latitude' and 'longitude' parameters are required." ))
)
}

val forecast = httpClient. getForecast (latitude, longitude)

CallToolResult (content = forecast. map { TextContent (it) })
}

### ​ Running the server

最后，实现运行服务器的主函数：

fun main () = `run mcp server` ()

确保运行 ./gradlew build 来构建您的服务器。这是让您的服务器连接的重要步骤。 现在让我们使用现有的 MCP 主机 Claude for Desktop 来测试您的服务器。

## ​ Testing your server with Claude for Desktop

Claude for Desktop 尚未在 Linux 上可用。Linux 用户可以继续进行 构建客户端 教程来构建连接到我们刚构建的服务器的 MCP 客户端。

首先，确保您已安装 Claude for Desktop。 您可以在此处安装最新版本。 如果您已经安装了 Claude for Desktop， 请确保它已更新到最新版本。 我们需要为要使用的任何 MCP 服务器配置 Claude for Desktop。
To do this, open your Claude for Desktop App configuration at ~/Library/Application Support/Claude/claude_desktop_config.json in a text editor.
如果文件不存在，请确保创建它。 例如，如果您安装了 VS Code ：

macOS/Linux

Windows

code ~/Library/Application \ Support/Claude/claude_desktop_config.json

然后，您将在 mcpServers 键中添加您的服务器。
只有在至少配置了一个服务器时，MCP UI 元素才会显示在 Claude for Desktop 中。 在这种情况下，我们将像这样添加我们的单个天气服务器：

macOS/Linux

Windows

{
"mcpServers" : {
"weather" : {
"command" : "java" ,
"args" : [
"-jar" ,
"/ABSOLUTE/PATH/TO/PARENT/FOLDER/weather/build/libs/weather-0.1.0-all.jar"
]
}
}
}

这告诉 Claude for Desktop：

- 有一个名为 “weather” 的 MCP 服务器

- 通过运行 java -jar /ABSOLUTE/PATH/TO/PARENT/FOLDER/weather/build/libs/weather-0.1.0-all.jar 来启动它
保存文件，然后重新启动 Claude for Desktop 。

让我们开始构建我们的天气服务器！ 您可以在此处找到我们将构建的完整代码。

### ​ Prerequisite knowledge

此快速入门假设您熟悉：

- C#

- Claude 等 LLM

- .NET 8 或更高版本

### ​ Logging in MCP Servers

在实现 MCP 服务器时，请注意如何处理日志记录： 对于基于 STDIO 的服务器： 永远不要写入标准输出（stdout）。这包括：

- Python 中的 print() 语句

- JavaScript 中的 console.log()

- Go 中的 fmt.Println()

- 其他语言中类似的 stdout 函数
写入 stdout 将破坏 JSON-RPC 消息并破坏您的服务器。 对于基于 HTTP 的服务器： 标准输出日志记录是可以的，因为它不会干扰 HTTP 响应。

### ​ Best Practices

- 使用写入 stderr 或文件的日志库

### ​ System requirements

- 已安装 .NET 8 SDK 或更高版本。

### ​ Set up your environment

首先，如果您还没有安装 dotnet ，请安装它。您可以从 官方 Microsoft .NET 网站 下载 dotnet 。验证您的 dotnet 安装：

dotnet --version

现在，让我们创建并设置项目：

macOS/Linux

Windows

# 为我们的项目创建一个新目录
mkdir weather
cd weather
# 初始化一个新的 C# 项目
dotnet new console

运行 dotnet new console 后，您将看到一个新的 C# 项目。
您可以在您喜欢的 IDE 中打开项目，例如 Visual Studio 或 Rider 。
或者，您可以使用 Visual Studio 项目向导 创建 C# 应用程序。
创建项目后，添加 Model Context Protocol SDK 和托管的 NuGet 包：

# 添加 Model Context Protocol SDK NuGet 包
dotnet add package ModelContextProtocol --prerelease
# 添加 .NET Hosting NuGet 包
dotnet add package Microsoft.Extensions.Hosting

现在让我们深入构建您的服务器。

## ​ Building your server

在您的项目中打开 Program.cs 文件，并将其内容替换为以下代码：

using Microsoft . Extensions . DependencyInjection ;
using Microsoft . Extensions . Hosting ;
using ModelContextProtocol ;
using System . Net . Http . Headers ;

var builder = Host . CreateEmptyApplicationBuilder ( settings : null );

builder . Services . AddMcpServer ()
. WithStdioServerTransport ()
. WithToolsFromAssembly ();

builder . Services . AddSingleton ( _ =>
{
var client = new HttpClient () { BaseAddress = new Uri ( "https://api.weather.gov" ) };
client . DefaultRequestHeaders . UserAgent . Add ( new ProductInfoHeaderValue ( "weather-tool" , "1.0" ));
return client ;
});

var app = builder . Build ();

await app . RunAsync ();

创建 ApplicationHostBuilder 时，请确保使用 CreateEmptyApplicationBuilder 而不是 CreateDefaultBuilder 。这确保服务器不会向控制台写入任何额外消息。这仅对使用 STDIO 传输的服务器是必需的。

此代码设置了一个基本的控制台应用程序，使用 Model Context Protocol SDK 创建具有标准 I/O 传输的 MCP 服务器。

### ​ Weather API helper functions

为 HttpClient 创建一个扩展类，帮助简化 JSON 请求处理：

using System . Text . Json ;

internal static class HttpClientExt
{
public static async Task < JsonDocument > ReadJsonDocumentAsync ( this HttpClient client , string requestUri )
{
using var response = await client . GetAsync ( requestUri );
response . EnsureSuccessStatusCode ();
return await JsonDocument . ParseAsync ( await response . Content . ReadAsStreamAsync ());
}
}

接下来，定义一个带有工具执行处理器的类，用于查询和转换美国国家气象局 API 的响应：

using ModelContextProtocol . Server ;
using System . ComponentModel ;
using System . Globalization ;
using System . Text . Json ;

namespace QuickstartWeatherServer . Tools ;

[ McpServerToolType ]
public static class WeatherTools
{
[ McpServerTool , Description ( "Get weather alerts for a US state." )]
public static async Task < string > GetAlerts (
HttpClient client ,
[ Description ( "The US state to get alerts for." )] string state )
{
using var jsonDocument = await client . ReadJsonDocumentAsync ( $"/alerts/active/area/{ state }" );
var jsonElement = jsonDocument . RootElement ;
var alerts = jsonElement . GetProperty ( "features" ). EnumerateArray ();

if ( ! alerts . Any ())
{
return "No active alerts for this state." ;
}

return string . Join ( " \n -- \n " , alerts . Select ( alert =>
{
JsonElement properties = alert . GetProperty ( "properties" );
return $"""
Event: { properties . GetProperty ("event"). GetString ()}
Area: { properties . GetProperty ("areaDesc"). GetString ()}
Severity: { properties . GetProperty ("severity"). GetString ()}
Description: { properties . GetProperty ("description"). GetString ()}
Instruction: { properties . GetProperty ("instruction"). GetString ()}
""" ;
}));
}

[ McpServerTool , Description ( "Get weather forecast for a location." )]
public static async Task < string > GetForecast (
HttpClient client ,
[ Description ( "Latitude of the location." )] double latitude ,
[ Description ( "Longitude of the location." )] double longitude )
{
var pointUrl = string . Create ( CultureInfo . InvariantCulture , $"/points/{ latitude },{ longitude }" );
using var jsonDocument = await client . ReadJsonDocumentAsync ( pointUrl );
var forecastUrl = jsonDocument . RootElement . GetProperty ( "properties" ). GetProperty ( "forecast" ). GetString ()
?? throw new Exception ( $"No forecast URL provided by { client . BaseAddress }points/{ latitude },{ longitude }" );

using var forecastDocument = await client . ReadJsonDocumentAsync ( forecastUrl );
var periods = forecastDocument . RootElement . GetProperty ( "properties" ). GetProperty ( "periods" ). EnumerateArray ();

return string . Join ( " \n --- \n " , periods . Select ( period => $"""
{ period . GetProperty ("name"). GetString ()}
Temperature: { period . GetProperty ("temperature"). GetInt32 ()}°F
Wind: { period . GetProperty ("windSpeed"). GetString ()} { period . GetProperty ("windDirection"). GetString ()}
Forecast: { period . GetProperty ("detailedForecast"). GetString ()}
""" ));
}
}

### ​ Running the server

最后，使用以下命令运行服务器：

dotnet run

这将启动服务器并在标准输入/输出上监听传入请求。

## ​ Testing your server with Claude for Desktop

Claude for Desktop 尚未在 Linux 上可用。Linux 用户可以继续进行 构建客户端 教程来构建连接到我们刚构建的服务器的 MCP 客户端。

首先，确保您已安装 Claude for Desktop。 您可以在此处安装最新版本。 如果您已经安装了 Claude for Desktop， 请确保它已更新到最新版本。
我们需要为要使用的任何 MCP 服务器配置 Claude for Desktop。为此，请在文本编辑器中打开您的 Claude for Desktop 应用程序配置，位于 ~/Library/Application Support/Claude/claude_desktop_config.json 。如果文件不存在，请确保创建它。
例如，如果您安装了 VS Code ：

macOS/Linux

Windows

code ~/Library/Application \ Support/Claude/claude_desktop_config.json

然后，您将在 mcpServers 键中添加您的服务器。只有在至少配置了一个服务器时，MCP UI 元素才会显示在 Claude for Desktop 中。
在这种情况下，我们将像这样添加我们的单个天气服务器：

macOS/Linux

Windows

{
"mcpServers" : {
"weather" : {
"command" : "dotnet" ,
"args" : [ "run" , "--project" , "/ABSOLUTE/PATH/TO/PROJECT" , "--no-build" ]
}
}
}

这告诉 Claude for Desktop：

- 有一个名为 “weather” 的 MCP 服务器

- 通过运行 dotnet run /ABSOLUTE/PATH/TO/PROJECT 来启动它 保存文件，然后重新启动 Claude for Desktop 。

### ​ Test with commands

让我们确保 Claude for Desktop 正在获取我们在 weather 服务器中暴露的两个工具。您可以通过查找 “Search and tools” 图标来做到这一点：

点击滑块图标后，您应该看到两个工具列出：

如果您的服务器没有被 Claude for Desktop 获取，请继续进行 故障排除 部分以获取调试提示。
如果工具设置图标已显示，您现在可以通过在 Claude for Desktop 中运行以下命令来测试您的服务器：

- 萨克拉门托的天气怎么样？

- 德克萨斯州有哪些活跃的天气警报？

由于这是美国国家气象服务，查询将仅适用于美国地点。

## ​ What’s happening under the hood

当您提出问题时：

- 客户端将您的问题发送给 Claude

- Claude 分析可用的工具并决定使用哪些工具

- 客户端通过 MCP 服务器执行选定的工具

- 结果被发送回 Claude

- Claude 制定自然语言响应

- 响应显示给您！

## ​ Troubleshooting

Claude for Desktop Integration Issues

Getting logs from Claude for Desktop Claude.app 与 MCP 相关的日志记录写入 ~/Library/Logs/Claude 中的日志文件：

- mcp.log 将包含关于 MCP 连接和连接失败的一般日志记录。

- 名为 mcp-server-SERVERNAME.log 的文件将包含来自命名服务器的错误（stderr）日志记录。
您可以运行以下命令来列出最近的日志并跟随任何新的日志：

# 检查 Claude 的日志是否有错误
tail -n 20 -f ~/Library/Logs/Claude/mcp * .log

Server not showing up in Claude

- 检查您的 claude_desktop_config.json 文件语法

- 确保项目路径是绝对路径而不是相对路径

- 完全重新启动 Claude for Desktop

要正确重新启动 Claude for Desktop，您必须完全退出应用程序：

- Windows ：右键单击系统托盘中的 Claude 图标（可能隐藏在”隐藏图标”菜单中）并选择”退出”或”退出”。

- macOS ：使用 Cmd+Q 或从菜单栏选择”退出 Claude”。
仅关闭窗口不会完全退出应用程序，您的 MCP 服务器配置更改不会生效。

Tool calls failing silently 如果 Claude 尝试使用工具但失败：

- 检查 Claude 的日志是否有错误

- 验证您的服务器构建和运行没有错误

- 尝试重新启动 Claude for Desktop
None of this is working. What do I do? 请参考我们的 调试指南 以获取更好的调试工具和更详细的指导。

Weather API Issues

Error: Failed to retrieve grid point data 这通常意味着：

- 坐标在美国以外

- NWS API 有问题

- 您被限制速率
修复：

- 验证您使用的是美国坐标

- 在请求之间添加小延迟

- 检查 NWS API 状态页面
Error: No active alerts for [STATE] 这不是错误 - 它只是意味着该州目前没有天气警报。尝试不同的州或在恶劣天气期间检查。

有关更高级的故障排除，请查看我们的 调试 MCP 指南

## ​ Next steps

## Building a client

学习如何构建可以连接到您的服务器的自己的 MCP 客户端

## Example servers

查看我们的官方 MCP 服务器和实现画廊

## Debugging Guide

学习如何有效地调试 MCP 服务器和集成

## Building MCP with LLMs

学习如何使用 Claude 等 LLM 来加速您的 MCP 开发

连接到远程 MCP 服务器 构建 MCP 客户端

⌘ I

github

Powered by This documentation is built and hosted on Mintlify, a developer documentation platform
