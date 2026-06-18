# ExecuteAsync | 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/UE4SS/lua-api/global-functions/executeasync.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:29:09.759Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# ExecuteAsync ​

The ExecuteAsync function asynchronously executes the supplied callback.

It works in a similar manner to ExecuteWithDelay , except that there is no delay beyond the cost of registering the callback.

## Parameters ​

# | Type | Information |

1 | function | The callback to execute |

## Example ​

lua
ExecuteAsync ( function ()
print ( " Executed asynchronously \n " )
end )

1
2
3
