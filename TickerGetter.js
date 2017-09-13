const MongoClient = require('mongodb').MongoClient

function TickerGetter() {
  this.uri = 'mongodb://mm_recruitment_user_readonly:rebelMutualWhistle@ds037551.mongolab.com:37551/mm-recruitment'
}

TickerGetter.prototype.getTicker = function(inputName) {
  var uri = this.uri
  _this = this

  return new Promise(function(resolve, reject) {
    _this.dbConnect(uri)
    .then(db => _this.extractTicker(db, inputName))
    .catch((err) => console.log(err))
    .then(function(tickerCode) {
      resolve(tickerCode)
    })
  })
}

TickerGetter.prototype.dbConnect = function(uri) {
  return new Promise(function(resolve, reject) {
    MongoClient.connect(uri, (err, db) => {
      if (err) {
        reject(err);
      } else {
        resolve(db);
      }
    })
  })
}

TickerGetter.prototype.extractTicker = function(db, inputName) {
  return new Promise(function(resolve, reject) {
    db.collection('company').find().toArray(function(err, companies) {
      company = companies.find(function(company) {
        return company.name.toLowerCase().includes(inputName.toLowerCase())
      })
      resolve(company.tickerCode)
    })
  })
}

module.exports = TickerGetter;
