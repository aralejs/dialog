# 跨域 iframe 支持


嵌入跨域iframe时，请在iframe页面中使用[arale-dialog-iframe-helper](http://spmjs.io/docs/arale-dialog-iframe-helper/)组件，以便于和父页面进行通信。

```html
<script type="text/javascript" src="https://a.alipayobjects.com/jquery/jquery/1.7.2/jquery.js"></script>

<button id="trigger-btn">打开跨域 Iframe</button>
```

````javascript
import Dialog from '../index';
import '../src/dialog.css';
new Dialog({
  trigger: '#trigger-btn',
  autoFit: false,
  content: 'http://docs.spmjs.io/arale-dialog-iframe-helper/latest/examples/index.html'
});
````
