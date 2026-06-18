# 【NodeJS】Express 中的响应方法 | 小莫的博客园

Source: https://blog.aoe.top/NodeJS/588
Friendly site: 小莫博客园
Group: AOE.TOP
Fetched: 2026-06-18T02:29:08.222Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 响应方法下表中响应对象 (res) 的方法可以向客户机发送响应，并终止请求/响应循环。如果没有从路由处理程序调用其中任何方法，客户机请求将保持挂起状态。 方法 描述 res.download() 提示将要下载文件。 res.end() 结束响应进程。 res.json() 发送 JSON 响应。 res.jsonp() 在 JSONP 的支持下发送 JSON 响应

## Content

# 【NodeJS】Express 中的响应方法

- 2023-07-07

- 作者 小莫

- 1. 响应方法

## 响应方法

下表中响应对象 (res) 的方法可以向客户机发送响应，并终止请求/响应循环。如果没有从路由处理程序调用其中任何方法，客户机请求将保持挂起状态。

方法 |
描述 |

res.download() |
提示将要下载文件。 |

res.end() |
结束响应进程。 |

res.json() |
发送 JSON 响应。 |

res.jsonp() |
在 JSONP 的支持下发送 JSON 响应。 |

res.redirect() |
重定向请求。 |

res.render() |
呈现视图模板。 |

res.send() |
发送各种类型的响应。 |

res.sendFile() |
以八位元流形式发送文件。 |

res.sendStatus() |
设置响应状态码并以响应主体形式发送其字符串表示。 |

本作品采用 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 进行许可

打赏

分享

NodeJs , express , 响应方法

最后编辑：2026-05-07

上一篇

下一篇
