# 【Python】用Python处理&合并分片文件 | 小莫的博客园

Source: https://blog.aoe.top/Python/345
Friendly site: 小莫博客园
Group: AOE.TOP
Fetched: 2026-06-18T02:29:09.018Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 我写的第二个Python功能，这次不需要安装额外的库；将一个文件夹中的被分片的文件（如XXXX1,XXXX2,XXXX3,XXXX4）合并为当初的一个整体；比如说合并分卷压缩的压缩包，分片上传到服务器的大型文件，等等 代码1234567891011121314151617181920212223242526272829303132# coding=utf-8import sys,osdef Mer

## Content

# 【Python】用Python处理&合并分片文件

- 2023-07-07

- 作者 小莫

- 1. 代码
- 2. 调用格式

我写的第二个Python功能，这次不需要安装额外的库；
将一个文件夹中的被分片的文件（如XXXX1,XXXX2,XXXX3,XXXX4）合并为当初的一个整体；
比如说合并分卷压缩的压缩包，分片上传到服务器的大型文件，等等

### 代码

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

|
# coding=utf-8
import sys,os

def MergeFiles ( fromdir,todir,filename,newFileName ):
if not os.path.exists(todir): #判断是否有保存的目录
os.mkdir(todir) #没有则创建一个
if not os.path.exists(fromdir): #判断是否有临时文件目录
print ( "not folder" ) #没有则返回错误
return

outfile = open (os.path.join(todir,newFileName), 'wb' ) #创建一个空文件，作为目标文件
files = os.listdir(fromdir) #列出目录中的所有块
fileName =[]
for x in range ( 0 , len (files)):
fileName.append(filename+ str (x)) #写入文件列表
pass
for file in fileName:
filepath = os.path.join(fromdir,file) #获取文件目录
infile = open (filepath, 'rb' ) #打开文件
data = infile.read() #读取文件数据
outfile.write(data) #将文件数据写入目标文件
infile.close() #关闭文件
os.remove(filepath) #删除已合成的文件
outfile.close() #关闭合成后的文件
print ( "Is ok" )

fromdir = sys.argv[ 1 ] #包含文件的目录
todir = sys.argv[ 2 ] #最终保存的文件目录
filename = sys.argv[ 3 ] #需要合成的文件名
newFileName = sys.argv[ 4 ] #合成后保存的文件名

MergeFiles(fromdir,todir,filename,newFileName)

|

### 调用格式

1

|
python main.py 文件目录 保存目录 文件原名称 文件保存名称

|

本作品采用 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 进行许可

打赏

分享

Python , 分片 , 合并 , 文件

最后编辑：2026-05-07

上一篇

下一篇
