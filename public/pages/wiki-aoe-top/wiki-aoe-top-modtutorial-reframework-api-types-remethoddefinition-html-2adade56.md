# 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/REFramework/api/types/REMethodDefinition.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:29:06.898Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

Method descriptor.

## Methods ​

### self:get_name() ​

### self:get_return_type() ​

Returns an RETypeDefinition* .

### self:get_function() ​

Returns a void* . Pointer to the actual function in memory.

### self:get_declaring_type() ​

Returns an RETypeDefinition* corresponding to the class/type that declared this method.

### self:get_num_params() ​

Returns the number of parameters required to call the function.

### self:get_param_types() ​

Returns a list of RETypeDefinition

### self:get_param_names() ​

Returns a list of strings for the parameter names

### self:is_static() ​

Returns whether this method is static or not.

### self:call(obj, args...) ​

Equivalent to calling obj:call(args...)

Can also use self(obj, args...)
