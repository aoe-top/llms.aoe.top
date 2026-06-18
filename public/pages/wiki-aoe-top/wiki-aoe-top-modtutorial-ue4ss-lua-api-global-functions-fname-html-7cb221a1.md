# FName | 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/UE4SS/lua-api/global-functions/fname.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:29:04.185Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# FName ​

The FName function is used to get an FName representation of a string or integer .

## Parameters (overload #1) ​

This overload mimics FName::FName with the FindType param set to EFindName::FName_Add .

# | Type | Information |

1 | string | String that you'd like to get an FName representation of |

2 | EFindName | Finding or adding name type. It can be either FNAME_Find or FNAME_Add . Default is FNAME_Add if not explicitly supplied |

## Parameters (overload #2) ​

# | Type | Information |

1 | integer | 64-bit integer representing the ComparisonIndex part that you'd like to get an FName representation of |

2 | EFindName | Finding or adding name type. It can be either FNAME_Find or FNAME_Add . Default is FNAME_Add if not explicitly supplied |

## Return Value ​

# | Type | Information |

1 | FName | FName corresponding to the string or ComparisonIndex , if one exists, or the "None" FName if one doesn't exist. If FNAME_Add is supplied then it adds the name if it doesn't exist |

## Example ​

lua
local name = FName ( " MyName " )

print (name) -- MyName

1
2
3
