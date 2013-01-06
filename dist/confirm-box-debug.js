define("arale/dialog/0.9.3/confirm-box-debug", [ "./anim-dialog-debug", "./base-dialog-debug", "$-debug", "arale/overlay/0.9.13/overlay-debug", "arale/position/1.0.0/position-debug", "arale/iframe-shim/1.0.0/iframe-shim-debug", "arale/widget/1.0.2/widget-debug", "arale/base/1.0.1/base-debug", "arale/class/1.0.0/class-debug", "arale/events/1.0.0/events-debug", "arale/easing/1.0.0/easing-debug", "arale/overlay/0.9.13/mask-debug", "arale/widget/1.0.2/templatable-debug", "gallery/handlebars/1.0.0/handlebars-debug" ], function(require, exports, module) {
    var $ = require("$-debug"), AnimDialog = require("./anim-dialog-debug"), Templatable = require("arale/widget/1.0.2/templatable-debug");
    // ConfirmBox
    // -------
    // ConfirmBox 是一个有基础模板和样式的对话框组件。
    var ConfirmBox = AnimDialog.extend({
        Implements: Templatable,
        attrs: {
            // 默认模板，不要覆盖
            template: '<div class="ui-xbox">\n<div class="ui-xbox-action">\n{{#if hasCloseX}}<a href="javascript:;" class="ui-xbox-close" data-role="close" title="关闭">×</a>{{/if}}\n</div>\n<div class="ui-xbox-content">\n<div class="ui-confirmXbox">\n{{#if hasTitle}}\n<div class="ui-confirmXbox-title sl-linear-light" data-role="head">\n<h2 data-role="title">{{title}}</h2>\n</div>\n{{/if}}\n<div class="ui-confirmXbox-container">\n<div class="ui-confirmXbox-content" data-role="content">{{content}}</div>\n{{#if hasFoot}}       \n<div class="ui-confirmXbox-operation" data-role="foot">\n{{#if hasOk}}\n<div class="ui-button ui-button-sorange ui-confirmXbox-confirm" data-role="confirm">\n<a href="javascript:;" class="ui-button-text">确定</a>\n</div>\n{{/if}}\n{{#if hasCancel}}\n<div class="ui-button ui-button-swhite ui-confirmXbox-cancel" data-role="cancel">\n<a href="javascript:;" class="ui-button-text">取消</a>\n</div>\n{{/if}}\n</div>\n{{/if}}\n</div>\n</div>\n</div>\n</div>',
            // 指定标题内容
            title: "默认标题",
            // 指定内容的 html
            content: "默认内容",
            width: 500,
            hasMask: true,
            effect: null,
            align: {
                selfXY: [ "50%", "50%" ],
                baseXY: [ "50%", "38%" ]
            },
            hasTitle: true,
            hasOk: true,
            hasCancel: true,
            hasCloseX: true
        },
        parseElement: function() {
            this.model = {
                title: this.get("title"),
                content: this.get("content"),
                hasTitle: this.get("hasTitle"),
                hasOk: this.get("hasOk"),
                hasCancel: this.get("hasCancel"),
                hasCloseX: this.get("hasCloseX"),
                hasFoot: this.get("hasOk") || this.get("hasCancel")
            };
            AnimDialog.superclass.parseElement.call(this);
        }
    });
    ConfirmBox.alert = function(content, callback, options) {
        var defaults = {
            content: content,
            hasTitle: false,
            hasCancel: false,
            hasCloseX: false,
            onConfirm: function() {
                callback && callback();
                this.hide();
            }
        };
        new ConfirmBox($.extend(null, defaults, options)).show().after("confirm close", function() {
            this.destroy();
        });
    };
    ConfirmBox.confirm = function(content, title, callback, options) {
        var defaults = {
            content: content,
            title: title || "确认框",
            hasCloseX: false,
            onConfirm: function() {
                callback && callback();
                this.hide();
            }
        };
        new ConfirmBox($.extend(null, defaults, options)).show().after("confirm close", function() {
            this.destroy();
        });
    };
    ConfirmBox.show = function(content, callback, options) {
        var defaults = {
            content: content,
            hasTitle: false,
            hasOk: false,
            hasCancel: false,
            hasCloseX: true,
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