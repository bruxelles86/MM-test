const TickerGetter = require('../TickerGetter')

describe('TickerGetter', function() {
  it('returns GOOG when passed \'Google Inc\'', function(done) {
    var tickerGetter = new TickerGetter()
    tickerGetter.getTicker('Google Inc').then(function(ticker) {
      expect(ticker).toEqual('GOOG')
      done()
    })
  }, 5000);

  it('returns MSFT when passed \'Microsoft Inc\'', function(done) {
    var tickerGetter = new TickerGetter()
    tickerGetter.getTicker('Microsoft Inc').then(function(ticker) {
      expect(ticker).toEqual('MSFT')
      done()
    })
  }, 5000);
})
