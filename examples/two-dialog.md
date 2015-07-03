# 两个对话框共享遮罩层

- order: 3

---

<link href="../src/dialog.css" rel="stylesheet">

> 这里要注意 mask 的表现。

<button id="example1">打开第一个对话框</button>
<button id="example2" style="display: none">打开第二个对话框</button>

````javascript
var Dialog = require('arale-dialog');
var Confirmbox = Dialog.ConfirmBox;
var $ = require('jquery');

var d1 = new Dialog({
    trigger: '#example1',
    height: 400,
    content: '#example2'
});
d1.after('show', function() {
    $('#example2').show();
});

$('#example2').click(function() {
    Confirmbox.alert('xxx');
});
````
