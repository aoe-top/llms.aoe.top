# 【Google云】使用账号密码连接服务器 | 小莫的博客园

Source: https://blog.aoe.top/notes/352
Friendly site: 小莫博客园
Group: AOE.TOP
Fetched: 2026-06-18T02:29:02.311Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 1.用root用户登入1.1.进入谷歌云实例面板 1.2.切换到root角色 1sudo -i 1.3.修改SSH配置文件/etc/ssh/sshd_config 1vi /etc/ssh/sshd_config 修改PermitRootLogin和PasswordAuthentication为yes 12345# Authentication:PermitRoo

## Content

# 【Google云】使用账号密码连接服务器

- 2023-07-07

- 作者 小莫

1.用root用户登入
1.1.进入谷歌云实例面板

1.2.切换到root角色

1

|
sudo -i

|

1.3.修改SSH配置文件/etc/ssh/sshd_config

1

|
vi /etc/ssh/sshd_config

|

修改PermitRootLogin和PasswordAuthentication为yes

1
2
3
4
5

|
# Authentication:
PermitRootLogin yes //默认为no，需要开启root用户访问改为yes

# Change to no to disable tunnelled clear text passwords
PasswordAuthentication yes //默认为no，改为yes开启密码登陆

|

设置好后按shift+ZZ保存文件

1.4.给root用户设置密码

1

|
passwd root

|

1.5.重启SSH服务使修改生效

1

|
/etc/init.d/ssh restart

|

本作品采用 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 进行许可

打赏

分享

Google云 , 服务器 , 笔记 , 账号密码

最后编辑：2026-05-07

上一篇

下一篇
