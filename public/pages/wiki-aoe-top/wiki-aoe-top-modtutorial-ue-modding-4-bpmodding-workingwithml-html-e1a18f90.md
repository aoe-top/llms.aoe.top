# 使用模组加载器 | 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/UE_Modding/4.BPModding/WorkingWithML.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:29:03.557Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# 使用模组加载器 ​

自定义蓝图模组加载器允许模组制作者将自定义蓝图逻辑加载到游戏关卡中。

[!NOTE]
每种模组加载器都有自己的规则和要求，所以请确保阅读所使用模组加载器的说明文档。

## 常见蓝图模组加载器列表 ​

最流行的模组加载器有：

- UE4SS (UE4/UE5)
- UML 由 Russell Jerome 开发 (仅UE4)
- Dmgvol的分支版本: UML v2.2.1a (仅UE4)
游戏特定的模组加载器:

- DML (DmgModLoader)
- 用于 Ghostrunner 2
- 用于 Rooftops&Alleys
- NML (Narknon ModLoader)
- 用于 AtomicHeart
- 用于 Hogwarts Legacy
(这只是其中的几个，还有更多的模组加载器)

## UML/UE4SS/DML ​

这三种模组加载器使用相同的模式，即在Mods文件夹中对应的文件夹内命名为ModActor的模组蓝图。

模组加载器会在每个持久关卡中生成该蓝图的单个实例。

UML和UE4SS是通过DLL注入完成的，而DML是pak版本，不需要任何第三方软件即可运行。

### 虚幻引擎设置 ​

- 蓝图模组放在 /Mods 文件夹下，后面跟着模组名称，例如： /Mods/MyMod/ 。
- 模组蓝图必须命名为 ModActor 。
对于UML和UE4SS，图表编辑器中必须存在2个额外的自定义方法； PreBeginPlay 和 PostBeginPlay 。
但默认的 BeginPlay 也可以使用，它在角色生成时触发一次。

[!NOTE] 详细解释，请观看此视频： UML ModActor教程

[!IMPORTANT]
打包/编译后的pak文件名必须与编辑器中的mod文件夹名称匹配。

## NML ​

Narknon的模组加载器使用不同的方法加载模组，它通过名称加载自定义关卡。
每个自定义模组关卡都有"关卡蓝图"，其中包含对应模组的主要逻辑。

## 虚幻引擎设置 ​

对于NML或任何其他以"入口"地图名称加载的模组加载器，必须在特定文件夹（如 CustomContent ）中创建关卡资产。

关卡名称就是您的模组名称，将在游戏中输入到模组加载器中。

[!IMPORTANT]
模组的名称就是关卡资产的名称。
