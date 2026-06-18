# TArray | 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/UE4SS/lua-api/classes/tarray.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:28:57.453Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# TArray ​

## Inheritance ​

RemoteObject

## Metamethods ​

### __index ​

- Usage: TArray[ArrayIndex]
- Return type: auto
- Attempts to retrieve the value at the specified integer offset ArrayIndex in the array.
- Can return any type, you can use the type() function on the returned value to figure out what Lua class it's using (if non-trivial type).

### __newindex ​

- Usage: TArray[ArrayIndex] = NewValue
- Attempts to set the value at the specified integer offset ArrayIndex in the array to NewValue .

### __len ​

- Usage: #TArray
- Return type: integer
- Returns the number of current elements in the array.

## Methods ​

### GetArrayAddress() ​

- Return type: integer
- Returns: the address in memory where the TArray struct is located.

### GetArrayNum() ​

- Return type: integer
- Returns: the number of current elements in the array.

### GetArrayMax() ​

- Return type: integer
- Returns: the maximum number of elements allowed in this array (aka capacity).

### GetArrayDataAddress() ​

- Return type: integer
- Returns: the address in memory where the data for this array is stored.

### Empty() ​

- Clears the array.

### ForEach(function Callback) ​

- Iterates the entire TArray and calls the callback function for each element in the array.
- The callback params are: integer index , RemoteUnrealParam elem | LocalUnrealParam elem .
- Use elem:get() and elem:set() to access/mutate an array element.
