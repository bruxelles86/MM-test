const CompanyGetter = require('../CompanyGetter')

describe('CompanyGetter', function() {
  var companyGetter
  beforeEach(function() {
    companyGetter = new CompanyGetter()
  });

  it('returns data for Google when passed its ticker', function(done) {
    companyGetter.getCompany('GOOG').then(function(company) {
      expect(company.latestPrice).toEqual(54407)
      expect(company.priceUnits).toEqual("GBP:pence")
      expect(company.storyFeedUrl).toEqual("http://mm-recruitment-story-feed-api.herokuapp.com/8271")
      done()
    })
  }, 2500);

  it('returns data for Microsoft when passed its ticker', function(done) {
    companyGetter.getCompany('MSFT').then(function(company) {
      expect(company.latestPrice).toEqual(4887)
      expect(company.priceUnits).toEqual("GBP:pence")
      expect(company.storyFeedUrl).toEqual("http://mm-recruitment-story-feed-api.herokuapp.com/4934")
      done()
    })
  }, 2500);
});
