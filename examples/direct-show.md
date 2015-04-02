# Dialog - 直接显示

- order: 3

---

无需 trigger，直接显示在页面上。

<link href="../src/dialog.css" rel="stylesheet">
<style>
.fn-hide {display:none;}
</style>

---

````javascript
var Dialog = require('arale-dialog');

new Dialog({
    content: '<div style="padding:50px">没有 trigger，直接显示出来</div>'
}).show();
````
