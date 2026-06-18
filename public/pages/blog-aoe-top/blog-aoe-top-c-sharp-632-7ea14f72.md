# 使用VS Code 编译C# 为DLL | 小莫的博客园

Source: https://blog.aoe.top/C-Sharp/632
Friendly site: 小莫博客园
Group: AOE.TOP
Fetched: 2026-06-18T02:29:13.208Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 新建项目1dotnet new console 修改 csproj将 *.csproj文件里面的 OutputType 改成 library 1<OutputType>library</OutputType> 编译代码1dotnet restore 运行项目1dotnet run 打包项目12dotnet build -c releasedotnet run -

## Content

# 使用VS Code 编译C# 为DLL

- 2023-08-08

- 作者 小莫

- 1. 新建项目
- 2. 修改 csproj
- 3. 编译代码
- 4. 运行项目
- 5. 打包项目

### 新建项目

1

|
dotnet new console

|

### 修改 csproj

将 *.csproj 文件里面的 OutputType 改成 library

1

|
< OutputType > library </ OutputType >

|

### 编译代码

1

|
dotnet restore

|

### 运行项目

1

|
dotnet run

|

### 打包项目

1
2

|
dotnet build -c release
dotnet run -c release

|

本作品采用 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 进行许可

打赏

分享

c# , dll , vs code , 动态库

最后编辑：2026-05-07

上一篇

下一篇
