# 【Nuxt3】安装pinia 失败提示vue版本不兼容问题 解决方法 | 小莫的博客园

Source: https://blog.aoe.top/NodeJS/Nuxt/610
Friendly site: 小莫博客园
Group: AOE.TOP
Fetched: 2026-06-18T02:30:02.735Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 问题原因出现这个问题是因为node的版本太高所导致的，简直是个大坑 解决方法运行 1npm i pinia @pinia/nuxt --legacy-peer-deps 如果你两个一起装失败的话，那就单独分开装 我这边的报错内容123456789101112131415161718192021222324252627282930313233343536npm ERR! code ERESOLVEn

## Content

# 【Nuxt3】安装pinia 失败提示vue版本不兼容问题 解决方法

- 2023-07-07

- 作者 小莫

- 1. 问题原因
- 2. 解决方法
- 3. 我这边的报错内容

### 问题原因

出现这个问题是因为node的版本太高所导致的，简直是个大坑

### 解决方法

运行

1

|
npm i pinia @pinia/nuxt --legacy-peer-deps

|

如果你两个一起装失败的话，那就单独分开装

### 我这边的报错内容

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
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36

|
npm ERR! code ERESOLVE
npm ERR! ERESOLVE could not resolve
npm ERR!
npm ERR! While resolving: undefined@undefined
npm ERR! Found: vue@3.2.47
npm ERR! node_modules/vue
npm ERR! peer vue@"^3.2.47" from @nuxt/vite-builder@3.1.2
npm ERR! node_modules/@nuxt/vite-builder
npm ERR! @nuxt/vite-builder@"3.1.2" from nuxt@3.1.2
npm ERR! node_modules/nuxt
npm ERR! dev nuxt@"^3.1.2" from the root project
npm ERR! peer vue@"^2.6.14 || ^3.2.0" from pinia@2.0.30
npm ERR! node_modules/@pinia/nuxt/node_modules/pinia
npm ERR! pinia@">=2.0.27" from @pinia/nuxt@0.4.6
npm ERR! node_modules/@pinia/nuxt
npm ERR! @pinia/nuxt@"^0.4.6" from the root project
npm ERR! 11 more (vue-demi, @unhead/vue, @vitejs/plugin-vue, ...)
npm ERR!
npm ERR! Could not resolve dependency:
npm ERR! dev pinia@"*" from the root project
npm ERR!
npm ERR! Conflicting peer dependency: vue@2.6.14
npm ERR! node_modules/vue
npm ERR! node_modules/@vue/composition-api
npm ERR! peerOptional @vue/composition-api@"^1.4.0" from pinia@2.0.30
npm ERR! node_modules/pinia
npm ERR! dev pinia@"*" from the root project
npm ERR!
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR! this command with --force, or --legacy-peer-deps
npm ERR! to accept an incorrect (and potentially broken) dependency resolution.
npm ERR!
npm ERR! See C:\Users\xiaom\AppData\Local\npm-cache\eresolve-report.txt for a full report.

npm ERR! A complete log of this run can be found in:
npm ERR! C:\Users\xiaom\AppData\Local\npm-cache\_logs\2023-02-08T03_58_23_027Z-debug-0.log

|

本作品采用 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 进行许可

打赏

分享

Nuxt , pinia

最后编辑：2026-05-07

上一篇

下一篇
