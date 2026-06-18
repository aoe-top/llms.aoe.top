# 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/REFramework/api/types/Quaternion.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:28:59.806Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

## Constructor ​

### Quaternion.new(w, x, y, z) ​

## Static Methods ​

### Quaternion.identity() ​

Returns the identity quaternion.

## Fields ​

### x: number ​

The X component of the Quaternion .

### y: number ​

The Y component of the Quaternion .

### z: number ​

The Z component of the Quaternion .

### w: number ​

The W component of the Quaternion .

## Methods ​

### self:to_mat4() ​

Returns a Matrix4x4f built from self .

### self:to_euler() ​

Returns a Vector3f representing the Euler angles for this Quaternion.

### self:inverse() ​

Returns a Quaternion that is the inverse of self .

### self:invert() ​

Inverts self . Returns nothing.

### self:normalize() ​

Normalizes self . Returns nothing.

### self:normalized() ​

Returns a Quaternion that is the normalization of self .

### self:slerp(other, t) ​

Returns a Quaternion that is the spherical linear interpolation between self and other with the given t .

### self:dot(other) ​

Returns the dot product between self and other .

### self:length() ​

Returns the length of self .

### self:conjugate() ​

Returns a Quaternion that is the conjugate of self .

## Meta-methods ​

### Quaternion * Quaternion ​

Quaternion multiplication.

### Quaternion * Vector3f ​

Quaternion Vector3f multiplication.

### Quaternion * Vector4f ​

Quaternion Vector4f multiplication.

### Quaternion[] ​

Quaternion element indexing. Valid range is [0, 4) .
