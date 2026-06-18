# UFunction | 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/UE4SS/lua-api/classes/ufunction.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:28:59.495Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# UFunction ​

## Inheritance ​

UObject

## Metamethods ​

### __call ​

- Usage: UFunction(UFunctionParams...)
- Return type: auto
- Attempts to call the UFunction and returns the result, if any.
- If the UFunction is obtained without a context (e.g. from StaticFindObject ), a UObject context must be passed as the first parameter.

## Methods ​

### GetFunctionFlags() ​

- Return type: integer
- Returns: the flags for the UFunction .

### SetFunctionFlags(integer Flags) ​

- Sets the flags for the UFunction .
