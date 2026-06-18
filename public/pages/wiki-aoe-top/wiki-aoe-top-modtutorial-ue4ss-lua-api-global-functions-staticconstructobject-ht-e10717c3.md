# StaticConstructObject | 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/UE4SS/lua-api/global-functions/staticconstructobject.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:29:12.957Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# StaticConstructObject ​

The StaticConstructObject function attempts to construct a UE4 object of some type.

This function mimics the function StaticConstructObject_Internal .

## Parameters (overload #1) ​

# | Type | Information |

1 | UClass | The class of the object to construct |

2 | UObject | The outer to construct the object inside |

3 | FName | Optional |

4 | integer | Optional, 64 bit integer |

5 | integer | Optional, 64 bit integer |

6 | bool | Optional |

7 | bool | Optional |

8 | UObject | Optional |

9 | integer | Optional, 64 bit integer |

10 | integer | Optional, 64 bit integer |

11 | integer | Optional, 64 bit integer |

## Parameters (overload #2) ​

# | Type | Information |

1 | UClass | The class of the object to construct |

2 | UObject | The outer to construct the object inside |

3 | integer | Optional, 64 bit integer representation (ComparisonIndex & Number) of an FName |

4 | integer | Optional, 64 bit integer |

5 | integer | Optional, 64 bit integer |

6 | bool | Optional |

7 | bool | Optional |

8 | UObject | Optional |

9 | integer | Optional, 64 bit integer |

10 | integer | Optional, 64 bit integer |

11 | integer | Optional, 64 bit integer |

## Return Value ​

# | Type | Information |

1 | UObject | Object is only valid if an object was successfully constructed |

## Example ​

This example constructs a UConsole object.

lua
local Engine = FindFirstOf ( " Engine " )
local ConsoleClass = Engine. ConsoleClass
local GameViewport = Engine. GameViewport

if not ConsoleClass : IsValid () or not GameViewport : IsValid () then
print ( " Was unable to construct UConsole because the console class didn't exist \n " )
else
local CreatedConsole = StaticConstructObject (ConsoleClass, GameViewport, 0 , 0 , 0 , nil , false , false , nil )

if CreatedConsole : IsValid () then
print ( string.format ( " CreatedConsole: %s \n " , CreatedConsole : GetFullName ()))
else
print ( " Was unable to construct UConsole \n " )
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
9
10
11
12
13
14
15
