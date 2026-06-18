# GenerateLuaTypes | 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/UE4SS/lua-api/global-functions/generateluatypes.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:29:11.673Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# GenerateLuaTypes ​

Generates Lua types for Custom Lua Bindings in the Mods/shared/types directory.

The function does the same as the Generate Lua Types button in the UE4SS Debugging Tools aka. the GUI Console under the Dumpers tab.

## Example ​

lua
RegisterKeyBind (Key. F1 , function ()
GenerateLuaTypes ()
end )

1
2
3
