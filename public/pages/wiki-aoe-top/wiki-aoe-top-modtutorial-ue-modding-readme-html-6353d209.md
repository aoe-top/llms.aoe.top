# UE4/5 Mod制作教程 | 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/UE_Modding/README.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:27:02.686Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# UE4/5 Mod制作教程 ​

此文档翻译自 https://github.com/Dmgvol/UE_Modding

UE4（和UE5）Mod制作指南合集。 这是新手学习UE模组制作并 立即 开始创建模组的完美场所。

## 在我们开始之前... ​

每位模组制作者都需要这两个工具：

- 虚幻引擎
- FModel

## 从哪里开始？ ​

如果你完全是新手，我建议选择一个简单的模组创意/目标来学习基础知识。
例如：学习如何提取游戏文件，修改纹理/模型并将其重新打包成模组(UE4/5)。
或者修改蓝图的默认值，比如武器的最大弹药量(UE4)。

这样你就能了解UE模组制作的理念和工作原理。

(如果你是新手并且想一步到位制作自定义地图...那就别这么做，这不是那么容易的事)。

## 基础知识 ​

我们将从如何浏览和导出游戏文件开始。

- 查找AES密钥(.pak加密)
- 提取已烘焙资源 - repak (仅适用于 .pak )
- 提取IoStore已烘焙资源 - ZenTools ( .pak / .utoc / .ucas )
- 提取映射 - UE4SS
- 导出 - FModel
- 导出 - UModel
- 预览动画 - UModel
- 浏览UAssets - FModel

## 初级教程 ​

让我们开始修改值！ 这对 任何 值的修改都至关重要。

- 编辑UAsset值 - UAssetGUI
- 编辑UAsset值 - Hex (当UAssetGUI失效时的手动十六进制编辑)
- 编辑UMaps - stove (UE4，仅适用于 .pak )
- 禁用/移除对象纹理
- 创建Pak文件 (仅适用于 .pak )
- 创建Pak文件 - IoStore ( .pak / .utoc / .ucas )
- 模组示例 - 修改蓝图默认值 (UE4)

## 中级教程 ​

替换资源，如纹理、材质、静态网格和骨骼网格(如角色)。

- 创建UE4/5项目
- 在UE4和UE5中烘焙/编译带有区块的内容
- 替换纹理
- 更改游戏模型
- 更改骨骼网格
- 合并骨骼网格
- 替换字体

## 高级教程 ​

- 为材质实例创建替代材质
- 蓝图/逻辑模组介绍
- 蓝图替代/复制介绍

## 蓝图教程 ​

我不会详细介绍，因为这需要虚幻引擎4的经验，这里只会介绍最基本的内容。 注意： 如果你是UE4新手 - 多尝试，所有内容都可以在YouTube上找到。

- 与模组加载器配合使用 - UML/UE4SS/DML/NML
- ModActor结构和生命周期
- 创建界面组件
- 蓝图模组的热键
- 配置变量 - 模组配置
- 自定义模组游戏存档
- 模组示例 - 自定义日志记录器(UserWidget)

## 专家教程 ​

在这个阶段，你已经知道如何替换/修改任何UAsset并能熟练使用蓝图，但仍在寻找更高级的内容来尝试。

- 使用蓝图将自定义界面"注入"游戏菜单
- 使用UE4SS导出C++头文件(UHT)
- 使用UHT替代/复制C++头文件
- 模组示例 - 头文件实践，(游戏：Sprawl) (即将推出)

## 游戏内存 ​

对创建速通计时、自定义随机化器甚至修改器都很有用。

- 查找CE指针
- 使用UE4SS查找偏移量

## Blender ​

- 导入模型(.psk和.glTF2文件)
- 导入动画(.psa文件)

## 纹理 ​

- 将打包纹理导入Blender
- 将打包纹理导入Substance Painter
- 从Substance Painter导出到虚幻引擎

## 实用链接/工具 ​

### 浏览和编辑UAssets ​

- FModel
- UModel
- UAssetGUI
- stove

### 虚幻引擎 ​

- Epic启动器
- 通用虚幻引擎4解锁器(UUU)
- UnrealPak - 由 FluffyQuack 编写
- UE4SS - UE4/5脚本系统

### 3D建模 ​

- Blender 或 Steam版本
- Blender 4 Psk插件 - 由 DarklightGames 编写
- Blender 3 Psk插件 - 由 Befzz 编写

### 逆向工程 ​

- Cheat Engine - 由 Dark Byte 编写
- x64dbg - 由 mrexodia 编写
- BinaryNinja
- Hex Editor Neo

### 其他 ​

- 所有可用/已知的UE模组工具 由 Buckminsterfullerene 编写。

### Discord社区 ​

UE Modding

## 其他游戏相关教程链接 ​

### Robocop: Rogue City ​

- Robocop: 模组制作指南

### Hogwarts Legacy (霍格沃茨遗产) ​

- 入门指南 - 创建虚幻项目
- 资源替换指南
- 打包模组指南

### Palworld (幻兽帕鲁) ​

- 3D资源导出与修改指南
- UE5中打包模组指南
- 高级资源创建指南

### inZOI (被遗忘的岛屿) ​

- 修改版UModel查看器
- inZOI照片工具 (需要订阅) - 使用Universal Unreal Engine 5 Unlocker工具，无法与UE4SS一起使用

### 模组开发指南 ​

- UE5模组开发指南
- UE4和UE5模组工具集

### 游戏文件处理工具 ​

- Bitfix - 为UE4和UE5游戏提供简单的Lua脚本支持，用于sig绕过
- retoc - 用于解压inZOI的文件(转换后的.paks、.utocs和.ucas)，需要通过Cargo构建或从UE Modding Discord获取预构建版本
- UnrealPak解包教程 - 使用UE目录中的UnrealPak.exe解包inZOI文件
- UAssetGUI - 查看和编辑原始资产数据，需要Visual Studio 2022构建
- UE4和UE5游戏AES密钥集合 - 需要账号
- QuickBMS - 用于转换inZOI的自定义格式.pak文件

### Blender插件 ​

- io-scene-psk-psa - 更新的Blender插件
- Send2UE - Blender到虚幻引擎的工作流插件

### 修改版虚幻引擎 ​

- 修改版虚幻引擎5.4.4

# 鸣谢 ​

- FatihG_ 教我如何制作模组。
- atenfyr (Discord中的adolescent)开发了 UAssetGUI 和 UAssetAPI 。
- RussellJerome 创建了 ModLoader 。

### 特别感谢： ​

- LongerWarrior、JanisSG、Jan和Animayyo在GR模组制作的整个旅程中给予了惊人的支持。
- Mythical
- Narknon
- Cranch
- Buckminsterfullerene02
- Atenfyer/Adolescent
- Spuds
- Truman
- Lisht/Kein
- KunoDemetries
- HyperModule
