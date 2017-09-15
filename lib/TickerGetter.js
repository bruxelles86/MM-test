const MongoClient = require('mongodb').MongoClient

function TickerGetter() {
  this.uri = 'mongodb://mm_recruitment_user_readonly:rebelMutualWhistle@ds037551.mongolab.com:37551/mm-recruitment'
}

TickerGetter.prototype.getTicker = function(inputName) {
  var uri = this.uri
  _this = this

  return new Promise((resolve, reject) => {
    _this._dbConnect(uri)
    .then(db => _this._extractTicker(db, inputName))
    .catch((err) => reject(err))
    .then(company => {
      resolve(company)
    })
    .catch((err) => reject(err))
  })
}

TickerGetter.prototype._dbConnect = function(uri) {
  return new Promise((resolve, reject) => {
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
  return new Promise((resolve, reject) => {
    db.collection('company').find().toArray((err, companies) => {
      if (err) {
        reject(err)
      } else {
        company = companies.find(company => {
          return company.name.toLowerCase().includes(inputName.toLowerCase())
        })
        resolve(company)
        db.close()
      }
    })
  })
}

module.exports = TickerGetter;
