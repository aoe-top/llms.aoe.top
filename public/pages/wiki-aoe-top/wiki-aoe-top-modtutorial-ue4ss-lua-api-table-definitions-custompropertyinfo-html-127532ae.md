# CustomPropertyInfo | 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/UE4SS/lua-api/table-definitions/custompropertyinfo.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:29:12.713Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# CustomPropertyInfo ​

The CustomPropertyInfo table contains information about a custom property.

You must supply data yourself when using this table.

## Structure ​

Key | Value Type | Sub Type | Information |

Name | string | | Name to use with the __index metamethod |

Type | table | PropertyTypes | |

BelongsToClass | string | | Full class name without type, that this property belongs to |

OffsetInternal | integer or table | OffsetInternalInfo | Sub Type only valid if Type is table |

ArrayProperty | table | ArrayPropertyInfo | Only use when 'Type' is PropertyTypes.ArrayProperty |

## Simple Example ​

Creates a custom property with the name MySimpleCustomProperty that accesses whatever data is at offset 0xF40 in any instance of class Character as if it was an IntProperty .

lua
local CustomPropertyInfo = {
[ " Name " ] = " MySimpleCustomProperty " ,
[ " Type " ] = PropertyTypes. IntProperty ,
[ " BelongsToClass " ] = " /Script/Engine.Character "
[ " OffsetInternal " ] = 0xF40
}

1
2
3
4
5
6

## Advanced Example ​

Creates a custom property with the name MyAdvancedCustomProperty that accesses whatever data is at offset 0xF48 in any instance of class Character as if it was an ArrayProperty with an inner type of IntProperty .

lua
local CustomPropertyInfo = {
[ " Name " ] = " MyAdvancedCustomProperty " ,
[ " Type " ] = PropertyTypes. ArrayProperty ,
[ " BelongsToClass " ] = " /Script/Engine.Character "
[ " OffsetInternal " ] = 0xF48 ,
[ " ArrayProperty " ] = {
[ " Type " ] = PropertyTypes. IntProperty
}
}

1
2
3
4
5
6
7
8
9
