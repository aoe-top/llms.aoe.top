# UE4SS | 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/UE4SS/lua-api/classes/ue4ss.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:28:56.703Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# UE4SS ​

The UE4SS class is for interacting with UE4SS metadata.

## Inheritance ​

None

## Methods ​

### GetVersion() ​

Returns: the current version of UE4SS that is being used.
Return Value:

# | Type | Information |

1 | integer | Major version |

2 | integer | Minor version |

3 | integer | Hotfix version |

Example #1

Warning: This only works in UE4SS 1.1+. See example #2 for UE4SS <=1.0.

lua
local Major, Minor, Hotfix = UE4SS. GetVersion ()
print ( string.format ( " UE4SS v%d.%d.%d \n " , Major, Minor, Hotfix))

1
2

Example #2

This example shows how to distinguish between UE4SS <=1.0, which didn't have the UE4SS class, and UE4SS >=1.1.

lua
if UE4SS == nil then
print ( " Running UE4SS <=1.0 \n " )
end

1
2
3
