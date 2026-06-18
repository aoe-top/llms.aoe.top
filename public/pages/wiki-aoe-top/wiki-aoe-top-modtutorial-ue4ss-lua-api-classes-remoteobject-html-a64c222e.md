# RemoteObject | 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/UE4SS/lua-api/classes/remoteobject.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:29:01.647Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# RemoteObject ​

The RemoteObject class is the first of two base objects that all other objects inherits from, the other one being LocalObject .

It contains a pointer to a C++ object that is typically owned by the game.

## Inheritance ​

None

## Methods ​

### IsValid() ​

- Return type: bool
- Returns: whether this object is valid or not
Example

lua
-- 'StaticFindObject' returns a UObject which inherits from RemoteObject.
local Object = StaticFindObject ( " /Script/CoreUObject.Object " )
if Object : IsValid () then
print ( " Object is valid \n " )
else
print ( " Object is NOT valid \n " )
end

1
2
3
4
5
6
7
