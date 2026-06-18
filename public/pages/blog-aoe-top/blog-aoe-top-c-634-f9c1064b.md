# 【C++】CMake 添加第三方包 | 小莫的博客园

Source: https://blog.aoe.top/c/634
Friendly site: 小莫博客园
Group: AOE.TOP
Fetched: 2026-06-18T02:26:57.520Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 安装 vcpkg首先，需要从GitHub拉取 vcpkg.然后，运行bootstrap-vcpkg.bat进行打包.将 vcpkg 所在目录添加到 系统 PATH中 安装所需库在配置完系统PATH后,可以使用 1vcpkg install [packages to install] 注意: vcpkg 在 Windows 中默认编译并安装 x86 版本的库。 若要编译并安装 x64 版本，请执行

## Content

# 【C++】CMake 添加第三方包

- 2023-09-25

- 作者 小莫

- 1. 安装 vcpkg
- 2. 安装所需库
- 3. 在CMake 中添加

### 安装 vcpkg

首先，需要从GitHub拉取 vcpkg .
然后，运行 bootstrap-vcpkg.bat 进行打包.
将 vcpkg 所在目录添加到 系统 PATH 中

### 安装所需库

在配置完系统 PATH 后,可以使用

1

|
vcpkg install [packages to install]

|

注意: vcpkg 在 Windows 中默认编译并安装 x86 版本的库。 若要编译并安装 x64 版本，请执行:

1

|
vcpkg install [package name]:x64-windows

|

或

1

|
vcpkg install [packages to install] --triplet=x64-windows

|

### 在CMake 中添加

在CMake 中添加代码:

1
2
3
4
5
6
7
8
9
10

|
# 配置 vcpkg
set (CMAKE_PREFIX_PATH "E:\\GitHub\\vcpkg\\packages" )

# ...

# 引入 imgui
find_package (imgui CONFIG REQUIRED)
target_link_libraries (Example PRIVATE imgui::imgui)

# ...

|

然后就可以在代码中使用了.

本作品采用 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 进行许可

打赏

分享

C++ , CMake , vcpkg

最后编辑：2026-05-07

上一篇

下一篇
