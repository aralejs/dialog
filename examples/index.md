<link rel="stylesheet" href="https://a.alipayobjects.com/u/css/201206/3OW4k7WsaR.css" type="text/css" charset="utf-8">
<style>
    .overlay {
        width: 500px;
        height: 300px;
        background: #7F96C8;
        text-align:center;        
    }
    .overlay div {
        font-size:14px;
        margin:10px 0;
    }
    .overlay input {
        margin-top:20px;
    }
    input {
        display:block;
        margin:10px;
    }
</style>

## BaseDialog: 无样式的抽象对话框组件

<div class="cell">
    <input type="button" id="trigger1" value="点击打开对话框" />
</div>

````javascript
seajs.use(['base-dialog'], function(BaseDialog) {
    var closeDialogTpl = '<div class="overlay"><button id="close">点击关闭</button><p>肯定是房间里萨的看法金克拉束带结发</p></div>';
    var dialogTpl = '<div class="overlay"><div id="dialog-title"></div><div id="dialog-content"></div><button id="confirm">确认按钮</button><button id="close">点击关闭</button></div>';

    var d1 = new BaseDialog({
        trigger: '#trigger1',
        template: dialogTpl,
        width: 300,
        height: 200,
        confirmElement: '#confirm',
        closeElement: '#close',
        titleElement: '#dialog-title',
        title: '我是标题',
        contentElement: '#dialog-content',
        content: '我是内容',
        onConfirm: function() {
            alert('点击了确定按钮');
        },
        onClose: function() {
            alert('点击了关闭按钮');
        },
        align: {
            baseXY: [200, 200]
        },
        hasMask: true
    });
    d1.set('content', '改变的内容');
    d1.set('width', 500);
});
````

