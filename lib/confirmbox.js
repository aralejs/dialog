'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _dialog = require('./dialog');

var _dialog2 = _interopRequireDefault(_dialog);

var _spmHandlebars = require('spm-handlebars');

var _spmHandlebars2 = _interopRequireDefault(_spmHandlebars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var template = _spmHandlebars2.default['default'].compile('{{#if title}}\n                <div class="{{classPrefix}}-title" data-role="title">{{{title}}}</div>\n                {{/if}}\n                <div class="{{classPrefix}}-container">\n                    <div class="{{classPrefix}}-message" data-role="message">{{{message}}}</div>\n                    {{#if hasFoot}}\n                    <div class="{{classPrefix}}-operation" data-role="foot">\n                        {{#if confirmTpl}}\n                        <div class="{{classPrefix}}-confirm" data-role="confirm">\n                            {{{confirmTpl}}}\n                        </div>\n                        {{/if}}\n                        {{#if cancelTpl}}\n                        <div class="{{classPrefix}}-cancel" data-role="cancel">\n                            {{{cancelTpl}}}\n                        </div>\n                        {{/if}}\n                    </div>\n                    {{/if}}\n                </div>');

// ConfirmBox
// -------
// ConfirmBox 是一个有基础模板和样式的对话框组件。
var ConfirmBox = _dialog2.default.extend({
  attrs: {
    title: '默认标题',

    confirmTpl: '<a class="ui-dialog-button-orange" href="javascript:;">确定</a>',

    cancelTpl: '<a class="ui-dialog-button-white" href="javascript:;">取消</a>',

    message: '默认内容'
  },

  setup: function setup() {
    ConfirmBox.superclass.setup.call(this);

    var model = {
      classPrefix: this.get('classPrefix'),
      message: this.get('message'),
      title: this.get('title'),
      confirmTpl: this.get('confirmTpl'),
      cancelTpl: this.get('cancelTpl'),
      hasFoot: this.get('confirmTpl') || this.get('cancelTpl')
    };
    this.set('content', template(model));
  },

  events: {
    'click [data-role=confirm]': function clickDataRoleConfirm(e) {
      e.preventDefault();
      this.trigger('confirm');
    },
    'click [data-role=cancel]': function clickDataRoleCancel(e) {
      e.preventDefault();
      this.trigger('cancel');
      this.hide();
    }
  },

  _onChangeMessage: function _onChangeMessage(val) {
    this.$('[data-role=message]').html(val);
  },

  _onChangeTitle: function _onChangeTitle(val) {
    this.$('[data-role=title]').html(val);
  },

  _onChangeConfirmTpl: function _onChangeConfirmTpl(val) {
    this.$('[data-role=confirm]').html(val);
  },

  _onChangeCancelTpl: function _onChangeCancelTpl(val) {
    this.$('[data-role=cancel]').html(val);
  }
});

ConfirmBox.alert = function (message, callback, options) {
  var defaults = {
    message: message,
    title: '',
    cancelTpl: '',
    closeTpl: '',
    onConfirm: function onConfirm() {
      callback && callback();
      this.hide();
    }
  };
  new ConfirmBox(_jquery2.default.extend(null, defaults, options)).show().after('hide', function () {
    this.destroy();
  });
};

ConfirmBox.confirm = function (message, title, _onConfirm, _onCancel, options) {
  // support confirm(message, title, onConfirm, options)
  if ((typeof _onCancel === 'undefined' ? 'undefined' : _typeof(_onCancel)) === 'object' && !options) {
    options = _onCancel;
    _onCancel = null;
  }

  var defaults = {
    message: message,
    title: title || '确认框',
    closeTpl: '',
    onConfirm: function onConfirm() {
      _onConfirm && _onConfirm();
      this.hide();
    },
    onCancel: function onCancel() {
      _onCancel && _onCancel();
      this.hide();
    }
  };
  new ConfirmBox(_jquery2.default.extend(null, defaults, options)).show().after('hide', function () {
    this.destroy();
  });
};

ConfirmBox.show = function (message, callback, options) {
  var defaults = {
    message: message,
    title: '',
    confirmTpl: false,
    cancelTpl: false
  };
  new ConfirmBox(_jquery2.default.extend(null, defaults, options)).show().before('hide', function () {
    callback && callback();
  }).after('hide', function () {
    this.destroy();
  });
};

module.exports = ConfirmBox;