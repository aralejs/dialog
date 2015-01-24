# 历史记录

---

## 1.5.0

`new` #91 使用 arale-messenger 进行跨域支持。[演示](./examples/cross-domain-iframe.html)

`fixed` #87 #88 彻底修复两个对话框关闭时的遮罩显示问题。

## 1.4.1

`fixed` [#87](https://github.com/aralejs/dialog/pull/87) 修复两个对话框关闭时的遮罩显示问题。

`fixed` #80 修复 top 为负数的场景。

`fixed` #71 删除了多余的 arale-easing 依赖。

## 1.4.0

`changed` 迁移到 spm@3.x
`changed` 不再默认引入样式。

## 1.3.0

`new` 增加了 ajax 载入页面内容的[方式](http://aralejs.org/dialog/examples/ajax.html)。

## 1.2.6

`improved` 升级 templatable 到 0.9.2 。

`improved` 在文档中增加取消 ESC 关闭浮层的[功能说明](http://aralejs.org/dialog/examples/custom.html#6-%E5%8F%96%E6%B6%88-esc-%E5%85%B3%E9%97%AD%E6%B5%AE%E5%B1%82%E7%9A%84%E5%8A%9F%E8%83%BD)。

## 1.2.5

`improved` 升级 overlay 到 1.1.4。

`improved` 关闭按钮的 title 调整为英文。

`improved` 向上微调了对话框的出现位置。

`new` ConfirmBox 增加 cancel 事件，并且支持 ConfirmBox.confirm(msg, title, onConfirm, onCancel, options) 的调用方式。

## 1.2.4

`tag:fixed` 去掉了 JS 代码中写死的 content 的白色背景。

## 1.2.3

`tag:fixed` #47

## 1.2.2

`tag:fixed` #44 #38 修改 content 内容导致高度变化应重新定位对话框。

`tag:fixed` #43 多个对话框共享一个 mask 的后续 confirmbox 问题。

## 1.2.1

`tag:improved` 去掉了对话框的虚线框，并优化了无障碍体验。[参考](http://ued.taobao.com/blog/2011/04/onfocus-this-blur/)

`tag:fixed` #40 修复一个 iframe 对话框设置高度的问题。

`tag:fixed` 升级 overlay 到 1.1.3，修复遮罩层无法挡住 select 的问题。

`tag:fixed` 修复同一个实例多次调用 show 后无法隐藏遮罩层的问题。（这个问题在 1.2.0 时引入）

`tag:changed` #41 增加了高度超过一屏时的位置处理。


## 1.2.0

`tag:new` 新增 initialHeight 属性，用于设置 iframe 对话框的初始化高度。

`tag:changed` 移除 hasMask.hideOnClick 属性。

`tag:changed` 去掉对 mask 的 z-index 设置，改为调整 mask 的 dom 位置。

`tag:improved` #37 支持多个对话框共享同一个 mask 的[情况](examples/two-dialog.html)。

## 1.1.3

`tag:improved` overlay 升级到 1.1.2，从而修复一个 IE 冗余调用 resize 的问题。

`tag:changed` 修改 confirmbox 的 hasMask 默认值，使其点击遮罩层默认不关闭。

## 1.1.2

`tag:improved` overlay 升级到 1.1.1, mask 升级到 1.1.1, templatable 升级到 0.9.1

`tag:fixed` #33 修复 firefox 下确定取消按钮文字偏下的问题。

`tag:new` #34 #35 添加点击遮罩层时关闭对话框的特性，并改变了 hasMask 的默认值为 `{hideOnClick: true}`。

`tag:improved` 添加 styleBox, 已解决样式冲突问题

## 1.1.1

`tag:fixed` #32 修复由于本地缓存导致 position 依赖打包重复的问题。

## 1.1.0

`tag:improved` 对 arale/overlay 的依赖从 1.0.1 升级到 1.1.0 。

`tag:improved` 对 arale/mask 的依赖从 1.0.1 升级到 1.1.0 。

`tag:improved` 对 arale/events 的依赖从 1.0.0 升级到 1.1.0 。

`tag:improved` 对 templatable 的依赖从 arale/widget/1.0.3/templatable 升级到 arale/templatable/0.9.0/templatable 。

`tag:improved` 对 handlebars 的依赖从 gallery/handlebars/1.0.0/handlebars 升级到 gallery/handlebars/1.0.2/runtime 。

## 1.0.3

`tag:fixed` 修复 ConfirmBox.show 的回调失效问题。

## 1.0.2

`tag:fixed` [#25](https://github.com/aralejs/dialog/issues/25) 使得 dialog 对 mask 的 z-index 的处理不影响其他实例。

`tag:fixed` [pull/24](pull/24) 修复 ConfirmBox 静态方法生成的对象销毁失效的问题。

`tag:fixed` 修复 ConfirmBox 由于 1.0.1 版本的 dist 文件打包错误导致无法使用的问题。

## 1.0.1

`tag:fixed` [#21](https://github.com/aralejs/dialog/issues/21) 修复 IE6 下内容区域的高度撑不开的问题。

`tag:fixed` [#20](https://github.com/aralejs/dialog/issues/20) 修复 IE6 下换不同 url 时会产生 404 页面的问题。

`tag:changed` 去掉 close 自定义事件，可以用 before/after('hide') 来代替。

`tag:improved` 对 arale/overlay 的依赖升级到 1.0.1。

`tag:unresolved` 去掉 close 自定义事件导致 ConfirmBox.alert 等静态方法产生的对话框无法销毁自身。

## 1.0.0

本版本对 dialog 进行了毁灭性的重构，API 和定位都发生了大量变化，基本和之前的版本没什么关系。若要查看旧版本的文档，请到仓库中 clone 对应的 tag 到本地进行查看。

`tag:changed` BaseDialog 改名为 Dialog，定位为对话框容器，支持 Iframe 内嵌，自带模板以及样式内联。

`tag:changed` 去掉 AnimDialog，改为只支持简单的渐入效果。

`tag:changed` ConfirmBox API 大幅重构，定位为标准模态对话框。

`tag:improved` 对 arale/overlay 的依赖从 0.9.13 升级到 1.0.0

`tag:improved` 对 arale/widget 的依赖从 1.0.2 升级到 1.0.3

`tag:improved` 自动计算 mask 遮罩层的 z-index 。

`tag:fixed` 修复页面跳转会停止自适应高度的问题

## 0.9.3

`tag:improved` AnimDialog 增加 confirm 和 close 的事件阻止，防止打断可能出现的异步请求。

## 0.9.2

`tag:changed` [#10](https://github.com/aralejs/dialog/issues/10) ConfirmBox.confirm 等静态方法的参数调整，支持传自定义参数。

`tag:improved` ConfirmBox 隐藏后销毁自身。

`tag:improved` overlay 依赖升级到 0.9.13。

## 0.9.1

`tag:changed` 删除 confirmBox.message 方法。

`tag:changed` [#9](https://github.com/aralejs/dialog/issues/9) 去掉回车确定的特性。

`tag:improved` content  和 title 支持传动态 function。

`tag:improved` [#7](https://github.com/aralejs/dialog/issues/7) 去掉titleElement中对h2标签的依赖。

`tag:new` [#6](https://github.com/aralejs/dialog/issues/6) 新增confirm和close两个方法。

## 0.9.0

`tag:new` 新组件。
