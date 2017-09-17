// resolves with a JSON object containing company ticker/name, price, and news stories (with sentiment rating)

const TickerGetter = require('./TickerGetter')
const CompanyGetter = require('./CompanyGetter')
const NewsGetter = require('./NewsGetter')
const SentimentAnalyser = require('./SentimentAnalyser')

var tickerGetter = new TickerGetter()
var companyGetter = new CompanyGetter()
var newsGetter = new NewsGetter()
var sentimentAnalyser = new SentimentAnalyser()

function CompanySearcher() {

}

CompanySearcher.prototype.search = function(company) {
  return new Promise((resolve, reject) => {
    tickerGetter.getTicker(company
    ).then(companyData => companyGetter.getCompany(companyData)
    ).catch((err) => reject(err)
    ).then(companyData => newsGetter.getNews(companyData)
    ).catch((err) => reject(err)
    ).then(companyData => {
      companyData.news.forEach((newsItem, i) => {
          companyData.news[i]['sentiment'] = sentimentAnalyser.analyse(newsItem.body)
          })
      resolve(JSON.stringify(companyData))
    }
    ).catch((err) => reject(err))
  })
}

module.exports = CompanySearcher;
