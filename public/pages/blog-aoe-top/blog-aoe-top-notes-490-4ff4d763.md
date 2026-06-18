# 【优化建议】网盘下载速度慢优化方案 | 小莫的博客园

Source: https://blog.aoe.top/notes/490
Friendly site: 小莫博客园
Group: AOE.TOP
Fetched: 2026-06-18T02:29:03.416Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 网盘相关问题已汇总到标签『小莫网盘』，可直接点击查看 我的网盘主页也写了，网盘是使用onedrive进行搭建的，微软在国内没有服务器，服务器是在国外的，部分地区下载可能比较慢。具体速度，大家可以自行 ping xmsky-my2.sharepoint.com 试试; 全国延迟检测： 优化方案一在host中添加以下代码 host 文件在 C:\Windows\System32\drivers

## Content

# 【优化建议】网盘下载速度慢优化方案

- 2023-07-07

- 作者 小莫

- 1. 优化方案一
- 2. 优化方案二
- 3. 优化方案三

网盘相关问题已汇总到标签『 小莫网盘 』，可直接点击查看

我的网盘 主页也写了，网盘是使用onedrive进行搭建的，微软在国内没有服务器，服务器是在国外的，部分地区下载可能比较慢。
具体速度，大家可以自行 ping xmsky-my2.sharepoint.com 试试;

全国延迟检测 ：

### 优化方案一

在host中添加以下代码

host 文件在 C:\Windows\System32\drivers\etc 里面

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
11

|
# OneDrive Start
204.79.197.213 api.onedrive.com
23.76.75.24 api.onedrive.live.com
131.253.33.217 onedrive.live.com
131.253.33.217 webedgegeo.skyprod.akadns.net
131.253.14.230 skyapi.onedrive.live.com
134.170.104.157 skyweb.skyprod.akadns.net
# 131.253.33.217 xmsky-my.sharepoint.com
131.253.33.217 xmsky2-my.sharepoint.com
# OneDrive End

|

### 优化方案二

使用 BitComet | Aria2 | IDM 下载；

这些工具可以帮助你智能的选择最快的下载节点，且支持多线程下载，最大程度的将你的宽带使用到最高，
并且他们都支持断点续传，即使下载中断，也依然能继续下载（IDM除外,因为它有点问题）

## 优化方案三

使用VPN进行翻墙下载；
上面Ping的结果也看的了，国外的延迟要比国内要低，可以找一个延迟低的vpn连接下载。
具体方法保险起见，我就不在文章中叙述了，大家自行解决

本作品采用 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 进行许可

打赏

分享

下载速度 , 小莫网盘 , 提速

最后编辑：2026-05-07

上一篇

下一篇
