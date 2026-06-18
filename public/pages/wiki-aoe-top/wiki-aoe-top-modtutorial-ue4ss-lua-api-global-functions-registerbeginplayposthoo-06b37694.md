# RegisterBeginPlayPostHook | 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/UE4SS/lua-api/global-functions/registerbeginplayposthook.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:29:13.402Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# RegisterBeginPlayPostHook ​

This registers a callback that will get called after AActor::BeginPlay is called.

Parameters (except strings & bools & FOutputDevice ) must be retrieved via Param:Get() and set via Param:Set() .

## Parameters ​

# | Type | Information |

1 | function | The callback to register |

## Callback Parameters ​

# | Type | Information |

1 | AActor | The actor context |

## Example ​

lua
RegisterBeginPlayPostHook ( function ( Actor )
print ( " BeginPlayPostHook " )
end )

1
2
3
