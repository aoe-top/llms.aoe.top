# 【笔记】用JavaScript发送邮件 JS自定义游戏内容 | 小莫的博客园

Source: https://blog.aoe.top/notes/254
Friendly site: 小莫博客园
Group: AOE.TOP
Fetched: 2026-06-18T02:29:01.938Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 我在写Mod站反馈的时候，准备为反馈方式改成发送邮件的方式，为了降低用户反馈的步骤，决定写个邮件发送模板，反馈页面地址是： https://mod.3dmgame.com/mod/feedback大家如果要用到的时候，可以参考一下 正常的a标签在发送邮件的时候，是用 <a href="mailto:mod@3dmgame.com" >mod@3dmgame.com</a&g

## Content

# 【笔记】用JavaScript发送邮件 JS自定义游戏内容

- 2023-07-07

- 作者 小莫

我在写Mod站反馈的时候，准备为反馈方式改成发送邮件的方式，
为了降低用户反馈的步骤，决定写个邮件发送模板，
反馈页面地址是：
https://mod.3dmgame.com/mod/feedback
大家如果要用到的时候，可以参考一下

正常的a标签在发送邮件的时候，是用

<a href="mailto:mod@3dmgame.com" >mod@3dmgame.com</a>

除此之外，“mailto:”还有几个参数，传递方式为get：

- to:收件人

- suject：邮件标题

- cc：抄送

- bcc：暗抄送

- body：内容

比如说

1
2

|
< a href = "mailto:mod@3dmgame.com?suject=这是标题&body=这是内容&cc=admin@aoe.top" > mod@3dmgame.com </ a >

|

了解了这些，我们就可以用JS来实现了：

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

|
let initSubject= '【3DM Mod站反馈】意见提交' ;
let initTo= 'mod@3dmgame.com' ;
let initBody= '意见或想法：' ;

function submitHandler ( )
{
let subject = initSubject;
let to = initTo;
let body = initBody;
mailTo. href = "mailto:" +to+ "?&subject=" +subject+ "&body=" +body;
mailTo. click ();
}

|

在HTML中加个空的a标签，

1
2

|
< a href = "mailto:" id = "mailTo" > mod@3dmgame.com </ a >

|

然后写个按钮调用“submitHandler()”方法就行了：

1
2

|
< div class = "btn btn-primary pull-right" onclick = "submitHandler()" > 发送邮件 </ div >

|

本作品采用 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 进行许可

打赏

分享

JS , 笔记 , 邮件

最后编辑：2026-05-07

上一篇

下一篇
