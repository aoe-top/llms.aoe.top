# 我的世界 Ubuntu 开服记录 | 小莫的博客园

Source: https://blog.aoe.top/Minecraft/631
Friendly site: 小莫博客园
Group: AOE.TOP
Fetched: 2026-06-18T02:29:21.436Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 前置依赖安装Java1apt install openjdk-17-jdk 服务器文件下载地址: https://files.minecraftforge.net/net/minecraftforge/forge/ 初始化服务器创建一个服务器目录/Minecraft/mcserver下载的 forge-1.20.1-47.1.0-installer.jar 上传到mcserver目录来 1234

## Content

# 我的世界 Ubuntu 开服记录

- 2023-07-28

- 作者 小莫

- 1. 前置依赖 1.1. 安装Java
- 1.2. 服务器文件
- 2. 初始化服务器
- 3. 配置服务器
- 4. 启动服务器
- 5. 安装Mod

### 前置依赖

#### 安装Java

1

|
apt install openjdk-17-jdk

|

#### 服务器文件

下载地址: https://files.minecraftforge.net/net/minecraftforge/forge/

### 初始化服务器

创建一个服务器目录 /Minecraft/mcserver
下载的 forge-1.20.1-47.1.0-installer.jar 上传到 mcserver 目录来

1
2
3
4

|
cd /Minecraft/mcserver

# 初始化
java -jar forge-1.20.1-47.1.0-installer.jar -install

|

### 配置服务器

上面初始化之后，可以在 /Minecraft/mcserver 里面找到 server.properties 文件, 这个就是服务器的配置文件,

有几个重要的参数你需要知道:

1
2
3
4

|
server-port = 25575 # 服务器端口号 你需要在防火墙内开启对应的端口
gamemode =survival # 游戏模式
online-mode = true # 是否联网验证 如果开启未购买正版的玩家无法链接
max-players = 20 # 最大玩家数量

|

编辑 eula.txt 文件，将 eula=fakse 改成 eula=true

### 启动服务器

1

|
bash run.sh

|

### 安装Mod

将对应版本的Mod文件放入 mods 文件夹即可

本作品采用 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 进行许可

打赏

分享

Ubuntu , forge , 无第十三届 , 服务器

最后编辑：2026-05-07

上一篇

下一篇
