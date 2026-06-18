# GenerateSDK | 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/UE4SS/lua-api/global-functions/generatesdk.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:29:09.399Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# GenerateSDK ​

Generates C++ Headers in the CXXHeaderDump directory.

The function does the same as the Dump CXX Headers button in the UE4SS Debugging Tools aka. the GUI Console under the Dumpers tab.

## Example ​

lua
RegisterKeyBind (Key. F1 , function ()
GenerateSDK ()
end )

1
2
3
