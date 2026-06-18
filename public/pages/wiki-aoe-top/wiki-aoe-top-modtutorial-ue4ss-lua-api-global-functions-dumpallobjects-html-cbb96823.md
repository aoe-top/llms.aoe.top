# DumpAllObjects | 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/UE4SS/lua-api/global-functions/dumpallobjects.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:29:10.423Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# DumpAllObjects ​

Dumps all objects from memory to the file UE4SS_ObjectDump.txt .

The function does the same as the Dump Objects & Properties button in the UE4SS Debugging Tools aka. the GUI Console.

## Example ​

lua
RegisterKeyBind (Key. F1 , function ()
DumpAllObjects ()
end )

1
2
3
