// resolves with company data when passed an object containing a tickerCode

const http = require('http');

function CompanyGetter() {

}

CompanyGetter.prototype.getCompany = function(companyData) {
  return new Promise((resolve, reject) => {
    options = {
      'host': 'mm-recruitment-stock-price-api.herokuapp.com',
      'path': `/company/${companyData.tickerCode}`,
      'port': 80
    };
    var json = ''

    http.get(options, resp => {
      resp.on('data', chunk => {
        json += chunk;
      });
      resp.on('end', () => {
        if(json) {
          try {
            json = JSON.parse(json);
          } catch(err) {
            reject(err);
          }
        }
        json['name'] = companyData.name
        resolve(json);
      });
    }).on("error", err => {
      reject(`Got error: ${err.message}`);
    });
  });
};

module.exports = CompanyGetter;
