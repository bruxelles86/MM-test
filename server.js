const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const TickerGetter = require('./TickerGetter')
const CompanyGetter = require('./CompanyGetter')
const NewsGetter = require('./NewsGetter')
const SentimentAnalyser = require('./SentimentAnalyser')

var tickerGetter = new TickerGetter()
var companyGetter = new CompanyGetter()
var newsGetter = new NewsGetter()
var sentimentAnalyser = new SentimentAnalyser()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log('listening on port 3000')
})

app.get('/', (req, res) => {
  res.render('index.ejs')
})

app.post('/company', (req,res) => {
  var company = req.body.content;
  var res = res

  tickerGetter.getTicker(company
  ).then(companyData => companyGetter.getCompany(companyData)
  ).catch((err) => console.log(err))
  .then(companyData => newsGetter.getNews(companyData)
  ).catch((err) => console.log(err))
  .then(companyData => {
    companyData.news.forEach(function(newsItem, i) {
        companyData.news[i]['sentiment'] = sentimentAnalyser.analyse(newsItem.body)
        })
    console.log(companyData)
    res.render('index.ejs', { data: JSON.stringify(companyData) })
    })
  .catch((err) => console.log(err))
});

module.exports = app;
