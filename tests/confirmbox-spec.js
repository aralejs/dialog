var ConfirmBox = require('../src/confirmbox');
var expect = require('expect.js');
var sinon = require('sinon');
var $ = require('jquery');
var ua = (window.navigator.userAgent || "").toLowerCase();
var mask = require('arale-overlay').Mask;

require('../src/dialog.css');

if (ua.indexOf("msie") !== -1) {
  mocha.setup({
    ignoreLeaks: true
  });
}

describe('ConfirmBox', function () {
  var example;

  afterEach(function () {
    if (example) {
      example.destroy();
      example = null;
    }
  });

  it('should have message', function () {
    example = new ConfirmBox({
      message: 'test message'
    });
    example.show();
    expect(example.get('message')).to.be('test message');
    expect(example.element.find('[data-role=message]').html()).to.be('test message');
    example.set('message', 'changed message');
    expect(example.element.find('[data-role=message]').html()).to.be('changed message');
  });

  it('should have title', function () {
    example = new ConfirmBox({
      title: 'test title'
    });
    example.show();
    expect(example.get('title')).to.be('test title');
    expect(example.element.find('[data-role=title]').html()).to.be('test title');
    example.set('title', 'changed title');
    expect(example.element.find('[data-role=title]').html()).to.be('changed title');
  });

  it('should have confirm text', function () {
    var confirmTpl = '确xxx定';
    example = new ConfirmBox({
      confirmTpl: confirmTpl
    });
    example.show();
    expect(example.get('confirmTpl')).to.be(confirmTpl);
    expect($.trim(example.element.find('[data-role=confirm]').html())).to.be(confirmTpl);
    example.set('confirmTpl', 'changed confirmTpl');
    expect($.trim(example.element.find('[data-role=confirm]').html())).to.be('changed confirmTpl');
  });

  it('should have cancel text', function () {
    var cancelTpl = '取xxx消';
    example = new ConfirmBox({
      cancelTpl: cancelTpl
    });
    example.show();
    expect(example.get('cancelTpl')).to.be(cancelTpl);
    expect($.trim(example.element.find('[data-role=cancel]').html())).to.be(cancelTpl);
    example.set('cancelTpl', 'changed cancelTpl');
    expect($.trim(example.element.find('[data-role=cancel]').html())).to.be('changed cancelTpl');
  });

  it('should be confirm dialog: click confirm', function () {
    var msg = '';
    ConfirmBox.confirm('是否要删除这个类目', '确认删除框', function () {
      msg = '点击了确认按钮';
    });
    expect($('.ui-dialog').length).to.be(1);
    expect($('.ui-dialog [data-role="message"]').html()).to.be('是否要删除这个类目');
    expect($('.ui-dialog [data-role="title"]').html()).to.be('确认删除框');
    expect($('.ui-dialog [data-role="confirm"]').length).to.be(1);
    expect($('.ui-dialog [data-role="cancel"]').length).to.be(1);

    $('.ui-dialog [data-role="confirm"]').click();
    expect(msg).to.be('点击了确认按钮');
    expect($('.ui-dialog').length).to.be(0);
  });

  it('should be confirm dialog: click cancel', function () {
    var msg = '';
    ConfirmBox.confirm('是否要删除这个类目', '确认删除框', function () {
      msg = '点击了确认按钮';
    });

    $('.ui-dialog [data-role="cancel"]').click();
    expect(msg).to.be('');
    expect($('.ui-dialog').length).to.be(0);
  });

  it('should support confirm(msg, title, onConfirm, onCancel, options)', function () {
    var msg = '';
    $('.ui-mask').remove();
    ConfirmBox.confirm('是否要删除这个类目', '确认删除框', function () {
      msg = '点击了确认按钮';
    }, function () {
      msg = '点击了取消按钮';
    }, {
      hasMask: false
    });
    expect($('.ui-mask').length).to.be(0);
    $('.ui-dialog [data-role="cancel"]').click();
    expect(msg).to.be('点击了取消按钮');
  });

  it('should be msg dialog', function () {
    var msg = '';
    ConfirmBox.show('是否要删除这个类目 - show', function () {
      msg = '点击了x按钮';
    });
    expect($('.ui-dialog').length).to.be(1);
    expect($('.ui-dialog [data-role="message"]').html()).to.be('是否要删除这个类目 - show');
    expect($('.ui-dialog [data-role="title"]').length).to.be(0);
    expect($('.ui-dialog [data-role="confirm"]').length).to.be(0);
    expect($('.ui-dialog [data-role="cancel"]').length).to.be(0);

    $('.ui-dialog [data-role="close"]').click();
    expect(msg).to.be('点击了x按钮');
    expect($('.ui-dialog').length).to.be(0);
  });

  it('should be alert dialog', function () {
    var msg = '';
    ConfirmBox.alert('是否要删除这个类目 - alert', function () {
      msg = '点击了确认按钮';
    });
    expect($('.ui-dialog').length).to.be(1);
    expect($('.ui-dialog [data-role="message"]').html()).to.be('是否要删除这个类目 - alert');
    expect($('.ui-dialog [data-role="title"]').length).to.be(0);
    expect($('.ui-dialog [data-role="confirm"]').length).to.be(1);
    expect($('.ui-dialog [data-role="cancel"]').length).to.be(0);

    $('.ui-dialog [data-role="confirm"]').click();
    expect(msg).to.be('点击了确认按钮');
    expect($('.ui-dialog').length).to.be(0);
  });

  it('should not disappear when click mask', function () {
    example = new ConfirmBox({
      content: 'xxx'
    });
    example.show();
    mask.element.click();
    expect(example.element.is(':visible')).to.be(true);
  });

});
