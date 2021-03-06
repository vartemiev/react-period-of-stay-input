describe('intlMessages', function () {
    const assert = require('assert')
    const intlMessages = require('../src/intlMessages')

    it('is a function', function () {
        assert.strictEqual(typeof intlMessages, 'function')
    })

    describe('react-star-rating-input namespace', function () {
        ['en', 'de'].forEach(function (locale) {
            ['period', 'checkInDay', 'checkOutDay'].forEach(function (messageName) {
                it('defines ' + messageName + ' for ' + locale + ' locale', function () {
                    assert(intlMessages()[locale]['react-period-of-stay-input'][messageName])
                })
            })
        })
    })
})
