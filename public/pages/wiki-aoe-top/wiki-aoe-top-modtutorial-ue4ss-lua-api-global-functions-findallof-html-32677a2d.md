# FindAllOf | 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/UE4SS/lua-api/global-functions/findallof.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:29:07.851Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# FindAllOf ​

The FindAllOf function will find all non-default instances of the supplied class name.

This function cannot be used to find non-instances or default instances.

## Parameters ​

# | Type | Information |

1 | string | Short name of the class to find instances of |

## Return Value ​

# | Type | Sub Type | Information |

1 | nil or table | UObject, UClass, or AActor | nil if no instances were found, otherwise a numerically indexed table of all instances |

## Example ​

Outputs the name of all objects that inherit from the Actor class.

lua
local ActorInstances = FindAllOf ( " Actor " )
if not ActorInstances then
print ( " No instances of 'Actor' were found \n " )
else
for Index, ActorInstance in pairs (ActorInstances) do
print ( string.format ( " [%d] %s \n " , Index, ActorInstance : GetFullName ()))
end
end

1
2
3
4
5
6
7
8
