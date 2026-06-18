# IoStore 打包 | 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/UE_Modding/1.BasicModding/IoStorePacking.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:29:07.198Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# IoStore 打包 ​

[!IMPORTANT] 此指南仅适用于当 Content/Paks 文件夹内存在 .ucas 、 .utoc 和 .pak 文件时。

打包IoStore资产时有三种情况，方法因情况而异：

- 你使用 UAssetGUI 或类似工具对从 ZenTools 提取的烘焙资产进行了十六进制编辑
- 你有一个UE项目并在其中创建了资产
- 你已从 FModel 提取了IoStore Zen资产并希望重新打包它们

## 情况1：打包烘焙资产 ​

### 对于UE5 ​

下载这个名为 IoStorePackager 的工具。这是一个非常简单的GUI命令行工具，你只需按照示例输入文件路径，它会调用你已安装的Unreal Engine版本中的UnrealPak，并使用所有正确的参数。

你可以观看 这个视频 ，它指导你如何使用 IoStorePackager ：

### 对于UE4 ​

使用 IoStorePackager-UE4 。与上述类似，但你还需要游戏的C++模板项目，因为 ZenTools-UE4 输出的清单文件与UE创建容器文件所需的 ZenTools 输出不同。

视频教程希望不久后推出。

## 情况2：UE项目打包 ​

如果你在编辑器中制作了模组内容，你需要通过编辑器烘焙和打包它。幸运的是，这真的很简单。

在编辑器中，转到 编辑 -> 项目设置 -> 打包 ，然后确保打包设置顶部的 使用Io Store 已勾选。

然后，按照正常的 内容烘焙 指南进行操作。

## 情况3：打包FModel Zen .uassets ​

使用工具 UnrealReZen 。说明相当直接，但请注意，没有其他工具可以替代UnrealReZen来打包FModel Zen .uassets 。

[!CAUTION] 此工具不支持从ZenTools提取的文件中提取资产。
