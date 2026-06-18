# 【Ubuntu】解决Unable to satisfy all constraints on the partition的问题 | 小莫的博客园

Source: https://blog.aoe.top/notes/474
Friendly site: 小莫博客园
Group: AOE.TOP
Fetched: 2026-06-18T02:29:02.898Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 在给 Unable 扩容硬盘的时候，我遇到了一个问题，它总是提示Unable to satisfy all constraints on the partition 为了解决这个问题，我一直在Google苦找，终于找到了解决方案：原地址： https://gparted.org/faq.php#faq-22https://gparted.org/h2-fix-msdos-pt.php 我是运行：

## Content

# 【Ubuntu】解决Unable to satisfy all constraints on the partition的问题

- 2023-07-07

- 作者 小莫

在给 Unable 扩容硬盘的时候，我遇到了一个问题，它总是提示 Unable to satisfy all constraints on the partition

为了解决这个问题，我一直在Google苦找，终于找到了解决方案：
原地址： https://gparted.org/faq.php#faq-22 https://gparted.org/h2-fix-msdos-pt.php

我是运行：

1

|
sudo parted /dev/sda unit s print

|

然后输入 修正 解决的：

本作品采用 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 进行许可

打赏

分享

Ubuntu , 扩容 , 硬盘

最后编辑：2026-05-07

上一篇

下一篇
