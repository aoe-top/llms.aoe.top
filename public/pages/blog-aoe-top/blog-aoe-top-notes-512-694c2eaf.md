# Ubuntu Git 相关操作记录 | 小莫的博客园

Source: https://blog.aoe.top/notes/512
Friendly site: 小莫博客园
Group: AOE.TOP
Fetched: 2026-06-18T02:29:03.749Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 远端拉取 1git clone https://github.com/3DMXM/OneX.git 提交修改 1git stash 下载远程代码并合并 1git pull 上传远程代码并合并 1git push 如果本地文件进行了修改，在下载远程代码时，需要先进行 git stash 12345678910111213141516171819202122232425262728293031g

## Content

# Ubuntu Git 相关操作记录

- 2023-07-07

- 作者 小莫

远端拉取

1

|
git clone https://github.com/3DMXM/OneX.git

|

提交修改

1

|
git stash

|

下载远程代码并合并

1

|
git pull

|

上传远程代码并合并

1

|
git push

|

如果本地文件进行了修改，在下载远程代码时，需要先进行 git stash

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

|
git clone http://xxx.com 克隆代码
git pull orgin master 拉去最新代码 git pull == git pull origin master | git push -u origin master
git push origin master 推送当前代码到线上仓库 origin 仓库名 master 当前分支名

git status 查看当前分支代码改动
git checkout branchname 切换分支为branchname

git add . 添加当前改动到缓存区
git commit -m '注释内容' 将当前缓存区代码放入本地仓库
git push origin master 推送当前代码到线上仓库

git branch 查看所有分支

git checkout -b xxx新建分支

git branch -d dev 删除分支

git merge master dev 将master 合并到dev

git diff 查看当前冲突

git add .
git commit -m 'fdasdf'
git push origin master

git commit -m 'xxx' 这个是git add .后的文件 放到本地仓库中

|

本作品采用 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 进行许可

打赏

分享

Git , Ubuntu

最后编辑：2026-05-07

上一篇

下一篇
