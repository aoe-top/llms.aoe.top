# 【Python】爬虫之使用伪装来反“反爬虫”机制 | 小莫的博客园

Source: https://blog.aoe.top/Python/359
Friendly site: 小莫博客园
Group: AOE.TOP
Fetched: 2026-06-18T02:29:09.352Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 如果遇到某些网站有反爬虫的时候，就需要用到反反爬虫功能了，安装依赖库 1pip install urllib3 代码：1234567891011import urllib3#建立连接http = urllib3.PoolManager()#设置User-Agentuser_agent = 'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT)&#

## Content

# 【Python】爬虫之使用伪装来反“反爬虫”机制

- 2023-07-07

- 作者 小莫

- 1. 代码：

如果遇到某些网站有反爬虫的时候，就需要用到反反爬虫功能了，
安装依赖库

1

|
pip install urllib3

|

### 代码：

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

|
import urllib3
#建立连接
http = urllib3.PoolManager()
#设置User-Agent
user_agent = 'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT)'
#使用指定的User-Agent进行访问
r = http.request( 'GET' , 'https://mod.3dmgame.com/mod/API/147160' , headers={
'User-Agent' : user_agent
})
#打印数据
print (r.data.decode( 'utf-8' ))

|

以上内容输出

1

|
{"id":"147160","mods_version":"0.81","mods_author":"◕小莫◕","mods_click_cnt":289410,"mods_download_cnt":89079,"mods_mark_cnt":36727,"mods_collection_cnt":18679,"mods_updateTime":"2020-03-29 15:39:57"}

|

本作品采用 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 进行许可

打赏

分享

Python , 反爬虫 , 爬虫

最后编辑：2026-05-07

上一篇

下一篇
