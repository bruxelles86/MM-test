var assert = require("chai").assert,
    Browser = require("zombie"),
    app = require("../server");

    describe("Acuris tech test app", function() {
      var server, browser, uri;

      uri = "http://localhost:3000/"

      beforeEach(function() {
      browser = new Browser();
      });

      it("should show the right title", function(done) {
        browser.visit(uri, function() {
          browser.assert.text('title', 'Will Gant tech test')
          done();
        });
      });
    })
