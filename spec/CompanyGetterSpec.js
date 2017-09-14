const CompanyGetter = require('../CompanyGetter')

describe('CompanyGetter', () => {
  var companyGetter
  beforeEach(() => {
    companyGetter = new CompanyGetter()
  });

  it('returns data for Google when passed its ticker', done => {
    var company = { 'name' : 'Google Inc', 'tickerCode' : 'GOOG'}
    companyGetter.getCompany(company).then(company => {
      expect(company.latestPrice).toEqual(54407)
      expect(company.priceUnits).toEqual("GBP:pence")
      expect(company.storyFeedUrl).toEqual("http://mm-recruitment-story-feed-api.herokuapp.com/8271")
      expect(company.tickerCode).toEqual("GOOG")
      done()
    })
    .catch((err) => console.log(err))
  }, 2500);

  it('returns data for Microsoft when passed its ticker', done => {
    var company = { 'name' : 'Microsoft Inc', 'tickerCode' : 'MSFT'}
    companyGetter.getCompany(company).then(company => {
      expect(company.latestPrice).toEqual(4887)
      expect(company.priceUnits).toEqual("GBP:pence")
      expect(company.storyFeedUrl).toEqual("http://mm-recruitment-story-feed-api.herokuapp.com/4934")
      expect(company.tickerCode).toEqual("MSFT")
      done()
    })
    .catch((err) => console.log(err))
  }, 2500);
});
