# UnrealVersion | 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/UE4SS/lua-api/classes/unrealversion.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:29:02.578Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# UnrealVersion ​

The UnrealVersion class contains helper functions for retrieving which version of Unreal Engine that is being used.

## Inheritance ​

None

## Methods ​

### GetMajor() ​

- Return type: integer

### GetMinor() ​

- Return type: integer

### IsEqual(number MajorVersion, number MinorVersion) ​

- Return type: bool

### IsAtLeast(number MajorVersion, number MinorVersion) ​

- Return type: bool

### IsAtMost(number MajorVersion, number MinorVersion) ​

- Return type: bool

### IsBelow(number MajorVersion, number MinorVersion) ​

- Return type: bool

### IsAbove(number MajorVersion, number MinorVersion) ​

- Return type: bool

## Examples ​

lua
local Major = UnrealVersion. GetMajor ()
local Minor = UnrealVersion. GetMinor ()
print ( string.format ( " Version: %s.%s \n " , Major, Minor))

if UnrealVersion. IsEqual ( 5 , 0 ) then print ( " Version is 5.0 \n " ) end
if UnrealVersion. IsAtLeast ( 5 , 0 ) then print ( " Version is >=5.0 \n " ) end
if UnrealVersion. IsAtMost ( 5 , 0 ) then print ( " Version is <=5.0 \n " ) end
if UnrealVersion. IsBelow ( 5 , 0 ) then print ( " Version is <5.0 \n " ) end
if UnrealVersion. IsAbove ( 5 , 0 ) then print ( " Version is >5.0 \n " ) end

1
2
3
4
5
6
7
8
9
