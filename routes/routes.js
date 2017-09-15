module.exports = (function() {
    'use strict';
    const router = require('express').Router();
    const bodyParser = require('body-parser')

    router.use(bodyParser.urlencoded({extended: true}))
    router.use(bodyParser.json());

    const TickerGetter = require('../TickerGetter')
    const CompanyGetter = require('../CompanyGetter')
    const NewsGetter = require('../NewsGetter')
    const SentimentAnalyser = require('../SentimentAnalyser')

    var tickerGetter = new TickerGetter()
    var companyGetter = new CompanyGetter()
    var newsGetter = new NewsGetter()
    var sentimentAnalyser = new SentimentAnalyser()

    router.get('/', (req, res) => {
      res.render('index.ejs')
    })

    router.post('/company', (req,res) => {
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
        res.render('index.ejs', { data: JSON.stringify(companyData) })
        })
      .catch((err) => console.log(err))
    });

    return router;
})();
