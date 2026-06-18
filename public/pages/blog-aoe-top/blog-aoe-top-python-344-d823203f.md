# 【Python】将图片转换为webp | 小莫的博客园

Source: https://blog.aoe.top/Python/344
Friendly site: 小莫博客园
Group: AOE.TOP
Fetched: 2026-06-18T02:29:08.815Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 我发现Python真的是非常的简单，只需要几行代码就能完成C#需要一大段才能完成的功能；就是安装依赖库有点麻烦，这是我写的第一个Python代码 如果需要批量转换一堆图片，可以用【Python】批量将文件夹以及子文件夹中的所有图片转换为webp 下面代码需要先安装PIL库： 1pip install pillow 转换图片为webp完整代码： 123456789101112# coding=utf

## Content

# 【Python】将图片转换为webp

- 2023-07-07

- 作者 小莫

我发现Python真的是非常的简单，只需要几行代码就能完成C#需要一大段才能完成的功能；
就是安装依赖库有点麻烦，
这是我写的第一个Python代码

如果需要批量转换一堆图片，可以用 【Python】批量将文件夹以及子文件夹中的所有图片转换为webp

下面代码需要先安装PIL库：

1

|
pip install pillow

|

转换图片为webp完整代码：

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
# coding=utf-8
import sys
from PIL import Image

img = sys.argv[ 1 ]
# img = "MOD5ee1eb8d2df33.png"
if img != "" :
im = Image. open (img).convert( "RGBA" )
im.save(img+ ".webp" , "WEBP" )
print ( "成功转换图片:" +img)
else :
print ( "未接收到图片" )

|

调用格式：

1

|
python main.py 需要转换的图片

|

本作品采用 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 进行许可

打赏

分享

Python , webp , 图片

最后编辑：2026-05-07

上一篇

下一篇
