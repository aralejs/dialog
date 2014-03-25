# Dialog - ajax 载入内容

- order: 5

---

<link href="../src/dialog.css" rel="stylesheet">
<style>
.fn-hide {display:none;}
</style>

<button id="example1">打开对话框（ajax）</button>

````js
seajs.use(['dialog'], function(Dialog) {
    var example = new Dialog({
        trigger: '#example1',
        content: './ajax-page.html?ajax'
    });
});
````

<button id="example2">打开对话框（iframe）</button>

````js
seajs.use(['dialog'], function(Dialog) {
    var example = new Dialog({
        trigger: '#example2',
        content: './ajax-page.html'
    });
});
````

ajax-page 的内容如下：

```html
<!DOCTYPE HTML>
<html>
<head>
  <style>
  body {color:red; height: 200px;}
  </style>
<head>
<body>
  <div>我是一个页面的内容</div>
  <div>我是一个页面的内容</div>
</body>
</html>
```
