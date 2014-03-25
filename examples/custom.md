# Dialog - 各属性的使用

- order: 2

---

主要演示各种属性的使用。本页面载入了一份预设样式 [dialog.css](../src/dialog.css)。

<link href="../src/dialog.css" rel="stylesheet">
<style>
.fn-hide {display:none;}
</style>

---

### 1. 简单的渐入效果

<button id="example1">渐入动画效果</button>

````js
seajs.use(['dialog'], function(Dialog) {
    var example = new Dialog({
        trigger: '#example1',
        effect: 'fade',
        content: '<div style="padding: 50px">渐变！FadeIn！</div>'
    });
});
````

### 2. 没有遮罩层

<button id="example2">没有遮罩层</button>

````js
seajs.use(['dialog'], function(Dialog) {
    var example = new Dialog({
        trigger: '#example2',
        hasMask: false,
        content: '<div style="padding: 50px">没有遮罩层</div>'
    });
});
````

### 3. 自定义位置

<button id="example3-1">位置靠近顶部</button>
<button id="example3-2">位置在本按钮下方</button>

````js
seajs.use(['dialog'], function(Dialog) {
    var example3_1 = new Dialog({
        trigger: '#example3-1',
        align: {
            baseXY: ['50%', 0],
            selfXY: ['50%', 0]
        },
        content: '<div style="padding: 50px">位置靠近顶部</div>'
    });
    var example3_2 = new Dialog({
        trigger: '#example3-2',
        hasMask: false,
        align: {
            baseElement: '#example3-2',
            baseXY: [0, '100%'],
            selfXY: [0, 0]
        },
        content: '<div style="padding: 50px">位置在本按钮下方</div>'
    });
});
````

### 4. complete:show 事件在iframe中的实践

<button id="example4">complete:show 事件</button>

````js
seajs.use(['dialog'], function(Dialog) {
    var example = new Dialog({
        trigger: '#example4',
        content: 'http://www.baidu.com/'
    });
    example.on('complete:show', function() {
        console.log('iframe 完全载入成功！');
    });
});
````

### 5. 自定义关闭链接

<button id="example5-1">自定义的关闭链接</button>
<button id="example5-2">还可以动态改变它</button>

````javascript
seajs.use(['dialog','$'], function(Dialog, $) {
    var example = new Dialog({
        trigger: '#example5-1',
        closeTpl: '点我可以关闭对话框',
        height: '450px'
    });

    $('#example5-2').click(function(e) {
        e.preventDefault();
        example.show().set('closeTpl', '改变后的关闭链接');
    });
});
````

### 6. 取消 ESC 关闭浮层的功能

<button id="example6">打开对话框</button>

````javascript
seajs.use(['dialog','$'], function(Dialog, $) {
    var example = new Dialog({
        trigger: '#example6',
        content: '按 ESC 将无法关闭这个对话框',
        height: 200
    });
    example.undelegateEvents(document, 'keyup.esc');
});
````
