define(function(require, exports, module) {

    var $ = require('$'),
        Overlay = require('overlay'),
        mask = require('mask'),
        Events = require('events');


    // BaseDialog
    // -------
    // BaseDialog 是通用对话框组件，提供确定、取消、关闭、标题设置、内容区域自定义功能。
    // 是所有对话框类型组件的基类。

    var BaseDialog = Overlay.extend({

        attrs: {
            // 对话框触发点
            trigger: null,

            // 对话框触发方式
            triggerType: 'click',

            // 不用解释了吧
            zIndex: 999,

            // 指定标题内容
            title: '',

            // 指定内容元素
            content: '',

            // 是否有背景遮罩层
            hasMask: false,

            // 点击确定时触发的函数，供覆盖
            onConfirm: function() {},

            // 点击取消或关闭时触发的函数，供覆盖
            onClose: function() {}
        },

        parseElement: function() {
            BaseDialog.superclass.parseElement.call(this);

            // 绑定额外的 dom 元素
            this.set('trigger', $(this.get('trigger')));
            this.set('titleElement', this.$('[data-role=title] h2'));
            this.set('contentElement', this.$('[data-role=content]'));
        },

        events: {
            'click [data-role=confirm]' : '_confirmHandler',
            'click [data-role=cancel]' : '_closeHandler',
            'click [data-role=close]' : '_closeHandler'
        },

        _confirmHandler: function() {
            this.trigger('confirm');
        },

        _closeHandler: function() {
            this.trigger('close');
            this.hide();
            // 关于网页中浮层消失后的焦点处理
            // http://www.qt06.com/post/280/
            this.get('trigger').focus();
        },

        show: function() {
            BaseDialog.superclass.show.call(this);
            this.element.focus();
            return this;
        },

        destroy: function() {
            this.get('trigger').off(this.get('triggerType'));
            return BaseDialog.superclass.destroy.call(this);            
        },

        setup: function() {
            BaseDialog.superclass.setup.call(this);

            this._setupTrigger();
            this._setupMask();
            this._setupKeyEvents();
            this._setupGlobalHandler();
            toTabed(this.element);
            toTabed(this.get('trigger'));
        },

        // 绑定触发对话框出现的事件
        _setupTrigger: function() {
            var that = this;
            this.get('trigger').on(this.get('triggerType'), function(e) {
                e.preventDefault();
                that.activeTrigger = this; 
                that.show();
            });
        },

        // 绑定遮罩层事件
        _setupMask: function() {
            this.before('show', function() {
                this.get('hasMask') && mask.show();
            });
            this.before('hide', function() {
                this.get('hasMask') && mask.hide();
            });
        },

        // 绑定键盘事件，ESC关闭窗口，回车确定
        _setupKeyEvents: function() {
            var that = this;
            $(this.element).on('keyup', function(e) {
                if (e.keyCode === 27) {
                    that._closeHandler();
                }
                else if (e.keyCode === 13) {
                    that._confirmHandler();
                }
            });
        },

        // 绑定确定和关闭事件到 dom 元素上，以供全局调用
        // 这样在拿不到实例对象时也可以调用关闭和确定方法
        // $('#dialog').trigger('close');
        _setupGlobalHandler: function() {
            Events.mixTo(this.element[0]);
            this.element[0].on('confirm', this._confirmHandler, this);
            this.element[0].on('close cancel', this._closeHandler, this);
        },

        _onRenderTitle: function(val) {
            if($.isFunction(val)) {
                this.get('titleElement').html(val.call(this));
            }
            else {
                this.get('titleElement').html(val);
            }
        },

        _onRenderContent: function(val) {
            if($.isFunction(val)) {
                this.get('contentElement').html(val.call(this));
            }
            else {
                this.get('contentElement').html(val);
            }
        }

    });

    module.exports = BaseDialog;

    // Helpers
    // ----

    function toTabed(element) {
        if(element.attr('tabindex') == null) {
            element.attr('tabindex', '-1');
        }
    }

});

