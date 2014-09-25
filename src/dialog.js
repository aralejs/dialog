var $ = require('jquery'),
    Overlay = require('arale-overlay'),
    mask = Overlay.Mask,
    Events = require('arale-events'),
    Templatable = require('arale-templatable');

// Dialog
// ---
// Dialog 是通用对话框组件，提供显隐关闭、遮罩层、内嵌iframe、内容区域自定义功能。
// 是所有对话框类型组件的基类。
var Dialog = Overlay.extend({

  Implements: Templatable,

  attrs: {
    // 模板
    template: require('./dialog.handlebars'),

    // 对话框触发点
    trigger: {
      value: null,
      getter: function (val) {
        return $(val);
      }
    },

    // 统一样式前缀
    classPrefix: 'ui-dialog',

    // 指定内容元素，可以是 url 地址
    content: {
      value: null,
      setter: function (val) {
        // 判断是否是 url 地址
        if (/^(https?:\/\/|\/|\.\/|\.\.\/)/.test(val)) {
          this._type = 'iframe';
          // 用 ajax 的方式而不是 iframe 进行载入
          if (val.indexOf('?ajax') > 0 || val.indexOf('&ajax') > 0) {
            this._ajax = true;
          }
        }
        return val;
      }
    },

    // 是否有背景遮罩层
    hasMask: true,

    // 关闭按钮可以自定义
    closeTpl: '×',

    // 默认宽度
    width: 500,

    // 默认高度
    height: null,

    // iframe 类型时，dialog 的最初高度
    initialHeight: 300,

    // 简单的动画效果 none | fade
    effect: 'none',

    // 不用解释了吧
    zIndex: 999,

    // 是否自适应高度
    autoFit: true,

    // 默认定位居中
    align: {
      value: {
        selfXY: ['50%', '50%'],
        baseXY: ['50%', '50%']
      },
      getter: function (val) {
        // 高度超过一屏的情况，保证能看到对话框顶部
        if (this.element.height() > $(window).height()) {
          return {
            selfXY: ['50%', '0'],
            baseXY: ['50%', '0']
          };
        }
        return val;
      }
    }
  },


  parseElement: function () {
    this.set("model", {
      classPrefix: this.get('classPrefix')
    });
    Dialog.superclass.parseElement.call(this);
    this.contentElement = this.$('[data-role=content]');

    // 必要的样式
    this.contentElement.css({
      height: '100%',
      zoom: 1
    });
    // 关闭按钮先隐藏
    // 后面当 onRenderCloseTpl 时，如果 closeTpl 不为空，会显示出来
    // 这样写是为了回避 arale.base 的一个问题：
    // 当属性初始值为''时，不会进入 onRender 方法
    // https://github.com/aralejs/base/issues/7
    this.$('[data-role=close]').hide();
  },

  events: {
    'click [data-role=close]': function (e) {
      e.preventDefault();
      this.hide();
    }
  },

  show: function () {
    // iframe 要在载入完成才显示
    if (this._type === 'iframe') {
      // ajax 读入内容并 append 到容器中
      if (this._ajax) {
        this._ajaxHtml();
      } else {
        // iframe 还未请求完，先设置一个固定高度
        !this.get('height') && this.contentElement.css('height', this.get('initialHeight'));
        this._showIframe();
      }
    }

    Dialog.superclass.show.call(this);
    return this;
  },

  hide: function () {
    // 把 iframe 状态复原
    if (this._type === 'iframe' && this.iframe) {
      this.iframe.attr({
        src: 'javascript:\'\';'
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

  destroy: function () {
    this.element.remove();
    this._hideMask();
    clearInterval(this._interval);
    return Dialog.superclass.destroy.call(this);
  },

  setup: function () {
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
  _onRenderContent: function (val) {
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
      // #38 #44
      this._setPosition();
    }
  },

  _onRenderCloseTpl: function (val) {
    if (val === '') {
      this.$('[data-role=close]').html(val).hide();
    } else {
      this.$('[data-role=close]').html(val).show();
    }
  },

  // 覆盖 overlay，提供动画
  _onRenderVisible: function (val) {
    if (val) {
      if (this.get('effect') === 'fade') {
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
  _setupTrigger: function () {
    this.delegateEvents(this.get('trigger'), 'click', function (e) {
      e.preventDefault();
      // 标识当前点击的元素
      this.activeTrigger = $(e.currentTarget);
      this.show();
    });
  },

  // 绑定遮罩层事件
  _setupMask: function () {
    var that = this;

    // 存放 mask 对应的对话框
    mask._dialogs = mask._dialogs || [];

    this.after('show', function () {
      if (!this.get('hasMask')) {
        return;
      }
      // not using the z-index
      // because multiable dialogs may share same mask
      mask.set('zIndex', that.get('zIndex')).show();
      mask.element.insertBefore(that.element);

      // 避免重复存放
      var existed = false;
      for (var i = 0; i < mask._dialogs.length; i++) {
        if (mask._dialogs[i] === that) {
          existed = true;
        }
      }
      // 依次存放对应的对话框
      if (!existed) {
        mask._dialogs.push(that);
      }
    });

    this.after('hide', this._hideMask);
  },

  // 隐藏 mask
  _hideMask: function () {
    if (!this.get('hasMask')) {
      return;
    }

    mask._dialogs && mask._dialogs.pop();
    if (mask._dialogs && mask._dialogs.length > 0) {
      var last = mask._dialogs[mask._dialogs.length - 1];
      mask.set('zIndex', last.get('zIndex'));
      mask.element.insertBefore(last.element);
    } else {
      mask.hide();
    }
  },

  // 绑定元素聚焦状态
  _setupFocus: function () {
    this.after('show', function () {
      this.element.focus();
    });
    this.after('hide', function () {
      // 关于网页中浮层消失后的焦点处理
      // http://www.qt06.com/post/280/
      this.activeTrigger && this.activeTrigger.focus();
    });
  },

  // 绑定键盘事件，ESC关闭窗口
  _setupKeyEvents: function () {
    this.delegateEvents($(document), 'keyup.esc', function (e) {
      if (e.keyCode === 27) {
        this.get('visible') && this.hide();
      }
    });
  },

  _showIframe: function () {
    var that = this;
    // 若未创建则新建一个
    if (!this.iframe) {
      this._createIframe();
    }
    // 开始请求 iframe
    this.iframe.attr({
      src: this._fixUrl(),
      name: 'dialog-iframe' + new Date().getTime()
    });
    // 因为在 IE 下 onload 无法触发
    // http://my.oschina.net/liangrockman/blog/24015
    // 所以使用 jquery 的 one 函数来代替 onload
    // one 比 on 好，因为它只执行一次，并在执行后自动销毁
    this.iframe.one('load', function () {
      // 如果 dialog 已经隐藏了，就不需要触发 onload
      if (!that.get('visible')) {
        return;
      }
      // 绑定自动处理高度的事件
      if (that.get('autoFit')) {
        clearInterval(that._interval);
        that._interval = setInterval(function () {
          that._syncHeight();
        }, 300);
      }
      that._syncHeight();
      that._setPosition();
      that.trigger('complete:show');
    });
  },

  _fixUrl: function () {
    var s = this.get('content').match(/([^?#]*)(\?[^#]*)?(#.*)?/);
    s.shift();
    s[1] = ((s[1] && s[1] !== '?') ? (s[1] + '&') : '?') + 't=' + new Date().getTime();
    return s.join('');
  },

  _createIframe: function () {
    var that = this;

    this.iframe = $('<iframe>', {
      src: 'javascript:\'\';',
      scrolling: 'no',
      frameborder: 'no',
      allowTransparency: 'true',
      css: {
        border: 'none',
        width: '100%',
        display: 'block',
        height: '100%',
        overflow: 'hidden'
      }
    }).appendTo(this.contentElement);

    // 给 iframe 绑一个 close 事件
    // iframe 内部可通过 window.frameElement.trigger('close') 关闭
    Events.mixTo(this.iframe[0]);
    this.iframe[0].on('close', function () {
      that.hide();
    });
  },

  _syncHeight: function () {
    var h;
    // 如果未传 height，才会自动获取
    if (!this.get('height')) {
      try {
        this._errCount = 0;
        h = getIframeHeight(this.iframe) + 'px';
      } catch (err) {
        // 页面跳转也会抛错，最多失败6次
        this._errCount = (this._errCount || 0) + 1;
        if (this._errCount >= 6) {
          // 获取失败则给默认高度 300px
          // 跨域会抛错进入这个流程
          h = this.get('initialHeight');
          clearInterval(this._interval);
          delete this._interval;
        }
      }
      this.contentElement.css('height', h);
      // force to reflow in ie6
      // http://44ux.com/blog/2011/08/24/ie67-reflow-bug/
      this.element[0].className = this.element[0].className;
    } else {
      clearInterval(this._interval);
      delete this._interval;
    }
  },

  _ajaxHtml: function () {
    var that = this;
    this.contentElement.css('height', this.get('initialHeight'));
    this.contentElement.load(this.get('content'), function () {
      that._setPosition();
      that.contentElement.css('height', '');
      that.trigger('complete:show');
    });
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
    D.body.scrollHeight, D.documentElement.scrollHeight);
  } else if (D.documentElement.scrollHeight) {
    return D.documentElement.scrollHeight;
  } else if (D.body.scrollHeight) {
    return D.body.scrollHeight;
  }
}
