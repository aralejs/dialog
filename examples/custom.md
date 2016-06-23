# Dialog - 各属性的使用

主要演示各种属性的使用。本页面载入了一份预设样式 [dialog.css](../src/dialog.css)。

<style>
.fn-hide {display:none;}
</style>

```html
<script type="text/javascript" src="https://a.alipayobjects.com/jquery/jquery/1.7.2/jquery.js"></script>
<button id="example1">1. 渐入效果</button>

<button id="example2">2. 没有遮罩层</button>
<p>3. 自定义位置</p>
<button id="example3-1">位置靠近顶部</button>
<button id="example3-2">位置在本按钮下方</button>


<button id="example4">4. complete:show 事件</button>

<p>5. 自定义关闭链接</p>
<button id="example5-1">自定义的关闭链接</button>
<button id="example5-2">还可以动态改变它</button>


<button id="example6">6. ESC 关闭浮层</button>
```

```javascript
import Dialog from '../index';

// 1. 渐入效果
new Dialog({
    trigger: '#example1',
    effect: 'fade',
    content: '<div style="padding: 50px">渐变！FadeIn！</div>'
});

// 2. 没有遮罩层
new Dialog({
    trigger: '#example2',
    hasMask: false,
    content: '<div style="padding: 50px">没有遮罩层</div>'
});

// 3. 自定义位置
new Dialog({
    trigger: '#example3-1',
    align: {
        baseXY: ['50%', 0],
        selfXY: ['50%', 0]
    },
    content: '<div style="padding: 50px">位置靠近顶部</div>'
});

new Dialog({
    trigger: '#example3-2',
    hasMask: false,
    align: {
        baseElement: '#example3-2',
        baseXY: [0, '100%'],
        selfXY: [0, 0]
    },
    content: '<div style="padding: 50px">位置在本按钮下方</div>'
});

// 4. complete:show 事件在iframe中的实践

new Dialog({
    trigger: '#example4',
    content: 'http://www.baidu.com/'
}).on('complete:show', function() {
    console.log('iframe 完全载入成功！');
});

// 5. 自定义关闭链接
const example5 = new Dialog({
    trigger: '#example5-1',
    closeTpl: '点我可以关闭对话框',
    height: '450px'
});

jQuery('#example5-2').click(function(e) {
    e.preventDefault();
    example5.show().set('closeTpl', '改变后的关闭链接');
});

// 6. ESC 关闭浮层
const example6 = new Dialog({
    trigger: '#example6',
    content: '按 ESC 将无法关闭这个对话框',
    height: 200
});
example6.undelegateEvents(document, 'keyup.esc');
```
