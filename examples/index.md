# BaseDialog: 基础对话框演示

- order: 1

---

<link href="http://dev.assets.alipay.net/al/alice.components.ui-confirmXbox-1.0-full.css" rel="stylesheet">
<link href="http://dev.assets.alipay.net/al/alice.components.ui-xbox-1.3-src.css" rel="stylesheet">
<style>
.ui-confirmXbox h2 {
    margin:0;
    padding:0;
    margin-left:20px;
    border:none;
    font-size:16px;
}
</style>

## 基础使用

<input type="button" id="trigger1" value="点击打开对话框" />

<div class="ui-xbox fn-hide" id="confirmBox1">
    <div class="ui-xbox-action"><a href="javascript:;" class="ui-xbox-close" data-role="close" title="关闭">×</a></div>
    <div class="ui-xbox-content">
        <!-- ui-confirmXbox -->
        <div class="ui-confirmXbox fn-clear">
            <div class="ui-confirmXbox-title sl-linear-light" data-role="head">
                <h2 data-role="title">测试标题</h2>
            </div>
            <div class="ui-confirmXbox-container">
                <div class="ui-confirmXbox-content" data-role="content">
                    <p>测试内容测试内容测试内容测试内容测试内容测试内容。</p>
                </div>
                <div class="ui-confirmXbox-foot">
                    <div class="ui-button ui-button-sorange" data-role="confirm">
                        <a href="javascript:;" class="ui-button-text">确定</a>
                    </div>
                    <div class="ui-button ui-button-swhite" data-role="cancel">
                        <a href="javascript:;" class="ui-button-text">取消</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- ui-confirmXbox end -->
    </div>
</div>

````javascript
seajs.use(['base-dialog'], function(BaseDialog) {
    var d1 = new BaseDialog({
        trigger: '#trigger1',
        element: '#confirmBox1',
        width: 300,
        title: '我是标题',
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

## 动态的 title 和 content

<input type="button" class="trigger2" value="这是按钮一" />
<input type="button" class="trigger2" value="这是按钮二" />

<div class="ui-xbox fn-hide" id="confirmBox2">
    <div class="ui-xbox-action"><a href="javascript:;" class="ui-xbox-close" data-role="close" title="关闭">×</a></div>
    <div class="ui-xbox-content">
        <!-- ui-confirmXbox -->
        <div class="ui-confirmXbox fn-clear">
            <div class="ui-confirmXbox-title sl-linear-light" data-role="head">
                <h2 data-role="title">测试标题</h2>
            </div>
            <div class="ui-confirmXbox-container">
                <div class="ui-confirmXbox-content" data-role="content">
                    <p>测试内容测试内容测试内容测试内容测试内容测试内容。</p>
                </div>
                <div class="ui-confirmXbox-foot">
                    <div class="ui-button ui-button-sorange" data-role="confirm">
                        <a href="javascript:;" class="ui-button-text">确定</a>
                    </div>
                    <div class="ui-button ui-button-swhite" data-role="cancel">
                        <a href="javascript:;" class="ui-button-text">取消</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- ui-confirmXbox end -->
    </div>
</div>

````javascript
seajs.use(['base-dialog'], function(BaseDialog) {
    new BaseDialog({
        trigger: '.trigger2',
        element: '#confirmBox2',
        width: 300,
        title: function() {
            return this.activeTrigger.val() + '的标题';
        },
        content: function() {
            return this.activeTrigger.val() + '的内容';
        },
        align: {
            baseXY: [200, 200]
        },
        hasMask: true
    });
});
````

