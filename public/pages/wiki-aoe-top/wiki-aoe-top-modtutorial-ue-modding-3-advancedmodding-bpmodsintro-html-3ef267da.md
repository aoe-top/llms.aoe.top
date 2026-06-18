# 蓝图模组开发 | 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/UE_Modding/3.AdvancedModding/BpModsIntro.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:29:07.222Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# 蓝图模组开发 ​

虚幻引擎中的蓝图模组开发允许模组制作者通过可视化脚本系统创建和定制游戏功能，无需传统编码。这个强大的工具使修改游戏机制、AI行为和用户界面成为可能，让模组制作者能够快速高效地增强和个性化游戏体验。

## 入门指南 ​

如果你加入了某个游戏的Discord社区，请检查该游戏是否有模组开发社区，并确保已有某种类型的蓝图模组加载器。

本指南假设你正在使用UE4SS、UML或DML。
(如果这些名称都不熟悉，你可能需要在游戏的模组社区中进行研究和询问)

- 右键点击游戏exe文件 -> 属性 -> 详细信息选项卡，确认游戏使用的UE版本。
- 下载正确版本的UE并创建一个新项目。 更多详细信息，请阅读 创建UE4/5项目 指南。

## 环境设置 ​

- 在内容浏览器中，创建一个名为 Mods 的新文件夹
- 在Mods文件夹中，创建另一个新文件夹，并随意命名，例如 MyMod

## 创建蓝图 ​

右键点击并选择蓝图类。

选择Actor类。

创建蓝图后，将其重命名为 ModActor 。

双击蓝图并切换到事件图表(Event Graph)选项卡，你将看到几个默认节点。

- EventBeginPlay: 在蓝图生成/创建时执行一次代码。
- EventActorBeginPlay: 我们将跳过这个。
- EventTick: 在每次游戏更新时执行代码，即每一帧都会执行，甚至可能更频繁。
我们稍后会回到这里，现在先关闭窗口。

在本例中，我们将创建一个小部件(widget)，一个UI界面，用于在游戏中显示模组已加载。

## 创建小部件 ​

- 在内容浏览器中，右键点击->用户界面(User Interface)->小部件蓝图(Widget Blueprint)。
- 随意命名，我将其命名为 WBP_MyWidget 。
- 打开它。

在面板(Palette)中搜索 Canvas ，并将其拖到小部件的根对象上。
Canvas允许我们在屏幕上任意位置放置其他对象。

搜索 Text 并将文本对象拖到Canvas上。

- 选择文本。
- 在Text字段中设置你的文本，我将其设置为 Loaded! 作为测试。
- 保存并关闭。

## 编写蓝图代码 ​

- 打开我们之前创建的蓝图。
- 拉出EventBeginPlay引脚，搜索 Create Widget ，并点击它。

一个新节点将被创建并连接。
点击节点中的Class下拉菜单，按名称选择你的小部件。

- 从小部件创建节点拖出Return Value引脚。
- 寻找 Add to viewport 并点击它。

你应该能看到与下图相同的内容。
这段代码的基本含义是：
在开始时，创建指定的小部件，并将其添加到屏幕/视口。

## 最终模组文件夹结构 ​

模组文件夹应该如下所示：

## 打包和测试 ​

打包过程将根据UE版本而有所不同。
UE4 -> 使用UnrealPak。
UE5 -> 区块分配(chunk assigning) (除非游戏没有IOStore) 。

更多信息，请查看 使用UE烹饪内容 。

### 加载模组 ​

根据不同的模组加载器，加载过程可能会有所不同，所以请查看所使用的模组加载器说明或咨询你正在制作模组的游戏社区。
