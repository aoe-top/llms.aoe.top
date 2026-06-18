# UStruct | 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/UE4SS/lua-api/classes/ustruct.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:28:58.413Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# UStruct ​

## Inheritance ​

UObject

## Methods ​

### GetSuperStruct() ​

- Return type: UClass
- Returns: the SuperStruct of this struct (can be invalid).

## ForEachFunction(function Callback) ​

- Iterates every UFunction that belongs to this struct.
- The callback has one param: UFunction Function .
- Return true in the callback to stop iterating.

## ForEachProperty(function Callback) ​

- Iterates every Property that belongs to this struct.
- The callback has one param: Property Property .
- Return true in the callback to stop iterating.
