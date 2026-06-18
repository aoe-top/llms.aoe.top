# 【笔记】Biny框架多联表格 | 小莫的博客园

Source: https://blog.aoe.top/notes/336
Friendly site: 小莫博客园
Group: AOE.TOP
Fetched: 2026-06-18T02:29:02.055Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 使用Bint的leftJoin多联数据库表格 这个比较常用，但又比较复杂，为了防止我自己忘记，写段示例来加深一下印象 1234567891011121314151617//leftJoin的使用$DAO = $this->modsDAO;$DAO = $DAO->leftJoin($this->mods_typeDAO,array('mods_type_id'

## Content

# 【笔记】Biny框架多联表格

- 2023-07-07

- 作者 小莫

使用Bint的leftJoin多联数据库表格

这个比较常用，但又比较复杂，为了防止我自己忘记，写段示例来加深一下印象

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

|
//leftJoin的使用
$DAO = $this ->modsDAO;
$DAO = $DAO -> leftJoin ( $this ->mods_typeDAO, array ( 'mods_type_id' => 'id' )); //左联接mods_type
$DAO = $DAO -> leftJoin ( $this ->gameDAO, array ( array ( 'game_id' => 'id' ))); //左联接game
$DAO = $DAO -> leftJoin ( $this ->userDAO, array ( array ( 'mods_publish' => 'id' ))); //左联接user

//进行数据筛选查询
$DAO = $DAO -> filter ([ 'mods' => array ( '!=' => array ( 'mods_state' => array (- 1 , - 2 ,- 5 )))]);
$DAO = $DAO -> filter ([ 'mods' => array ( 'mods_type_id' => $modsType_id )]);

//分页并输出
$data = $DAO -> limit ( 20 , ( $pageIndex - 1 ) * 20 )-> query ( array (
'mods' => array ( 'id' , 'game_id' , 'mods_type_id' , 'mods_title' , 'mods_image_url' , 'mods_desc' , 'mods_click_cnt' , 'mods_download_cnt' ),
'mods_type' => array ( 'mods_type_name' ),
'game' => array ( 'game_path' , 'game_name' , 'game_imgUrl' ),
'user' => array ( 'user_nickName' )
));

|

本作品采用 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 进行许可

打赏

分享

Biny , PHP , 多联 , 数据库

最后编辑：2026-05-07

上一篇

下一篇
