# 跨域 iframe 支持

---------

嵌入跨域iframe时，请在iframe页面中使用[arale-dialog-iframe-helper](http://spmjs.io/docs/arale-dialog-iframe-helper/)组件，以便于和父页面进行通信。

<link href="../src/dialog.css" rel="stylesheet">
<button id="trigger-btn">打开跨域 Iframe</button>


````javascript
var Dialog = require('dialog');
var $ = require('jquery');
new Dialog({
  trigger: '#trigger-btn',
  content: 'http://spmjs.io/docs/arale-dialog-iframe-helper/examples/index.html'
});
````
