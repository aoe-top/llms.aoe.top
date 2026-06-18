# [Ubuntu] 如何开启SSH服务远程登录服务 | 小莫的博客园

Source: https://blog.aoe.top/Ubuntu/630
Friendly site: 小莫博客园
Group: AOE.TOP
Fetched: 2026-06-18T02:29:13.201Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 安装查看是否安装了 ssh-server 服务1dpkg -l | grep ssh 安装ssh-server服务12sudo -iapt-get install openssh-server 再次查看安装的服务1dpkg -l | grep ssh 确认ssh-server是否启动1ps -e | grep ssh 登陆SSH（Linux）Windows登录直接运行cmd ，然后在里面输

## Content

# [Ubuntu] 如何开启SSH服务远程登录服务

- 2023-07-25

- 作者 小莫

- 1. 安装 1.1. 查看是否安装了 ssh-server 服务
- 1.2. 安装ssh-server服务
- 1.3. 再次查看安装的服务
- 1.4. 确认ssh-server是否启动
- 2. 登陆SSH（Linux） 2.1. Windows登录

## 安装

### 查看是否安装了 ssh-server 服务

1

|
dpkg -l | grep ssh

|

### 安装ssh-server服务

1
2

|
sudo -i
apt-get install openssh-server

|

### 再次查看安装的服务

1

|
dpkg -l | grep ssh

|

### 确认ssh-server是否启动

1

|
ps -e | grep ssh

|

## 登陆SSH（Linux）

### Windows登录

直接运行cmd ，然后在里面输入

1

|
ssh username@192.168.1.103

|

其中，username为192.168.1.103机器上的用户，需要输入密码。
断开连接：exit

本作品采用 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 进行许可

打赏

分享

Ubuntu , ssh , 远程登录

最后编辑：2026-05-07

上一篇

下一篇
