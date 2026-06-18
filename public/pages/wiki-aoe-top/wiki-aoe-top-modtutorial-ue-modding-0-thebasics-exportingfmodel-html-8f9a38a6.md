# FModel | 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/UE_Modding/0.TheBasics/ExportingFModel.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:29:05.331Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# FModel ​

FModel是浏览、查看和导出 .pak 文件中所有文件类型的最佳工具之一。
如果你的游戏有AES加密： 添加AES密钥 。
如果你的游戏有usmapping： 添加映射文件 (主要是UE5+游戏) 。

# 创建游戏预设 ​

启动工具，点击Directory -> Selector。

FModel为不同的游戏提供了预设，这样它会记住PAK文件及其设置。

要添加一个新的游戏预设，只需展开"Add Undetected Game"选项。

接下来，给它一个名称并指定游戏Paks文件夹的路径。例如：

然后点击右侧的 + 按钮创建游戏预设。

现在你可以选择新创建的配置文件，并选择正确的UE4版本。 准备好后，点击确定开始。

下次启动FModel时，只需选择游戏并点击确定即可。

## 添加AES密钥（可选） ​

如果你的游戏有AES加密，导航至Directory -> AES并输入AES密钥以便能够读取PAK文件。

## 添加USMapping（可选） ​

如果你的游戏有映射文件（主要是UE5+游戏），导航至Settings，启用"Local Mapping File"，并提供游戏的.usmap文件。

哪里可以获取 .usmap 文件？通常由模组制作者提供

# 浏览游戏文件 ​

这是你需要开始探索并寻找你所需内容的部分。

### 导航基础 ​

- Archives标签页：Paks文件夹中所有可用的 .pak 文件。
- Folders标签页： .pak 的层次结构。
- Packages标签页：当前选定文件夹中的文件。

### 导出 ​

导出很简单，只需右键单击你想要的文件，并选择正确的导出类型。

不同的资源类型可以以不同方式导出。

- Zen .uasset ，如蓝图、数据表、结构体 - 直接导出或Json (Zen资源与UAssetGUI不兼容，你只能通过 十六进制编辑 来编辑) 。
- 纹理 - 导出为 .png 。
- 模型，如StaticMesh或SkeletalMesh（角色） - .psk
- 动画 - .psa
导出方式不必完全相同，这真的取决于具体情况和模组需求。
例如：将骨骼网格体导出为 .uasset ，以通过更改路径来编辑使用的纹理。

要重新打包FModel导出的Zen uasset，你可以使用 UnrealReZen 。
