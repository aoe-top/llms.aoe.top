# RegisterInitGameStatePostHook | 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/UE4SS/lua-api/global-functions/registerinitgamestateposthook.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:29:13.936Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# RegisterInitGameStatePostHook ​

This registers a callback that will get called after AGameModeBase::InitGameState is called.

Parameters (except strings & bools & FOutputDevice ) must be retrieved via Param:Get() and set via Param:Set() .

## Parameters ​

# | Type | Information |

1 | function | The callback to register |

## Callback Parameters ​

# | Type | Information |

1 | AGameStateBase | The game state context |

## Example ​

lua
RegisterInitGameStatePostHook ( function ( GameState )
print ( " InitGameStatePostHook " )
end )

1
2
3
