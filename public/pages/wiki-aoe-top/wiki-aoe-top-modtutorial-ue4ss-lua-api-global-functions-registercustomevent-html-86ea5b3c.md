# RegisterCustomEvent | 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/UE4SS/lua-api/global-functions/registercustomevent.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:29:12.655Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# RegisterCustomEvent ​

This registers a callback that will get called when a blueprint function or event is called with the name EventName .

## Parameters ​

# | Type | Information |

1 | string | Name of the event to hook. |

2 | function | The callback to call when the event is called. |

## Example ​

lua
RegisterCustomEvent ( " MyCustomEvent " , function ()
print ( " MyCustomEvent was called \n " )
end )

1
2
3
