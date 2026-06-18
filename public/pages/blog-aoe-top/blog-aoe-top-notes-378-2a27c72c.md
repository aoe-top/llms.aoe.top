# 【笔记】【jQuery】获取传递的get参数 使用sleep函数让程序等待/暂停/休息 | 小莫的博客园

Source: https://blog.aoe.top/notes/378
Friendly site: 小莫博客园
Group: AOE.TOP
Fetched: 2026-06-18T02:29:02.458Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 代码： 123456789101112131415161718192021(function($) { /** * 获取传递的get值 * @param name * @returns {string|null} */ $.getUrlParam = function(name) { let reg

## Content

# 【笔记】【jQuery】获取传递的get参数 使用sleep函数让程序等待/暂停/休息

- 2023-07-07

- 作者 小莫

代码：

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

|
( function ( $ ) {
/**
* 获取传递的get值
* @param name
* @returns { string|null }
*/
$.getUrlParam = function ( name ) {
let reg = new RegExp ( "(^|&)" + name + "=([^&]*)(&|$)" );
let r = window . location . search . substr ( 1 ). match (reg);
if (r != null ) return decodeURI (r[ 2 ]);
return null ;
}
/**
* 程序休息
* @param time
* @returns { Promise<unknown> }
*/
$.sleep = function ( time ) {
return new Promise ( ( resolve ) => setTimeout (resolve, time));
}
})(jQuery);

|

使用方法：

1
2
3
4
5
6
7

|
// 获取type的值
// 若是https://googl.com?type=1 那么 var type的值就是1
let type= $. getUrlParam ( 'type' );
//程序休眠100毫秒
$. sleep ( 100 ). then ( () => {
// 这里写sleep之后需要去做的事情
})

|

本作品采用 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 进行许可

打赏

分享

jQuery , jq , 笔记

最后编辑：2026-05-07

上一篇

下一篇
