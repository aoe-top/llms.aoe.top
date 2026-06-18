# 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/REFramework/api/draw.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:28:53.735Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

在 re.on_frame 或 re.on_draw_ui 中使用的方法。

如果需要更多渲染功能，请查看 REFramework 插件 reframework-d2d

## 方法 ​

### draw.world_to_screen(world_pos) ​

返回一个可选的 2D 屏幕位置对应的 Vector2f 。 如果 world_pos 不可见，则返回 nil 。

### draw.world_text(text, 3d_pos, color) ​

### draw.text(text, x, y, color) ​

### draw.filled_rect(x, y, w, h, color) ​

### draw.outline_rect(x, y, w, h, color) ​

### draw.line(x1, y1, x2, y2, color) ​

### draw.outline_circle(x, y, radius, color, num_segments) ​

### draw.filled_circle(x, y, radius, color, num_segments) ​

### draw.outline_quad(x1, y1, x2, y2, x3, y3, x4, y4, color) ​

### draw.filled_quad(x1, y1, x2, y2, x3, y3, x4, y4, color) ​

### draw.sphere(world_pos, radius, color, outline) ​

在世界空间中绘制具有二维近似值的三维球体。

### draw.capsule(world_start_pos, world_end_pos, radius, color, outline) ​

在世界空间中绘制具有二维近似值的三维胶囊体。

### draw.gizmo(unique_id, matrix, operation, mode) ​

- unique_id ，必须对于每个 gizmo 是唯一的 int64。通常对象的地址将有效果。相同的 ID 将控制具有相同 ID 的多个 gizmos。
- matrix ，gizmo 修改的 Matrix4x4f。
- operation ，默认为 UNIVERSAL。使用 imgui.ImGuizmoOperation 枚举。
- mode ，默认为 WORLD。WORLD 或 LOCAL。使用 imgui.ImGuizmoMode 枚举。
返回一个元组 changed ， mat 。Mat 是传递的修改后的 matrix 。

imgui.new_enum("ImGuizmoOperation",
"TRANSLATE", ImGuizmo::OPERATION::TRANSLATE,
"ROTATE", ImGuizmo::OPERATION::ROTATE,
"SCALE", ImGuizmo::OPERATION::SCALE,
"SCALEU", ImGuizmo::OPERATION::SCALEU,
"UNIVERSAL", ImGuizmo::OPERATION::UNIVERSAL);
imgui.new_enum("ImGuizmoMode",
"WORLD", ImGuizmo::MODE::WORLD,
"LOCAL", ImGuizmo::MODE::LOCAL);

1
2
3
4
5
6
7
8
9

示例视频

### draw.cube(matrix) ​

### draw.grid(matrix, size) ​
