# 【NodeJS】配置/取消 npm 代理 | 小莫的博客园

Source: https://blog.aoe.top/NodeJS/605
Friendly site: 小莫博客园
Group: AOE.TOP
Fetched: 2026-06-18T02:29:08.462Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 当你本地有梯子的时候，启用代理，会在“系统设置->网络->代理”里面看到代理服务器的选项，但在使用npm的时候，不会走这边的代理，需要我们自己手动配置一下 配置代理12npm config set proxy=http://127.0.0.1:10809npm config set registry=http://registry.npmjs.org 取消代理12npm config

## Content

# 【NodeJS】配置/取消 npm 代理

- 2023-07-07

- 作者 小莫

- 1. 配置代理
- 2. 取消代理

当你本地有梯子的时候，启用代理，会在“系统设置->网络->代理”里面看到代理服务器的选项，

但在使用npm的时候，不会走这边的代理，需要我们自己手动配置一下

### 配置代理

1
2

|
npm config set proxy=http://127.0.0.1:10809
npm config set registry=http://registry.npmjs.org

|

### 取消代理

1
2

|
npm config delete proxy
npm config delete https-proxy

|

本作品采用 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 进行许可

打赏

分享

NPM , NodeJs

最后编辑：2026-05-07

上一篇

下一篇
