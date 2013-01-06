define("arale/dialog/1.0.0/dialog-debug", [ "$-debug", "arale/overlay/0.9.13/overlay-debug", "arale/position/1.0.0/position-debug", "arale/iframe-shim/1.0.0/iframe-shim-debug", "arale/widget/1.0.2/widget-debug", "arale/base/1.0.1/base-debug", "arale/class/1.0.0/class-debug", "arale/events/1.0.0/events-debug", "arale/overlay/0.9.13/mask-debug", "arale/widget/1.0.2/templatable-debug", "gallery/handlebars/1.0.0/handlebars-debug" ], function(require, exports, module) {
    var $ = require("$-debug"), Overlay = require("arale/overlay/0.9.13/overlay-debug"), mask = require("arale/overlay/0.9.13/mask-debug"), Events = require("arale/events/1.0.0/events-debug"), Templatable = require("arale/widget/1.0.2/templatable-debug"), EVENT_NS = ".dialog", DefaultHeight = "300px";
    seajs.importStyle(".ui-dialog,.ui-dialog-close{position:absolute;top:0}.ui-dialog{z-index:999;left:50%;top:50%;width:500px;background-color:rgba(0,0,0,.5);border:0;FILTER:progid:DXImageTransform.Microsoft.Gradient(startColorstr=#88000000, endColorstr=#88000000);padding:6px}:root .ui-dialog{FILTER:none9}.ui-dialog-close{display:block;right:16px;top:16px;z-index:10;cursor:pointer}.ui-dialog-content{background:#fff;height:100%;*zoom:1}.ui-dialog-x{color:#999;font-family:tahoma;font-size:24px;line-height:14px;height:18px;width:18px;text-decoration:none;display:block;overflow:hidden;cursor:pointer;font-weight:700}.ui-dialog-x:hover{color:#666;text-shadow:0 0 2px #aaa}", "arale/dialog/1.0.0/dialog.css");
    // Dialog
    // ---
    // Dialog 是通用对话框组件，提供显隐关闭、遮罩层、内嵌iframe、内容区域自定义功能。
    // 是所有对话框类型组件的基类。
    var Dialog = Overlay.extend({
        Implements: Templatable,
        attrs: {
            // 模板
            template: '<div class="{{classPrefix}}">\n<div class="{{classPrefix}}-close" title="关闭本框" data-role="close"></div>\n<div class="{{classPrefix}}-content"  data-role="content"></div>\n</div>',
            // 对话框触发点
            trigger: {
                value: null,
                getter: function(val) {
                    return $(val);
                }
            },
            // 统一样式前缀
            classPrefix: "ui-dialog",
            // 指定内容元素，可以是 url 地址
            content: {
                value: "",
                setter: function(val) {
                    // 判断是否是 url 地址
                    if (/^(https?:\/\/|\/|\.\/|\.\.\/)/.test(val)) {
                        this._type = "iframe";
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
            effect: "none",
            // 不用解释了吧
            zIndex: 999,
            // 是否自适应高度
            autoFit: true,
            // 默认定位居中
            align: {
                selfXY: [ "50%", "50%" ],
                baseXY: [ "50%", "50%" ]
            }
        },
        parseElement: function() {
            this.model = {
                classPrefix: this.get("classPrefix")
            };
            Dialog.superclass.parseElement.call(this);
            this.contentElement = this.$("[data-role=content]");
        },
        events: {
            "click [data-role=close]": function(e) {
                e.preventDefault();
                this.hide();
            }
        },
        show: function() {
            // iframe 要在载入完成才显示
            if (this._type === "iframe") {
                // iframe 还未请求完，先设置一个固定高度
                this.element.css("height", DefaultHeight);
                this._showIframe();
            }
            Dialog.superclass.show.call(this);
            return this;
        },
        hide: function() {
            // 把 iframe 状态复原
            if (this._type === "iframe" && this.iframe) {
                this.iframe[0].onload = null;
                this.iframe.attr({
                    src: "javascript:'';"
                });
            }
            this.trigger("close");
            Dialog.superclass.hide.call(this);
            clearInterval(this._interval);
            delete this._interval;
            return this;
        },
        destroy: function() {
            this.get("trigger").off("click" + EVENT_NS + this.cid);
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
            toTabed(this.get("trigger"));
            // 默认当前触发器
            this.activeTrigger = this.get("trigger").eq(0);
        },
        // onRender
        // ---
        _onRenderContent: function(val) {
            if (this._type !== "iframe") {
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
            val = val.replace("ui-dialog", this.get("classPrefix"));
            this.$("[data-role=close]").html(val);
        },
        // 覆盖 overlay，提供动画
        _onRenderVisible: function(val) {
            if (val) {
                if (this.get("effect") === "fade") {
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
            this.get("trigger").on("click" + EVENT_NS + this.cid, function(e) {
                e.preventDefault();
                // 标识当前点击的元素
                that.activeTrigger = $(this);
                that.show();
            });
        },
        // 绑定遮罩层事件
        _setupMask: function() {
            this.before("show", function() {
                this.get("hasMask") && mask.show();
            });
            this.before("hide", function() {
                this.get("hasMask") && mask.hide();
            });
        },
        // 绑定元素聚焦状态
        _setupFocus: function() {
            this.after("show", function() {
                this.element.focus();
            });
            this.after("hide", function() {
                // 关于网页中浮层消失后的焦点处理
                // http://www.qt06.com/post/280/
                this.activeTrigger && this.activeTrigger.focus();
            });
        },
        // 绑定键盘事件，ESC关闭窗口
        _setupKeyEvents: function() {
            this.delegateEvents("keyup", function(e) {
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
                src: this._fixUrl(),
                name: "dialog-iframe" + new Date().getTime()
            });
            this.iframe[0].onload = function() {
                if (that.get("autoFit")) {
                    clearInterval(that._interval);
                    that._interval = setInterval(function() {
                        that._syncHeight();
                    }, 500);
                }
                that._syncHeight();
                that._setPosition();
                that.iframe[0].onload = null;
                that.trigger("complete:show");
            };
        },
        _fixUrl: function() {
            var s = this.get("content").match(/([^?#]*)(\?[^#]*)?(#.*)?/);
            s.shift();
            s[1] = (s[1] && s[1] !== "?" ? s[1] + "&" : "?") + "t=" + new Date().getTime();
            return s.join("");
        },
        _createIframe: function() {
            var that = this;
            if (this._type !== "iframe") {
                return;
            }
            this.iframe = $("<iframe>", {
                src: "javascript:'';",
                scrolling: "no",
                frameborder: "no",
                allowTransparency: "true",
                css: {
                    border: "none",
                    width: "100%",
                    display: "block",
                    height: "100%"
                }
            }).appendTo(this.contentElement);
            // 给 iframe 绑一个 close 事件
            // iframe 内部可通过 window.frameElement.trigger('close') 关闭
            Events.mixTo(this.iframe[0]);
            this.iframe[0].on("close", function() {
                that.hide();
            });
        },
        _syncHeight: function() {
            var h;
            // 如果未传 height，才会自动获取
            if (!this.get("height")) {
                try {
                    h = getIframeHeight(this.iframe) + "px";
                } catch (err) {
                    // 获取失败则给默认高度 300px
                    // 跨域会抛错进入这个流程
                    h = DefaultHeight;
                    clearInterval(this._interval);
                    delete this._interval;
                }
                this.element.css("height", h);
            } else {
                clearInterval(this._interval);
                delete this._interval;
            }
        }
    });
    module.exports = Dialog;
    // Helpers
    // ----
    // 让目标节点可以被 Tab
    function toTabed(element) {
        if (element.attr("tabindex") == null) {
            element.attr("tabindex", "-1");
        }
    }
    // 获取 iframe 内部的高度
    function getIframeHeight(iframe) {
        var D = iframe[0].contentWindow.document;
        if (D.body.scrollHeight && D.documentElement.scrollHeight) {
            return Math.min(D.body.scrollHeight, D.documentElement.scrollHeight);
        } else if (D.documentElement.scrollHeight) {
            return D.documentElement.scrollHeight;
        } else if (D.body.scrollHeight) {
            return D.body.scrollHeight;
        }
    }
});