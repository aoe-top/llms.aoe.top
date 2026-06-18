# 开发环境的搭建与调试以及有用的工具们 | 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/BepInEx/3.Development.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:28:54.013Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# 开发环境的搭建与调试以及有用的工具们 ​

## 必备工具 ​

在正式开始编写Mod插件之前，我们需要准备一些工具：

- 最新的 .NET SDK: https://dotnet.microsoft.com/zh-cn/
- Visual Studio Code（VS Code）： https://code.visualstudio.com/
- dnSpy https://github.com/dnSpyEx/dnSpy/releases

## 安装 .NET SDK ​

.NET SDK 是一个软件开发工具包 (SDK)，允许编译用 C# 编写的代码并使用不同的 .NET 库。 您稍后可能会注意到，插件使用不同的 .NET API 版本和变体，例如 .NET Framework 或 .NET Standard。 当涉及到插件开发时, 所有这些都可以通过现代 .NET SDK 来处理.

- 下载并安装 .NET SDK : https://dotnet.microsoft.com/zh-cn/download
- 安装后重启电脑
- 检查是否安装成功 在 cmd 控制台 中输入 dotnet --list-sdks
- 如果您已正确安装 .NET SDK，该命令应至少返回一个 .NET SDK 版本及其位置。 输出示例如下：
cmd
C:\Users\xiaom > dotnet -- list - sdks
6.0.406 [C:\Program Files\dotnet\sdk]
7.0.403 [C:\Program Files\dotnet\sdk]

1
2
3

## 选择一个 IDE ​

虽然, 我们可以直接用记事本就可以写代码, 但这样效率太低,我们需要一个IDE 来提高我们的效率. 我现在习惯使用 VS Code 来编写代码, 所以这篇教程也是演示使用VS Code. 先为 VS Code 安装几个相关的插件：

- C#
- .NET Install Tool
- C# Dev Kit
然后就可以使用 VS Code 来编写你的代码了

## 安装 BepInEx 插件 模板 ​

安装 模板能省去我们初始化项目的时间, 可以使用以下指令来安装 模板：

cmd
dotnet new - i BepInEx.Templates -- nuget - source https://nuget.bepinex.dev/v3/index.json

1

如果安装成功，您应该会看到所有 .NET 项目模板的列表。 其中应该包括以下 BepInEx 模板：

cmd
模板名 短名称 语言 标记
--------------------------------------- -------------------- ---- --------------------------------------
BepInEx 5 Plugin Template bepinex5plugin [C#] BepInEx/BepInEx 5 /Plugin
BepInEx 6 .NET Launcher Plugin Template bep6plugin_netfx [C#] BepInEx/BepInEx 6 /Plugin/.NET Launcher
BepInEx 6 Il2Cpp Plugin Template bep6plugin_il2cpp [C#] BepInEx/BepInEx 6 /Plugin/Il2Cpp
BepInEx 6 Unity Mono Plugin Template bep6plugin_unitymono [C#] BepInEx/BepInEx 6 /Plugin/Unity Mono

1
2
3
4
5
6

## 开启BepInEx Debug模式 ​

用VS Code打开 BepInEx\config\BepInEx.cfg 文件，
修改

ini
[Logging.Console]
Enabled = false

1
2

为

ini
[Logging.Console]
Enabled = true

1
2

## 可选安装 ​

一些用于开发调试的插件, 安装后能提升开发效率

- BepInEx.Debug tools: https://github.com/BepInEx/BepInEx.Debug/releases 推荐装个 ScriptEngine
- Runtime Unity Editor: https://github.com/ManlyMarco/RuntimeUnityEditor
- Configuration Manager: https://github.com/BepInEx/BepInEx.ConfigurationManager
- Script Loader: https://github.com/denikson/BepInEx.ScriptLoader
- ThunderKit: https://github.com/PassivePicasso/ThunderKit
