# 历史记录

---

## 1.0.2

`tag:fixed` [pull/24](pull/24) 修复 ConfirmBox 静态方法生成的对象销毁失效的问题。

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
