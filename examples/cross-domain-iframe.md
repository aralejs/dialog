# 跨域iframe

---------

嵌入跨域iframe时，请在iframe页面中使用[arale-dialog-iframe-helper](http://spmjs.io/docs/arale-dialog-iframe-helper/)组件，以便于和父页面进行通信。

<button id="trigger-btn">跨域Iframe</button>
````javascript
seajs.use(['dialog','jquery'], function(Dialog, $) {
  new Dialog({
    trigger: '#trigger-btn',
    content: 'http://spmjs.io/docs/arale-dialog-iframe-helper/examples/index.html'
  });
});
````
