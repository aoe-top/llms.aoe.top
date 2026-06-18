# ExecuteWithDelay | 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/UE4SS/lua-api/global-functions/executewithdelay.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:29:11.533Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# ExecuteWithDelay ​

The ExecuteWithDelay function asynchronously executes the supplied callback after the supplied delay is over.

## Parameters ​

# | Type | Information |

1 | integer | Delay, in milliseconds, to wait before executing the supplied callback |

2 | function | The callback to execute after the supplied delay is over |

## Example ​

lua
ExecuteWithDelay ( 2000 , function ()
print ( " Executed asynchronously after a 2 second delay \n " )
end )

1
2
3
