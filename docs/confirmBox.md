## confirmBox 对话框

confirmBox 是具有默认样式和完善功能的对话框，可直接使用。

继承自 arale.animDialog 组件。

需要载入样式`ui-confirmXbox`和`ui-xbox`。

* http://dev.assets.alipay.net/al/alice.components.ui-confirmXbox-1.0-full.css
* http://dev.assets.alipay.net/al/alice.components.ui-xbox-1.3-src.css

## 配置说明

* `hasTitle` : {boolean}

    是否显示标题栏，默认为 true。

* `hasOk` : {boolean}

    是否显示确定按钮，默认为 true。

* `hasCancel` : {boolean}

    是否显示取消按钮，默认为 true。

* `hasCloseX` : {boolean}

    是否显示关闭 X 按钮，默认为 true。

## 最佳实践

进行如下调用即可在页面中央显示一个对话框。

    new ConfirmBox({
        trigger: '#trigger',
        title: '我是标题',
        content: '我是内容',
        onConfirm: function() {            
            this.hide();
        }
    }).show();

组件还提供下面三个静态方法，方便调用。

* `ConfirmBox.alert(msg, callback)`

    弹出信息确认框。

* `ConfirmBox.confirm(msg, title, confirmCallback, cancelCallback)`

    弹出信息确认取消框。

* `ConfirmBox.show(msg, callback)`

    弹出信息框，右上角有关闭 X 。

