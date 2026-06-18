# Property | 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/UE4SS/lua-api/classes/property.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:28:59.079Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# Property ​

## Inheritance ​

RemoteObject

## Methods ​

### GetFullName() ​

- Return type: string
- Returns: the full name & path for this property.

### GetFName() ​

- Return type: FName
- Returns: the FName of this property by copy.

All FNames returned by __index are returned by reference.

### IsA(PropertyTypes PropertyType) ​

- Return type: bool
- Returns: true if the property is of type PropertyType .

### GetClass() ​

- Return type: PropertyClass

### ContainerPtrToValuePtr(UObjectDerivative Container, integer ArrayIndex) ​

- Return type: LightUserdata
- Equivalent to FProperty::ContainerPtrToValuePtr in UE.

### ImportText(string Buffer, LightUserdata Data, integer PortFlags, UObject OwnerObject) ​

- Equivalent to FProperty::ImportText in UE, except without the ErrorText param.
