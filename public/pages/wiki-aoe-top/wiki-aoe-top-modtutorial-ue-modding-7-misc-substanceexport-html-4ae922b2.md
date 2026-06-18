# 在Substance Painter中导出打包纹理 | 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/UE_Modding/7.Misc/SubstanceExport.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:29:00.780Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# 在Substance Painter中导出打包纹理 ​

这是一个关于如何从Substance Painter导出网格纹理到UE传统"打包纹理"的小指南，其中导出的文件包括基础颜色、ORM、法线和自发光（可选）。

## 导出打包纹理 ​

- 文件 -> 导出纹理
- 点击 全局设置 并为 输出模板 选择 虚幻引擎4（打包） 。

你可以手动决定为每个网格部分导出哪些纹理。

点击 导出 后，它将为网格生成所有纹理，这些纹理将可以直接导入到UE4/5中并且可用于游戏。

## 导入到虚幻引擎 ​

这是一个直接的过程，只需将所有纹理拖入，创建一个材质并在材质图表中连接所有内容，如下图所示。

[!IMPORTANT]
确保在纹理的压缩设置中将ORM/打包纹理设置为蒙版（Masks），法线贴图设置为法线（Normal）。

### 调整自发光（可选） ​

如果你的网格有自发光纹理，你可以通过将其与颜色相乘，然后再乘以一个常数来调整其强度和颜色。
