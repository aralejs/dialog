# 历史记录

---

## 1.0.0

本版本对 dialog 进行了毁灭性的重构，API 和定位都发生了大量变化，基本和之前的版本没什么关系。若要查看旧版本的文档，请到仓库中 clone 对应的 tag 到本地进行查看。

`tag:changed` BaseDialog 改名为 Dialog，定位为对话框容器，支持 Iframe 内嵌，自带模板以及样式内联。

`tag:changed` 去掉 AnimDialog，改为只支持简单的渐入效果。

`tag:changed` ConfirmBox API 大幅重构，定位为标准模态对话框。

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
