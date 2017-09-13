const MongoClient = require('mongodb').MongoClient

function TickerGetter() {
  this.uri = 'mongodb://mm_recruitment_user_readonly:rebelMutualWhistle@ds037551.mongolab.com:37551/mm-recruitment'
}

TickerGetter.prototype.getTicker = function(companyName) {
  var uri = this.uri
  return new Promise(function(resolve, reject) {
    MongoClient.connect(uri, (err, db) => {
      if (err) {
        reject(err);
      } else {
        resolve(db);
      }
    })
  }).then(function(db) {
    return new Promise(function(resolve, reject) {
      db.collection('company').find().toArray(function(err, companies) {
        company = companies.find(function(company) {
          return company.name.toLowerCase().includes(companyName.toLowerCase())
        })
        resolve(company.tickerCode)
      })
    })
  })
  .catch((err) => reject(err))
}


module.exports = TickerGetter;
