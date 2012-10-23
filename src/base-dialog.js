define(function(require, exports, module) {

    var $ = require('$'),
        Overlay = require('overlay'),
        mask = require('mask'),
        Events = require('events'),
        
        TRIGGER_EVENT_NS = '.trigger-events-';


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
            this.set('titleElement', this.$('[data-role=title]'));
            this.set('contentElement', this.$('[data-role=content]'));
        },

        events: {
            'click [data-role=confirm]' : 'confirm',
            'click [data-role=cancel]' : 'close',
            'click [data-role=close]' : 'close'
        },

        confirm: function() {
            this.trigger('confirm');
        },

        close: function() {
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
            this.get('trigger').off(this.get('triggerType') + TRIGGER_EVENT_NS + this.cid);
            return BaseDialog.superclass.destroy.call(this);            
        },

        setup: function() {
            BaseDialog.superclass.setup.call(this);

            this._setupTrigger();
            this._setupMask();
            this._setupKeyEvents();
            toTabed(this.element);
            toTabed(this.get('trigger'));
        },

        // 绑定触发对话框出现的事件
        _setupTrigger: function() {
            var that = this;
            this.get('trigger').on(this.get('triggerType') + TRIGGER_EVENT_NS + this.cid, function(e) {
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
            this.delegateEvents('keyup', function(e) {
                if (e.keyCode === 27) {
                    this.close();
                }
                else if (e.keyCode === 13) {
                    this.confirm();
                }
            });
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

