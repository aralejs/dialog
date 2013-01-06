# ConfirmBox - 标准模态对话框

- order: 4

---

## ConfirmBox: 带有默认样式的对话框

需要载入样式 [ui-confirmXbox](https://a.alipayobjects.com/al/alice.components.ui-confirmXbox-1.0-full.css) 和 [ui-xbox](https://a.alipayobjects.com/al/alice.components.ui-xbox-1.3-src.css
)。

````iframe:250
<link href="https://a.alipayobjects.com/al/alice.base-1.2.css" rel="stylesheet">
<link href="https://a.alipayobjects.com/al/alice.components.ui-button-orange-1.3-full.css" rel="stylesheet">
<link href="https://a.alipayobjects.com/al/alice.components.ui-button-white-1.3-full.css" rel="stylesheet">

<input type="button" id="trigger11" value="默认样式对话框" />

<script>
seajs.use(['confirmbox'], function(ConfirmBox) {
    var d11 = new ConfirmBox({
        trigger: '#trigger11',
        title: '我真是标题啊',
        message: '我是内容 我是内容',
        onConfirm: function() {
            var that = this;
            this.set('title', '三秒后关闭对话框');
            this.set('message', '不要啊！！');            
            setTimeout(function() {
                that.hide();
            }, 3000);
        }
    });
});
</script>
````

## ConfirmBox 的静态方法

````iframe:250
<link href="https://a.alipayobjects.com/al/alice.base-1.2.css" rel="stylesheet">
<link href="https://a.alipayobjects.com/al/alice.components.ui-button-orange-1.3-full.css" rel="stylesheet">
<link href="https://a.alipayobjects.com/al/alice.components.ui-button-white-1.3-full.css" rel="stylesheet">

<input type="button" id="trigger12" value="ConfirmBox.alert()" />    
<input type="button" id="trigger13" value="ConfirmBox.confirm()" />
<input type="button" id="trigger14" value="ConfirmBox.show()" />    

<script>
seajs.use(['confirmbox', '$'], function(ConfirmBox, $) {
    $('#trigger12').click(function() {
        ConfirmBox.alert('静态方法ConfirmBox.alert');
    });

    $('#trigger13').click(function() {
        ConfirmBox.confirm('静态方法ConfirmBox.confirm', '自定义标题', function() {
            alert('点击了确定按钮');
        }, function() {
            alert('点击了取消按钮');
        });
    });

    $('#trigger14').click(function() {
        ConfirmBox.show('只是显示一些信息，右上角关闭');
    });
});
</script>
````

## ConfirmBox 的静态方法自定义参数

````iframe:250
<link href="https://a.alipayobjects.com/al/alice.base-1.2.css" rel="stylesheet">
<link href="https://a.alipayobjects.com/al/alice.components.ui-button-orange-1.3-full.css" rel="stylesheet">
<link href="https://a.alipayobjects.com/al/alice.components.ui-button-white-1.3-full.css" rel="stylesheet">

<input type="button" id="trigger1" value="ConfirmBox.alert() 宽度300" />    
<input type="button" id="trigger2" value="ConfirmBox.confirm() 有关闭的X" />
<input type="button" id="trigger3" value="ConfirmBox.show() 没有mask" />

<script>
seajs.use(['confirmbox', '$'], function(ConfirmBox, $) {

    $('#trigger1').click(function() {
        ConfirmBox.alert('静态方法ConfirmBox.confirm', function() {
            alert('点击了确定按钮');
        }, {
            onClose: function() {
                alert('点击了取消按钮');
            },
            width: 300
        });
    });

    $('#trigger2').click(function() {
        ConfirmBox.confirm('静态方法ConfirmBox.confirm', '自定义标题', function() {
            alert('点击了确定按钮');
        }, {
            onClose: function() {
                alert('点击了取消按钮');
            },
            title: '改过的自定义标题',
            closeTpl: '<a href="#" class="ui-dialog-x">×</a>'
        });
    });

    $('#trigger3').click(function() {
        ConfirmBox.show('静态方法ConfirmBox.confirm', function() {
            alert('点击了确定按钮');
        }, {
            onClose: function() {
                alert('点击了取消按钮');
            },
            hasMask: false
        });
    });

});
</script>
````
