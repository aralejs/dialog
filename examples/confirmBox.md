## ConfirmBox: 带有默认样式的对话框

<div class="cell">
    <input type="button" id="trigger11" value="默认样式对话框" />
</div>

````javascript
seajs.use(['confirm-box'], function(ConfirmBox) {
    var d11 = new ConfirmBox({
        trigger: '#trigger11',
        title: function() {
            return '我真是标题啊';
        },
        content: '我是内容 我是内容',
        effect: {
            type: 'move',
            from: 'up'
        },
        onConfirm: function() {
            var that = this;
            this.set('title', '三秒后关闭对话框');
            this.set('content', '不要啊！！');            
            setTimeout(function() {
                that.hide();
            }, 3000);
        }
    });
});
````

* ConfirmBox 的静态方法

<div class="cell">
    <input type="button" id="trigger12" value="ConfirmBox.alert()" />    
    <input type="button" id="trigger13" value="ConfirmBox.confirm()" />
    <input type="button" id="trigger14" value="ConfirmBox.message()" />    
</div>

````javascript
seajs.use(['confirm-box', 'jquery'], function(ConfirmBox, $) {
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
        ConfirmBox.message('此消息将在四秒后消失');
    });
});
````
