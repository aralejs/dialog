# Dialog - 基础调用

- order: 1

---

主要演示传入各种 content，以及传入 url 的自动识别和高度管理。本页面载入了一份预设样式 [dialog.css](../src/dialog.css)。

<link href="../src/dialog.css" rel="stylesheet">
<style>
.fn-hide {display:none;}
</style>

---

### 1. 基本调用，内容传入字符串

<button id="example1">内容传入字符串</button>

````javascript
seajs.use(['dialog'], function(Dialog) {
    new Dialog({
        trigger: '#example1',
        height: '100px',
        content: '传入了字符串'
    });
});
````

<select></select>
<select></select>
<select></select>
<select></select>

### 2. 内容可传入 DOM 对象

<button id="example2">内容传入DOM 对象</button>

<div class="fn-hide"><div id="example2-dom" style="padding:50px">传入了DOM</div></div>


````javascript
seajs.use(['dialog','jquery'], function(Dialog, $) {
    new Dialog({
        trigger: '#example2',
        content: $('#example2-dom')
    });
});
````


### 3. 内容可传入 html 标签

<button id="example3">传入了 html 标签</button>

````javascript
seajs.use(['dialog','jquery'], function(Dialog, $) {
    new Dialog({
        trigger: '#example3',
        content: '<div style="padding:20px;">传入了 html 标签</div>'
    });
});
````

### 4. 内容可传入 url，自动判断是否为 url

<button id="example4">内嵌 iframe</button>

````javascript
seajs.use(['dialog','jquery'], function(Dialog, $) {
    new Dialog({
        trigger: '#example4',
        content: './iframe.html'
    });
});
````

在 iframe 页面可以这样绑定关闭按钮

```
document.getElementById('close').onclick = function(){
    window.frameElement.trigger('close'); 
};
```

### 5. iframe 的 url 可以根据 trigger 变化

<div id="example5" class="cell">
    <button data-src="http://baidu.com">百度</button>
    <button data-src="http://douban.com">豆瓣</button>
    <button data-src="https://www.alipay.com">支付宝</button>
</div>

````javascript
seajs.use(['dialog','jquery'], function(Dialog, $) {
    new Dialog({
        trigger: '#example5 button',
        height: '400px'
    }).before('show',function() {
         this.set('content', this.activeTrigger.attr('data-src'));
    });
});
````

### 6. 当然除了 iframe，同样可以动态修改 content

<div id="example6" class="cell">
    <button data-id="10015">图片1</button>
    <button data-id="10016">图片2</button>
    <button data-id="10053">图片3</button>
    <button data-id="10075">图片4</button>
</div>

````javascript
seajs.use(['dialog','jquery'], function(Dialog, $) {
    new Dialog({
        trigger: '#example6 button',
        height: '160px',
        width: '160px'
    }).before('show',function() {
        var img = '<img src="https://i.alipayobjects.com/combo.jpg?d=apps/58&t='+ this.activeTrigger.attr('data-id') + '" />';
        this.set('content', img);
    });
});
````


### 7. 能够自动管理内嵌 iframe 的高度。

<button id="example7">打开一个高度变化的iframe</button>

````javascript
seajs.use(['dialog'], function(Dialog) {
    new Dialog({
        trigger: '#example7',
        content: './heightChange.html'
    });
});
````


### 8. 初始化高度 initialHeight

<button id="example8">打开初始高度 150px 的对话框</button>

````javascript
seajs.use(['dialog','jquery'], function(Dialog, $) {
    var example = new Dialog({
        trigger: '#example8',
        content: './iframe.html',
        initialHeight: 150
    });
});
````
