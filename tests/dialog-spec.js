define(function(require) {
    var Dialog = require('dialog');
    var expect = require('puerh');
    var sinon = require('sinon');
    var $ = require('$');
    var mask = require('mask');
    
    mocha.setup({ignoreLeaks: true});

    describe('dialog', function() {
        var example;

        afterEach(function() {
            if (example) {
                example.destroy();
                example = null;
            }
        });

        describe('content', function() {

            it('is dom', function() {
                $('<div id="test1">test1</div>').appendTo(document.body);
                example = new Dialog({
                    content: $('#test1')
                });
                example.render();

                var test = example.$('.ui-dialog-content').children().eq(0);
                expect(test.attr('id')).to.be('test1');
                expect(test.html()).to.be('test1');
            });

            it('is string', function() {
                example = new Dialog({
                    content: 'test2'
                });
                example.render();

                expect(example.$('.ui-dialog-content').html()).to.be('test2');
            });

            it('is html', function() {
                example = new Dialog({
                    content: '<div id="test3">test3</div>'
                });
                example.render();

                var test = example.$('.ui-dialog-content').children().eq(0);
                expect(test.attr('id')).to.be('test3');
                expect(test.html()).to.be('test3');
            });

            it('is relative url', function() {
                example = new Dialog({
                    content: './height300px.html'
                });
                example.render().show();

                var iframe = example.$('iframe');
                expect(iframe.length).to.be(1);
                expect(iframe.attr('src').replace(/\?t=\d*$/, ''))
                    .to.be('./height300px.html');
            });

            it('is absolute url', function() {
                example = new Dialog({
                    content: 'http://jsfiddle.net/afc163/CzQKp/show/'
                });
                example.render().show();

                var iframe = example.$('iframe');
                expect(iframe.length).to.be(1);
                expect(iframe.attr('src').replace(/\?t=\d*$/, ''))
                    .to.be('http://jsfiddle.net/afc163/CzQKp/show/');
            });

            it('is invalid url', function() {
                example = new Dialog({
                    content: 'demo.html'
                });
                example.render().show();

                var iframe = example.$('iframe');
                expect(iframe.length).to.be(0);
                expect(example.$('.ui-dialog-content').html())
                    .to.be('demo.html');
            });
        });

        describe('Height', function() {
            it('should init without height when type is dom', function() {
                example = new Dialog({
                    content: '<div id="test" style="height:200px;"></div>'
                });

                var spy = sinon.spy(example, '_onRenderHeight');

                example.show();
                expect(example._onRenderHeight).not.to.be.called();
                spy.restore();
            });

            it('should init with height when type is dom', function() {
                example = new Dialog({
                    height: '300px',
                    content: '<div id="test" style="height:200px;"></div>'
                });

                var spy = sinon.spy(example, '_onRenderHeight');

                example.show();
                expect(spy).to.be.called.withArgs('300px');
                spy.restore();
            });

            it('should init with height when type is iframe', function(done) {
                example = new Dialog({
                    height: '200px',
                    content: './height300px.html'
                });

                var spy = sinon.spy(example, '_onRenderHeight');

                example.show();
                setTimeout(function() {
                    expect(spy).to.be.called.withArgs('200px');
                    spy.restore();
                    done();
                }, 500);
            });

            it('should init without height when type is iframe', function(done) {
                var h, isComplete = false;
                example = new Dialog({
                    content: './height300px.html'
                });

                example.show();
                expect(example.element.height()).to.be(300);

                setTimeout(function() {
                    example.$('iframe')[0].contentWindow.document
                        .getElementById('container').style.height = '400px';
                    example._syncHeight();
                    expect(example.element.height()).to.be(400);
                    done();
                }, 700);
            });

            it('should be initialHeight when iframe is not loaded yet', function(done) {
                var h, isComplete = false;
                example = new Dialog({
                    content: './height300px.html',
                    initialHeight: 100
                });

                example.show();
                expect(example.element.height()).to.be(100);

                setTimeout(function() {
                    expect(example.element.height()).to.be(300);
                    done();
                }, 700);
            });

        });

        describe('interval', function() {
            it('should sync height', function(done) {
                var isComplete = false;
                example = new Dialog({
                    content: './height300px.html'
                }).show();

                setTimeout(function() {
                    expect(example._interval).to.be.ok();
                    example.hide();
                    expect(example._interval).to.be(undefined);
                    done();
                }, 600);
            });

            it('should stop when set height', function(done) {
                var isComplete = false;
                example = new Dialog({
                    height: '300px',
                    content: './height300px.html'
                }).show();

                setTimeout(function() {
                    expect(example._interval).to.be(undefined);
                    done();
                }, 500);
            });

            it('should be fixed height when set height', function(done) {
                example = new Dialog({
                    content: 'http://jsfiddle.net/afc163/CzQKp/show/',
                    height: 200,
                    autoFit: true
                });
                expect(example.get('height')).to.be(200);
                example.show();
                expect(example.element.height()).to.be(200);
                setTimeout(function() {
                    expect(example.element.height()).to.be(200);
                    done();
                }, 500);
            });

            it('should stop when autoFit is false', function(done) {
                var isComplete = false;
                example = new Dialog({
                    autoFit: false,
                    content: 'http://jsfiddle.net/afc163/CzQKp/show/'
                }).show();

                setTimeout(function() {
                    expect(example._interval).to.be(undefined);
                    done();
                }, 500);
            });
        });

        describe('events: show and hide', function() {

            it('click trigger to show', function() {
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

            it('click close to hide', function() {
                example = new Dialog({
                    content: 'http://jsfiddle.net/afc163/CzQKp/show/'
                });
                expect(example.get('visible')).not.to.be.ok();
                example.show();
                expect(example.get('visible')).to.be.ok();
                example.element.find('[data-role=close]').click();
                expect(example.get('visible')).not.to.be.ok();
            });

            it('bind close event', function() {
                example = new Dialog({
                    content: 'http://jsfiddle.net/afc163/CzQKp/show/'
                });
                example.show();
                expect(example.get('visible')).to.be.ok();
                var iframe = example.$('iframe')[0];
                iframe.trigger('close');
                expect(example.get('visible')).not.to.be.ok();
            });

            it('bind key close event', function() {
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

            it('bind key close event when iframe', function() {
                example = new Dialog({
                    content: 'http://jsfiddle.net/afc163/CzQKp/show/'
                });
                example.show();
                expect(example.get('visible')).to.be.ok();
                // 模拟一个键盘事件
                var e = $.Event('keyup');
                e.keyCode = 27;
                example.element.trigger(e);
                expect(example.get('visible')).not.to.be.ok();
            });

            it('before show set content', function() {
                example = new Dialog()
                    .before('show', function() {
                        this.set('content', 'test');
                    }).render();

                expect(example.$('.ui-dialog-content').html()).to.be('');

                example.show();

                expect(example.$('.ui-dialog-content').html()).to.be('test');
            });

            it('fixUrl support hash #25', function() {
                example = new Dialog({
                    content: 'http://jsfiddle.net/afc163/CzQKp/show/?param=aa#'
                }).render().show();

                var url = example.$('iframe').attr('src').replace(/&t=\d{13}/, '');
                expect(url).to.be('http://jsfiddle.net/afc163/CzQKp/show/?param=aa#');
            });

            it('should call onload once', function(done) {
                example = new Dialog({
                    content: './height200px.html',
                    hasMask: false,
                    autoFit: false
                });

                var syncHeight = sinon.spy(example, '_syncHeight');
                var setPosition = sinon.spy(example, '_setPosition');
                var onRenderHeight = sinon.spy(example, '_onRenderHeight');

                example.show();

                setTimeout(function() {
                    expect(syncHeight).to.be.called.once();
                    expect(setPosition.callCount).to.be(3);
                    expect(onRenderHeight.callCount).to.be(0);
                    done();
                }, 600);
            });

            it('should hide close link', function() {
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

        });

        describe('mask', function() {
            
            it('should have mask', function() {
                example = new Dialog({
                    content: 'xxx'
                });
                example.show();
                expect($('.ui-mask').is(':visible')).to.be(true);
            });

            it('should not have mask', function() {
                example = new Dialog({
                    content: 'xxx',
                    hasMask: false
                });
                example.show();
                expect($('.ui-mask').is(':visible')).to.be(false);
            });

            it('should not disappear when click mask', function() {
                example = new Dialog({
                    content: 'xxx'
                });
                example.show();
                expect(example.element.is(':visible')).to.be(true);
                mask.element.click();
                expect(example.element.is(':visible')).to.be(true);
            });

            it('should not hide the mask when last dialog hide', function() {
                example = new Dialog({
                    content: '1111'
                });
                example.show();
                expect(mask._dialogs.length).to.be(1);
                expect(mask.element.is(':visible')).to.be(true);
                expect(mask.element.next()[0]).to.be(example.element[0]);
                example2 = new Dialog({
                    content: '2222'
                });
                example2.show();
                expect(mask._dialogs.length).to.be(2);
                expect(mask.element.is(':visible')).to.be(true);
                expect(mask.element.next()[0]).to.be(example2.element[0]);

                example2.hide();
                expect(mask._dialogs.length).to.be(1);
                expect(mask.element.is(':visible')).to.be(true);
                expect(mask.element.next()[0]).to.be(example.element[0]);

                example.hide();
                expect(mask._dialogs.length).to.be(0);
                expect(mask.element.is(':visible')).to.be(false);

                example2.destroy();
            });

            it('set hasMask works', function() {
                example = new Dialog({
                    content: 'xxx'
                });
                example.show();
                expect($('.ui-mask').is(':visible')).to.be(true);
                example.hide();
                example.set('hasMask', false);
                example.show();
                expect($('.ui-mask').is(':visible')).to.be(false);
                example.hide();
                example.set('hasMask', true);
                example.show();
                expect($('.ui-mask').is(':visible')).to.be(true);
                example.hide();
            });
            
        });

        describe('other attributes', function() {
            it('fade effect should work', function(done) {
                example = new Dialog({
                    content: 'xxx',
                    effect: 'fade',
                    duration: 1000
                });
                expect(example.get('effect')).to.be('fade');
                example.show();
                setTimeout(function() {
                    expect(example.element.css('opacity')).to.be.within(0, 1);
                    done();
                }, 30);
            });

        });     

    });
});
