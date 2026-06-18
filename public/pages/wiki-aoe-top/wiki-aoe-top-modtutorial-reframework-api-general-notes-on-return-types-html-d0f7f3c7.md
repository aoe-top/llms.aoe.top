# 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/REFramework/api/general/Notes-on-Return-Types.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:29:10.358Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

This page refers to functions like:

- sdk.call_native_func
- sdk.call_object_func
- sdk.get_native_field
- REManagedObject:call
- REManagedObject:get_field
These functions have auto conversions for some types:

- System.String Gets converted to a normal lua string
- System.Int , System.UInt , System.Boolean , System.Single types Gets converted to native lua equivalents
- via.vec2 , via.vec3 , via.vec4 Gets converted to Vector2f, Vector3f, Vector4f
- via.mat4 Gets converted to Matrix4x4f
