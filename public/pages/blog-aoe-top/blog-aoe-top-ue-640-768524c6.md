# 【UE5】 随机创建地形 | 小莫的博客园

Source: https://blog.aoe.top/UE/640
Friendly site: 小莫博客园
Group: AOE.TOP
Fetched: 2026-06-18T02:27:01.163Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 创建类在引擎里面新建一个C++类, 命名为 TileMapGenerator, 继承 Actor 打开 TileMapGenerator.h , 声明变量: 12345678910111213public: // 宽度 UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Map") int32 Map

## Content

# 【UE5】 随机创建地形

- 2024-03-04

- 作者 小莫

- 1. 创建类
- 2. 使用

### 创建类

在引擎里面新建一个C++类, 命名为 TileMapGenerator, 继承 Actor

打开 TileMapGenerator.h , 声明变量:

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

|
public :
// 宽度
UPROPERTY (EditAnywhere, BlueprintReadWrite, Category = "Map" )
int32 MapWidth;

// 高度
UPROPERTY (EditAnywhere, BlueprintReadWrite, Category = "Map" )
int32 MapHeight;

// 用于生成的块
UPROPERTY (EditAnywhere, BlueprintReadWrite, Category = "Map" )
TArray<TSubclassOf<AActor>> TileClasses;

|

打开 TileMapGenerator.cpp , 在 BeginPlay() 里面写入以下内容

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

|
void ATileMapGenerator::BeginPlay ()
{
Super:: BeginPlay ();

if (TileClasses. Num () > 0 )
{
for (int32 x = 0 ; x < MapWidth; ++x)
{
for (int32 y = 0 ; y < MapHeight; ++y)
{
// 200f 为块的大小
FVector Location (x * 200.f , y * 200.f , 0.f ) ;
FRotator Rotation = FRotator::ZeroRotator;
FActorSpawnParameters SpawnParams;

// 随机选择一个图块类
TSubclassOf<AActor> TileClass = TileClasses[FMath:: RandRange ( 0 , TileClasses. Num () - 1 )];

GetWorld ()-> SpawnActor <AActor>(TileClass, Location, Rotation, SpawnParams);
}
}
}
}

|

### 使用

Ctrl + Alt + F11 编译, 创建基于 TileMapGenerator 的子蓝图,

将 创建的 Actor 拖入场景, 设置 MapWidth、 MapHeight、 TileClasses 的参数.

然后运行游戏，即可自动随机创建地形

具体的 Actor 可在 TileClasses 中配置.

可以新建任意 Actor 赋予 TileClasses 中

本作品采用 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 进行许可

打赏

分享

UE5 , 创建 , 随机地形

最后编辑：2026-05-07

上一篇

下一篇
