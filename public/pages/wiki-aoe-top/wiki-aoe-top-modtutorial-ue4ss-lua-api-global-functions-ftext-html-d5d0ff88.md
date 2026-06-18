# FText | 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/UE4SS/lua-api/global-functions/ftext.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:29:04.262Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# FText ​

The FText function is used to create an FText object from a string .

Useful when you have to interact with UserWidget -related classes for the UI of your mods, and call their SetText(FText("My New Text")) methods.

## Parameters (overload #1) ​

This overload uses FText::FText( FString&& InSourceString ) to create a new FText object.

# | Type | Information |

1 | string | Content with which FText will to be created |

## Return Value ​

# | Type | Information |

1 | FText | FText object that contains the passed string |

## Example ​

Code:

lua
local my_text = FText ( " My Text " )
print ( string.format ( " Lua type: %s \n " , type (my_text)))
print ( string.format ( " Object type: %s \n " , my_text : type ()))
print ( string.format ( " Content: %s \n " , my_text : ToString ()))

1
2
3
4

Output:

[Lua] Lua type: userdata
[Lua] Object type: FText
[Lua] Content: My Text

1
2
3
