# 【笔记】7-z将文件夹单独压缩到压缩包 | 小莫的博客园

Source: https://blog.aoe.top/notes/486
Friendly site: 小莫博客园
Group: AOE.TOP
Fetched: 2026-06-18T02:29:03.210Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 记录一下，新建个空白文档，重命名为*.bat；编辑打开，写入内容 12for /d %%X in (*) do "c:\Program Files\7-Zip\7z.exe" a "%%X.zip" "%%X\" 双击运行，完毕

## Content

# 【笔记】7-z将文件夹单独压缩到压缩包

- 2023-07-07

- 作者 小莫

- 1. 记录一下，

### 记录一下，

新建个空白文档，重命名为*.bat；
编辑打开，写入内容

1
2

|
for /d %%X in (*) do "c:\Program Files\ 7 -Zip\ 7 z.exe" a " %%X .zip" " %%X \"

|

双击运行，
完毕

本作品采用 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 进行许可

打赏

分享

7-z , bat , 压缩包 , 文件夹

最后编辑：2026-05-07

上一篇

下一篇
