# 【笔记】Biny框架进行用户发布Mod数量统计 | 小莫的博客园

Source: https://blog.aoe.top/notes/300
Friendly site: 小莫博客园
Group: AOE.TOP
Fetched: 2026-06-18T02:29:01.966Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 记录一下，统计用户Mod发布数量 需求 从“mods”表中获取mod数量； 从‘user’表中获取用户昵称； 按照用户发布mod数量进行排序； 利用框架的“group”来实现原始SQL中的 12from (select mods_publish,count(1) as user_days 使用框架后的PHP代码： 123456789101112131415161718$pageSize = 20

## Content

# 【笔记】Biny框架进行用户发布Mod数量统计

- 2023-07-07

- 作者 小莫

- 1. 需求

记录一下，统计用户Mod发布数量

### 需求

- 从“mods”表中获取mod数量；

- 从‘user’表中获取用户昵称；

- 按照用户发布mod数量进行排序；

利用框架的“group”来实现原始SQL中的

1
2

|
from ( select mods_publish, count ( 1 ) as user_days

|

使用框架后的PHP代码：

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

|
$pageSize = 20 ; //每页数量
$pageIndex = 1 ; //当前页数

$DAO = $this ->modsDAO;
$DAO = $DAO -> leftJoin ( $this ->userDAO, array ( 'mods_userId' => 'id' )); //左联接user表
$DAO = $DAO -> filter ([ 'mods' => array ( '!=' => array ( 'mods_state' => array (- 1 , - 2 ,- 5 )))]); //判断Mod状态

//....可以在这里进行其他条件筛选或搜索

$count = $DAO -> count ( 'mods_userId' ); //统计数据
$data = $DAO -> group ([ 'mods' => 'mods_userId' ])-> addition ( array (
array (
'count' => array ( 'id' => 'user_days' )
)
))-> order ( array ( 'user_days' => 'desc' ))-> limit ( $pageSize , $pageIndex )-> query ( array (
'mods' =>[ 'mods_userId' ],
'user' =>[ 'user_Name' ]
));

|

运行后输出的结果：

1
2
3
4
5
6

|
array (
[ 'mods_userId' => '8' , 'user_days' => '23' , 'user_Name' => '小明' ],
[ 'mods_userId' => '36' , 'user_days' => '15' , 'user_Name' => '小红' ],
[ 'mods_userId' => '13' , 'user_days' => '10' , 'user_Name' => '小刚' ],
[ 'mods_userId' => '46' , 'user_days' => '5' , 'user_Name' => '小强' ]
);

|

本作品采用 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 进行许可

打赏

分享

笔记

最后编辑：2026-05-07

上一篇

下一篇
