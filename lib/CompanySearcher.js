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

CompanySearcher.prototype.search = function(company, res) {
  tickerGetter.getTicker(company
  ).then(companyData => companyGetter.getCompany(companyData)
  ).catch((err) => console.log(err)
  ).then(companyData => newsGetter.getNews(companyData)
  ).catch((err) => console.log(err)
  ).then(companyData => {
    companyData.news.forEach((newsItem, i) => {
        companyData.news[i]['sentiment'] = sentimentAnalyser.analyse(newsItem.body)
        })
    res.render('index.ejs', { data: JSON.stringify(companyData) })
    }
    ).catch((err) => console.log(err))
}

module.exports = CompanySearcher;
