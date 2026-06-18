# 【Python】批量将文件夹以及子文件夹中的所有图片转换为webp | 小莫的博客园

Source: https://blog.aoe.top/Python/346
Friendly site: 小莫博客园
Group: AOE.TOP
Fetched: 2026-06-18T02:29:09.205Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 将指定文件夹中的所有图片批量转换为webp；将图片格式改为“xxxxxx.png@webp”；大家如果需要可以按照自己的需求修改； 如果只是单独转换一张，可以用 【Python】将图片转换为webp 需要安装PIL库： 1pip install pillow 12345678910111213141516171819202122232425262728# coding=utf-8import s

## Content

# 【Python】批量将文件夹以及子文件夹中的所有图片转换为webp

- 2023-07-07

- 作者 小莫

- 1. 调用格式：

将指定文件夹中的所有图片批量转换为webp；
将图片格式改为“xxxxxx.png@webp”；
大家如果需要可以按照自己的需求修改；

如果只是单独转换一张，可以用 【Python】将图片转换为webp

需要安装PIL库：

1

|
pip install pillow

|

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

|
# coding=utf-8
import sys,os
from PIL import Image

def pic_webp ( path,fileName ):
im = Image. open (path).convert( "RGBA" ) #获取图片信息
im.save(path+ "@webp" , "WEBP" ) #保存并转换为webp
print ( "成功转换：" +fileName)

# 统计数据
OK = 0
NG = 0
NGList = []

path =sys.argv[ 1 ] #图片集所在目录
for (dirpath,dirname,dirfile) in os.walk(path):
for fileName in dirfile: #遍历目录所有文件
try :
if fileName.split( "." )[ 1 ] in [ "png" , "jpeg" , "jpg" , "gif" , "webp" ]: #判断文件类型
pic_webp(os.path.join(dirpath,fileName),fileName) #执行转换函数
OK = OK+ 1
except IOError:
print ( "文件" +fileName+ "转换失败" )
NGList.append(os.path.join(dirpath,fileName))
NG = NG+ 1

print ( "完成," + str (OK)+ "个图片转换成功\n" + str (NG)+ "个图片转换失败,失败文件为" + str (NGList))

|

### 调用格式：

1

|
python main.py 图片所在目录

|

本作品采用 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 进行许可

打赏

分享

Python , webp , 批量 , 转换图片

最后编辑：2026-05-07

上一篇

下一篇
