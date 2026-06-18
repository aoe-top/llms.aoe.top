# 在VS Code 中 使用 gcc 编译 cpp文件为 dll 库 | 小莫的博客园

Source: https://blog.aoe.top/c/626
Friendly site: 小莫博客园
Group: AOE.TOP
Fetched: 2026-06-18T02:26:57.238Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 先安装Gcc :https://gcc.gnu.org/ 然后在终端运行指令 1g++ main.cpp -I ../inc -fPIC -shared -o main.dll

## Content

# 在VS Code 中 使用 gcc 编译 cpp文件为 dll 库

- 2023-07-07

- 作者 小莫

先安装Gcc : https://gcc.gnu.org/

然后在终端运行指令

1

|
g++ main.cpp -I ../inc -fPIC -shared -o main.dll

|

本作品采用 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 进行许可

打赏

分享

C++ , Code , VS , gcc

最后编辑：2026-05-07

上一篇

下一篇
