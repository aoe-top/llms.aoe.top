# 【NodeJS】npm使用国内镜像加速的几种方法 | 小莫的博客园

Source: https://blog.aoe.top/NodeJS/609
Friendly site: 小莫博客园
Group: AOE.TOP
Fetched: 2026-06-18T02:29:08.630Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 腾讯云镜像源1npm config set registry http://mirrors.cloud.tencent.com/npm/ 淘宝镜像源12npm config set registry https://registry.npmmirror.com 华为云镜像源12npm config set registry https://mirrors.huaweicloud.com/rep

## Content

# 【NodeJS】npm使用国内镜像加速的几种方法

- 2023-07-07

- 作者 小莫

- 1. 腾讯云镜像源
- 2. 淘宝镜像源
- 3. 华为云镜像源
- 4. 淘宝定制的cnpm安装
- 5. 验证指令

### 腾讯云镜像源

1

|
npm config set registry http://mirrors.cloud.tencent.com/npm/

|

### 淘宝镜像源

1
2

|
npm config set registry https://registry.npmmirror.com

|

### 华为云镜像源

1
2

|
npm config set registry https://mirrors.huaweicloud.com/repository/npm/

|

### 淘宝定制的cnpm安装

1
2

|
npm install -g cnpm --registry=https://registry.npmmirror.com

|

### 验证指令

1

|
npm config get registry

|

本作品采用 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 进行许可

打赏

分享

NodeJs , 代理 , 国内镜像 , 配置

最后编辑：2026-05-07

上一篇

下一篇
