# CreateInvalidObject | 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/UE4SS/lua-api/global-functions/createinvalidobject.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:29:12.319Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# CreateInvalidObject ​

The function CreateInvalidObject always returns an object with an IsValid function that returns flase .

The sole purpose of the function is to ensure that the mod's Lua code adheres to UE4SS code conventions, where all functions return an invalid UObject instead of nil .

## Example ​

The example code below ensures that you never need to check if EngineCache is nil , and the same applies to the return value of GetEngine() .

lua
local EngineCache = CreateInvalidObject () --- @cast EngineCache UEngine
---Returns instance of UEngine
--- @return UEngine
function GetEngine ()
if EngineCache : IsValid () then return EngineCache end

EngineCache = FindFirstOf ( " Engine " ) --- @type UEngine
return EngineCache
end

1
2
3
4
5
6
7
8
9
