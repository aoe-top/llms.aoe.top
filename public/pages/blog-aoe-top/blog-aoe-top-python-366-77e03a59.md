# 【Python】使用PyQt5 来为Python 制作 UI | 小莫的博客园

Source: https://blog.aoe.top/Python/366
Friendly site: 小莫博客园
Group: AOE.TOP
Fetched: 2026-06-18T02:29:09.345Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 安装插件：12pip install PyQt5pip instqll PyQt5-tools 引入包123from PyQt5 import QtWidgetsfrom PyQt5.QtWidgets import QApplication, QMainWindow, QMessageBoximport sys 定义一个主窗口类1234567# 窗口函数class MyWindow(QMainW

## Content

# 【Python】使用PyQt5 来为Python 制作 UI

- 2023-07-07

- 作者 小莫

- 1. 安装插件：
- 2. 引入包
- 3. 定义一个主窗口类
- 4. 添加UI控件
- 5. 按钮点击事件
- 6. 最后再初始化窗口
- 7. 完整代码列表

### 安装插件：

1
2

|
pip install PyQt5
pip instqll PyQt5-tools

|

### 引入包

1
2
3

|
from PyQt5 import QtWidgets
from PyQt5.QtWidgets import QApplication, QMainWindow, QMessageBox
import sys

|

### 定义一个主窗口类

1
2
3
4
5
6
7

|
# 窗口函数
class MyWindow ( QMainWindow ):
def __init__ ( self ):
super (MyWindow, self).__init__()
self.setGeometry( 200 , 250 , 500 , 250 ) # 申明一个x坐标200 x坐标250 宽500 高250 的窗口
self.setWindowTitle( "一个窗口" ) # 窗口标题
self.initUI()

|

### 添加UI控件

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

|
# UI入口
def initUI ( self ):
# 创建label
self.label = QtWidgets.QLabel(self)
self.label.setText( "这是一个Label!" )
self.label.move( 50 , 50 ) # 定位坐标 x, y
# 创建按钮1
self.b1 = QtWidgets.QPushButton(self)
self.b1.setText( "按钮1" )
self.b1.move( 100 , 100 )
self.b1.clicked.connect(self.clicked) # 按钮点击执行函数
# 创建一个按钮2
self.b2 = QtWidgets.QPushButton(self)
self.b2.setText( "按钮2" )
self.b2.move( 250 , 100 )
self.b2.clicked.connect(self.showMsgBox)

|

### 按钮点击事件

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

|
# 按钮1点击
def clicked ( self ):
self.label.setText( "点击按钮后我被改变了" )
self.update()

# 更新label宽度
def update ( self ):
self.label.adjustSize()

# 消息弹窗
def showMsgBox ( self ):
msg = QMessageBox()
msg.setWindowTitle( "弹窗提示" ) # 弹窗标题
msg.setText( "这是一个消息弹窗" ) # 弹窗内容
msg.setIcon(QMessageBox.Information) # 弹窗图标
x = msg.exec_() # 弹窗关闭

|

### 最后再初始化窗口

1
2
3
4
5
6
7
8
9

|
# 初始化窗口
def window ():
app = QApplication(sys.argv)
win = MyWindow()
win.show()
sys.exit(app.exec_())

window()

|

### 完整代码列表

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

|
# coding=utf-8
from PyQt5 import QtWidgets
from PyQt5.QtWidgets import QApplication, QMainWindow, QMessageBox
import sys

# 窗口函数
class MyWindow ( QMainWindow ):
def __init__ ( self ):
super (MyWindow, self).__init__()
self.setGeometry( 200 , 250 , 500 , 250 ) # 申明一个x坐标200 x坐标250 宽500 高250 的窗口
self.setWindowTitle( "一个窗口" ) # 窗口标题
self.initUI()

# UI入口
def initUI ( self ):
# 创建label
self.label = QtWidgets.QLabel(self)
self.label.setText( "这是一个Label!" )
self.label.move( 50 , 50 ) # 定位坐标 x, y
# 创建按钮1
self.b1 = QtWidgets.QPushButton(self)
self.b1.setText( "按钮1" )
self.b1.move( 100 , 100 )
self.b1.clicked.connect(self.clicked) # 按钮点击执行函数
# 创建一个按钮2
self.b2 = QtWidgets.QPushButton(self)
self.b2.setText( "按钮2" )
self.b2.move( 250 , 100 )
self.b2.clicked.connect(self.showMsgBox)

# 按钮1点击
def clicked ( self ):
self.label.setText( "点击按钮后我被改变了" )
self.update()

# 更新label宽度
def update ( self ):
self.label.adjustSize()

# 消息弹窗
def showMsgBox ( self ):
msg = QMessageBox()
msg.setWindowTitle( "弹窗提示" ) # 弹窗标题
msg.setText( "这是一个消息弹窗" ) # 弹窗内容
msg.setIcon(QMessageBox.Information) # 弹窗图标
x = msg.exec_() # 弹窗关闭

# 初始化窗口
def window ():
app = QApplication(sys.argv)
win = MyWindow()
win.show()
sys.exit(app.exec_())

window()

|

本作品采用 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 进行许可

打赏

分享

PyQt5 , Python , QT , UI

最后编辑：2026-05-07

上一篇

下一篇
