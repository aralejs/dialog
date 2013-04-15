define("arale/dialog/1.0.1/confirmbox-debug", [ "$-debug", "arale/widget/1.0.3/templatable-debug", "gallery/handlebars/1.0.0/handlebars-debug", "./dialog-debug", "arale/overlay/1.0.1/overlay-debug", "arale/position/1.0.0/position-debug", "arale/iframe-shim/1.0.1/iframe-shim-debug", "arale/widget/1.0.3/widget-debug", "arale/base/1.0.1/base-debug", "arale/class/1.0.0/class-debug", "arale/events/1.0.0/events-debug", "arale/overlay/1.0.1/mask-debug", "./dialog-tpl-debug.js" ], function(require, exports, module) {
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
        new ConfirmBox($.extend(null, defaults, options)).show().on("close", function() {
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
        new ConfirmBox($.extend(null, defaults, options)).show().on("close", function() {
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
        new ConfirmBox($.extend(null, defaults, options)).show().on("close", function() {
            this.destroy();
        });
    };
    module.exports = ConfirmBox;
});

define("arale/dialog/1.0.1/dialog-tpl-debug", [ "gallery/handlebars/1.0.0/handlebars-debug" ], function(require, exports, module) {
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

define("arale/dialog/1.0.1/dialog-debug.css", [], function() {
    seajs.importStyle(".ui-dialog{background-color:rgba(0,0,0,.5);border:0;FILTER:progid:DXImageTransform.Microsoft.Gradient(startColorstr=#88000000, endColorstr=#88000000);padding:6px}:root .ui-dialog{FILTER:none\\9}.ui-dialog-close{color:#999;cursor:pointer;display:block;font-family:tahoma;font-size:24px;font-weight:700;height:18px;line-height:14px;position:absolute;right:16px;text-decoration:none;top:16px;z-index:10}.ui-dialog-close:hover{color:#666;text-shadow:0 0 2px #aaa}.ui-dialog-title{height:45px;font-size:16px;font-family:'微软雅黑','黑体',Arial;line-height:46px;border-bottom:1px solid #E1E1E1;color:#4d4d4d;text-indent:20px;background:-webkit-gradient(linear,left top,left bottom,from(#fcfcfc),to(#f9f9f9));background:-moz-linear-gradient(top,#fcfcfc,#f9f9f9);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#fcfcfc', endColorstr='#f9f9f9');background:-o-linear-gradient(top,#fcfcfc,#f9f9f9);background:linear-gradient(top,#fcfcfc,#f9f9f9)}.ui-dialog-container{padding:15px 20px 20px;font-size:12px}.ui-dialog-message{margin-bottom:15px}.ui-dialog-operation{zoom:1}.ui-dialog-confirm,.ui-dialog-cancel{display:inline}.ui-dialog-operation .ui-dialog-confirm{margin-right:4px}.ui-dialog-button-orange,.ui-dialog-button-white{display:inline-block;*display:inline;*zoom:1;text-align:center;text-decoration:none;vertical-align:middle;cursor:pointer;font-family:verdana,Hiragino Sans GB;font-size:12px;font-weight:700;border-radius:2px;padding:0 12px;line-height:23px;height:23px;*overflow:visible}a.ui-dialog-button-orange:hover,a.ui-dialog-button-white:hover{text-decoration:none}.ui-dialog-button-orange{border:1px solid #E5810E;color:#fff;background-color:#F5AA2B;background:-webkit-gradient(linear,left top,left bottom,from(#F5A620),to(#F09611));background:-moz-linear-gradient(top,#F5A620,#F09611);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#F5A620', endColorstr='#F09611');background:-o-linear-gradient(top,#F5A620,#F09611);background:linear-gradient(top,#F5A620,#F09611);box-shadow:0 -2px 2px rgba(255,255,255,.33) inset}.ui-dialog-button-orange:hover{background-color:#F5AA2B;background:-webkit-gradient(linear,left top,left bottom,from(#F7B73B),to(#F4A626));background:-moz-linear-gradient(top,#F7B73B,#F4A626);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#F7B73B', endColorstr='#F4A626');background:-o-linear-gradient(top,#F7B73B,#F4A626);background:linear-gradient(top,#F7B73B,#F4A626);box-shadow:0 -2px 2px rgba(255,255,255,.4) inset}.ui-dialog-button-white{border:1px solid #B3B3B3;color:#595959;background-color:#F2F2F2;background:-webkit-gradient(linear,left top,left bottom,from(#FEFEFE),to(#ECECEC));background:-moz-linear-gradient(top,#FEFEFE,#ECECEC);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#FEFEFE', endColorstr='#ECECEC');background:-o-linear-gradient(top,#FEFEFE,#ECECEC);background:linear-gradient(top,#FEFEFE,#ECECEC);box-shadow:0 -2px 2px rgba(255,255,255,.33) inset}.ui-dialog-button-white:hover{border:1px solid #999;background-color:#F6F6F6;background:-webkit-gradient(linear,left top,left bottom,from(#FEFEFE),to(#F0F0F0));background:-moz-linear-gradient(top,#FEFEFE,#F0F0F0);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#FEFEFE', endColorstr='#F0F0F0');background:-o-linear-gradient(top,#FEFEFE,#F0F0F0);background:linear-gradient(top,#FEFEFE,#F0F0F0)}");
});
