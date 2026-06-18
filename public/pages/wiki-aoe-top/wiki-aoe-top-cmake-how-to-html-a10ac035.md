# 如何操作 | 小莫的维基库

Source: https://wiki.aoe.top/CMake/how-to.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:27:00.523Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# 如何操作 ​

本页提供了一些常见任务的文档链接。

## 创建新项目 ​

- 在没有 CMakeLists.txt 文件的目录中，从 VS Code 的命令面板中运行 CMake: Quick Start 命令。
- 参考 CMake 工具在 Linux 上的教程

## 配置项目 ​

- 在 VS Code 的命令面板中运行 CMake: Configure 命令。
- 参考 CMake 工具在 Linux 上的教程中的 “配置 Hello World” 部分 或更详细的 CMake Tools 配置步骤文档 。

## 构建项目 ​

- 在 VS Code 的命令面板中运行 CMake: build 命令，按下键盘快捷键 F7 ，或在状态栏中选择 build 按钮。
- 参考 CMake 工具在 Linux 上的教程中的 “Build hello world” 部分 ，或更详细的 CMake Tools 构建文档 。

## 调试项目 ​

- 在 VS Code 的命令面板中运行 CMake: Debug Target 命令，按下键盘快捷键 Ctrl+F5 ，或在状态栏中按下 调试 按钮。
- 请参考 CMake:Target debugging and launching 页面获取更多信息。

## 将命令行参数传递给调试器 ​

请参考 使用 launch.json 文件进行调试 。

## 为 C++ IntelliSense 设置包含路径 ​

CMake Tools 目前支持微软的 ms-vscode.cpptools 扩展。如果已安装并启用了 ms-vscode.cpptools 扩展，则配置项目将自动提供此集成。

ms-vscode.cpptools 将显示一个提示，确认您希望使用 CMake Tools 提供有关您的项目的配置信息。接受此提示以激活集成。随后，CMake Tools 将为您项目中的每个源文件提供并自动更新 cpptools 配置信息。

## 下一步操作 ​

- 探索 CMake Tools 文档
