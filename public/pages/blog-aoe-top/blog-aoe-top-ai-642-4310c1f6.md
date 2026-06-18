# 【AI】 使用AI来克隆你的声音 | 小莫的博客园

Source: https://blog.aoe.top/AI/642
Friendly site: 小莫博客园
Group: AOE.TOP
Fetched: 2026-06-18T02:26:57.720Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 项目地址GitHub: https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI资源文件: https://huggingface.co/lj1995/VoiceConversionWebUI/tree/main 前置工具 VS Code Git Python 3.10.6 拉取项目1git clone https

## Content

# 【AI】 使用AI来克隆你的声音

- 2024-04-26

- 作者 小莫

- 1. 项目地址
- 2. 前置工具
- 3. 拉取项目
- 4. 安装依赖
- 5. 下载工具
- 6. 下载资源
- 7. 运行

### 项目地址

GitHub: https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI
资源文件: https://huggingface.co/lj1995/VoiceConversionWebUI/tree/main

### 前置工具

- VS Code

- Git

- Python 3.10.6

### 拉取项目

1

|
git clone https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI.git

|

### 安装依赖

1

|
pip install -r requirements.txt

|

### 下载工具

- 下载 ffmpeg.exe

- 下载 ffprobe.exe

放到 tools/ffmpeg 目录

如果你想使用最新的RMVPE人声音高提取算法，则你需要下载音高提取模型参数并放置于 assets/rmvpe 。

- 下载 rmvpe.pt

放到 assets/rmvpe 目录

### 下载资源

1

|
python tools/download_models.py

|

### 运行

1

|
python infer-web.py

|

本作品采用 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 进行许可

打赏

分享

AI , RVC , 声音

最后编辑：2026-05-07

上一篇

下一篇
