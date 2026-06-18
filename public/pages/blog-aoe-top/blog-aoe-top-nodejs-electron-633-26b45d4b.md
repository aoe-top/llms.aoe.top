# [Electron] 在 Electron 中调用 DLL 文件 | 小莫的博客园

Source: https://blog.aoe.top/NodeJS/Electron/633
Friendly site: 小莫博客园
Group: AOE.TOP
Fetched: 2026-06-18T02:30:22.173Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 前置库安装 edge-js 123npm install edge-js# 或yarn add edge-js edge-js可以帮助我们调用C#编译的DLL文件, 前提: 版本是在 .net4.5以上, C#编写的Dll要通过async修饰后才能被node调用 在electron中需要换成electron-edge-js 示例: 12345678910111213141516using

## Content

# [Electron] 在 Electron 中调用 DLL 文件

- 2023-08-08

- 作者 小莫

- 1. 前置库
- 2. 调用

### 前置库

安装 edge-js

1
2
3

|
npm install edge-js
# 或
yarn add edge-js

|

edge-js 可以帮助我们调用C#编译的DLL文件, 前提:

- 版本是在 .net4.5以上,

- C#编写的Dll要通过async修饰后才能被node调用

- 在electron中需要换成 electron-edge-js

示例:

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

|
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Baldurs_Gate_3
{
public class StartUp
{
public async Task< object > Invoke ( object param )
{
return "Hello World!" ;
}
}
}

|

### 调用

假如我们上面生成的dll 名称是 Baldurs Gate 3.dll , 在 node 中可以这样写:

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

|
let Invoke = edge. func ({
assemblyFile : "Baldurs Gate 3.dll" , // dll 目录
typeName : 'Baldurs_Gate_3.StartUp' , // 类
methodName : 'Invoke' // 方法
})

// 传递参数 回调
Invoke ( null , ( error: any , result: any ) => {
console . log (result);
})

|

本作品采用 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 进行许可

打赏

分享

DLL , Electron , NodeJS

最后编辑：2026-05-07

上一篇

下一篇
