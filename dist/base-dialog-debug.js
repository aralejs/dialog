define("#dialog/0.9.1/base-dialog-debug", ["$-debug", "#overlay/0.9.11/overlay-debug", "#position/1.0.0/position-debug", "#iframe-shim/1.0.0/iframe-shim-debug", "#widget/1.0.2/widget-debug", "#base/1.0.1/base-debug", "#class/1.0.0/class-debug", "#events/1.0.0/events-debug", "#overlay/0.9.11/mask-debug"], function(require, exports, module) {

    var $ = require('$-debug'),
        Overlay = require('#overlay/0.9.11/overlay-debug'),
        mask = require('#overlay/0.9.11/mask-debug'),
        Events = require('#events/1.0.0/events-debug'),
        
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
            this.activeTrigger && this.activeTrigger.focus();
        },

        show: function() {
            BaseDialog.superclass.show.call(this);
            
            // 处理动态绑定的 content 和 title
            if (this._contentFunction) {
                this.get('contentElement').html(this._contentFunction.call(this));                
            }
            if (this._titleFunction) {
                this.get('titleElement').html(this._titleFunction.call(this));                
            }

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
                // 标识当前点击的元素
                that.activeTrigger = $(this);
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
                this._titleFunction = val;
            }
            else {
                this._titleFunction = null;                
                this.get('titleElement').html(val);
            }
        },

        _onRenderContent: function(val) {
            if($.isFunction(val)) {
                this._contentFunction = val;
            }
            else {
                this._contentFunction = null;
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

