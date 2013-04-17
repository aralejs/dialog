define(function(require, exports, module) {

    var $ = require('$'),
        Templatable = require('templatable'),
        Handlebars = require('handlebars'),
        Dialog = require('./dialog');

    require('./dialog.css');

    // ConfirmBox
    // -------
    // ConfirmBox 是一个有基础模板和样式的对话框组件。

    var ConfirmBox = Dialog.extend({

        Implements: Templatable,

        attrs: {
            // 指定内容模板
            content: require('./confirmbox.tpl'),

            title: '默认标题',

            confirmTpl: '<a class="ui-dialog-button-orange">确定</a>',

            cancelTpl: '<a class="ui-dialog-button-white">取消</a>',

            message: '默认内容'
        },

        parseElement: function() {
            var model = {
                classPrefix: this.get('classPrefix'),
                message: this.get('message'),
                title: this.get('title'),
                confirmTpl: this.get('confirmTpl'),
                cancelTpl: this.get('cancelTpl'),
                hasFoot: this.get('confirmTpl') || this.get('cancelTpl')
            };
            var template = Handlebars.compile(this.get('content'));
            this.set('content', template(model));
            ConfirmBox.superclass.parseElement.call(this);
        },

        events: {
            'click [data-role=confirm]': function(e) {
                e.preventDefault();
                this.trigger('confirm');
            },
            'click [data-role=cancel]': function(e) {
                e.preventDefault();
                this.hide();
            }
        },

        _onChangeMessage: function(val) {
            this.$('[data-role=message]').html(val);
        },

        _onChangeTitle: function(val) {
            this.$('[data-role=title]').html(val);
        },

        _onChangeConfirmTpl: function(val) {
            this.$('[data-role=confirm]').html(val);
        },

        _onChangeCancelTpl: function(val) {
            this.$('[data-role=cancel]').html(val);
        }

    });

    ConfirmBox.alert = function(message, callback, options) {
        var defaults = {
            message: message,
            title: '',
            cancelTpl: '',
            closeTpl: '',
            onConfirm: function() {
                callback && callback();
                this.hide();
            }
        };
        new ConfirmBox($.extend(null, defaults, options))
        .show()
        .after('hide', function() {
            this.destroy();
        });
    };

    ConfirmBox.confirm = function(message, title, callback, options) {
        var defaults = {
            message: message,
            title: title || '确认框',
            closeTpl: '',
            onConfirm: function() {
                callback && callback();
                this.hide();
            }
        };
        new ConfirmBox($.extend(null, defaults, options))
        .show()
        .after('hide', function() {
            this.destroy();
        });
    };

    ConfirmBox.show = function(message, callback, options) {
        var defaults = {
            message: message,
            title: '',
            confirmTpl: false,
            cancelTpl: false,
            onConfirm: function() {
                callback && callback();
                this.hide();
            }
        };
        new ConfirmBox($.extend(null, defaults, options))
        .show()
        .after('hide', function() {
            this.destroy();
        });
    };

    module.exports = ConfirmBox;

});

