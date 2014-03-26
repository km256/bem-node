describe('i-router.common', function () {
    var router = BEM.blocks['i-router'];

    describe('params', function () {
        router.define('GET', /\/(foo)/, 'i-router-page-1');

        BEM.decl('i-router-page-1', null, {
            init: function () {
                router.getRes().end();
                return Vow.fulfill();
            },
            destruct: function () {
                return Vow.fulfill();
            }
        });

        it('simple', function () {
            return expect(env('/foo?qwe=123', function () {
                return router.getParams().qwe;
            })).eventually.equal('123');
        });

        it('? in params', function () {
            return expect(env('/foo?bar=123?4&p2=3333', function () {
                return router.getParams().bar;
            })).eventually.equal('123?4');
        });

        it('= in params', function () {
            return expect(env('/foo?bar=2=3&p2=3333', function () {
                return router.getParams().bar;
            })).eventually.equal('2=3');
        });

        it('% in params', function () {
            return expect(env('/foo?bar=%', function () {
                return router.getParams().bar;
            })).eventually.equal('%');
        });



    });
});