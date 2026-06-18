# 【虚幻5】 制作角色跳跃动作 | 小莫的博客园

Source: https://blog.aoe.top/UE/637
Friendly site: 小莫博客园
Group: AOE.TOP
Fetched: 2026-06-18T02:27:00.893Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 创建 角色动画蓝图 在动画 -> 动画蓝图里面 创建一个Bool 类型的变量: “IsFalling” 来储存角色是否在天上 在事件图标中获取 角色是否是天上的状态 创建一个状态机 (State Machine) 起名为 “Main”将其链接到 “Outoput Pose” 进入Main, 创建3个状态，记录跳跃需要的3个节点 “OnGround” 到 “Jump” 的规则是

## Content

# 【虚幻5】 制作角色跳跃动作

- 2024-01-23

- 作者 小莫

- 创建 角色动画蓝图 在动画 -> 动画蓝图里面

- 创建一个Bool 类型的变量: “IsFalling” 来储存角色是否在天上

- 在事件图标中获取 角色是否是天上的状态

- 创建一个状态机 (State Machine) 起名为 “Main”将其链接到 “Outoput Pose”

- 进入Main, 创建3个状态，记录跳跃需要的3个节点

- “OnGround” 到 “Jump” 的规则是 “IsFalling”

- “Jump” 到 “JumpLand” 的规则是 Not “IsFalling”

- “JumpLand” 到 “OnGround” 是 “Speed” > 0 和 自动过度 自动过度 是勾选 “基于状态中序列播放器的自动规则”

- 在 “OnGround” 里面连接 “Loc”

- 在 “Jump” 里面创建状态机, 并将跳跃动画按顺序链接

- 在 “JumpLand” 里面创建 状态机, 并将动画按顺序连接

- 这些动画的过度均为 自动过度

至此，跳跃动画就做好了

本作品采用 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 进行许可

打赏

分享

UE5 , 虚幻5 , 角色 , 跳跃

最后编辑：2026-05-07

上一篇

下一篇
