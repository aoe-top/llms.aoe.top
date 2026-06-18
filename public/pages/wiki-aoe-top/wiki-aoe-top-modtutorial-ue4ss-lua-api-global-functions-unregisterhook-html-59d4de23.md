# UnregisterHook | 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/UE4SS/lua-api/global-functions/unregisterhook.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:29:10.680Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# UnregisterHook ​

The UnregisterHook unregisters a callback for a UFunction .

## Parameters ​

# | Type | Information |

1 | string | Full name of the UFunction to hook. Type prefix has no effect. |

2 | integer | The PreId of the hook |

3 | integer | The PostId of the hook |

## Example ​

lua
local preId, postId = RegisterHook ( " /Script/Engine.PlayerController:ClientRestart " , function ()
print ( " PlayerController restarted \n " )
end )

UnregisterHook ( " /Script/Engine.PlayerController:ClientRestart " , preId, postId)

1
2
3
4
5
