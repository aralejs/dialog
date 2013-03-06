# ConfirmBox 使用文档

- order: 2

---

ConfirmBox 继承自 Dialog 组件，是具有默认样式和完善功能的对话框，可直接使用。

[演示](http://aralejs.org/dialog/examples/confirmbox.html)

---

## 配置说明

### title *string*

标题栏内容，为空则无标题栏。

### message *string*

消息区域内容，可为 html 字符串。

### confirmTpl *string*

确定按钮的 html。默认为以下结构。

```html
<a class="ui-dialog-button-orange">确定</a>
```

### cancelTpl *string*

取消按钮的 html。默认为以下结构。

```html
<a class="ui-dialog-button-white">取消</a>
```

其他属性请参照 [Dialog](http://aralejs.org/dialog/)。

## 事件说明

### confirm

点击确定按钮时触发。

```js
confirmBox.on('confirm', function() {
    // 比如提交表单
});
```

### close *继承自 Dialog*

## 最佳实践

进行如下调用即可在页面中央显示一个对话框。

```js
new ConfirmBox({
    trigger: '#trigger',
    title: '我是标题',
    message: '我是内容',
    onConfirm: function() {            
        this.hide();
    }
}).show();
```

组件还提供下面三个静态方法，方便调用。

### ConfirmBox.alert(msg, callback, options?) `static`

弹出信息确认框。

### ConfirmBox.confirm(msg, title, callback, options?) `static`

弹出信息确认取消框。

### ConfirmBox.show(msg, callback, options?) `static`

弹出信息框，右上角有关闭 X 。

如弹出一个确认框：

```js
ConfirmBox.confirm('是否要删除这个类目', '确认删除框', function() {
    console.log('点击了确认按钮');
});
```

还可以利用 options 参数进行一些个性化定制，options 和 ConfirmBox 的配置项一致，并且优先级大于静态方法前面的参数。

```js
ConfirmBox.confirm('是否要删除这个类目', '确认删除框', function() {
    console.log('点击了确认按钮');
}, {
    onClose: function() {
        console.log('点击了确认按钮');
    },
    closeTpl: '',       // 关闭的按钮设置为空
    hasMask: false,     // 没有遮罩层
    width: 300          // 宽度设置为 300 px
});
```

```js
ConfirmBox.confirm('是否要删除这个类目', '确认删除框', function() {
    console.log('点击了确认按钮');
}, {    
    title: '对话框' // 标题将改为 对话框
});
```
