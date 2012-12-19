
# Dialog

---

基础对话框组件，提供对话框显示隐藏、dom 结构自定义、定位、select 遮挡、确定取消关闭等功能特性。

![对话框图](https://raw.github.com/slowhost/upload/1355909213528/123.png)

---

## 配置说明

### trigger *element*

对话框触发元素，可传递选择器。

### triggerType *string*

对话框触发方式，可选 click|hover|focus ，默认为click。

### element *element*

对话框的浮层元素。

### template *string*

对话框的浮层模板，和 `element` 参数二选其一即可（注：confirm-box 有自带模板）。

### title *string|function*

指定标题，可以是 html 字符串。

### content *string|function*

指定内容，可以是 html 字符串（甚至包括 `<iframe src="test.html">`）。

### onConfirm *function*

确定时的操作，可在函数内使用`this.activeTrigger`得到触发节点，下同。

### onClose *function*

关闭时的操作。

### hasMask *boolean*

是否有背景遮罩层。


其他配置参照[overlay](/overlay/)。


## 实例方法

参照[overlay](/overlay/)。


## 事件说明

以下两个事件和配置中的 `onConfirm` 和 `onClose` 作用相同，调用方式不同。

```js
dialogInstanse.on('confirm', function() {
    // ...
});
```

### confirm 

点击确定时的操作。

### close

关闭时的操作。

---

## 最佳实践

```js
seajs.use('arale/dialog/{{版本号}/base-dialog}', function(BaseDialog) {
    var o = new BaseDialog({
        trigger: '#trigger',
        template: '<div class="overlay"><button id="close">点击关闭</button></div>',
        width: 300,
        height: 200,
        align: {
            baseXY: [100, 100]
        },
        hasMask: true
    });
};
```

注意，需要用`data-role="title"`这样的属性来标示 html 节点的作用，目前支持的 role 有`title`(标题节点)、`content`(内容节点)、`confirm`(确定按钮)、`cancel`(取消按钮)、`close`(关闭按钮)。
