# OffsetInternalInfo | 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/UE4SS/lua-api/table-definitions/offsetinternalinfo.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:29:12.775Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# OffsetInternalInfo ​

The OffsetInternalInfo table contains information related to a custom property.

You must supply data yourself when using this table.

## Structure ​

Key | Value Type | Information |

Property | string | Name of the property to use as relative start instead of base |

RelativeOffset | integer | Offset from relative start to this property |

## Example ​

lua
local PropertyInfo = {
[ " Property " ] = " HistoryBuffer " ,
[ " RelativeOffset " ] = 0x10
}

1
2
3
4
