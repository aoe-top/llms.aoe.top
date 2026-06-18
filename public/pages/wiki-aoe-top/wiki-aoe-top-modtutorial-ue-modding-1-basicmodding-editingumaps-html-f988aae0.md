# 使用Stove编辑UMaps | 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/UE_Modding/1.BasicModding/EditingUmaps.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:29:05.643Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# 使用Stove编辑UMaps ​

该工具可在此处找到： Stove ，由 bananaturtlesandwich 开发。

Stove可用于移动、复制或删除现有对象。
同时还可以编辑对象的默认值，甚至可以从不同的umap中移植角色。

它并不总是有效，但这是一个额外的选择，可以在一定程度上编辑 .umaps 文件。

## 加载UMaps ​

启动Stove，在打开 .umap 之前：

- 指定游戏的Paks文件夹。
- 指定游戏的UE版本。
- AES密钥（如果有的话）。
加载你想要的 .umap ，你应该能看到地图的某种表示形式，可能是立方体形状的对象或缓存的网格模型（两者都可以）。

如果你知道资产/角色的名称，可以在左上角搜索它。

Stove界面：

与游戏内相比，我们可以确定摄像机的位置，并导航到我们需要的地方。

在这个例子中，我将复制几个道具来说明这个工具的基本用法。
要复制选中的对象，使用 Alt+拖拽 。
如果需要，可以手动调整位置。

此外，Stove允许编辑选定对象的默认值，包括蓝图和原生UE组件，如这个桌面台灯蓝图（生成实例值，而非全局）。

## 保存和打包 ​

当你对修改满意后，点击文件->保存。
然后按照正常流程使用UnrealPak进行打包。

### 结果 ​
