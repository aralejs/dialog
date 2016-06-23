# 两个对话框共享遮罩层

> 这里要注意 mask 的表现。

```html
<script type="text/javascript" src="https://a.alipayobjects.com/jquery/jquery/1.7.2/jquery.js"></script>

<button id="example1">打开第一个对话框</button>
<button id="example2" style="display: none">打开第二个对话框</button>
```

```javascript
import Dialog from '../index';
const Confirmbox = Dialog.ConfirmBox;

var d1 = new Dialog({
    trigger: '#example1',
    height: 400,
    content: '#example2'
});
d1.after('show', function() {
    jQuery('#example2').show();
});

jQuery('#example2').click(function() {
    Confirmbox.alert('xxx');
});
```
