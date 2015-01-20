var Dialog = require('../src/dialog');
var expect = require('expect.js');
var sinon = require('sinon');
var $ = require('jquery');
var mask = require('arale-overlay').Mask;

require('../src/dialog.css');

mocha.setup({
  timeout: null,
  ignoreLeaks: true
});

describe('dialog', function () {
  var example;

  afterEach(function () {
    if (example) {
      example.hide();
      example.destroy();
      example = null;
    }
  });

  describe('content', function () {

    it('is dom', function () {
      $('<div id="test1">test1</div>').appendTo(document.body);
      example = new Dialog({
        content: $('#test1')
      });
      example.render();

      var test = example.$('.ui-dialog-content').children().eq(0);
      expect(test.attr('id')).to.be('test1');
      expect(test.html()).to.be('test1');
    });

    it('is string', function () {
      example = new Dialog({
        content: 'test2'
      });
      example.render();

      expect(example.$('.ui-dialog-content').html()).to.be('test2');
    });

    it('is html', function () {
      example = new Dialog({
        content: '<div id="test3">test3</div>'
      });
      example.render();

      var test = example.$('.ui-dialog-content').children().eq(0);
      expect(test.attr('id')).to.be('test3');
      expect(test.html()).to.be('test3');
    });

    it('is relative url', function () {
      example = new Dialog({
        content: './height300px.html'
      });
      example.render().show();

      var iframe = example.$('iframe');
      expect(iframe.length).to.be(1);
      expect(iframe.attr('src').replace(/\?t=\d*$/, '')).to.be('./height300px.html');
    });

    it('is absolute url', function () {
      example = new Dialog({
        content: 'http://spmjs.io/'
      });
      example.render().show();

      var iframe = example.$('iframe');
      expect(iframe.length).to.be(1);
      expect(iframe.attr('src').replace(/\?t=\d*$/, '')).to.be('http://spmjs.io/');
    });

    it('is invalid url', function () {
      example = new Dialog({
        content: 'demo.html'
      });
      example.render().show();

      var iframe = example.$('iframe');
      expect(iframe.length).to.be(0);
      expect(example.$('.ui-dialog-content').html()).to.be('demo.html');
    });

    it('changing content should reset position', function () {
      example = new Dialog({
        content: 'xxxx'
      });
      example.show();
      var top = example.element.css('top');
      example.set('content', '<p>xxxx</p><p>xxxx</p>');
      expect(top).not.to.be(example.element.css('top'));
    });
  });

  describe('Height', function () {
    it('should init without height when type is dom', function () {
      example = new Dialog({
        content: '<div id="test" style="height:200px;"></div>'
      });

      var spy = sinon.spy(example, '_onRenderHeight');

      example.show();
      expect(example._onRenderHeight.called).not.to.be(true);
      spy.restore();
    });

    it('should init with height when type is dom', function () {
      example = new Dialog({
        height: '300px',
        content: '<div id="test" style="height:200px;"></div>'
      });

      var spy = sinon.spy(example, '_onRenderHeight');

      example.show();
      expect(spy.withArgs('300px').called).to.be.ok();
      spy.restore();
    });

    it('should init with height when type is iframe', function (done) {
      example = new Dialog({
        height: '200px',
        content: './height300px.html'
      });

      var spy = sinon.spy(example, '_onRenderHeight');

      example.show();
      example.on('complete:show', function () {
        expect(spy.withArgs('200px').called).to.be.ok();
        spy.restore();
        done();
      });
    });

    it('should init without height when type is iframe', function (done) {
      var h, isComplete = false;
      example = new Dialog({
        content: './height300px.html'
      });

      example.show();
      expect(example.element.height()).to.be(300);

      example.on('complete:show', function () {
        example.$('iframe')[0].contentWindow.document.getElementById('container').style.height = '400px';
        example._syncHeight();
        expect(example.element.height()).to.be(400);
        done();
      });
    });

    it('should be initialHeight when iframe is not loaded yet', function (done) {
      var h, isComplete = false;
      example = new Dialog({
        content: './height300px.html',
        initialHeight: 100
      });

      example.show();
      expect(example.element.height()).to.be(100);

      example.on('complete:show', function () {
        expect(example.element.height()).to.be(300);
        done();
      });
    });

    it('should be align top when dialog element is very high', function () {
      example = new Dialog({
        content: 'xxx',
        height: 5000
      });

      example.show();
      expect(example.element.offset().top).to.be(0);
    });

  });

  describe('interval', function () {
    it('should sync height', function (done) {
      var isComplete = false;
      example = new Dialog({
        content: './height300px.html'
      }).show();

      example.on('complete:show', function () {
        expect(example._interval).to.be.ok();
        example.hide();
        expect(example._interval).to.be(undefined);
        done();
      });
    });

    it('should stop when set height', function (done) {
      var isComplete = false;
      example = new Dialog({
        height: '300px',
        content: './height300px.html'
      }).show();

      example.on('complete:show', function () {
        expect(example._interval).to.be(undefined);
        done();
      });
    });

    it('should be fixed height when set height', function (done) {
      example = new Dialog({
        content: 'http://spmjs.io',
        height: 200,
        autoFit: true
      });
      expect(example.get('height')).to.be(200);
      example.show();
      expect(example.element.height()).to.be(200);
      example.on('complete:show', function () {
        expect(example.element.height()).to.be(200);
        done();
      });
    });

    it('should stop when autoFit is false', function (done) {
      var isComplete = false;
      example = new Dialog({
        autoFit: false,
        content: 'http://spmjs.io/'
      }).show();

      example.on('complete:show', function () {
        expect(example._interval).to.be(undefined);
        done();
      });
    });
  });

  describe('events: show and hide', function () {

    it('click trigger to show', function () {
      var test = $('<div id="test"></div>');
      test.appendTo('body');
      example = new Dialog({
        content: 'xxx',
        trigger: '#test'
      });
      expect(example.get('visible')).not.to.be.ok();
      test.click();
      expect(example.get('visible')).to.be.ok();
      test.remove();
    });

    it('click close to hide', function () {
      example = new Dialog({
        content: 'http://spmjs.io/'
      });
      expect(example.get('visible')).not.to.be.ok();
      example.show();
      expect(example.get('visible')).to.be.ok();
      example.element.find('[data-role=close]').click();
      expect(example.get('visible')).not.to.be.ok();
    });

    it('bind close event', function () {
      example = new Dialog({
        content: 'http://spmjs.io/'
      });
      example.show();
      expect(example.get('visible')).to.be.ok();
      var iframe = example.$('iframe')[0];
      iframe.trigger('close');
      expect(example.get('visible')).not.to.be.ok();
    });

    it('bind key close event', function () {
      example = new Dialog({
        content: 'xxxx'
      });
      example.show();
      expect(example.get('visible')).to.be.ok();
      // 模拟一个键盘事件
      var e = $.Event('keyup');
      e.keyCode = 27;
      example.element.trigger(e);
      expect(example.get('visible')).not.to.be.ok();
    });

    it('bind key close event when iframe', function () {
      example = new Dialog({
        content: 'http://spmjs.io/'
      });
      example.show();
      expect(example.get('visible')).to.be.ok();
      // 模拟一个键盘事件
      var e = $.Event('keyup');
      e.keyCode = 27;
      example.element.trigger(e);
      expect(example.get('visible')).not.to.be.ok();
    });

    it('before show set content', function () {
      example = new Dialog().before('show', function () {
        this.set('content', 'test');
      }).render();

      expect(example.$('.ui-dialog-content').html()).to.be('');

      example.show();

      expect(example.$('.ui-dialog-content').html()).to.be('test');
    });

    it('fixUrl support hash #25', function () {
      example = new Dialog({
        content: 'http://spmjs.io/?param=aa#'
      }).render().show();

      var url = example.$('iframe').attr('src').replace(/&t=\d{13}/, '');
      expect(url).to.be('http://spmjs.io/?param=aa#');
    });

    it('should call onload once', function (done) {
      example = new Dialog({
        content: './height200px.html',
        hasMask: false,
        autoFit: false
      });

      var syncHeight = sinon.spy(example, '_syncHeight');
      var setPosition = sinon.spy(example, '_setPosition');
      var onRenderHeight = sinon.spy(example, '_onRenderHeight');

      example.show();

      example.on('complete:show', function () {
        expect(syncHeight.callCount).to.be(1);
        expect(setPosition.callCount).to.be(3);
        expect(onRenderHeight.callCount).to.be(0);
        done();
      });
    });

    it('should hide close link', function () {
      example = new Dialog({
        content: 'xxx',
        closeTpl: ''
      });
      example.show();
      expect(example.element.find('[data-role=close]').is(':visible')).to.be(false);
      example.set('closeTpl', 'X');
      expect(example.element.find('[data-role=close]').is(':visible')).to.be(true);
      example.set('closeTpl', '');
      expect(example.element.find('[data-role=close]').is(':visible')).to.be(false);
    });

    it('should have a worked complete:show event', function (done) {
      example = new Dialog({
        content: './height200px.html'
      });
      example.on('complete:show', function () {
        expect($._data(example.$('iframe')[0], "events")).to.be(undefined);
        done();
      });
      example.show();
      expect($._data(example.$('iframe')[0], "events").load).to.be.a('object');
    });

  });

  describe('mask', function () {

    it('should have mask', function () {
      example = new Dialog({
        content: 'xxx'
      });
      example.show();
      expect($('.ui-mask').is(':visible')).to.be(true);
    });

    it('should not have mask', function () {
      example = new Dialog({
        content: 'xxx',
        hasMask: false
      });
      example.show();
      expect($('.ui-mask').is(':visible')).to.be(false);
    });

    it('should not disappear when click mask', function () {
      example = new Dialog({
        content: 'xxx'
      });
      example.show();
      expect(example.element.is(':visible')).to.be(true);
      mask.element.click();
      expect(example.element.is(':visible')).to.be(true);
    });

    it('should hide the mask when last dialog hide', function () {
      example = new Dialog({
        content: '1111'
      });
      example.show();
      expect(mask._dialogs.length).to.be(1);
      expect(mask.get('visible')).to.be(true);
      expect(mask.element.next()[0]).to.be(example.element[0]);
      example2 = new Dialog({
        content: '2222'
      });
      example2.show();
      expect(mask._dialogs.length).to.be(2);
      expect(mask.get('visible')).to.be(true);
      expect(mask.element.next()[0]).to.be(example2.element[0]);

      example2.hide();
      expect(mask._dialogs.length).to.be(1);
      expect(mask.get('visible')).to.be(true);
      expect(mask.element.next()[0]).to.be(example.element[0]);

      example.hide();
      expect(mask._dialogs.length).to.be(0);
      expect(mask.get('visible')).to.be(false);

      example2.destroy();
    });

    it('should not hide the mask when other dialog is visible', function() {
      example = new Dialog({
        content: 'foo'
      });
      example.show();

      expect(mask._dialogs.length).to.be(1);
      expect(mask.get('visible')).to.be(true);
      expect(mask.element.next()[0]).to.be(example.element[0]);

      var example2 = new Dialog({
        content: 'bar'
      }).after('hide', function() {
        this.destroy();
      });

      example2.show();
      expect(mask._dialogs.length).to.be(2);
      expect(mask.get('visible')).to.be(true);
      expect(mask.element.next()[0]).to.be(example2.element[0]);

      example2.hide(); // will destroy example2
      expect(mask._dialogs.length).to.be(1);
      expect(mask.get('visible')).to.be(true);
      expect(mask.element.next()[0]).to.be(example.element[0]);

      example.hide();
      expect(mask._dialogs.length).to.be(0);
      expect(mask.get('visible')).to.be(false);
    });

    it('should remove from mask._dialogs when dialog(NOT last one) is hide', function() {
      example = new Dialog({
        content: 'foo'
      });
      example.show();

      expect(mask._dialogs.length).to.be(1);
      expect(mask.get('visible')).to.be(true);
      expect(mask.element.next()[0]).to.be(example.element[0]);

      var example2 = new Dialog({
        content: 'bar'
      });

      example2.show();
      expect(mask._dialogs.length).to.be(2);
      expect(mask.get('visible')).to.be(true);
      expect(mask.element.next()[0]).to.be(example2.element[0]);

      // 通过脚本隐藏非顶层的 dialog
      example.hide();
      // 此时应移除存在 mask._dialogs 中对应的 dialog
      expect(mask._dialogs.length).to.be(1);
      // mask 保持原样不作处理
      expect(mask.get('visible')).to.be(true);
      expect(mask.element.next()[0]).to.be(example2.element[0]);

      example2.hide();
      expect(mask._dialogs.length).to.be(0);
      expect(mask.get('visible')).to.be(false);

      example2.destroy();
    });

    it('set hasMask works', function () {
      example = new Dialog({
        content: 'xxx'
      });
      example.show();
      expect(mask.get('visible')).to.be(true);
      example.hide();
      example.set('hasMask', false);
      example.show();
      expect(mask.get('visible')).to.be(false);
      example.hide();
      example.set('hasMask', true);
      example.show();
      expect(mask.get('visible')).to.be(true);
      example.hide();
    });

    it('should hide mask', function () {
      example = new Dialog({
        content: 'xxx'
      });
      example.show();
      example.show();
      expect(mask.get('visible')).to.be(true);
      example.hide();
      expect(mask.get('visible')).to.be(false);
    });

  });

  describe('other attributes', function () {
    it('fade effect should work', function (done) {
      example = new Dialog({
        content: 'xxx',
        effect: 'fade',
        duration: 1000
      });
      expect(example.get('effect')).to.be('fade');
      example.show();
      setTimeout(function () {
        expect(example.element.css('opacity')).to.be.within(0, 1);
        done();
      }, 30);
    });
  });

  describe('ajax', function (done) {
    it('ajax load page', function (done) {
      example = new Dialog({
        content: './height300px.html?ajax'
      });
      expect(example._type).to.be('iframe');
      expect(example._ajax).to.be(true);

      example.on('complete:show', function () {
        expect(example.$('iframe').length).to.be(0); // no iframe but ajax
        expect(example.$('#container').length).to.be(1);
        done();
      });
      example.render().show();
    });
  });

  describe('issues', function () {
    it('#43', function () {
      example = new Dialog({
        content: 'xx'
      });
      example.show();
      example2 = new Dialog({
        content: 'xx'
      });
      example2.show();
      expect(mask.element.is(':visible')).to.be(true);
      example2.destroy();
      expect(mask.element.is(':visible')).to.be(true);
      example.hide();
      expect(mask.element.is(':visible')).to.be(false);
      example.destroy();
    });

    it('#47', function () {
      example = new Dialog({
        content: 'xx'
      });
      example.show();
      expect(mask.element.is(':visible')).to.be(true);
      example.destroy();
      expect(mask.element.is(':visible')).to.be(false);
    });
  });

});
