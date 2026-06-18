# ForEachUObject | 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/UE4SS/lua-api/global-functions/foreachuobject.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:29:10.586Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# ForEachUObject ​

The ForEachUObject function iterates every UObject that currently exists in GUObjectArray .

The GUObjectArray UE4 variable is a large chunked array that contains UObjects.

The structure of this array has changed over the years and the ForEachUObject function is designed to work identically across all engine versions.

## Parameters ​

# | Type | Information |

1 | function | Callback to execute for every UObject in GUObjectArray |

## Callback Parameters ​

# | Type | Information |

1 | UObject | The UObject |

2 | integer | The chunk index of the UObject |

3 | integer | The object index of the UObject |

## Example ​

lua
-- Warning: This will take quite a while to finish executing due to all of the 'print' calls
ForEachUObject ( function ( Object , ChunkIndex , ObjectIndex )
print ( string.format ( " Chunk: %X | Object: %X | Name: %s \n " , ChunkIndex, ObjectIndex, Object : GetFullName ()))
end )

1
2
3
4
