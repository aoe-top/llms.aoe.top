# PropertyTypes | 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/UE4SS/lua-api/table-definitions/propertytypes.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:29:10.750Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# PropertyTypes ​

The PropertyTypes table contains type information for Unreal Engine properties.
This is primarily used with the RegisterCustomProperty Lua function.

This table is automatically populated with data.
Do not modify the data inside this table.

## Structure ​

Key | Value |

ObjectProperty | internal_value |

Int8Property | internal_value |

Int16Property | internal_value |

IntProperty | internal_value |

Int64Property | internal_value |

NameProperty | internal_value |

FloatProperty | internal_value |

StrProperty | internal_value |

ByteProperty | internal_value |

BoolProperty | internal_value |

ArrayProperty | internal_value |

MapProperty | internal_value |

StructProperty | internal_value |

ClassProperty | internal_value |

WeakObjectProperty | internal_value |

EnumProperty | internal_value |

TextProperty | internal_value |

## Example ​

lua
local PropertyType = PropertyTypes. ObjectProperty

1
