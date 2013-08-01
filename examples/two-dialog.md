# 两个对话框共享遮罩层

- order: 3

---

<link href="../src/dialog.css" rel="stylesheet">

> 这里要注意 mask 的表现。

<button id="example1">打开第一个对话框</button>
<button id="example2" style="display: none">打开第二个对话框</button>

````javascript
seajs.use(['dialog', '$'], function(Dialog, $) {
    var d1 = new Dialog({
        trigger: '#example1',
        height: 400,
        content: '#example2'
    });
    d1.after('show', function() {
        $('#example2').show();
    });

    var d2 = new Dialog({
        trigger: '#example2',
        width: 380,
        height: 100,
        content: '第二个对话框，此时应遮罩住对话框一'
    });
});
````
