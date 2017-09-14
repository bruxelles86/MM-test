const url = require('url');
const http = require('http');

function NewsGetter() {

}

NewsGetter.prototype.getNews = function(uri) {
  return new Promise(function(resolve, reject) {
    options = {
      'host': url.parse(uri).host,
      'path': url.parse(uri).pathname,
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
}

module.exports = NewsGetter;
