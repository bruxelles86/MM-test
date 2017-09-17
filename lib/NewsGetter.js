// passed a company data object, to which it inserts news data before resolving

const url = require('url');
const http = require('http');

function NewsGetter() {

}

NewsGetter.prototype.getNews = function(company) {
  return new Promise(function(resolve, reject) {
    options = {
      'host': url.parse(company.storyFeedUrl).host,
      'path': url.parse(company.storyFeedUrl).pathname,
      'port': 80
    };
    var json = ''

    http.get(options, function(resp) {
      resp.on('data', function(chunk) {
        json += chunk;
      });
      resp.on('end', function() {
        company["news"] = JSON.parse(json)
        resolve(company);
      });
    }).on("error", function(err) {
        reject(`Got error: ${err.message}`);
    });
  });
}

module.exports = NewsGetter;
