define(function(require, exports, module) {

    var $ = require('$'),
        Dialog = require('./anim-dialog'),
        Templatable = require('templatable');

    // ConfirmBox
    // -------
    // ConfirmBox 是一个有基础模板和样式的对话框组件。

    var ConfirmBox = Dialog.extend({

        Implements: Templatable,

        attrs: {

            // 默认模板，不要覆盖
            template: require('./confirmbox.tpl'),
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
            Dialog.superclass.parseElement.call(this);
        }

    });

    ConfirmBox.alert = function(content, callback, options) {
        var defaults = {
            content: content,
            hasTitle: false,
            hasCancel: false,
            hasCloseX: false,
            onConfirm: function() {
                callback && callback();
                this.hide();
            }
        };
        new ConfirmBox($.extend(null, defaults, options))
        .show()
        .after('confirm close', function() {
            this.destroy();
        });
    };

    ConfirmBox.confirm = function(content, title, callback, options) {
        var defaults = {
            content: content,
            title: title || '确认框',
            hasCloseX: false,
            onConfirm: function() {
                callback && callback();
                this.hide();
            }
        };
        new ConfirmBox($.extend(null, defaults, options))
        .show()
        .after('confirm close', function() {
            this.destroy();
        });
    };

    ConfirmBox.show = function(content, callback, options) {
        var defaults = {
            content: content,
            hasTitle: false,
            hasOk: false,
            hasCancel: false,
            hasCloseX: true,
            onConfirm: function() {
                callback && callback();
                this.hide();
            }
        };
        new ConfirmBox($.extend(null, defaults, options))
        .show()
        .after('confirm close', function() {
            this.destroy();
        });
    };

    module.exports = ConfirmBox;

});

