# Dialog - DATA-API方式

- order: 4

---

使用 DATA-API 方式初始化 Dialog

<link href="../src/dialog.css" rel="stylesheet">

---

````html
<button id="example4" data-widget="dialog"  data-widget-role="trigger" data-content="./iframe.html">内嵌 iframe</button>
````

````js
seajs.use(['arale/widget/1.1.1/widget'], function(Widget) {
    Widget.autoRenderAll();
});
````
