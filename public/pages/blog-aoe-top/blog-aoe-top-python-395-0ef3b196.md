# 【Python】读取INI文件作为配置文件并定义编码 | 小莫的博客园

Source: https://blog.aoe.top/Python/395
Friendly site: 小莫博客园
Group: AOE.TOP
Fetched: 2026-06-18T02:29:09.685Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 遇到问题，解决问题，记录解决方案，一气呵成 12345678910111213141516171819202122from configparser import ConfigParser''';config.ini[DEFAULT]ServerAliveInterval = 45Compression = yesCompressionLevel = 9Forward

## Content

# 【Python】读取INI文件作为配置文件并定义编码

- 2023-07-07

- 作者 小莫

遇到问题，解决问题，记录解决方案，一气呵成

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
from configparser import ConfigParser

'''
;config.ini
[DEFAULT]
ServerAliveInterval = 45
Compression = yes
CompressionLevel = 9
ForwardX11 = yes
'''
cfg = ConfigParser()
# 用utf-8编码打开config.ini文件
cfg.read( 'config.ini' , encoding= "utf-8" )
cfg.sections()

cfg.get( 'DEFAULT' , 'ServerAliveInterval' )
cfg.get( 'DEFAULT' , 'Compression' )
cfg.get( 'DEFAULT' , 'CompressionLevel' )
cfg.get( 'DEFAULT' , 'ForwardX11' )

|

本作品采用 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 进行许可

打赏

分享

Ini , Python

最后编辑：2026-05-07

上一篇

下一篇
