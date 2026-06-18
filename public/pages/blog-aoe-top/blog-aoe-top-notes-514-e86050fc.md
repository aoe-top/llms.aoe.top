# 【Win11】Win11系统使用安卓（Android）子系统 教程 | 小莫的博客园

Source: https://blog.aoe.top/notes/514
Friendly site: 小莫博客园
Group: AOE.TOP
Fetched: 2026-06-18T02:29:03.884Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 准备工作首先，系统区域改为美国，Windows预览计划改成Beta 然后检查系统更新，在这期间，找到启动或关闭Windows功能，将hyper-V和虚拟机平台打开 等系统检查关系并更新重启完之后，打开应用商店，查看应用商店版本是否在22110.1402.6.0以上，如果不在，则检查更新，将应用商店进行更新 安装子系统准备工作完成之后，从这个链接获取安卓子系统：https://www.micro

## Content

# 【Win11】Win11系统使用安卓（Android）子系统 教程

- 2023-07-07

- 作者 小莫

- 1. 准备工作
- 2. 安装子系统
- 3. 安装apk软件
- 4. 其他问题

### 准备工作

首先，系统区域改为美国，Windows预览计划改成Beta

然后检查系统更新，在这期间，找到 启动或关闭Windows功能 ，将 hyper-V 和 虚拟机平台 打开

等系统检查关系并更新重启完之后，打开 应用商店 ，查看应用商店版本是否在 22110.1402.6.0 以上，如果不在，则检查更新，将应用商店进行更新

### 安装子系统

准备工作完成之后，从这个链接获取安卓子系统： https://www.microsoft.com/store/productId/9P3395VX91NR

点击 Get 会自动打开应用商店，在应用商店中进行安装（如果提示 当前应用不适配当前系统 之类的，那么回去检查一下准备工作中的，地区和预览计划以及应用商店版本是否都符合）

安装完之后会有个 Windows Subsystem for Andro™ 和亚马逊应用商店，亚马逊商店我这边打不开不知道为什么， Windows Subsystem for Andro™ 是

### 安装apk软件

想要安装自己的apk软件，需要：
1.下载 ADB
（ADB下载地址： https://pan.aoe.top/Software/ADB ）

2.在 Windows Subsystem for Andro 中开启 开发人员模式

记住开发人员模式下面的那段IP和端口，默认是 127.0.0.1:58526

用cmd进入ADB所在目录，然后运行

1

|
adb connect 127.0.0.1:58526

|

提示 already connected to 127.0.0.1:58526 则说明链接成功

运行（注意：iBiliPlayer-bilih5.apk为你的apk安装包所在位置，比如 D:/apk/myapp.apk ）

1

|
adb install iBiliPlayer-bilih5.apk

|

提示

1
2

|
Performing Streamed Install
Success

|

说明安装成功

在开始菜单中就可以看到刚刚安装的应用，点击即可打开

### 其他问题

- 如果你跟我一样，一开始预览计划是Dev，是无法直接改成Beta的，需要修改注册表: win+R输入 regedit ，找到 计算机\HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\WindowsSelfHost\UI\Selection 然后在右侧窗口找到UIBranch键，将值从 Dev 改为 Beta 。

本作品采用 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 进行许可

打赏

分享

Tag0 , Tag1 , Tag2

最后编辑：2026-05-07

上一篇

下一篇
