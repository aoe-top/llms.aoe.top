# 更改纹理 | 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/UE_Modding/2.IntermediateModding/ChangingTextures.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:29:12.044Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# 更改纹理 ​

在这个例子中，我将更改GR2（UE4.27）的一个剑的纹理，但相同的原则适用于任何其他游戏和引擎版本。

一旦你找到了想要替换的纹理，将其导出为PNG并编辑它以满足你的需求。

启动UE并创建与FModel中显示的相同的文件夹结构。

将纹理导入到其文件夹中，并保持与FModel中命名的 完全相同 的名称。

注意：
尝试使你覆盖的任何纹理设置与其原始类型匹配。

- 如果它是一个 法线 贴图纹理，确保在压缩设置中选择NormalMap。
- 如果它是一个ORM（将遮挡|粗糙度|金属性打包成一个），确保在压缩设置中选择Masks。 你可以在FModel中再次检查所有内容。
完成后，只需打包并在游戏中测试。
有关如何打包你的mod的更多信息，请查看 烘焙内容指南 。

（不要忘记在你的mod名称中加入 _P ）
