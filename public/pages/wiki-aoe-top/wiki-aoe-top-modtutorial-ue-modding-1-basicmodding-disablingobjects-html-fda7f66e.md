# 禁用/移除对象 | 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/UE_Modding/1.BasicModding/DisablingObjects.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:29:08.632Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# 禁用/移除对象 ​

这是我学到的一个简单技巧，我认为对一些模组制作者可能会很有用。
如果你想移除诸如纹理甚至蓝图等对象，你可以直接清空uasset内容，然后将空文件打包回pak文件。

这种方法适用于模型、VFX、纹理、声音，甚至蓝图。

## 定位游戏文件 ​

在这个例子中，我将移除《幽灵行者》(Ghostrunner)中的一个敌人，蜘蛛。

首先，我将使用FModel定位角色蓝图。
在这个例子中是 /Content/ArtificialIntelligence/Characters/BP_EnemySpider 。

## 创建模组文件夹 ​

创建一个与FModel中发现的文件夹结构相同的模组文件夹。

每个模组文件夹都遵循以下模式：
ModName_P/<Game>/Content/...
对于这个例子，将是： NoSpiders_P/Ghostrunner/Content/... 后接完整路径。

即：
/NoSpiders_P/Ghostrunner/Content/ArtificialIntelligence/Characters

## 制作空的UAsset文件 ​

- 创建2个文本文件，并将它们重命名为与我们要移除的对象/资产匹配的名称。
- 将扩展名从 .txt 更改为 .uasset 和 .uexp 。

## 打包和测试 ​

使用UnrealPak打包模组文件夹（教程： 如何打包 ）。

这个模组可以在这里下载： No More Spiders for GR1
