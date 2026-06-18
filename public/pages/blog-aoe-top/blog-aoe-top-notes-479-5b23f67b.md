# 【PhpStorm】自动编译less | 小莫的博客园

Source: https://blog.aoe.top/notes/479
Friendly site: 小莫博客园
Group: AOE.TOP
Fetched: 2026-06-18T02:29:03.077Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 最近在研究Less，发现这个比css轻便多了，然后看了一下，原来PhpStorm可以直接将Less编译成css，然后再继续从css压缩成min.css，突然感觉方便多了。 简单介绍一下配置方法：1.安装NodeJs2.安装less： 1npm install less -g 3.安装less-plugin-clean-css插件（可选，less的插件，用于压缩代码） 1npm install le

## Content

# 【PhpStorm】自动编译less

- 2023-07-07

- 作者 小莫

最近在研究Less，发现这个比css轻便多了，然后看了一下，原来PhpStorm可以直接将Less编译成css，然后再继续从css压缩成min.css，突然感觉方便多了。

简单介绍一下配置方法：
1.安装 NodeJs
2.安装less：

1

|
npm install less -g

|

3.安装less-plugin-clean-css插件（可选，less的插件，用于压缩代码）

1

|
npm install less-plugin-clean-css -g

|

记住，less默认文件位置在 C:\Users\xiaom\AppData\Roaming\npm

4.打开PhpStorm，文件->设置->工具->File Watcher，添加less

5.程序填 less 的位置 C:\Users\xiaom\AppData\Roaming\npm\lessc
6. 参数 中默认有个 --source-map ，是否生成map，可根据自己的需求进行填

7.完毕，修改文件后按Ctrl+S即可自动编译。
8.如果出现编译失败，尝试重启PhpStorm即可

本作品采用 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 进行许可

打赏

分享

Less , PhpStorm , 自动编译

最后编辑：2026-05-07

上一篇

下一篇
