# Mapbox GL 中文文档 | 小莫的维基库

Source: https://wiki.aoe.top/OtherTutrial/Mapbox/a.guides/a.README.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:28:51.174Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# Mapbox GL 中文文档 ​

当前版本：v3.11.0 查看更新日志

- [x] 自定义地图样式
- [x] 快速矢量地图
- [x] 与其他Mapbox工具兼容
安装 | 在GitHub上贡献

Mapbox GL JS是一个客户端JavaScript库，用于使用Mapbox的现代地图技术构建Web地图和Web应用程序。您可以使用Mapbox GL JS在Web浏览器或客户端中显示Mapbox地图，添加用户交互功能，并自定义应用程序中的地图体验。

html
<! DOCTYPE html >
< html >

< head >
< meta charset = " utf-8 " >
< title > Guides </ title >
< meta name = " viewport " content = " initial-scale=1,maximum-scale=1,user-scalable=no " >
< link href = " https://api.mapbox.com/mapbox-gl-js/v3.11.0/mapbox-gl.css " rel = " stylesheet " >
< script src = " https://api.mapbox.com/mapbox-gl-js/v3.11.0/mapbox-gl.js " ></ script >
< style >
body {
margin : 0 ;
padding : 0 ;
}

# map {
position : absolute ;
top : 0 ;
bottom : 0 ;
width : 100% ;
}
</ style >
</ head >

< body >
< div id = " map " ></ div >
< script >
mapboxgl . accessToken = ' [REDACTED_MAPBOX_TOKEN] ' ;
const map = new mapboxgl . Map ( {
container : ' map ' ,
style : ' mapbox://styles/mapbox/streets-v9 ' ,
projection : ' globe ' , // 将地图显示为地球仪，因为 satellite-v9 默认为墨卡托投影
zoom : 1 ,
center : [ 30 , 15 ]
} ) ;

map . addControl ( new mapboxgl . NavigationControl ()) ;
map . scrollZoom . disable () ;

map . on ( ' style.load ' , () => {
map . setFog ( {} ) ; // 设置默认大气样式
} ) ;

// 以下值可以更改以控制旋转速度：

// 在低缩放级别下，每两分钟完成一次旋转。
const secondsPerRevolution = 240 ;
// 在缩放级别5以上，不旋转。
const maxSpinZoom = 5 ;
// 在缩放级别3和5之间以中间速度旋转。
const slowSpinZoom = 3 ;

let userInteracting = false ;
const spinEnabled = true ;

function spinGlobe () {
const zoom = map . getZoom () ;
if ( spinEnabled && ! userInteracting && zoom < maxSpinZoom ) {
let distancePerSecond = 360 / secondsPerRevolution ;
if ( zoom > slowSpinZoom ) {
// 在较高缩放级别下减慢旋转速度
const zoomDif =
( maxSpinZoom - zoom ) / ( maxSpinZoom - slowSpinZoom ) ;
distancePerSecond *= zoomDif ;
}
const center = map . getCenter () ;
center . lng -= distancePerSecond ;
// 平滑地在一秒内为地图设置动画。
// 当此动画完成时，它会触发一个 'moveend' 事件。
map . easeTo ( { center , duration : 1000 , easing : ( n ) => n } ) ;
}
}

// 在交互时暂停旋转
map . on ( ' mousedown ' , () => {
userInteracting = true ;
} ) ;
map . on ( ' dragstart ' , () => {
userInteracting = true ;
} ) ;

// 当动画完成且没有正在进行的交互时，开始旋转
map . on ( ' moveend ' , () => {
spinGlobe () ;
} ) ;

spinGlobe () ;
</ script >

</ body >

</ html >

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
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92

在本页上了解有关如何在您自己的应用程序中使用Mapbox GL JS的更多信息。想立即开始使用？请查看 快速入门指南 ，或查看我们的 示例 。

## 使用场景 ​

Mapbox GL JS的使用场景包括：

- 可视化和动画地理数据
- 查询和过滤地图上的特征
- 在Mapbox样式的图层之间放置您的数据
- 动态显示和样式化地图上的自定义客户端数据
- 3D数据可视化和动画
- 以编程方式向地图添加标记和弹出窗口
有关Mapbox GL JS功能的更多灵感，请参阅我们的 教程 、 示例 和Mapbox 客户展示页面 。

## 核心概念 ​

### Mapbox GL ​

Mapbox GL JS中的"GL"指的是 Mapbox GL ，这是一个图形库，可以在任何兼容的Web浏览器中使用 OpenGL 将2D和3D Mapbox地图呈现为动态视觉图形，无需使用额外插件。

### 客户端渲染 ​

Mapbox GL JS依赖于客户端渲染。Mapbox GL JS地图是通过在浏览器中而不是在服务器上将矢量切片与样式规则相结合来动态渲染的，这使得可以根据用户交互更改地图的样式和显示的数据。

### Map类 ​

mapboxgl.Map 类是每个Mapbox GL JS项目的基础。本节中的示例代码演示了将地图添加到页面所需的最少内容：

js
mapboxgl . accessToken = ' <your access token here> ' ;
const map = new mapboxgl . Map ( {
container : ' map ' , // container ID
style : ' mapbox://styles/mapbox/streets-v12 ' , // style URL
center : [ - 74.5 , 40 ] , // starting position [lng, lat]
zoom : 9 // starting zoom
} ) ;

1
2
3
4
5
6
7

- accessToken：此Mapbox访问令牌将您的Mapbox GL JS地图与Mapbox账户关联。
- container：放置地图的HTML元素。在上面的示例中，此元素是ID为"map"的
。
- style：用于确定地图包含哪些图块集以及如何设置样式的地图样式的样式URL。上面的示例使用Mapbox Streets v12样式。当没有向Map构造函数提供样式选项时，默认启用Mapbox标准样式。
- center：地图起始位置的坐标，按经度、纬度顺序排列。
- zoom：应初始化地图的缩放级别。这可以是整数或小数值。
