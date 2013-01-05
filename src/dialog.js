define(function(require, exports, module) {

    var $ = require('$'),
        Overlay = require('overlay'),
        mask = require('mask'),
        Events = require('events'),
        Templatable = require('templatable'),
        EVENT_NS = '.dialog';

    require('./dialog.css');

    // Dialog
    // -------
    // Dialog 是通用对话框组件，、显隐关闭、内容区域自定义功能。
    // 是所有对话框类型组件的基类。

    var Dialog = Overlay.extend({

        Implements: Templatable,

        attrs: {
            // 模板
            template: require('./dialog.tpl'),

            // 对话框触发点
            trigger: {
                value: null,
                getter: function(val) {
                    return $(val);
                }
            },

            // 统一样式前缀
            classPrefix: 'ui-dialog',

            // 指定内容元素，可以是 url 地址
            content: {
                value: '',
                setter: function(val) {
                    // 判断是否是 url 地址
                    if (/^(https?:\/\/|\/|\.\/|\.\.\/)/.test(val)) {
                        this._type = 'iframe';
                    }
                    return val;
                }
            },

            // 是否有背景遮罩层
            hasMask: true,

            // 关闭按钮可以自定义
            closeTpl: '<a href="#" class="ui-dialog-x">×</a>',

            // 默认宽度
            width: 500,

            // 默认高度
            height: '',

            // 最小高度
            minHeight: 100,

            // 简单的动画效果 none | fade | slide
            effect: 'none',

            // 不用解释了吧
            zIndex: 999,

            // 是否自适应高度
            autoFit: true,

            // 默认定位
            align: {
                selfXY: ['50%', '0'],
                baseXY: ['50%', '12%']
            }
        },

        parseElement: function() {
            var that = this;
            this.model = {
                classPrefix: this.get('classPrefix')
            };

            Dialog.superclass.parseElement.call(this);

            this.contentElement = this.$('[data-role=content]');
            if (this._type === 'iframe') {
                var iframe = $('<iframe>', {
                    src: 'javascript:;',
                    scrolling: 'no',
                    frameborder: 'no',
                    allowTransparency: 'true',
                    css: {
                        border: 'none',
                        width: '100%',
                        height: '100%'
                    }
                }).appendTo(this.contentElement);

                // 给 iframe 绑一个 close 事件
                // iframe 内部可通过 window.frameElement.trigger('close') 关闭
                Events.mixTo(iframe[0]);
                iframe[0].on('close', function() {
                    that.hide();
                });
            }
        },

        events: {
            'click [data-role=close]': function(e) {
                e.preventDefault();
                this.hide();
            }
        },

        show: function() {
            Dialog.superclass.show.call(this);
            this.element.focus();
            return this;
        },

        hide: function() {
            Dialog.superclass.hide.call(this);
            this.trigger('close');
            // 关于网页中浮层消失后的焦点处理
            // http://www.qt06.com/post/280/
            this.activeTrigger && this.activeTrigger.focus();
        },

        destroy: function() {
            this.get('trigger').off('click' + EVENT_NS + this.cid);
            this.element.remove();
            mask.hide();
            return Dialog.superclass.destroy.call(this);
        },

        setup: function() {
            Dialog.superclass.setup.call(this);

            this._setupTrigger();
            this._setupMask();
            this._setupKeyEvents();
            toTabed(this.element);
            toTabed(this.get('trigger'));

            // 默认当前触发器
            this.activeTrigger = this.get('trigger').eq(0);
        },

        // onRender
        // ---

        _onRenderContent: function(val) {
            if (this._type !== 'iframe') {
                var value;
                // 有些情况会报错
                try {
                    value = $(val);
                } catch (e) {
                    value = [];
                }
                if (value[0]) {
                    this.contentElement.empty().append(value);
                } else {
                    this.contentElement.empty().html(val);
                }
            }
        },

        _onRenderCloseTpl: function(val) {
            this.$('[data-role=close]').html(val);
        },

        // 私有方法
        // ---

        // 绑定触发对话框出现的事件
        _setupTrigger: function() {
            var that = this;
            this.get('trigger').on('click' + EVENT_NS + this.cid, function(e) {
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

        // 绑定键盘事件，ESC关闭窗口
        _setupKeyEvents: function() {
            this.delegateEvents('keyup', function(e) {
                if (e.keyCode === 27) {
                    this.hide();
                }
            });
        }

    });

    module.exports = Dialog;

    // Helpers
    // ----

    function toTabed(element) {
        if (element.attr('tabindex') == null) {
            element.attr('tabindex', '-1');
        }
    }

});

