# AnimDialog: 动画对话框演示

- order: 2

---

<script>
window.template =  
    '<div class="ui-xbox">\
        <div class="ui-xbox-action"><a href="javascript:;" class="ui-xbox-close" data-role="close" title="关闭">×</a></div>\
        <div class="ui-xbox-content">\
            <div class="ui-confirmXbox">\
                <div class="ui-confirmXbox-title sl-linear-light" data-role="head"><h2 data-role="title">我是标题</h2></div>\
                <div class="ui-confirmXbox-container">\
                    <div class="ui-confirmXbox-content" data-role="content">我是内容</div>\
                    <div class="ui-confirmXbox-foot" data-role="foot">\
                        <div class="ui-button ui-button-sorange ui-confirmXbox-confirm" data-role="confirm">\
                            <a href="javascript:;" class="ui-button-text">确定</a>\
                        </div>\
                        <div class="ui-button ui-button-swhite ui-confirmXbox-cancel" data-role="cancel">\
                            <a href="javascript:;" class="ui-button-text">取消</a>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        </div>\
    </div>';
</script>

## 淡入淡出对话框: fade

````iframe:250
<link href="https://a.alipayobjects.com/al/alice.base-1.2.css" rel="stylesheet">
<link href="https://a.alipayobjects.com/al/alice.components.ui-confirmXbox-1.0-full.css" rel="stylesheet">
<link href="https://a.alipayobjects.com/al/alice.components.ui-xbox-1.3-src.css" rel="stylesheet">

<input type="button" id="trigger2" value="淡入淡出对话框" />

<script>
seajs.use(['anim-dialog'], function(AnimDialog) {
    var d2 = new AnimDialog({
        trigger: '#trigger2',
        template: parent.template,
        width: 500,
        align: {
            baseXY: [50, 50]
        },
        effect: {
            type: 'fade'
        }
    });
});
</script>
````

## 展开对话框: slide

````iframe:250
<link href="https://a.alipayobjects.com/al/alice.base-1.2.css" rel="stylesheet">
<link href="https://a.alipayobjects.com/al/alice.components.ui-confirmXbox-1.0-full.css" rel="stylesheet">
<link href="https://a.alipayobjects.com/al/alice.components.ui-xbox-1.3-src.css" rel="stylesheet">

<input type="button" id="trigger3" value="水平展开对话框" />
<input type="button" id="trigger4" value="垂直展开对话框" />    

<script>
seajs.use(['anim-dialog'], function(AnimDialog) {
    var d3 = new AnimDialog({
        trigger: '#trigger3',
        template: parent.template,
        width: 500,
        height: 150,
        align: {
            baseXY: [50, 50]
        },
        effect: {
            type: 'slide',
            from: 'left'
        }
    });
    var d4 = new AnimDialog({
        trigger: '#trigger4',
        template: parent.template,
        width: 500,
        align: {
            baseXY: [50, 50]
        },
        effect: {
            type: 'slide',
            from: 'up'
        }
    });
});
</script>
````

## 移入移出对话框: move

````iframe:250
<link href="https://a.alipayobjects.com/al/alice.base-1.2.css" rel="stylesheet">
<link href="https://a.alipayobjects.com/al/alice.components.ui-confirmXbox-1.0-full.css" rel="stylesheet">
<link href="https://a.alipayobjects.com/al/alice.components.ui-xbox-1.3-src.css" rel="stylesheet">

<input type="button" id="trigger5" value="从左移入对话框" />
<input type="button" id="trigger6" value="从右移入对话框" />
<input type="button" id="trigger7" value="从上移入对话框" />
<input type="button" id="trigger8" value="从下移入对话框" />

<script>
seajs.use(['anim-dialog'], function(AnimDialog) {
    var d5 = new AnimDialog({
        trigger: '#trigger5',
        template: parent.template,
        width: 500,
        align: {
            baseXY: [50, 50]
        },
        effect: {
            type: 'move',
            from: 'left'
        }
    });
    var d6 = new AnimDialog({
        trigger: '#trigger6',
        template: parent.template,
        width: 500,
        align: {
            baseXY: [50, 50]
        },
        effect: {
            type: 'move',
            from: 'right'
        }
    });
    var d7 = new AnimDialog({
        trigger: '#trigger7',
        template: parent.template,
        width: 500,
        align: {
            baseXY: [50, 50]
        },
        effect: {
            type: 'move',
            from: 'up'
        }
    });
    var d8 = new AnimDialog({
        trigger: '#trigger8',
        template: parent.template,
        width: 500,
        align: {
            baseXY: [50, 50]
        },
        effect: {
            type: 'move',
            from: 'down'
        }
    });
});
</script>
````

## 混合动画对话框

````iframe:250
<link href="https://a.alipayobjects.com/al/alice.base-1.2.css" rel="stylesheet">
<link href="https://a.alipayobjects.com/al/alice.components.ui-confirmXbox-1.0-full.css" rel="stylesheet">
<link href="https://a.alipayobjects.com/al/alice.components.ui-xbox-1.3-src.css" rel="stylesheet">

<input type="button" id="trigger9" value="混合动画对话框一" />
<input type="button" id="trigger10" value="混合动画对话框二" />

<script>
seajs.use(['anim-dialog'], function(AnimDialog) {
    var d9 = new AnimDialog({
        trigger: '#trigger9',
        template: parent.template,
        width: 500,
        align: {
            baseXY: [50, 50]
        },
        showEffect: {
            type: 'move',
            from: 'down'
        },
        hideEffect: {
            type: 'fade'
        }
    });
    var d10 = new AnimDialog({
        trigger: '#trigger10',
        template: parent.template,
        width: 500,
        align: {
            baseXY: [50, 50]
        },
        showEffect: {
            type: 'none'
        },
        hideEffect: {
            type: 'move',
            from: 'left'
        }
    });
});
</script>
````

