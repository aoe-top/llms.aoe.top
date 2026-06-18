# 【UE5】 C++ 使用 Perlin噪声 随机 生成 平角六边形 地形 | 小莫的博客园

Source: https://blog.aoe.top/UE/641
Friendly site: 小莫博客园
Group: AOE.TOP
Fetched: 2026-06-18T02:27:01.276Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 在上一篇的的基础上进行改进, 将地块改成平角六边形，并使用 Perlin噪声 来规律地形 TileMapGenerator.h 文件声明地块变量: 1234567891011121314151617181920212223242526272829303132333435363738394041424344454647public: // 宽度 UPROPERTY(EditAnywher

## Content

# 【UE5】 C++ 使用 Perlin噪声 随机 生成 平角六边形 地形

- 2024-03-06

- 作者 小莫

在 上一篇 的的基础上进行改进,

将地块改成平角六边形，并使用 Perlin噪声 来规律地形

TileMapGenerator.h 文件声明地块变量:

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
34
35
36
37
38
39
40
41
42
43
44
45
46
47

|
public :
// 宽度
UPROPERTY (EditAnywhere, BlueprintReadWrite, Category = "Map" )
int32 MapWidth;

// 高度
UPROPERTY (EditAnywhere, BlueprintReadWrite, Category = "Map" )
int32 MapHeight;

// 块的宽度
UPROPERTY (EditAnywhere, BlueprintReadWrite, Category = "Map" )
float CubeWidth;

// 块的长度
UPROPERTY (EditAnywhere, BlueprintReadWrite, Category = "Map" )
float CubeHeight;

// 种子
UPROPERTY (EditAnywhere, BlueprintReadWrite, Category = "Map" )
int32 Seed;

// 海洋
UPROPERTY (EditAnywhere, BlueprintReadWrite, Category = "Terrain" )
TSubclassOf<ASpawnActor> OceanClass;

// 河流
UPROPERTY (EditAnywhere, BlueprintReadWrite, Category = "Terrain" )
TSubclassOf<ASpawnActor> RiverClass;

// 森林
UPROPERTY (EditAnywhere, BlueprintReadWrite, Category = "Terrain" )
TSubclassOf<ASpawnActor> ForestClass;

// 平原
UPROPERTY (EditAnywhere, BlueprintReadWrite, Category = "Terrain" )
TSubclassOf<ASpawnActor> PlainClass;

// 山脉
UPROPERTY (EditAnywhere, BlueprintReadWrite, Category = "Terrain" )
TSubclassOf<ASpawnActor> MountainClass;

// 道路
UPROPERTY (EditAnywhere, BlueprintReadWrite, Category = "Terrain" )
TSubclassOf<ASpawnActor> RoadClass;

// 生成地形
void GenerateDetail () ;

|

然后在 TileMapGenerator.cpp 中实现

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
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49

|
void ATileMapGenerator::GenerateDetail ()
{
// FRandomStream RandomStream(seed == -1 ? FMath::Rand() : seed);
Seed = (Seed == -1 ) ? FMath:: Rand () : Seed;

UE_LOG (LogTemp, Warning, TEXT ( "Seed: %f" ), Seed);

// float sqrt3 = FMath::Sqrt(3);
for (int32 h = 0 ; h < MapHeight; ++h)
{
for (int32 w = 0 ; w < MapWidth; ++w)
{
// 平顶六边形瓦片
float xLocation = w * CubeWidth - (h % 2 == 0 ? 0 : CubeWidth / 2 );
float yLocation = h * CubeHeight * 3 / 4 ;
FVector Location (xLocation, yLocation, 0.f ) ;

FRotator Rotation = FRotator::ZeroRotator;
FActorSpawnParameters SpawnParams;
// 使用Perlin噪声来生成地形
float NoiseValue = FMath:: PerlinNoise2D ( FVector2D ((w / 10.0f ) + Seed, (h / 10.0f ) + Seed));

// 根据噪声值选择地形类型
TSubclassOf<ASpawnActor> TileClass;
if (NoiseValue < -0.5f )
{
TileClass = OceanClass;
}
else if (NoiseValue < -0.25f )
{
TileClass = RiverClass;
}
else if (NoiseValue < 0.0f )
{
TileClass = ForestClass;
}
if (NoiseValue < 0.25f )
{
TileClass = PlainClass;
}
else
{
TileClass = MountainClass;
}

ASpawnActor *SpawnedActor = GetWorld ()-> SpawnActor <ASpawnActor>(TileClass, Location, Rotation, SpawnParams);
}
}
}

|

本作品采用 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 进行许可

打赏

分享

C++ , Perlin噪声 , UE5 , 六边形

最后编辑：2026-05-07

上一篇

下一篇
