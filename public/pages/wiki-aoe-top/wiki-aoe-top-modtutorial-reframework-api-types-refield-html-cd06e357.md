# 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/REFramework/api/types/REField.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:28:57.820Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

## Methods ​

### self:get_name() ​

### self:get_type() ​

Returns an RETypeDefinition* .

### self:get_offset_from_base() ​

### self:get_offset_from_fieldptr() ​

### self:get_declaring_type() ​

### self:get_flags() ​

### self:is_static() ​

### self:is_literal() ​

### self:get_data(obj) ​

Returns the data contained in the field for obj .

obj can be any of the following type:

- nil , if the field is static
- REManagedObject*
- void* pointing to a REManagedObject or ValueType
