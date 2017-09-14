var assert = require("chai").assert,
    Browser = require("zombie"),
    app = require("../server");

    describe("Acuris tech test app", () => {
      var server, browser, uri;

      uri = "http://localhost:3000/"

      beforeEach(() => {
      browser = new Browser();
      });

      it("shows the right title", done => {
        browser.visit(uri, () => {
          browser.assert.text('title', 'Will Gant tech test')
          done();
        });
      });

      it("shows a form to enter company name", done => {
        browser.visit(uri, () => {
          browser.assert.element('[id="company_input"]')
          done();
        });
      })

      it("shows the company name on next screen after a search", done => {
        browser.visit(uri, () => {
          browser.fill('content', 'Google Inc');
          browser.pressButton('Search').then(() => {
          browser.assert.text('#ticker_price', 'GOOG 54407')
        }).then(done, done);
        });
      })
    })
