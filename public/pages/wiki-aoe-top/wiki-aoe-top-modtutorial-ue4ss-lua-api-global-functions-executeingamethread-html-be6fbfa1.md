# ExecuteInGameThread | 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/UE4SS/lua-api/global-functions/executeingamethread.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:29:12.396Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# ExecuteInGameThread ​

ExecuteInGameThread is a function that allows you to execute code using ProcessEvent .

It will execute as soon as the game has time to execute it.

## Parameters ​

# | Type | Information |

1 | function | Callback to execute when the game has time |

## Example ​

lua
ExecuteInGameThread ( function ()
print ( " Hello from the game thread! \n " )
end )

1
2
3
