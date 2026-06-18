# 【Nuxt3】Nuxt3 使用 Vuetify3 框架 完成 SSR 服务器端渲染 | 小莫的博客园

Source: https://blog.aoe.top/NodeJS/600
Friendly site: 小莫博客园
Group: AOE.TOP
Fetched: 2026-06-18T02:29:08.405Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 框架介绍Nuxt3 为了让vue3的开发变的更加简单而制作的框架。它集成了很多vue 的库。 前端库我本来想用 Element Plus 的，但用了一会发现不太适合我，虽然样式挺好看的，但路由和图标以及响应式/自适应 相关的使用比较繁琐。 于是决定使用我比较熟悉的 Vuetify 3 来做。 由于 Nuxt3 没有直接集成 Vuetify3（顺带一提，它集成了 Element Plus）

## Content

# 【Nuxt3】Nuxt3 使用 Vuetify3 框架 完成 SSR 服务器端渲染

- 2023-07-07

- 作者 小莫

- 1. 框架介绍
- 2. 安装 Vuetify3
- 3. 安装 图标库
- 4. 引入 Vuetify3
- 5. 设置主题

### 框架介绍

Nuxt3 为了让vue3的开发变的更加简单而制作的框架。它集成了很多vue 的库。

前端库我本来想用 Element Plus 的，但用了一会发现不太适合我，虽然样式挺好看的，但路由和图标以及响应式/自适应 相关的使用比较繁琐。

于是决定使用我比较熟悉的 Vuetify 3 来做。

由于 Nuxt3 没有直接集成 Vuetify3（顺带一提，它集成了 Element Plus），我们需要手动添加。

### 安装 Vuetify3

1
2
3
4

|
npm i vuetify@3
或
yarn add vuetify@^3.1.1

|

### 安装 图标库

1

|
npm install @mdi/font

|

### 引入 Vuetify3

在 plugins 文件夹里面新建一个文件，命名为 vuetify.ts ，文件内容为

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

|
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin(nuxtApp => {
const vuetify = createVuetify({
components,
directives,
ssr: true,
})
nuxtApp.vueApp.use(vuetify)
})

|

打开 nuxt.config.ts 文件，在 defineNuxtConfig 选项里面添加

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
export default defineNuxtConfig({
css: [
....
'vuetify/styles',
'@mdi/font/css/materialdesignicons.css'],
build: {
transpile: ['vuetify'],
},
...
})

|

### 设置主题

打开 App.vue ，setup 里面的代码这样写：

1
2
3
4

|
import { useTheme } from "vuetify";
const theme = useTheme();
theme.global.name.value = "dark";

|

本作品采用 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 进行许可

打赏

分享

Nuxt , Vue3 , Vuetify3 , node , ssr

最后编辑：2026-05-07

上一篇

下一篇
