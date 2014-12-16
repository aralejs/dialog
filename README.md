# Dialog

---

[![spm package](http://spmjs.io/badge/arale-dialog)](http://spmjs.io/package/arale-dialog)
[![Build Status](https://img.shields.io/travis/aralejs/dialog.svg?style=flat)](https://travis-ci.org/aralejs/dialog)
[![Coverage Status](https://img.shields.io/coveralls/aralejs/dialog.svg?style=flat)](https://coveralls.io/r/aralejs/dialog)

基础对话框组件，提供对话框显示隐藏、dom 结构自定义、定位、select 遮挡、确定取消关闭等功能特性。

本模块分为两个子组件：Dialog 和 ConfirmBox，前者提供抽象的基础容器功能，无绑定 UI 样式，后者在前者的基础上提供模态对话框的功能并提供完善的 UI 样式。

Dialog 组件提供了默认样式，请单独引用 [dialog.css](https://github.com/aralejs/dialog/blob/master/src/dialog.css)。

![对话框图](https://t.alipayobjects.com/images/T1bexeXgxiXXXXXXXX.png)

Dialog 继承了 [overlay](http://aralejs.org/overlay/)，可使用其中包括 [widget](http://aralejs.org/widget/)、[base](http://aralejs.org/base/)、[class](http://aralejs.org/class/)、[events](http://aralejs.org/events/)、[attribute](http://aralejs.org/base/docs/attribute.html)、[aspect](http://aralejs.org/base/docs/aspect.html) 的属性和方法。

---

## 最佳实践

```js
seajs.use('dialog', function(Dialog) {
    var o = new Dialog({
        trigger: '#trigger',
        content: '<div>这是 dialog 容器的内容</div>'
    });
});
```

内嵌 Iframe：

```js
seajs.use('dialog', function(Dialog) {
    var o = new Dialog({
        trigger: '#trigger',
        content: 'https://www.alipay.com/'
    });
});
```

## 配置说明

### trigger *element*

对话框触发元素，可传递选择器。

### content *string|element*

容器的内容，可以是纯字符串、dom对象、jQuery对象、html标签字符串、以及 URL 地址。当 content 为 URL 地址时，本组件将内嵌目标页面的 Iframe。

### hasMask *boolean*

是否有背景遮罩层。默认为 `true`。

### classPrefix *string*

统一样式前缀，默认为 `ui-dialog`。

### closeTpl *string*

右上角的关闭链接，默认为`×`。

### width *number|string*

对话框宽度，默认 500px。

### height *number|string*

对话框高度。当设置了这个属性时，对话框高度会固定，
下面的 autoFit 强制为 false，initialHeight 失效。

### zIndex *number*

对话框 z-index 层级，默认 999。

### effect *string*

简单的动画效果，none 为无动画，fade 为渐入效果。默认为 none。

### autoFit *boolean*

内嵌 Iframe 页面时是否自适应高度，默认为 true。`iframe 类型时有效`

### initialHeight *number|string*

内嵌 Iframe 页面时对话框的初始高度（onload 后会发生变化），默认为 300px 。`只有当对话框是 iframe 类型时有效`


> 其他配置如定位参数 `align` 等请参照 [overlay](http://aralejs.org/overlay/)。


## 实例方法

主要有 show、hide、render 等方法，请参照 [overlay](http://aralejs.org/overlay/)。


## 事件说明

### complete:show

本事件在当 content 为 URL 地址时 Iframe 载入完毕后触发。

```js
dialogInstanse.on('complete:show', function() {
    // Iframe 载入完毕
});
```

> close 事件已经删除，可以使用 `.after('hide', function() {})` 来代替。


## 委托绑定

需要动态加载 trigger 时，可以使用如下方式进行委托绑定。

```js
// 不初始化 trigger
var d = new Dialog({
  content: '内容'
});

$('document').on('click', '.selector', function() {
  d.activeTrigger = $(this);
  d.show();
});
```

