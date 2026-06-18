# 【Mod开发实例】利用 ScriptHook RDR2.NET 用C#为荒野大镖客2 制作脚本Mod 实现“超级跳”和“修改时间” | 小莫的博客园

Source: https://blog.aoe.top/Mod/445
Friendly site: 小莫博客园
Group: AOE.TOP
Fetched: 2026-06-18T02:27:01.537Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 19年写的一篇文章，突然发现还没在博客上发，来补一下； 源码：https://github.com/3DMXM/TestModForNetAtRDR2 准备工作 首先下载Community ScriptHook RDR2 .NET：Mod站 | GitHub Script Hook RDR2 SDK：http://www.dev-c.com/rdr2/scripthookrdr2 然后下载Visu

## Content

# 【Mod开发实例】利用 ScriptHook RDR2.NET 用C#为荒野大镖客2 制作脚本Mod 实现“超级跳”和“修改时间”

- 2023-07-07

- 作者 小莫

- 1. 准备工作
- 2. 新建项目

19年写的一篇文章，突然发现还没在博客上发，来补一下；

源码： https://github.com/3DMXM/TestModForNetAtRDR2

### 准备工作

- 首先下载Community ScriptHook RDR2 .NET：Mod站 | GitHub

- Script Hook RDR2 SDK： http://www.dev-c.com/rdr2/scripthookrdr2

- 然后下载Visual Studio： https://visualstudio.microsoft.com/zh-hans/

- .NET Framework 4.8或其以上版本： https://dotnet.microsoft.com/download/thank-you/net48-developer-pack

- 准备资料 RDR2 NativeDB： https://mod.3dmgame.com/NativeDB

### 新建项目

打开Visual Studio，新建项目，选择Visual C# ->类库（NET Framework），框架选择.NET Framework 4.8，名称自定义

右键“引用”，选择“添加引用”，将ScriptHook RDR2 .NET里面的“ScriptHookRDRNetAPI.dll”这个文件引用进来

文件引用完成完毕之后，添加几个引用：

1
2
3
4
5

|
using System.Windows.Forms;
using RDR2;
using RDR2.UI;
using RDR2.Native;
using RDR2.Math;

|

添加进去之后，我们会发现一个报错

是因为我们创建项目的时候没有引用System.Windows.Forms这个东西，我们手动引用一下：

现在错误就消失了，接下来我们将自带的“Class1”改成“Main : Script”，这样我们就可以直接使用“ScriptHookRDRNetAPI”的函数了，接下来我们在里面开始写代码：

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
37
38

|
public class Main : Script
{
public Main () //入口函数
{
//KeyDown是ScriptHookRDRNetAPI中自带的函数，用于监听按键的按下事件
//这句的意思是如果有按键按下则执行函数“OnKeyDown”
KeyDown += OnKeyDown;

//Tick是ScriptHookRDRNetAPI中自带的函数，用于勾住游戏
//这句的意思是将函数“OnTick”注入到游戏中，并且每过“Interval”毫秒进行检测一次
Tick += OnTick;

//Interval是检测间隔，单位毫秒
Interval = 1 ;
}
bool ModOn = false ; //给Mod设置一个开关
private void OnTick ( object sender, EventArgs e )
{
Player player = Game.Player; //获取玩家
if (ModOn) //如果
{
//Function.Call是ScriptHookRDRNetAPI中的函数，用于执行动作
//Hash.SET_SUPER_JUMP_THIS_FRAME中的“SET_SUPER_JUMP_THIS_FRAME”是 Script Hook RDR2 SDK 中的内容
//具体赋值内容可以参考 Script Hook RDR2 SDK 的“natives.h”文件
// SET_SUPER_JUMP_THIS_FRAME(Player player) 是Script Hook RDR2 SDK中超级跳的功能，true是启动
Function.Call(Hash.SET_SUPER_JUMP_THIS_FRAME, player, true );
}
}
private void OnKeyDown ( object sender, KeyEventArgs e )
{
if (e.KeyCode == Keys.C) //判断按下的键是否是“C”键，定义启动按键
{
ModOn = !ModOn; //给Mod开关赋值一个反值，如果开就关，如果关就开
}

}

}

|

这样，我们的“超级跳”的功能就实现了，接下来我们再来写一个“修改时间”的功能，先在Script Hook RDR2 SDK 的“natives.h”文件中找到修改时间的代码：

1

|
static void ADD_TO_CLOCK_TIME ( int hours, int minutes, int seconds ) { invoke<Void>( 0xAB7C251C7701D336 , hours, minutes, seconds); }

|

简单说一下：

- “SET_CLOCK_TIME”是设置时间

- “ADD_TO_CLOCK_TIME”是添加时间，传递的全是整数，可正可负

使用ScriptHook RDR2 .NET要修改时间就是

1
2

|
Function.Call(Hash.ADD_TO_CLOCK_TIME, 1 , 0 , 0 , true ); //加一小时
Function.Call(Hash.ADD_TO_CLOCK_TIME, -1 , 0 , 0 , true ); //减一小时

|

逻辑研究明白之后，我们来想想要怎么操作， 我们就使用键盘的 ↑和↓键来修改时间吧，

我们两个按键，操作的内容是一样的，只有一个值不一样，我们可以将它们写到一个方法里面：

1
2
3
4

|
private void changeTime ( int time )
{
Function.Call(Hash.ADD_TO_CLOCK_TIME, time, 0 , 0 , true );
}

|

然后在按键监控的方法OnKeyDown来进行判断是否按下 ↑和↓键：

1
2
3
4
5
6
7
8

|
if (e.KeyCode == Keys.Up)
{
changeTime( 1 );
}
if (e.KeyCode == Keys.Down)
{
changeTime( -1 );
}

|

现在，我们修改时间的功能也已经实现了，将项目生成，

然后，将\bin\Debug\TestModForNet.dll放到游戏目录中的“scripts”文件夹中，没有自己新建一个
别忘了安装原版的 ScriptHook RDR2 .NET 和 Script Hook RDR2

进游戏按C、↑、↓ 键就可以实现我们要的功能了

本作品采用 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 进行许可

打赏

分享

C# , Mod开发 , RDR2.NET , ScriptHook , 荒野大镖客

最后编辑：2026-05-07

上一篇

下一篇
