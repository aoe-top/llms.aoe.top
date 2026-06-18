# LoopAsync | 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/UE4SS/lua-api/global-functions/loopasync.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:29:08.081Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# LoopAsync ​

Starts a loop that sleeps for the supplied number of milliseconds and stops when the callback returns true.

## Parameters ​

# | Type | Information |

1 | integer | The number of milliseconds to sleep |

2 | function | The callback function |

## Example ​

lua
LoopAsync ( 1000 , function ()
print ( " Hello World! " )
return false -- Loops forever
end )

1
2
3
4
