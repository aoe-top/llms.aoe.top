# UScriptStruct | 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/UE4SS/lua-api/classes/uscriptstruct.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:29:02.647Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# UScriptStruct ​

## Inheritance ​

LocalObject

## Metamethods ​

### __index ​

- Usage: UScriptStruct["StructMemberName"] or UScriptStruct.StructMemberName
- Return type: auto
- Returns the value for the supplied member name.
- Can return any type, you can use the type() function on the returned value to figure out what Lua class it's using (if non-trivial type).
- Example:
lua
local scriptStruct = FindFirstOf ( ' _UI_Items_C ' )

-- Either of the following can be used:
local item = scriptStruct[ ' Item ' ]
local item = scriptStruct. Item

1
2
3
4
5

### __newindex ​

- Usage: UScriptStruct["StructMemberName"] = NewValue or UScriptStruct.StructMemberName = NewValue
- Attempts to set the value for the supplied member name to NewValue .
- Example:
lua
local scriptStruct = FindFirstOf ( ' _UI_Items_C ' )

-- Either of the following can be used:
scriptStruct[ ' Item ' ] = 5
scriptStruct. Item = 5

1
2
3
4
5

## Methods ​

### GetBaseAddress() ​

- Return type: integer
- Returns: the address in memory where the UObject that this UScriptStruct belongs to is located

### GetStructAddress() ​

- Return type: integer
- Returns: the address in memory where this UScriptStruct is located

### GetPropertyAddress() ​

- Return type: integer
- Returns: the address in memory where the corresponding UProperty / FProperty is located

### IsValid() ​

- Return type: bool
- Returns: whether the struct is valid

### IsMappedToObject() ​

- Return type: bool
- Returns: whether the base object is valid

### IsMappedToProperty() ​

- Return type: bool
- Returns: whether the property is valid

### type() ​

- Return type: string
- Returns: "UScriptStruct"
