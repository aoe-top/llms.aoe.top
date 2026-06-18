# 将打包纹理导入到Substance Painter | 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/UE_Modding/7.Misc/SubstanceImportTextures.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:29:08.291Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# 将打包纹理导入到Substance Painter ​

Substance Painter是一款行业领先的高级纹理创作工具，不过也有免费的替代品如Quixel Mixer。

将模型和纹理导入到Substance Painter中，然后我们开始工作。

### 准备着色器 ​

首先需要向着色器添加环境遮蔽和自发光层，这可以通过进入 Texture Set Settings 并点击加号图标完成。

### 基础颜色和法线贴图 ​

- 在正确的纹理集中创建一个填充层。
- 只启用 color 、 nrm 和 emiss 材质层。
- 将导入的纹理拖拽到相应的层中。

### ORM纹理 ​

ORM纹理是环境遮蔽(Ambient Occlusion)、粗糙度(Roughness)和金属度(Metallic)的组合，它们分别位于纹理的红、绿、蓝通道中。

[!IMPORTANT]
红色通道 -> 环境遮蔽，绿色通道 -> 粗糙度，蓝色通道 -> 金属度。

- 为填充层创建一个生成器。

- 选择灰度转换。

- 对于环境遮蔽，取消选择除 ao 之外的所有层。
- 将灰度类型设置为红色通道。
- 在源图像中指定ORM/打包纹理。

- 复制生成器，并对粗糙度执行相同操作。
- 取消选择除 rough 之外的所有层，并将灰度类型设置为绿色通道。

- 复制生成器，并对金属度执行相同操作。
- 取消选择除 metal 之外的所有层，并将灰度类型设置为蓝色通道。

### 完成！ ​

这就是全部内容了，现在我们有了基础颜色、法线贴图，以及所有正确设置的打包纹理，包括自发光纹理。

### 更改自发光颜色（可选） ​

- 创建一个填充层。
- 取消选择除 emiss 之外的所有项，并选择您喜欢的颜色。
- 切换到自发光层，并为填充层选择颜色模式。
