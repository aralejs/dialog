define("arale/dialog/1.0.2/confirmbox-debug", [ "$-debug", "arale/widget/1.0.3/templatable-debug", "gallery/handlebars/1.0.0/handlebars-debug", "./dialog-debug", "arale/overlay/1.0.1/overlay-debug", "arale/position/1.0.0/position-debug", "arale/iframe-shim/1.0.1/iframe-shim-debug", "arale/widget/1.0.3/widget-debug", "arale/base/1.0.1/base-debug", "arale/class/1.0.0/class-debug", "arale/events/1.0.0/events-debug", "arale/overlay/1.0.1/mask-debug", "./dialog-tpl-debug.js", "./dialog-debug.css", "./confirmbox-debug.tpl" ], function(require, exports, module) {
    var $ = require("$-debug"), Templatable = require("arale/widget/1.0.3/templatable-debug"), Handlebars = require("gallery/handlebars/1.0.0/handlebars-debug"), Dialog = require("./dialog-debug");
    require("./dialog-debug.css");
    // ConfirmBox
    // -------
    // ConfirmBox 是一个有基础模板和样式的对话框组件。
    var ConfirmBox = Dialog.extend({
        Implements: Templatable,
        attrs: {
            // 指定内容模板
            content: require("./confirmbox-debug.tpl"),
            title: "默认标题",
            confirmTpl: '<a class="ui-dialog-button-orange">确定</a>',
            cancelTpl: '<a class="ui-dialog-button-white">取消</a>',
            message: "默认内容"
        },
        parseElement: function() {
            var model = {
                classPrefix: this.get("classPrefix"),
                message: this.get("message"),
                title: this.get("title"),
                confirmTpl: this.get("confirmTpl"),
                cancelTpl: this.get("cancelTpl"),
                hasFoot: this.get("confirmTpl") || this.get("cancelTpl")
            };
            var template = Handlebars.compile(this.get("content"));
            this.set("content", template(model));
            ConfirmBox.superclass.parseElement.call(this);
        },
        events: {
            "click [data-role=confirm]": function(e) {
                e.preventDefault();
                this.trigger("confirm");
            },
            "click [data-role=cancel]": function(e) {
                e.preventDefault();
                this.hide();
            }
        },
        _onChangeMessage: function(val) {
            this.$("[data-role=message]").html(val);
        },
        _onChangeTitle: function(val) {
            this.$("[data-role=title]").html(val);
        },
        _onChangeConfirmTpl: function(val) {
            this.$("[data-role=confirm]").html(val);
        },
        _onChangeCancelTpl: function(val) {
            this.$("[data-role=cancel]").html(val);
        }
    });
    ConfirmBox.alert = function(message, callback, options) {
        var defaults = {
            message: message,
            title: "",
            cancelTpl: "",
            closeTpl: "",
            onConfirm: function() {
                callback && callback();
                this.hide();
            }
        };
        new ConfirmBox($.extend(null, defaults, options)).show().after("hide", function() {
            this.destroy();
        });
    };
    ConfirmBox.confirm = function(message, title, callback, options) {
        var defaults = {
            message: message,
            title: title || "确认框",
            closeTpl: "",
            onConfirm: function() {
                callback && callback();
                this.hide();
            }
        };
        new ConfirmBox($.extend(null, defaults, options)).show().after("hide", function() {
            this.destroy();
        });
    };
    ConfirmBox.show = function(message, callback, options) {
        var defaults = {
            message: message,
            title: "",
            confirmTpl: false,
            cancelTpl: false,
            onConfirm: function() {
                callback && callback();
                this.hide();
            }
        };
        new ConfirmBox($.extend(null, defaults, options)).show().after("hide", function() {
            this.destroy();
        });
    };
    module.exports = ConfirmBox;
});

define("arale/dialog/1.0.2/dialog-debug", [ "$-debug", "arale/overlay/1.0.1/overlay-debug", "arale/position/1.0.0/position-debug", "arale/iframe-shim/1.0.1/iframe-shim-debug", "arale/widget/1.0.3/widget-debug", "arale/base/1.0.1/base-debug", "arale/class/1.0.0/class-debug", "arale/events/1.0.0/events-debug", "arale/overlay/1.0.1/mask-debug", "arale/widget/1.0.3/templatable-debug", "gallery/handlebars/1.0.0/handlebars-debug", "./dialog-tpl-debug.js" ], function(require, exports, module) {
    var $ = require("$-debug"), Overlay = require("arale/overlay/1.0.1/overlay-debug"), mask = require("arale/overlay/1.0.1/mask-debug"), Events = require("arale/events/1.0.0/events-debug"), Templatable = require("arale/widget/1.0.3/templatable-debug"), EVENT_NS = ".dialog", DEFAULT_HEIGHT = "300px";
    // Dialog
    // ---
    // Dialog 是通用对话框组件，提供显隐关闭、遮罩层、内嵌iframe、内容区域自定义功能。
    // 是所有对话框类型组件的基类。
    var Dialog = Overlay.extend({
        Implements: Templatable,
        attrs: {
            // 模板
            template: require("./dialog-tpl-debug"),
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
            closeTpl: "×",
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
            // 必要的样式
            this.contentElement.css({
                background: "#fff",
                height: "100%",
                zoom: 1
            });
            // 关闭按钮先隐藏
            // 后面当 onRenderCloseTpl 时，如果 closeTpl 不为空，会显示出来
            // 这样写是为了回避 arale.base 的一个问题：
            // 当属性初始值为''时，不会进入 onRender 方法
            // https://github.com/aralejs/base/issues/7
            this.$("[data-role=close]").hide();
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
                !this.get("height") && this.element.css("height", DEFAULT_HEIGHT);
                this._showIframe();
            }
            Dialog.superclass.show.call(this);
            return this;
        },
        hide: function() {
            // 把 iframe 状态复原
            if (this._type === "iframe" && this.iframe) {
                this.iframe.attr({
                    src: "javascript:'';"
                });
                // 原来只是将 iframe 的状态复原
                // 但是发现在 IE6 下，将 src 置为 javascript:''; 会出现 404 页面
                this.iframe.remove();
                this.iframe = null;
            }
            Dialog.superclass.hide.call(this);
            clearInterval(this._interval);
            delete this._interval;
            return this;
        },
        destroy: function() {
            if (this.get("trigger")) {
                this.get("trigger").off("click" + EVENT_NS + this.cid);
            }
            $(document).off("keyup." + EVENT_NS + this.cid);
            this.element.remove();
            this.get("hasMask") && mask.hide();
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
            if (val === "") {
                this.$("[data-role=close]").html(val).hide();
            } else {
                this.$("[data-role=close]").html(val).show();
            }
        },
        // 覆盖 overlay，提供动画
        _onRenderVisible: function(val) {
            if (val) {
                if (this.get("effect") === "fade") {
                    // 固定 300 的动画时长，暂不可定制
                    this.element.fadeIn(300);
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
            var hasMask = this.get("hasMask");
            var zIndex = parseInt(this.get("zIndex"), 10);
            var oldZIndex;
            this.before("show", function() {
                if (hasMask) {
                    oldZIndex = mask.get("zIndex");
                    mask.set("zIndex", zIndex - 1).show();
                }
            });
            this.after("hide", function() {
                if (hasMask) {
                    mask.set("zIndex", oldZIndex).hide();
                }
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
            var that = this;
            $(document).on("keyup." + EVENT_NS + this.cid, function(e) {
                if (e.keyCode === 27) {
                    that.get("visible") && that.hide();
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
            // 因为在 IE 下 onload 无法触发
            // http://my.oschina.net/liangrockman/blog/24015
            // 所以使用 jquery 的 one 函数来代替 onload
            // one 比 on 好，因为它只执行一次，并在执行后自动销毁
            this.iframe.one("load", function() {
                // 如果 dialog 已经隐藏了，就不需要触发 onload
                if (!that.get("visible")) {
                    return;
                }
                // 绑定自动处理高度的事件
                if (that.get("autoFit")) {
                    clearInterval(that._interval);
                    that._interval = setInterval(function() {
                        that._syncHeight();
                    }, 300);
                }
                that._syncHeight();
                that._setPosition();
                that.trigger("complete:show");
            });
        },
        _fixUrl: function() {
            var s = this.get("content").match(/([^?#]*)(\?[^#]*)?(#.*)?/);
            s.shift();
            s[1] = (s[1] && s[1] !== "?" ? s[1] + "&" : "?") + "t=" + new Date().getTime();
            return s.join("");
        },
        _createIframe: function() {
            var that = this;
            this.iframe = $("<iframe>", {
                src: "javascript:'';",
                scrolling: "no",
                frameborder: "no",
                allowTransparency: "true",
                css: {
                    border: "none",
                    width: "100%",
                    display: "block",
                    height: "100%",
                    overflow: "hidden"
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
                    this._errCount = 0;
                    h = getIframeHeight(this.iframe) + "px";
                } catch (err) {
                    // 页面跳转也会抛错，最多失败6次
                    this._errCount = (this._errCount || 0) + 1;
                    if (this._errCount >= 6) {
                        // 获取失败则给默认高度 300px
                        // 跨域会抛错进入这个流程
                        h = DEFAULT_HEIGHT;
                        clearInterval(this._interval);
                        delete this._interval;
                    }
                }
                this.element.css("height", h);
                // force to reflow in ie6
                // http://44ux.com/blog/2011/08/24/ie67-reflow-bug/
                this.element[0].className = this.element[0].className;
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

define("arale/dialog/1.0.2/dialog-tpl-debug", [ "gallery/handlebars/1.0.0/handlebars-debug" ], function(require, exports, module) {
    var Handlebars = require("gallery/handlebars/1.0.0/handlebars-debug");
    (function() {
        var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
        module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
            this.compilerInfo = [ 2, ">= 1.0.0-rc.3" ];
            helpers = helpers || Handlebars.helpers;
            data = data || {};
            var buffer = "", stack1, functionType = "function", escapeExpression = this.escapeExpression;
            buffer += '<div class="';
            if (stack1 = helpers.classPrefix) {
                stack1 = stack1.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack1 = depth0.classPrefix;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + '">\n    <div class="';
            if (stack1 = helpers.classPrefix) {
                stack1 = stack1.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack1 = depth0.classPrefix;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + '-close" title="关闭本框" data-role="close"></div>\n    <div class="';
            if (stack1 = helpers.classPrefix) {
                stack1 = stack1.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack1 = depth0.classPrefix;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + '-content" data-role="content"></div>\n</div>\n';
            return buffer;
        });
    })();
});

define("arale/dialog/1.0.2/dialog-debug.css", [], function() {
    seajs.importStyle(".ui-dialog{background-color:rgba(0,0,0,.5);border:0;FILTER:progid:DXImageTransform.Microsoft.Gradient(startColorstr=#88000000, endColorstr=#88000000);padding:6px}:root .ui-dialog{FILTER:none\\9}.ui-dialog-close{color:#999;cursor:pointer;display:block;font-family:tahoma;font-size:24px;font-weight:700;height:18px;line-height:14px;position:absolute;right:16px;text-decoration:none;top:16px;z-index:10}.ui-dialog-close:hover{color:#666;text-shadow:0 0 2px #aaa}.ui-dialog-title{height:45px;font-size:16px;font-family:'微软雅黑','黑体',Arial;line-height:46px;border-bottom:1px solid #E1E1E1;color:#4d4d4d;text-indent:20px;background:-webkit-gradient(linear,left top,left bottom,from(#fcfcfc),to(#f9f9f9));background:-moz-linear-gradient(top,#fcfcfc,#f9f9f9);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#fcfcfc', endColorstr='#f9f9f9');background:-o-linear-gradient(top,#fcfcfc,#f9f9f9);background:linear-gradient(top,#fcfcfc,#f9f9f9)}.ui-dialog-container{padding:15px 20px 20px;font-size:12px}.ui-dialog-message{margin-bottom:15px}.ui-dialog-operation{zoom:1}.ui-dialog-confirm,.ui-dialog-cancel{display:inline}.ui-dialog-operation .ui-dialog-confirm{margin-right:4px}.ui-dialog-button-orange,.ui-dialog-button-white{display:inline-block;*display:inline;*zoom:1;text-align:center;text-decoration:none;vertical-align:middle;cursor:pointer;font-family:verdana,Hiragino Sans GB;font-size:12px;font-weight:700;border-radius:2px;padding:0 12px;line-height:23px;height:23px;*overflow:visible}a.ui-dialog-button-orange:hover,a.ui-dialog-button-white:hover{text-decoration:none}.ui-dialog-button-orange{border:1px solid #E5810E;color:#fff;background-color:#F5AA2B;background:-webkit-gradient(linear,left top,left bottom,from(#F5A620),to(#F09611));background:-moz-linear-gradient(top,#F5A620,#F09611);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#F5A620', endColorstr='#F09611');background:-o-linear-gradient(top,#F5A620,#F09611);background:linear-gradient(top,#F5A620,#F09611);box-shadow:0 -2px 2px rgba(255,255,255,.33) inset}.ui-dialog-button-orange:hover{background-color:#F5AA2B;background:-webkit-gradient(linear,left top,left bottom,from(#F7B73B),to(#F4A626));background:-moz-linear-gradient(top,#F7B73B,#F4A626);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#F7B73B', endColorstr='#F4A626');background:-o-linear-gradient(top,#F7B73B,#F4A626);background:linear-gradient(top,#F7B73B,#F4A626);box-shadow:0 -2px 2px rgba(255,255,255,.4) inset}.ui-dialog-button-white{border:1px solid #B3B3B3;color:#595959;background-color:#F2F2F2;background:-webkit-gradient(linear,left top,left bottom,from(#FEFEFE),to(#ECECEC));background:-moz-linear-gradient(top,#FEFEFE,#ECECEC);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#FEFEFE', endColorstr='#ECECEC');background:-o-linear-gradient(top,#FEFEFE,#ECECEC);background:linear-gradient(top,#FEFEFE,#ECECEC);box-shadow:0 -2px 2px rgba(255,255,255,.33) inset}.ui-dialog-button-white:hover{border:1px solid #999;background-color:#F6F6F6;background:-webkit-gradient(linear,left top,left bottom,from(#FEFEFE),to(#F0F0F0));background:-moz-linear-gradient(top,#FEFEFE,#F0F0F0);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#FEFEFE', endColorstr='#F0F0F0');background:-o-linear-gradient(top,#FEFEFE,#F0F0F0);background:linear-gradient(top,#FEFEFE,#F0F0F0)}");
});

define("arale/dialog/1.0.2/confirmbox-debug.tpl", [], '{{#if title}}\n<div class="{{classPrefix}}-title" data-role="title">{{{title}}}</div>\n{{/if}}\n<div class="{{classPrefix}}-container">\n    <div class="{{classPrefix}}-message" data-role="message">{{{message}}}</div>\n    {{#if hasFoot}}\n    <div class="{{classPrefix}}-operation" data-role="foot">\n        {{#if confirmTpl}}\n        <div class="{{classPrefix}}-confirm" data-role="confirm">\n            {{{confirmTpl}}}\n        </div>\n        {{/if}}\n        {{#if cancelTpl}}\n        <div class="{{classPrefix}}-cancel" data-role="cancel">\n            {{{cancelTpl}}}\n        </div>\n        {{/if}}\n    </div>\n    {{/if}}\n</div>\n');
