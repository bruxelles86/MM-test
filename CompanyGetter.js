const http = require('http');

function CompanyGetter() {

}

CompanyGetter.prototype.getCompany = function(ticker) {
  return new Promise((resolve, reject) => {
    options = {
      'host': 'mm-recruitment-stock-price-api.herokuapp.com',
      'path': `/company/${ticker}`,
      'port': 80
    };
    var json = ''

    http.get(options, resp => {
      resp.on('data', chunk => {
        json += chunk;
      });
      resp.on('end', () => {
        json = JSON.parse(json)
        json["ticker"] = ticker
        resolve(json);
      });
    }).on("error", err => {
        reject(`Got error: ${err.message}`);
    });
  });
};

module.exports = CompanyGetter;
