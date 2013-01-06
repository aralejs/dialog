define(function(require, exports, module) {

    var $ = require('$'),
        Overlay = require('overlay'),
        mask = require('mask'),
        Events = require('events'),
        Templatable = require('templatable'),
        EVENT_NS = '.dialog',
        DefaultHeight = '300px';

    require('./dialog.css');

    // Dialog
    // ---
    // Dialog 是通用对话框组件，提供显隐关闭、遮罩层、内嵌iframe、内容区域自定义功能。
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
            height: null,

            // 简单的动画效果 none | fade
            effect: 'fade',

            // 不用解释了吧
            zIndex: 999,

            // 是否自适应高度
            autoFit: true,

            // 默认定位居中
            align: {
                selfXY: ['50%', '50%'],
                baseXY: ['50%', '50%']
            }
        },

        parseElement: function() {
            var that = this;
            this.model = {
                classPrefix: this.get('classPrefix')
            };
            Dialog.superclass.parseElement.call(this);
            this.contentElement = this.$('[data-role=content]');
        },

        events: {
            'click [data-role=close]': function(e) {
                e.preventDefault();
                this.hide();
            }
        },

        show: function() {
            // iframe 要在载入完成才显示
            if (this._type === 'iframe') {
                // iframe 还未请求完，先设置一个固定高度
                this.set('height', DefaultHeight);
                this._showIframe();
            }

            Dialog.superclass.show.call(this);
            return this;
        },

        hide: function() {
            // 把 iframe 状态复原
            if (this._type === 'iframe' && this.iframe) {
                this.iframe[0].onload = null;
                this.iframe.attr({
                    src: 'javascript:\'\';'
                });
            }

            Dialog.superclass.hide.call(this);
            return this;
        },

        destroy: function() {
            this.get('trigger').off('click' + EVENT_NS + this.cid);
            this.element.remove();
            mask.hide();
            clearInterval(this._interval);
            return Dialog.superclass.destroy.call(this);
        },

        setup: function() {
            Dialog.superclass.setup.call(this);

            this._setupTrigger();
            this._setupMask();
            this._setupKeyEvents();
            this._setupFocus();
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
            val = val.replace('ui-dialog', this.get('classPrefix'));
            this.$('[data-role=close]').html(val);
        },

        // 覆盖 overlay，提供动画
        _onRenderVisible: function(val) {
            if (val) {
                if (this.get('effect') === 'fade') {
                    // 固定 200 的动画时长，暂不可定制
                    this.element.fadeIn(200);
                } else {
                    this.element.show();
                }
            } else {
                this.element.hide();
            }
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

        // 绑定元素聚焦状态
        _setupFocus: function() {
            this.after('show', function() {
                this.element.focus();
            });
            this.after('hide', function() {
                // 关于网页中浮层消失后的焦点处理
                // http://www.qt06.com/post/280/
                this.activeTrigger && this.activeTrigger.focus();
            });
        },

        // 绑定键盘事件，ESC关闭窗口
        _setupKeyEvents: function() {
            this.delegateEvents('keyup', function(e) {
                if (e.keyCode === 27) {
                    this.hide();
                }
            });
        },

        _showIframe: function() {
            var that = this;

            // 若未创建则新建一个
            if (!this.iframe) {
                this._createIframe();
            }
            // 开始请求 iframe
            this.iframe.attr({
                src: this.get('content'),
                name: 'xbox-iframe' + new Date().getTime()
            });

            this.iframe[0].onload = function(a) {
                if (that.get('autoFit')) {
                    clearInterval(that._interval);
                    that._interval = setInterval(function() {
                        that._syncHeight();
                    }, 500);
                }

                that._syncHeight();
                that._setPosition();

                that.iframe[0].onload = null;
                that.trigger('complete:show');
            };
        },

        _createIframe: function() {
            if (this._type !== 'iframe') {
                return;
            }

            this.iframe = $('<iframe>', {
                src: 'javascript:\'\';',
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
            Events.mixTo(this.iframe[0]);
            this.iframe[0].on('close', function() {
                that.hide();
            });
        },

        _syncHeight: function() {
            var h;
            // 如果未传 height，才会自动获取
            if (!this.get('height')) {
                try {
                    h = getIframeHeight(this.iframe) + 'px';
                } catch (err) {
                    // 获取失败则给默认高度 300px
                    h = DefaultHeight;
                    clearInterval(this._interval);
                }
                this.element.css('height', h);
            } else {
                clearInterval(this._interval);
            }
        }

    });

    module.exports = Dialog;

    // Helpers
    // ----

    // 让目标节点可以被 Tab
    function toTabed(element) {
        if (element.attr('tabindex') == null) {
            element.attr('tabindex', '-1');
        }
    }

    // 获取 iframe 内部的高度
    function getIframeHeight(iframe) {
        var D = iframe[0].contentWindow.document;
        if (D.body.scrollHeight && D.documentElement.scrollHeight) {
            return Math.min(
                D.body.scrollHeight,
                D.documentElement.scrollHeight
            );
        } else if (D.documentElement.scrollHeight) {
            return D.documentElement.scrollHeight;
        } else if (D.body.scrollHeight) {
            return D.body.scrollHeight;
        }
    }

});

