# 跨域iframe

---------

<button id="trigger-btn">跨域Iframe</button>
````javascript
seajs.use(['dialog','jquery'], function(Dialog, $) {
  new Dialog({
    trigger: '#trigger-btn',
    content: 'http://shaoshuai.me/test.html'
  });
});
````
