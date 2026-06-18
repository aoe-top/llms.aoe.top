# LoadAsset | 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/UE4SS/lua-api/global-functions/loadasset.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:29:07.872Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# LoadAsset ​

The LoadAsset function loads an asset by name.

It must only be called from within the game thread. For example, from within a UFunction hook or RegisterConsoleCommandHandler callback.

## Parameters ​

# | Type | Information |

1 | string | Path and name of the asset |

## Example ​

lua
RegisterConsoleCommandHandler ( " summon " , function ( FullCommand , Parameters )
if # Parameters < 1 then return false end

-- Parameters[1] example: /Game/LevelElements/Refinery/Pipeline/BP_Pipeline_Start
LoadAsset (Parameters[ 1 ])

return false
end )

1
2
3
4
5
6
7
8
