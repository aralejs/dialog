define("arale/dialog/1.0.0/confirmbox-debug", [ "./dialog-debug", "$-debug", "arale/widget/1.0.2/templatable-debug", "gallery/handlebars/1.0.0/handlebars-debug", "arale/overlay/0.9.13/overlay-debug", "arale/position/1.0.0/position-debug", "arale/iframe-shim/1.0.0/iframe-shim-debug", "arale/widget/1.0.2/widget-debug", "arale/base/1.0.1/base-debug", "arale/class/1.0.0/class-debug", "arale/events/1.0.0/events-debug", "arale/overlay/0.9.13/mask-debug" ], function(require, exports, module) {
    var $ = require("$-debug"), Templatable = require("arale/widget/1.0.2/templatable-debug"), Handlebars = require("gallery/handlebars/1.0.0/handlebars-debug"), Dialog = require("./dialog-debug");
    seajs.importStyle('.ui-dialog{background-color:rgba(0,0,0,.5);border:0;FILTER:progid:DXImageTransform.Microsoft.Gradient(startColorstr=#88000000, endColorstr=#88000000);padding:6px}:root .ui-dialog{FILTER:none9}.ui-dialog-close{position:absolute;display:block;z-index:10;color:#999;top:16px;right:16px;font-family:tahoma;font-size:24px;line-height:14px;height:18px;width:18px;text-decoration:none;overflow:hidden;cursor:pointer;font-weight:700}.ui-dialog-close:hover{color:#666;text-shadow:0 0 2px #aaa}.ui-dialog-title{height:45px;font-size:16px;font-family:"微软雅黑","黑体",Arial;line-height:46px;border-bottom:1px solid #E1E1E1;color:#4d4d4d;background:-webkit-gradient(linear,left top,left bottom,from( #fcfcfc),to( #f9f9f9));background:-moz-linear-gradient(top, #fcfcfc, #f9f9f9);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#fcfcfc", endColorstr="#f9f9f9");background:-o-linear-gradient(top, #fcfcfc, #f9f9f9);background:linear-gradient(top, #fcfcfc, #f9f9f9)}.ui-dialog-title h2{margin-left:20px}.ui-dialog-container{padding:15px 20px 20px}.ui-dialog-message{margin-bottom:15px}.ui-dialog-operation{zoom:1}.ui-dialog-operation .ui-button{margin-right:6px}', "arale/dialog/1.0.0/confirmbox.css");
    // ConfirmBox
    // -------
    // ConfirmBox 是一个有基础模板和样式的对话框组件。
    var ConfirmBox = Dialog.extend({
        Implements: Templatable,
        attrs: {
            // 指定内容模板
            content: '{{#if title}}\n<div class="{{classPrefix}}-title" data-role="head">\n<h2 data-role="title">{{title}}</h2>\n</div>\n{{/if}}\n<div class="{{classPrefix}}-container">\n<div class="{{classPrefix}}-message" data-role="message">{{message}}</div>\n{{#if hasFoot}}       \n<div class="{{classPrefix}}-operation" data-role="foot">\n{{#if confirmTpl}}\n<div class="ui-button ui-button-sorange {{classPrefix}}-confirm" data-role="confirm">\n<a href="javascript:;" class="ui-button-text">{{confirmTpl}}</a>\n</div>\n{{/if}}\n{{#if cancelTpl}}\n<div class="ui-button ui-button-swhite {{classPrefix}}-cancel" data-role="cancel">\n<a href="javascript:;" class="ui-button-text">{{cancelTpl}}</a>\n</div>\n{{/if}}\n</div>\n{{/if}}\n</div>',
            title: "默认标题",
            confirmTpl: "确定",
            cancelTpl: "取消",
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
        _onRenderMessage: function(val) {
            this.$("[data-role=message]").html(val);
        },
        _onRenderTitle: function(val) {
            this.$("[data-role=title]").html(val);
        },
        _onRenderConfirmTpl: function(val) {
            this.$("[data-role=confirm] a").html(val);
        },
        _onRenderCancelTpl: function(val) {
            this.$("[data-role=cancel] a").html(val);
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
        new ConfirmBox($.extend(null, defaults, options)).show().after("confirm close", function() {
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
        new ConfirmBox($.extend(null, defaults, options)).show().after("confirm close", function() {
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
        new ConfirmBox($.extend(null, defaults, options)).show().after("confirm close", function() {
            this.destroy();
        });
    };
    module.exports = ConfirmBox;
});