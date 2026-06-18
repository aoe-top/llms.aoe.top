# 使用BepInEx.ConfigurationManager来制作简易配置和UI | 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/BepInEx/%E5%88%B6%E4%BD%9C%E7%AE%80%E6%98%93%E9%85%8D%E7%BD%AE%E5%92%8CUI.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:29:14.579Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# 使用BepInEx.ConfigurationManager来制作简易配置和UI ​

### 下载和安装BepInEx.ConfigurationManager： ​

GitHub下载： https://github.com/BepInEx/BepInEx.ConfigurationManager/releases
中文汉化版： https://mod.3dmgame.com/mod/172600

下载后将“ConfigurationManager.dll”和“ConfigurationManager.xml”放入“\BepInEx\plugins”目录；
进入游戏后按F1即可打开管理菜单.

### 为你的Mod添加配置UI ​

ConfigurationManager 会自动将插件的配置内容显示出来；
ConfigurationManager 将使用所有元素（例如：说明，范围）向用户展示；
在大多数情况下，不必引用ConfigurationManager.dll或对其进行特殊的数据处理；
只需确保添加尽可能多的参数（这样可以帮助玩家更好的进行修改）。别忘了添加描述、键名、值范围。

添加滑块
创建时，指定 AcceptableValueRange 即可，如果范围是0f-1f，或0-100，则滑块将显示百分比%。
示例：

csharp
using BepInEx ;
using BepInEx . Configuration ;
using UnityEngine ;

namespace SimpleUI
{
[ BepInPlugin ( " aoe.top.plugins.SimpleUI " , " 简易UI示例 " , " 1.0.0.0 " )]
public class SimpleUI : BaseUnityPlugin
{
// 默认值
public static int Count = 10 ;
public static ConfigEntry userCount ;
void Start ()
{
userCount = Config . AddSetting ( " 自定义参数 " , " 值: " , Count , new ConfigDescription ( " 你可以根据自己的需求,自由的调整这个参数 " , new AcceptableValueRange ( 1 , 100 )));
}

void Update ()
{
if ( Count != userCount . Value )
{
Debug . Log ( " 值发生了变化,新的值为： " + userCount . Value );
Count = userCount . Value ;
}
}
}
}

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27

运行结果：

### 添加下拉列表 ​

#### 1.使用AcceptableValueList来创建下拉列表 ​

示例：

csharp
using System ;
using BepInEx ;
using BepInEx . Configuration ;
using UnityEngine ;

namespace SimpleUI
{
[ BepInPlugin ( " aoe.top.plugins.SimpleUI " , " 简易UI示例 " , " 1.0.0.0 " )]
public class SimpleUI : BaseUnityPlugin
{
// 默认值
public static string [] strList = {
" 下拉列表1 " ,
" 下拉列表2 " ,
" 下拉列表3 " ,
" 下拉列表4 " ,
" 下拉列表5 "
};
public static string str = strList [ 0 ];
public static ConfigEntry ValueList ;

[ Obsolete ]
void Start ()
{
ValueList = Config . AddSetting ( " 下拉列表 " , " 值: " , strList [ 0 ], new ConfigDescription ( " 这是一个下拉列表 " , new AcceptableValueList ( strList )));

}

void Update ()
{
if ( str != ValueList . Value )
{
Debug . Log ( " 下拉列表发生了编号,新的值为： " + ValueList . Value );
str = ValueList . Value ;
}
}

}
}

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39

运行结果：

#### 2.使用枚举来创建下拉列表 ​

使用枚举后就无需设置AcceptableValueList了，可以通过System.ComponentModel.DescriptionAttribute来自定义显示文本，否则默认显示枚举名。
示例：

csharp
using System ;
using System . ComponentModel ;
using BepInEx ;
using BepInEx . Configuration ;
using UnityEngine ;

namespace SimpleUI
{
[ BepInPlugin ( " aoe.top.plugins.SimpleUI " , " 简易UI示例 " , " 1.0.0.0 " )]
public class SimpleUI : BaseUnityPlugin
{
// 默认值
public static MyEnum MyEnumVal = MyEnum . Entry1 ;
public static ConfigEntry ValueList2 ;
[ Obsolete ]
void Start ()
{
ValueList2 = Config . AddSetting ( " 下拉列表2 " , " 值: " , MyEnumVal , new ConfigDescription ( " 这是一个下拉列表 " , null, new MyEnum ()));
}

void Update ()
{
if ( MyEnumVal != ValueList2 . Value )
{
Debug . Log ( " 下拉列表2发生了变化,新的值为： " + ValueList2 . Value );
MyEnumVal = ValueList2 . Value ;
}
}

// 枚举可以根据需求转换为int，只需在前面加一个 (int) 即可
// 如 int a = (int)MyEnum.Entry4;
public enum MyEnum
{
// Entry1 将在下拉框中 显示 Entry1
Entry1 ,
[ Description ( " 自定义显示 " )]
Entry2 ,
Entry3 = 10 ,
Entry4 = 36 ,
[ Description ( " 自定义显示2 " )]
Entry5 = 47 ,
Entry6
}
}
}

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45

运行结果：

### 添加键盘快捷键配置 ​

只需使用KeyboardShortcut即可轻松的帮你快速配置快捷键。
示例：

csharp
using System ;
using System . ComponentModel ;
using BepInEx ;
using BepInEx . Configuration ;
using UnityEngine ;

namespace SimpleUI
{
[ BepInPlugin ( " aoe.top.plugins.SimpleUI " , " 简易UI示例 " , " 1.0.0.0 " )]
public class SimpleUI : BaseUnityPlugin
{
private ConfigEntry ShowCounter { get ; set ; }

[ Obsolete ]
void Start ()
{
// 配置默认快捷键为 左Ctrl + U
ShowCounter = Config . AddSetting ( " 配置快捷键 " , " 快捷键 " , new BepInEx . Configuration . KeyboardShortcut ( KeyCode . U , KeyCode . LeftControl ));
}

void Update ()
{
if ( ShowCounter . Value . IsDown ())
{
Debug . Log ( " 按下了快捷键 " );
}
}
}
}

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29

运行结果：
