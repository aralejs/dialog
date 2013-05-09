define(function(require) {
    var ConfirmBox = require('confirmbox');
    var expect = require('puerh');
    var sinon = require('sinon');    
    var $ = require('$');
    
    if ($.browser.msie) {
        mocha.setup({ignoreLeaks: true});
    }

    describe('ConfirmBox', function() {
        var example;

        afterEach(function() {
            if (example) {
                example.destroy();
                example = null;
            }
        });

        it('should have message', function() {
            example = new ConfirmBox({
                message: 'test message'
            });
            example.show();
            expect(example.get('message')).to.be('test message');
            expect(example.element.find('[data-role=message]').html()).to.be('test message');
            example.set('message', 'changed message');
            expect(example.element.find('[data-role=message]').html()).to.be('changed message');
        });

        it('should have title', function() {
            example = new ConfirmBox({
                title: 'test title'
            });
            example.show();
            expect(example.get('title')).to.be('test title');
            expect(example.element.find('[data-role=title]').html()).to.be('test title');
            example.set('title', 'changed title');
            expect(example.element.find('[data-role=title]').html()).to.be('changed title');
        });

        it('should have confirm text', function() {
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

        it('should have cancel text', function() {
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

    });

});

