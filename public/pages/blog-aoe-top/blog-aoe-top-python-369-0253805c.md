# 【Python】多进程执行方法 | 小莫的博客园

Source: https://blog.aoe.top/Python/369
Friendly site: 小莫博客园
Group: AOE.TOP
Fetched: 2026-06-18T02:29:09.560Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: Python多进程模块Python中的多进程是通过multiprocessing包来实现的，和多线程的threading.Thread差不多，它可以利用multiprocessing.Process对象来创建一个进程对象。这个进程对象的方法和线程对象的方法差不多也有start(), run(), join()等方法，其中有一个方法不同Thread线程对象中的守护线程方法是setDeamon，而Pr

## Content

# 【Python】多进程执行方法

- 2023-07-07

- 作者 小莫

- 1. Python多进程模块
- 2. Python多进程实现方法：

### Python多进程模块

Python中的多进程是通过multiprocessing包来实现的，和多线程的threading.Thread差不多，它可以利用multiprocessing.Process对象来创建一个进程对象。
这个进程对象的方法和线程对象的方法差不多也有start(), run(), join()等方法，其中有一个方法不同Thread线程对象中的守护线程方法是setDeamon，而Process进程对象的守护进程是通过设置daemon属性来完成的。

### Python多进程实现方法：

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

|
from multiprocessing import Process

def fun1 ( num ):
for I in range ( 5 ):
print ( '多进程测试,第{num}个,进行到{I}' . format (num=num, I=I))
time.sleep( 1 )

if __name__ == '__main__' :
process_list = []
p = []
for i in range ( 5 ): # 开启5个子进程执行fun1函数
p = Process(target=fun1, args=( 'Python' , i)) # 实例化进程对象
p.start() # 启动子进程
process_list.append(p)

for i in process_list:
# 等待子进程完成
p.join()

print ( '结束测试' )

|

本作品采用 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 进行许可

打赏

分享

Python , 多线程

最后编辑：2026-05-07

上一篇

下一篇
