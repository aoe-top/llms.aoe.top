# 【Python】自动白嫖EPIC游戏脚本 支持多账号 | 小莫的博客园

Source: https://blog.aoe.top/Python/441
Friendly site: 小莫博客园
Group: AOE.TOP
Fetched: 2026-06-18T02:29:09.723Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 注意这个库的接口已经被Epic禁用，库也下架了 前言昨天，一只萝莉过来跟我说，明天（也就是今天）可以白嫖“战争游戏：红龙”，我好奇的问了一句：“在哪？”她告诉我是“EPIC”。我才想起来，好像EPIC每周都可以白嫖游戏来着，但我又懒得去登录Epic；那么，有没有一个可以直接不用登录也可以领取游戏的工具呢？用万能的Google搜了一圈，找到了GitHub上大佬的开源项目： EpicGames F

## Content

# 【Python】自动白嫖EPIC游戏脚本 支持多账号

- 2023-07-07

- 作者 小莫

- 1. 前言
- 2. 安装依赖
- 3. 脚本代码
- 4. 自动运行

注意
这个库的接口已经被Epic禁用，库也下架了

### 前言

昨天，一只萝莉过来跟我说，明天（也就是今天）可以白嫖“战争游戏：红龙”，
我好奇的问了一句：“在哪？”
她告诉我是“EPIC”。
我才想起来，好像EPIC每周都可以白嫖游戏来着，但我又懒得去登录Epic；
那么，有没有一个可以直接不用登录也可以领取游戏的工具呢？
用万能的Google搜了一圈，找到了GitHub上大佬的开源项目： EpicGames Freebies Claimer

正当我高兴的时候，突然看到是 Node.js 编译的，突然想起曾经被Node.js支配的恐惧（现在的我已经反向支配Node了！）。

那么我比较熟悉又简单的python有没有相似的东西呢？

我又缩小范围搜了一下，诶？还真有： epic-games-bot

### 安装依赖

python版本要求 >=3.7 因为playwright只支持3.7以上的版本
安装epic-games-bot

1
2
3

|
pip3.7 install epic-games-bot
或
pip3.7 install -i https://mirrors.aliyun.com/pypi/simple epic-games-bot

|

为 playwright 安装浏览器：

1

|
python -m playwright install

|

如果是在Linux服务器中运行，可能还需要安装浏览器支持控件：

1
2

|
yum -y install libappindicator-gtk3
yum -y install liberation-fonts

|

### 脚本代码

其实，作者的示例代码基本已经写的差不多了，我只是在这基础上增加多账号支持而已：

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

|
# coding=utf-8
import json
import time
from epic_games_bot import EpicGamesBot
from pathlib import Path
from playwright.sync_api import sync_playwright

def Run ( Playwright, username, password ):
cookies_path = Path( "cookies.json" )
browser = None
print ( "初始化完成" )
try :
browser = Playwright.firefox.launch()
page = browser.new_page()
bot = EpicGamesBot(page)
print ( "正在登录。。。" )
bot.log_in( None , username, password)
print ( "登录成功！" )
purchased_offer_urls = bot.purchase_free_promotional_offers()
[ print (url) for url in purchased_offer_urls]
cookies_path.write_text(json.dumps(bot.cookies))
print ( "{name} 领取完成" . format (name=username))
browser.close()
except Exception:
if browser:
browser.close()
print ( "发生错误,领取失败" )
raise

if __name__ == '__main__' :
CA = EpicGamesBot.list_free_promotional_offers() # 免费游戏列表
print (CA)
# 用户列表
userList = [
{
'username' : '你的EPIC账号1' ,
'password' : '你的EPIC密码1'
},
{
'username' : '你的EPIC账号2' ,
'password' : '你的EPIC密码2'
}
]
for val in userList:
with sync_playwright() as playwright:
Run(playwright, val[ 'username' ], val[ 'password' ])
# 休息20秒再登录下一个账号 防止被K
time.sleep( 20 )

|

### 自动运行

最后，把脚本放到服务器，定时每周五运行即可，然后就等着白嫖吧

本作品采用 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 进行许可

打赏

分享

EPIC , Python , 脚本

最后编辑：2026-05-07

上一篇

下一篇
