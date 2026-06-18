# 【NodeJS】使用express快速搭建一个服务器 | 小莫的博客园

Source: https://blog.aoe.top/NodeJS/586
Friendly site: 小莫博客园
Group: AOE.TOP
Fetched: 2026-06-18T02:29:07.875Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 依赖Node.js：https://nodejs.org/express：https://expressjs.com/ 安装先自行下载安装 Node.js,然后创建目录，打开cmd，初始化一个node项目： 1npm init 根据提示完成相关初始化后，运行下面的代码安装 express 1npm install express Hello World在目录创建一个 app.js ，粘贴以下代

## Content

# 【NodeJS】使用express快速搭建一个服务器

- 2023-07-07

- 作者 小莫

- 1. 依赖
- 2. 安装
- 3. Hello World

## 依赖

Node.js： https://nodejs.org/
express： https://expressjs.com/

## 安装

先自行下载安装 Node.js,然后创建目录，打开cmd，初始化一个node项目：

1

|
npm init

|

根据提示完成相关初始化后，运行下面的代码安装 express

1

|
npm install express

|

## Hello World

在目录创建一个 app.js ，粘贴以下代码

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

|
const express = require ( 'express' );

const app = express ();

let host = 'localhost'
let port = 3000 ;

app. get ( "/" , ( req,res ) => {
res. send ( 'Hello World' );
});

app. listen (port);

console . log ( `服务器已在 http:// ${host} : ${port} / 运行` );

|

控制台输入 node app.js 提示 服务器已在 http://localhost:3000/ 运行 后，

浏览器打开 http://localhost:3000/ 后就可以看到 Hello World 了

本作品采用 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 进行许可

打赏

分享

NodeJs , express , 搭建服务器

最后编辑：2026-05-07

上一篇

下一篇
