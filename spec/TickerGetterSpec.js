const TickerGetter = require('../TickerGetter')

describe('TickerGetter', function() {
  var tickerGetter

  beforeEach(function() {
    tickerGetter = new TickerGetter()
  });

  it('returns GOOG when passed \'Google Inc\'', function(done) {
    tickerGetter.getTicker('Google Inc').then(function(ticker) {
      expect(ticker).toEqual('GOOG')
      done()
    })
    .catch((err) => console.log(err))
  }, 2500);

  it('returns MSFT when passed \'Microsoft Inc\'', function(done) {
    tickerGetter.getTicker('Microsoft Inc').then(function(ticker) {
      expect(ticker).toEqual('MSFT')
      done()
    })
    .catch((err) => console.log(err))
  }, 2500);

  it('also returns correct tickers when passed a partial name', function(done) {
    tickerGetter.getTicker('google').then(function(ticker) {
      expect(ticker).toEqual('GOOG')
      done()
    })
    .catch((err) => console.log(err))
  }, 2500)
})
