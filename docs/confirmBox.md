# ConfirmBox 使用文档

- order: 2

---

confirmBox 是具有默认样式和完善功能的对话框，可直接使用。

继承自 anim-dialog 组件，需要载入样式`ui-confirmXbox`和`ui-xbox`。

* http://dev.assets.alipay.net/al/alice.components.ui-confirmXbox-1.0-full.css
* http://dev.assets.alipay.net/al/alice.components.ui-xbox-1.3-src.css

---

## 配置说明

### hasTitle *boolean*

是否显示标题栏，默认为 true。

### hasOk *boolean*

是否显示确定按钮，默认为 true。

### hasCancel *boolean*

是否显示取消按钮，默认为 true。

### hasCloseX *boolean*

是否显示关闭 X 按钮，默认为 true。

## 最佳实践

进行如下调用即可在页面中央显示一个对话框。

```js
new ConfirmBox({
    trigger: '#trigger',
    title: '我是标题',
    content: '我是内容',
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
    hasCloseX: true,    // 有关闭的 X 按钮
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
