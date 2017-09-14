const MongoClient = require('mongodb').MongoClient

function TickerGetter() {
  this.uri = 'mongodb://mm_recruitment_user_readonly:rebelMutualWhistle@ds037551.mongolab.com:37551/mm-recruitment'
}

TickerGetter.prototype.getTicker = function(inputName) {
  var uri = this.uri
  _this = this

  return new Promise(function(resolve, reject) {
    _this._dbConnect(uri)
    .then(db => _this._extractTicker(db, inputName))
    .catch((err) => reject(err))
    .then(function(tickerCode) {
      resolve(tickerCode)
    })
    .catch((err) => reject(err))
  })
}

TickerGetter.prototype._dbConnect = function(uri) {
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

TickerGetter.prototype._extractTicker = function(db, inputName) {
  return new Promise(function(resolve, reject) {
    db.collection('company').find().toArray((err, companies) => {
      if (err) {
        reject(err)
      } else {
        company = companies.find(function(company) {
          return company.name.toLowerCase().includes(inputName.toLowerCase())
        })
        resolve(company.tickerCode)
        db.close()
      }
    })
  })
}

module.exports = TickerGetter;
