# 【Python】批量上传图片到“新浪图床”并获取图片地址 | 小莫的博客园

Source: https://blog.aoe.top/Python/483
Friendly site: 小莫博客园
Group: AOE.TOP
Fetched: 2026-06-18T02:29:09.918Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 前段时间，准备整个随机图片API，然后就到网上爬取了2.8万+张图片，图片总量高达78.6 GB（其实图片只有42.5GB） 本来准备放自己的服务器的，然后发现我的服务器太小了放不进去。。。。 于是准备去薅资本家的羊毛，找了找，“新浪图床”不错（虽然新浪没有说过他们有图床）， 找到了前辈写的浏览器插件：https://github.com/Suxiaogang/WeiboPicBed 但这个对我

## Content

# 【Python】批量上传图片到“新浪图床”并获取图片地址

- 2023-07-07

- 作者 小莫

前段时间，准备整个随机图片API，然后就到网上爬取了2.8万+张图片，
图片总量高达78.6 GB（其实图片只有42.5GB）

本来准备放自己的服务器的，然后发现我的服务器太小了放不进去。。。。

于是准备去薅资本家的羊毛，找了找，“新浪图床”不错（虽然新浪没有说过他们有图床），

找到了前辈写的浏览器插件： https://github.com/Suxiaogang/WeiboPicBed

但这个对我来说需求不够（毕竟要上传2.8万张）

没办法，只能自己写Python脚本了。

在经历了各种失败和报错，找了各种资料，终于搞定了；

使用库 urllib3

上代码：

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

|
# coding=utf-8
import urllib3
import os
import json
import base64
import time

# 上传图片
def UpImg ( File ):
try :
http = urllib3.PoolManager()
# 设置UA和Cookie
headers = {
'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36' ,
'Cookie' : '你的新浪Ccookie' ,
}
# 上传接口
url = "https://picupload.weibo.com/interface/pic_upload.php?ori=1&mime=image%2Fjpeg&data=base64&url=0&markpos=1&logo=&nick=0&marks=1&app=miniblog"

f = open (File, 'rb' )
values = {
'b64_data' : base64.b64encode(f.read()), # 将图片转换为base64
'pic1' : File
}
f.close()
r = http.request( 'POST' , url, fields=values, headers=headers) # post方式调用上传接口

# 解析返回内容
data = r.data.decode( 'utf-8' )
data = data.replace( '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />' , '' )
data = data.replace( '<script type="text/javascript">document.domain="sina.com.cn";</script>' , '' )

# 解析返回的json
jData = json.loads(data)
pid = jData[ 'data' ][ 'pics' ][ 'pic_2' ][ 'pid' ]

# 拼接图片地址
imgUrl = 'http://ww1.sinaimg.cn/large/{pid}.jpg' . format (pid=pid)
print ( "图片{file}上传成功，地址：{imgUrl}" . format (file=File, imgUrl=imgUrl))
return imgUrl
except :
print ( "图片{file}上传失败,3秒后将重试" . format (file=File))
time.sleep( 3 )
UpImg(File)

if __name__ == '__main__' :
path = "需要上传的图片所在目录"
urlList = []
for file in os.listdir(path):
url = UpImg(path + "\\" + file)
# 写入图片地址到本地文件
f = open ( 'filelist.txt' , 'a+' )
f.write(url + "\n" )
f.close()

|

完成后：

最后附上我的随机图片API： https://api.aoe.top/Img/RandomBackgroundImg

图片列表地址： https://pan.aoe.top/images/SaveImgs

本作品采用 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 进行许可

打赏

分享

Python , 批量上传 , 新浪图库

最后编辑：2026-05-07

上一篇

下一篇
