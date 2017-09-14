const NewsGetter = require('../NewsGetter')

describe('NewsGetter', () => {
  var newsGetter

  beforeEach(() => {
    newsGetter = new NewsGetter()
  });

  it('gets story data for Google', done => {
    var headline1 = "Google going strong, but maybe not for long."
    var story1 = "Google has some concerns to address the balance of this year"
    var uri = 'http://mm-recruitment-story-feed-api.herokuapp.com/8271'
    response = newsGetter.getNews(uri).then(response => {
      expect(response[0].headline).toEqual(headline1)
      expect(response[0].body.includes(story1)).toBe(true)
      done()
    })
  }, 2500);

  it('gets story data for Microsoft', done => {
    var headline1 = "Cloud gives Microsoft significant boost"
    var story1 = "Microsoft also disclosed plans to grow that business"
    var uri = 'http://mm-recruitment-story-feed-api.herokuapp.com/4934'
    response = newsGetter.getNews(uri).then(response => {
      expect(response[0].headline).toEqual(headline1)
      expect(response[0].body.includes(story1)).toBe(true)
      done()
    })
  }, 2500);
});
