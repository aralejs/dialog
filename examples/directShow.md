# Dialog - 直接显示

- order: 3

---

无需 trigger，直接显示在页面上。

---

````javascript
seajs.use(['dialog'], function(Dialog) {
    new Dialog({
        content: '<div style="padding:50px">没有 trigger，直接显示出来</div>'
    }).show();
});
````
