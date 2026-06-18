# ArrayPropertyInfo | 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/UE4SS/lua-api/table-definitions/arraypropertyinfo.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:29:12.155Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# ArrayPropertyInfo ​

The ArrayPropertyInfo table contains type information for custom ArrayProperty properties.

You must supply data yourself when using this table.

## Structure ​

Key | Value Type | Sub Type |

Type | table | PropertyTypes |

## Example ​

lua
local ArrayPropertyInfo = {
[ " Type " ] = PropertyTypes. IntProperty
}

1
2
3
