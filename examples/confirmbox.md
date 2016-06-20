# ConfirmBox - 标准模态对话框

## 带有默认样式的对话框

```html
<link href="../src/dialog.css" rel="stylesheet">
<script type="text/javascript" src="https://a.alipayobjects.com/jquery/jquery/1.7.2/jquery.js"></script>


<input type="button" id="trigger1" value="1. 默认样式对话框" />


<input type="button" id="trigger2" value="2. 自定义按钮对话框" />

<p>3. 静态方法</p>
<input type="button" id="trigger12" value="ConfirmBox.alert()" />
<input type="button" id="trigger13" value="ConfirmBox.confirm()" />
<input type="button" id="trigger13-1" value="ConfirmBox.confirm() with onCancel" />
<input type="button" id="trigger14" value="ConfirmBox.show()" />

<p>4. 静态方法自定义参数</p>
<input type="button" id="trigger4-1" value="ConfirmBox.alert() 宽度300" />
<input type="button" id="trigger4-2" value="ConfirmBox.confirm() 有关闭的X" />
<input type="button" id="trigger4-3" value="ConfirmBox.show() 没有mask" />

```

```javascript

// 1. 默认样式对话框
import Dialog from '../index';
const ConfirmBox = Dialog.ConfirmBox;
new ConfirmBox({
    trigger: '#trigger1',
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

// 2. 自定义按钮对话框
new ConfirmBox({
    trigger: '#trigger2',
    title: '我真是标题啊',
    message: '我是内容 我是内容',
    confirmTpl: '<button>确定</button>',
    cancelTpl: '<button>取消</button>'
});

// 3. 常用的静态方法
jQuery('#trigger12').click(function() {
    ConfirmBox.alert('静态方法ConfirmBox.alert');
});

jQuery('#trigger13').click(function() {
    ConfirmBox.confirm('静态方法ConfirmBox.confirm', '自定义标题', function() {
        alert('点击了确定按钮');
    });
});

jQuery('#trigger13-1').click(function() {
    ConfirmBox.confirm('静态方法ConfirmBox.confirm with onCancel', '自定义标题', function() {
        alert('点击了确定按钮');
    }, function() {
        alert('点击了取消按钮');
    });
});

jQuery('#trigger14').click(function() {
    ConfirmBox.show('只是显示一些信息，右上角关闭');
});

// 4. 静态方法自定义参数

jQuery('#trigger4-1').click(function() {
    ConfirmBox.alert('静态方法ConfirmBox.alert', function() {
        alert('点击了确定按钮');
    }, {
        beforeHide: function() {
            alert('点击了取消按钮');
        },
        width: 300
    });
});

jQuery('#trigger4-2').click(function() {
    ConfirmBox.confirm('静态方法ConfirmBox.confirm', '自定义标题', function() {
        alert('点击了确定按钮');
    }, {
        beforeHide: function() {
            alert('点击了取消按钮');
        },
        title: '改过的自定义标题',
        closeTpl: '×'
    });
});

jQuery('#trigger4-3').click(function() {
    ConfirmBox.show('静态方法ConfirmBox.show', function() {
        alert('点击了关闭按钮');
    }, {
        hasMask: false
    });
});
```
