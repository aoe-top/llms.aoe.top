# 【TS】初始化一个 TypeScript 项目 | 小莫的博客园

Source: https://blog.aoe.top/notes/636
Friendly site: 小莫博客园
Group: AOE.TOP
Fetched: 2026-06-18T02:29:04.461Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 想要初始化一个 TypeScript 项目，需要先确保你的系统上已经安装了 Node.js 和 npm。以下是初始化一个 TypeScript 项目的步骤： 安装 TypeScript: 1npm install -g typescript 创建一个新的项目目录，例如叫 ts-project，然后进入这个目录： 1mkdir ts-project && cd ts-pro

## Content

# 【TS】初始化一个 TypeScript 项目

- 2024-01-23

- 作者 小莫

想要初始化一个 TypeScript 项目，需要先确保你的系统上已经安装了 Node.js 和 npm。以下是初始化一个 TypeScript 项目的步骤：

- 安装 TypeScript:

1

|
npm install -g typescript

|

- 创建一个新的项目目录，例如叫 ts-project ，然后进入这个目录：

1

|
mkdir ts-project && cd ts-project

|

- 在项目目录中，初始化一个新的 npm 项目。这将会生成一个 package.json 文件：

1

|
npm init -y

|

- 安装 TypeScript 作为项目的依赖：

1

|
npm install --save-dev typescript

|

- 再次安装一个很重要的包，就是 @types/node ，这个包是 TypeScript 的核心：

1

|
npm install --save-dev @types/node

|

- 创建一个 tsconfig.json 文件，这个文件将告诉 TypeScript 编译器应如何处理项目中的代码：

1

|
npx tsc --init

|

这个命令会自动生成一个 tsconfig.json 文件，你可以根据自己的需要进行修改。

- 添加 "build": "tsc --outDir dist" 到 package.json 文件的 scripts 区域。这样，每当你在项目根目录运行 yarn build 命令，TypeScript 编译器就会编译你 "src" 里面的的代码。

到这里，你已经设置完毕一个新的 TypeScript 项目了。你可以在 src 文件夹中开始编写你的 TypeScript 代码了。 运行 yarn build 将使用 TypeScript 编译器编译你的代码。

本作品采用 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 进行许可

打赏

分享

TS , TypeScript , 初始化

最后编辑：2026-05-07

上一篇

下一篇
