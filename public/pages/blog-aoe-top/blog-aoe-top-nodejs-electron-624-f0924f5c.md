# 【Electron】解决在build 后提示各种未找到包的问题 not find 'xxx' | 小莫的博客园

Source: https://blog.aoe.top/NodeJS/Electron/624
Friendly site: 小莫博客园
Group: AOE.TOP
Fetched: 2026-06-18T02:30:22.074Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 这个问题之前困扰了我很久， 甚至让我都不敢随便用第三方库， 直到我翻到一篇 issues ：https://github.com/electron-userland/electron-builder/issues/1968 原来这个问题是 npm 的问题， 解决方法将 package-lock.json, yarn.lock 和 node_modules 这几个都删除，然后使用 yarn 重新安

## Content

# 【Electron】解决在build 后提示各种未找到包的问题 not find 'xxx'

- 2023-07-07

- 作者 小莫

- 1. 解决方法

这个问题之前困扰了我很久，

甚至让我都不敢随便用第三方库，

直到我翻到一篇 issues ： https://github.com/electron-userland/electron-builder/issues/1968

原来这个问题是 npm 的问题，

### 解决方法

将 package-lock.json, yarn.lock 和 node_modules 这几个都删除，
然后使用 yarn 重新安装依赖

1

|
yarn

|

然后再 yarn run build ， 就能解决这个问题了

本作品采用 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 进行许可

打赏

分享

Electron , yarn , 问题

最后编辑：2026-05-07

上一篇

下一篇
