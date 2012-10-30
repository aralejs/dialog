
# Dialog

基础对话框组件，提供对话框显示隐藏、dom 结构自定义、定位、select 遮挡、确定取消关闭等功能特性。

---

下面是`base-dialog`是的说明文档。

## API

* `trigger` : {element}

    对话框触发点。

* `triggerType` : {string}

    对话框触发方式，可选 click|hover|focus ，默认为click。

* `title` : {string|function}

    指定标题内容。

* `content` : {string|function}

    指定内容的html。

* `onConfirm` : {function}

    确定时的操作，可在函数内使用this.activeTrigger得到触发节点，下同。

* `onClose` : {function}

    关闭时的操作。

* `hasMask` : {boolean}

    是否有背景遮罩层。

其他配置参照[overlay](overlay/README.md)。


## 实例方法

参照[overlay](overlay/README.md)。

## 最佳实践

```js
var o = new Dialog({
    trigger: '#trigger',
    template: '<div class="overlay"><button id="close">点击关闭</button></div>',
    width: 300,
    height: 200,
    position: {
        baseXY: [100, 100]
    },
    hasMask: true
});
```

注意，需要用`data-role="title"`这样的属性来标示 html 节点的作用，目前支持的 role 有`title`(标题节点)、`content`(内容节点)、`confirm`(确定按钮)、`cancel`(取消按钮)、`close`(关闭按钮)。
