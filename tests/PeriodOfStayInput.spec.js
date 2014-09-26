describe('PeriodOfStayInput instance', function () {
    'use strict';

    var assert = require('assert'),
        jsdom = require('jsdom'),
        TestUtils = require('react/addons').addons.TestUtils,
        PeriodOfStayInput = require('../src/PeriodOfStayInput'),
        Environment = require('../src/Environment'),
        Model = require('../src/Model'),

        $;

    this.timeout(4000);

    beforeEach(function (done) {
        global.document = jsdom.jsdom('<html><body></body></html>', jsdom.level(1, 'core'));
        global.window = global.document.parentWindow;

        jsdom.jQueryify(global.window, 'http://code.jquery.com/jquery-1.11.0.min.js', function () {
            $ = global.window.$;
            done();
        });
    });

    afterEach(function () {
        global.window.close();
    });

    describe('HTML for 1+ nights', function () {
        var component,

            props = function () {
                return {
                    model: new Model('2014-09-26', '2014-09-27', 'Don\'t worry, be happy'),
                    environment: new Environment(false, '2014-09-26')
                };
            };

        beforeEach(function () {
            component = TestUtils.renderIntoDocument(PeriodOfStayInput(props()));
        });

        it('has the root element\'s class assigned', function () {
            assert($(component.getDOMNode()).hasClass('period-of-stay-input'));
        });

        it('contains labelled check-in input', function () {
            assert.strictEqual(
                $('label.period-of-stay-check-in input', component.getDOMNode()).attr('type'),
                'date'
            );
        });

        it('assignes the check-in input reference', function () {
            assert.strictEqual(
                $('label.period-of-stay-check-in input', component.getDOMNode()).attr('data-reactid'),
                component.refs.checkIn.getDOMNode().getAttribute('data-reactid')
            );
        });

        it('contains labelled check-out input', function () {
            assert.strictEqual(
                $('label.period-of-stay-check-out input', component.getDOMNode()).attr('type'),
                'date'
            );
        });

        it('assignes the check-out input reference', function () {
            assert.strictEqual(
                $('label.period-of-stay-check-out input', component.getDOMNode()).attr('data-reactid'),
                component.refs.checkOut.getDOMNode().getAttribute('data-reactid')
            );
        });

        it('contains labelled nights input', function () {
            assert.strictEqual(
                $('label.period-of-stay-nights input', component.getDOMNode()).attr('type'),
                'number'
            );
        });

        it('assignes the nights input reference', function () {
            assert.strictEqual(
                $('label.period-of-stay-nights input', component.getDOMNode()).attr('data-reactid'),
                component.refs.nights.getDOMNode().getAttribute('data-reactid')
            );
        });

        it('sets the minimum number of nights to 1', function () {
            assert.strictEqual(component.refs.nights.getDOMNode().getAttribute('min'), '1');
        });

        it('sets the nights\' step to 1', function () {
            assert.strictEqual(component.refs.nights.getDOMNode().getAttribute('step'), '1');
        });

        it('sets the maximum number of nights to 27', function () {
            assert.strictEqual(component.refs.nights.getDOMNode().getAttribute('max'), '27');
        });

        it('doesn\'t contain the "1-day stay" link', function () {
            assert.strictEqual(
                $('a.period-of-stay-one-day', component.getDOMNode()).size(),
                0
            );
        });

        it('doesn\'t contain the "Overnight stay" link', function () {
            assert.strictEqual(
                $('a.period-of-stay-overnight', component.getDOMNode()).size(),
                0
            );
        });

        describe('wrt model values', function () {
            it('contains the check-in value', function () {
                assert.strictEqual(component.refs.checkIn.getDOMNode().value, '2014-09-26');
            });

            it('contains the check-out value', function () {
                assert.strictEqual(component.refs.checkOut.getDOMNode().value, '2014-09-27');
            });

            it('contains the derived nights value', function () {
                assert.strictEqual(component.refs.nights.getDOMNode().value, '1');
            });
        });
    });

    describe('HTML for 0 nights', function () {
        var component,

            props = function () {
                return {
                    model: new Model('2014-09-26', '2014-09-26'),
                    environment: new Environment(true, '2014-09-26')
                };
            };

        beforeEach(function () {
            component = TestUtils.renderIntoDocument(PeriodOfStayInput(props()));
        });

        it('contains the "Overnight stay" link', function () {
            assert.strictEqual(
                $('a.period-of-stay-overnight', component.getDOMNode()).text(),
                'Overnight stay'
            );
        });
    });

    describe('HTML for 0+ nights', function () {
        var component,

            props = function () {
                return {
                    model: new Model('2014-09-26', '2014-09-27'),
                    environment: new Environment(true, '2014-09-26')
                };
            };

        beforeEach(function () {
            component = TestUtils.renderIntoDocument(PeriodOfStayInput(props()));
        });

        it('contains the "1-day stay" link', function () {
            assert.strictEqual(
                $('a.period-of-stay-one-day', component.getDOMNode()).text(),
                '1-day stay'
            );
        });
    });
});
