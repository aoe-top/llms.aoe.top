# 【Ubuntu】从 NodeSource 中安装 Node.js 和 npm | 小莫的博客园

Source: https://blog.aoe.top/NodeJS/613
Friendly site: 小莫博客园
Group: AOE.TOP
Fetched: 2026-06-18T02:29:08.665Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 介绍NodeSource 是一个公司，聚焦于提供企业级的 Node 支持。它维护了一个 APT 软件源，其中包含了很多 Node.js 版本。如果你的应用需要指定版本的Node.js 版本，使用这个软件源。GitHub地址：https://github.com/nodesource/distributions 安装说明Node.js v19.x: Ubuntu 123curl -fsSL ht

## Content

# 【Ubuntu】从 NodeSource 中安装 Node.js 和 npm

- 2023-07-07

- 作者 小莫

- 1. 介绍
- 2. 安装说明

### 介绍

NodeSource 是一个公司，聚焦于提供企业级的 Node 支持。它维护了一个 APT 软件源，其中包含了很多 Node.js 版本。如果你的应用需要指定版本的Node.js 版本，使用这个软件源。
GitHub地址： https://github.com/nodesource/distributions

### 安装说明

Node.js v19.x:

- Ubuntu

1
2
3

|
curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
sudo apt-get install -y nodejs

|

- Debian

1
2
3

|
curl -fsSL https://deb.nodesource.com/setup_19.x | bash - &&\
apt-get install -y nodejs

|

Node.js v18.x:

- Ubuntu

1
2

|
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - &&\
sudo apt-get install -y nodejs

|

- Debian

1
2

|
curl -fsSL https://deb.nodesource.com/setup_18.x | bash - &&\
apt-get install -y nodejs

|

本作品采用 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 进行许可

打赏

分享

Node , NodeSource , Ubuntu

最后编辑：2026-05-07

上一篇

下一篇
