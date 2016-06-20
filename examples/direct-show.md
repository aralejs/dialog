# Dialog - 直接显示


无需 trigger，直接显示在页面上。

<link href="../src/dialog.css" rel="stylesheet">
<style>
.fn-hide {display:none;}
</style>

```html
<script type="text/javascript" src="https://a.alipayobjects.com/jquery/jquery/1.7.2/jquery.js"></script>
```

```javascript
import Dialog from '../index';
new Dialog({
    content: '<div style="padding:50px">没有 trigger，直接显示出来</div>'
}).show();
```
