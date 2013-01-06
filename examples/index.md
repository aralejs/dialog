# 演示文档

- order: 1

---

<style>
.fn-hide {
    display: none;
}
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


### 2. 内容可传入 DOM 对象

<button id="example2">内容传入$('#example2-dom')</button>
<div class="fn-hide">
    <div id="example2-dom" style="padding:50px">传入了DOM</div>
</div>

<span class="alieditContainer" >
    <object id="password_ie" name="password_ie" tabindex="2" classid="clsid:488A4255-3236-44B3-8F27-FA1AECAA8844" codebase="https://download.alipay.com/aliedit/aliedit/2401/aliedit.cab#Version=1,0,0,1" width="200" height="24">
        <param name="wmode" value="opaque" />
        <param name="cm5ts" value="5120914918" />
        <param name="cm5pk" value="MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDDS92pDVyWNT7dzG9zH0opH44z9FayCZTX5iqGUxUjPi667IkyaqrsmDPqKsJp47lJ29lzs+Qv8zjPPdmnxjFteMrfpc4ui24gL1iZnchwX87Ox/+Xrm8HFmKlhmUO9n/QgTT+Nz1RGMEN1+HijvsoAhS0TS8XjSfzRkrwvK2pJQIDAQAB" />
        <param name="PasswordMode" value="1">
        <param name="CryptoMode" value="4" />
        <embed type="application/aliedit" id="password_noie" name="password_noie" data="https://securitycenter.alipay.com/sc/aliedit/intro.htm" tabindex="2"  width="200" height="24" />
    </object>
</span>

````javascript
seajs.use(['dialog','$'], function(Dialog, $) {
    new Dialog({
        trigger: '#example2',
        content: $('#example2-dom')
    });
});
````


### 3. 内容可传入 html 标签

<div class="cell">
    <button id="example3">content: '&lt;div&gt;传入了 html 标签&lt;/div&gt;'</button>
</div>

````javascript
seajs.use(['dialog','$'], function(Dialog, $) {
    new Dialog({
        trigger: '#example3',
        content: '<div style="padding:20px;">传入了 html 标签</div>'
    });
});
````

### 4. 内容可传入 url，自动判断是否为 url

<div class="cell">
    <button id="example4">content: 'iframe.html'</button>
</div>

````javascript
seajs.use(['dialog','$'], function(Dialog, $) {
    new Dialog({
        trigger: '#example4',
        autoFit: false,
        content: 'http://www.baidu.com'
    });
});
````

在 iframe 页面这样设置关闭按钮

```
document.getElementById('close').onclick = function(){
    window.frameElement.trigger('close'); 
};
```

### 5. iframe 的 url 可以根据 trigger 变化

<div id="example5" class="cell">
    <button data-src="http://baidu.com">百度</button>
    <button data-src="http://qq.com">腾讯</button>
    <button data-src="http://www.alipay.com">支付宝</button>
</div>

````javascript
seajs.use(['dialog','$'], function(Dialog, $) {
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
seajs.use(['dialog','$'], function(Dialog, $) {
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

### 7. 关闭链接可以自定义

<button id="example7-1">closeTpl: '自定义的关闭链接'</button>
<button id="example7-2">还可以动态改变它</button>

````javascript
seajs.use(['dialog','$'], function(Dialog, $) {
    var example = new Dialog({
        trigger: '#example7-1',
        closeTpl: '点我可以关闭对话框',
        height: '450px'
    });

    $('#example7-2').click(function(e) {
        e.preventDefault();
        example.show().set('closeTpl', '改变后的关闭链接');
    });
});
````
