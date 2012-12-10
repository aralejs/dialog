define(function(require, exports, module) {

    var $ = require('$'),
        AnimDialog = require('./anim-dialog'),
        Templatable = require('templatable');

    // ConfirmBox
    // -------
    // ConfirmBox 是一个有基础模板和样式的对话框组件。

    var ConfirmBox = AnimDialog.extend({

        Implements: Templatable,

        attrs: {

            // 默认模板，不要覆盖
            template: require('./confirm-box.tpl'),        
            // 指定标题内容
            title: '默认标题',
            // 指定内容的 html
            content: '默认内容',

            width: 500,
            hasMask: true,
            effect: null,

            align: {
                selfXY: ['50%', '50%'],
                baseXY: ['50%', '38%']
            },

            hasTitle: true,
            hasOk: true,
            hasCancel: true,
            hasCloseX: true
        },

        parseElement: function() {
            this.model = {
                title: this.get('title'),
                content: this.get('content'),
                hasTitle: this.get('hasTitle'),
                hasOk: this.get('hasOk'),
                hasCancel: this.get('hasCancel'),
                hasCloseX: this.get('hasCloseX'),
                hasFoot: this.get('hasOk') || this.get('hasCancel')
            }
            AnimDialog.superclass.parseElement.call(this);
        }

    });

    ConfirmBox.alert = function(content, callback) {
        new ConfirmBox({
            content: content,
            hasTitle: false,
            hasCancel: false,
            hasCloseX: false,
            onConfirm: function() {
                callback && callback();
                this.hide();
            }
        }).show().after('confirm close', function() {
            this.destroy();
        });
    };

    ConfirmBox.confirm = function(content, title, confirmCb, cancelCb) {
        new ConfirmBox({
            content: content,
            title: title || '确认框',
            hasCloseX: false,
            onConfirm: function() {
                confirmCb && confirmCb();
                this.hide();
            },
            onClose: function() {
                cancelCb && cancelCb();
            }
        }).show().after('confirm close', function() {
            this.destroy();
        });
    };

    ConfirmBox.show = function(content, callback) {
        new ConfirmBox({
            content: content,
            hasTitle: false,
            hasOk: false,
            hasCancel: false,
            hasCloseX: true,
            onConfirm: function() {
                callback && callback();
                this.hide();
            }
        }).show().after('confirm close', function() {
            this.destroy();
        });
    };

    module.exports = ConfirmBox;

});

