# 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/REFramework/api/types/RETransform.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:29:00.672Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

RETransform is the basic building block of all GameObjects, they always contain one.

Inherits from REComponent .

## Methods ​

### self:calculate_base_transform(joint) ​

Returns a Matrix4x4f . Returns the reference pose (T-pose) for a specific joint relative to the transform's origin (in local transform space).

### self:set_position(position, no_dirty) ​

Sets the world position ( Vector4f ) of the transform.

When no_dirty is true , the transform and its parents will not be marked as dirty. This seems to be necessary when the scene is locked, because parent transforms will end up getting stuck.

### self:set_rotation(rotation) ​

Sets the world rotation ( Quaternion ) of the transform.

### self:get_position() ​

Gets the world position ( Vector4f ) of the transform.

### self:get_rotation() ​

Gets the world rotation ( Quaternion ) of the transform.
