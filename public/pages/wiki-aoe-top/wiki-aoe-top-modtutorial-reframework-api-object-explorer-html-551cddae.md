# 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/REFramework/api/object_explorer.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:28:59.394Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

提供了一些对象浏览器界面显示的访问权限。必须在 re.on_draw_ui 中调用。

## 方法 ​

### object_explorer:handle_address(addr) ​

与在对象浏览器中输入地址相同。

addr 必须指向一个REManagedObject，以使显示工作。

验证不是必需的，对象浏览器会自动处理它。
