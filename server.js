const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const TickerGetter = require('./TickerGetter')
const CompanyGetter = require('./CompanyGetter')
const NewsGetter = require('./NewsGetter')

var tickerGetter = new TickerGetter()
var companyGetter = new CompanyGetter()
var newsGetter = new NewsGetter()

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
  ).then(ticker => companyGetter.getCompany(ticker)
  ).catch((err) => console.log(err))
  .then(companyData => newsGetter.getNews(companyData)
  ).catch((err) => console.log(err))
  .then(companyData => {
    res.render('index.ejs', { data: JSON.stringify(companyData) })
  })
  .catch((err) => console.log(err))
});

module.exports = app;
