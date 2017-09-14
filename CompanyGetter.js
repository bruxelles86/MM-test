const http = require('http');

function CompanyGetter() {

}

CompanyGetter.prototype.getCompany = function(ticker) {
  return new Promise(function(resolve, reject) {
    options = {
      'host': 'mm-recruitment-stock-price-api.herokuapp.com',
      'path': `/company/${ticker}`,
      'port': 80
    };
    var json = ''

    http.get(options, function(resp) {
      resp.on('data', function(chunk) {
        json += chunk;
      });
      resp.on('end', function() {
        resolve(JSON.parse(json));
      });
    }).on("error", function(err) {
        reject(`Got error: ${err.message}`);
    });
  });
};

module.exports = CompanyGetter;
