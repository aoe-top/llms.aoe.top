# 【AI】教你如何为 OpenClaw 安装 Skills | 小莫的博客园

Source: https://blog.aoe.top/AI/862
Friendly site: 小莫博客园
Group: AOE.TOP
Fetched: 2026-06-18T02:27:00.173Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 这篇是面向新手到进阶用户的 OpenClaw Skills 完整教程。你将一次性掌握： Skills 是什么 怎么安装（本地 / ClawHub / 插件） 怎么查找可用 Skills 怎么在 openclaw.json 里配置 怎么在会话中正确使用 常见问题和排障方法 文档参考（官方）： https://docs.openclaw.ai/zh-CN/tools/skil

## Content

# 【AI】教你如何为 OpenClaw 安装 Skills

- 2026-03-09

- 作者 小莫

- 1. 1. Skills 是什么？
- 2. 2. 先搞清楚加载位置与优先级
- 3. 3. 安装 Skills（3 种常见方式） 3.1. 3.1 用 ClawHub 安装（推荐）
- 3.2. 3.2 手动创建本地 Skill
- 3.3. 3.3 通过插件安装 Skills
- 4. 4. 查找 Skills 的正确姿势
- 5. 5. 配置 Skills（核心：~/.openclaw/openclaw.json） 5.1. 5.1 skillKey 与名称不一致怎么办
- 5.2. 5.2 环境变量注入的作用域
- 6. 6. 使用 Skills（会话里怎么触发）
- 7. 7. 进阶：门控（加载过滤）
- 8. 8. 沙箱模式注意事项（很容易踩坑）
- 9. 9. 常见问题与排障 9.1. 9.1 我安装了 Skill，但会话里没生效
- 9.2. 9.2 改了 SKILL.md，为什么没立即更新
- 9.3. 9.3 插件带的 Skills 不出现
- 10. 10. 一套推荐工作流（可直接照抄）
- 11. 11. 安全建议（务必看）
- 12. 总结

这篇是面向新手到进阶用户的 OpenClaw Skills 完整教程 。你将一次性掌握：

- Skills 是什么

- 怎么安装（本地 / ClawHub / 插件）

- 怎么查找可用 Skills

- 怎么在 openclaw.json 里配置

- 怎么在会话中正确使用

- 常见问题和排障方法

文档参考（官方）：

- https://docs.openclaw.ai/zh-CN/tools/skills

- https://docs.openclaw.ai/zh-CN/tools/creating-skills

- https://docs.openclaw.ai/zh-CN/tools/skills-config

- https://docs.openclaw.ai/zh-CN/tools/clawhub

- https://docs.openclaw.ai/zh-CN/tools/plugin

## 1. Skills 是什么？

OpenClaw 的 Skill 本质上是一个目录，核心文件是 SKILL.md （YAML frontmatter + Markdown 指令）。

OpenClaw 会把可用 Skills 注入到智能体上下文，让模型知道：

- 这个 Skill 叫啥

- 能解决什么问题

- 需要什么工具/环境

简单理解： Skill = 给智能体的一份“可调用能力说明书” 。

## 2. 先搞清楚加载位置与优先级

OpenClaw 默认会从这些位置加载 Skills：

- 内置 Skills（随 OpenClaw 发布）

- 托管/本地 Skills： ~/.openclaw/skills

- 工作区 Skills： /skills

同名冲突时，优先级是：

<workspace>/skills > ~/.openclaw/skills > 内置 Skills

另外你还能在配置里加额外目录：

skills.load.extraDirs （优先级最低）

这条非常关键，后面你会用它做“共享 Skill 仓库”。

## 3. 安装 Skills（3 种常见方式）

### 3.1 用 ClawHub 安装（推荐）

先装 CLI：

1
2
3

|
npm i -g clawhub
# 或
pnpm add -g clawhub

|

搜索：

1

|
clawhub search "calendar"

|

安装：

1

|
clawhub install <skill-slug>

|

更新全部：

1

|
clawhub update --all

|

默认会安装到当前目录下的 ./skills （也就是工作区技能目录）。安装后开启一个新会话，OpenClaw 就会加载。

如果你不在目标目录执行命令，可以指定：

1

|
clawhub install <skill-slug> --workdir /path/to/workspace

|

### 3.2 手动创建本地 Skill

先建目录：

1

|
mkdir -p <workspace>/skills/hello-world

|

写 SKILL.md ：

1
2
3
4
5
6
7
8

|
---
name: hello _world
description: A simple skill that says hello.
---

# Hello World Skill

When the user asks for a greeting, use the `echo` tool to say "Hello from your custom skill!".

|

然后重启 Gateway 或开新会话。

### 3.3 通过插件安装 Skills

插件可以自带 skills/<name>/SKILL.md 。安装插件后，若插件启用，对应 Skills 也会参与加载。

常见插件命令：

1
2
3
4

|
openclaw plugins list
openclaw plugins install @openclaw/voice-call
openclaw plugins enable < id >
openclaw plugins info < id >

|

注意：插件和 Gateway 同进程，默认按“受信任代码”处理，只装你信任的来源。

## 4. 查找 Skills 的正确姿势

最实用的方式是 ClawHub：

1
2

|
clawhub search "postgres backups"
clawhub search "image edit" -- limit 20

|

查看当前工作区已安装记录：

1

|
clawhub list

|

如果你想把自己本地 Skills 备份到云端：

1
2
3

|
clawhub publish ./my-skill --slug my-skill --name "My Skill" --version 1.0.0 --tags latest
# 或批量
clawhub sync --all

|

## 5. 配置 Skills（核心： ~/.openclaw/openclaw.json ）

所有 Skills 配置都在 skills 节点下。

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

|
{
"skills" : {
"allowBundled" : [ "gemini" , "peekaboo" ] ,
"load" : {
"extraDirs" : [
"~/Projects/shared-skills" ,
"~/Projects/team-skill-pack/skills"
] ,
"watch" : true ,
"watchDebounceMs" : 250
} ,
"install" : {
"preferBrew" : true ,
"nodeManager" : "npm"
} ,
"entries" : {
"nano-banana-pro" : {
"enabled" : true ,
"apiKey" : "GEMINI_KEY_HERE" ,
"env" : {
"GEMINI_API_KEY" : "GEMINI_KEY_HERE"
} ,
"config" : {
"endpoint" : "https://example.invalid" ,
"model" : "nano-pro"
}
} ,
"sag" : {
"enabled" : false
}
}
}
}

|

字段速记：

- allowBundled ：只对白名单里的“内置 Skills”开放

- load.extraDirs ：附加扫描目录（低优先级）

- load.watch ：是否监听技能文件变化自动刷新

- install.nodeManager ：安装器优先 npm/pnpm/yarn/bun

- entries. .enabled ：单 Skill 开关

- entries. .env ：为该轮智能体运行注入环境变量

- entries. .apiKey ：和 primaryEnv 联动的快捷密钥字段

- entries. .config ：Skill 的自定义配置容器

### 5.1 skillKey 与名称不一致怎么办

默认键名就是 Skill 名称；如果 SKILL.md 里定义了 metadata.openclaw.skillKey ，以它为准。

### 5.2 环境变量注入的作用域

OpenClaw 在每次智能体运行开始前注入 env/apiKey ，运行结束后恢复。它不是你系统 shell 的永久环境变量。

## 6. 使用 Skills（会话里怎么触发）

大多数情况下，你不需要手动“调用 API”，只要在用户请求中给出明确任务，模型会根据已加载 Skills 自动选择。

但要注意这几个 frontmatter 开关：

- user-invocable: true|false ：是否暴露为用户可触发命令

- disable-model-invocation: true|false ：是否禁止模型自动调用

- command-dispatch: tool ：斜杠命令直接分发到工具

- command-tool: ：命令分发目标工具

- command-arg-mode: raw ：原始参数直传工具

如果你希望一个 Skill 走“命令即工具”，可这样定义。

## 7. 进阶：门控（加载过滤）

你可以在 metadata.openclaw 里声明依赖，让 Skill 仅在条件满足时加载。

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

|
---
name: nano-banana-pro
description: Generate or edit images via Gemini 3 Pro Image
metadata:
{
"openclaw":
{
"requires":
{
"bins": ["uv"],
"env": ["GEMINI_API_KEY"],
"config": ["browser.enabled"]
},
"primaryEnv": "GEMINI_API_KEY"
}
}
---

|

常用门控字段：

- requires.bins / requires.anyBins

- requires.env

- requires.config

- os （ darwin|linux|win32 ）

- always: true

这对团队环境非常有用，能避免“装了但不可用”的假可用状态。

## 8. 沙箱模式注意事项（很容易踩坑）

当智能体跑在 Docker 沙箱里时：

- 宿主机环境变量不会自动带入容器

- skills.entries.*.env/apiKey 主要作用于宿主机流程

- 需要在 agents.defaults.sandbox.docker.env （或 agent 级）单独配置

- requires.bins 在宿主机会检查，真正执行时容器里也必须有对应二进制

结论： 宿主机可用 != 沙箱可用 。

## 9. 常见问题与排障

### 9.1 我安装了 Skill，但会话里没生效

按顺序检查：

- 安装目录是否在 /skills 或 ~/.openclaw/skills

- 是否有同名 Skill 被更高优先级目录覆盖

- skills.entries. .enabled 是否被设为 false

- requires.* 条件是否满足（bin/env/config）

- 是否开启新会话（会话会缓存 Skills 快照）

### 9.2 改了 SKILL.md ，为什么没立即更新

- 确认 skills.load.watch: true

- 确认 watchDebounceMs 不是过大

- 保守做法：开新会话或重启 Gateway

### 9.3 插件带的 Skills 不出现

- openclaw plugins list 看插件是否启用

- 检查 plugins.entries. .enabled

- 检查插件是否声明了 skills 目录

- 修改插件配置后重启 Gateway

## 10. 一套推荐工作流（可直接照抄）

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

|
# 1) 安装并搜索
npm i -g clawhub
clawhub search "your use case"

# 2) 安装技能到当前工作区
clawhub install <skill-slug>

# 3) 配置密钥/开关
# 编辑 ~/.openclaw/openclaw.json -> skills.entries

# 4) 开启新会话验证
# 在对话中发一个该 skill 典型任务

# 5) 周期更新
clawhub update --all

|

## 11. 安全建议（务必看）

- 第三方 Skills 按“不受信任代码”看待，先读 SKILL.md

- 对高风险操作启用沙箱隔离

- 不要把密钥写进提示词与日志

- 生产环境尽量固定版本，不要盲目 latest

## 总结

如果你只记 4 句话：

- 安装首选 clawhub install ，查找用 clawhub search 。

- 优先级记住： /skills 最高。

- 配置集中在 ~/.openclaw/openclaw.json 的 skills 。

- 改完配置或 Skill，最好开新会话验证。

这样你就能把 OpenClaw Skills 稳定地用起来，并逐步构建自己的技能库。

本作品采用 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 进行许可

打赏

分享

AI , OpenClaw , Skills , 安装指南

最后编辑：2026-05-07

上一篇

下一篇
