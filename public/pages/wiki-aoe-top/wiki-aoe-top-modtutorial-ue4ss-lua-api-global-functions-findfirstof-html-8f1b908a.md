# FindFirstOf | 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/UE4SS/lua-api/global-functions/findfirstof.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:29:09.107Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# FindFirstOf ​

The FindFirstOf function will find the first non-default instance of the supplied class name.

This function cannot be used to find non-instances or default instances.

## Parameters ​

# | Type | Information |

1 | string | Short name of the class to find an instance of |

## Return Value ​

# | Type | Information |

1 | UObject, UClass, or AActor | Object is only valid if an instance was found |

## Example ​

lua
local CharacterInstance = FindFirstOf ( " Character " )
if not CharacterInstance : IsValid () then
print ( " No instance of class 'Character' was found. " )
end

1
2
3
4
