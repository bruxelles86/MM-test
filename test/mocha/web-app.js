var assert = require("chai").assert,
    Browser = require("zombie"),
    app = require("../../server");

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
      }, 2500);

      it("shows a form to enter company name", done => {
        browser.visit(uri, () => {
          browser.assert.element('[id="company_input"]')
          done();
        });
      }, 2500)

      it("shows the company ticker and price on next screen after a search", done => {
        browser.visit(uri, () => {
          browser.fill('content', 'google');
          browser.pressButton('Search').then(() => {
          browser.assert.text('#ticker_price', 'GOOG 54407')
        })
        .catch((err) => console.log(err))
        .then(done, done);
        });
      }, 2500)

      it("displays a card for company info after a search", done => {
        browser.visit(uri, () => {
          browser.fill('content', 'google');
          browser.pressButton('Search').then(() => {
          browser.assert.element('[id="card"]')
        })
        .catch((err) => console.log(err))
        .then(done, done);
        });
      }, 2500)

      it("displays two stories in company card after a search", done => {
        var story1 = "Google has some concerns to address the balance of this year, and beyond. Over the long run, the consensus analyst recommendation for Google as a 'strong buy' is warranted as the company continues driving a healthy double-digit top line growth. But that doesn't mean there won't be a hurdle, or three, to overcome along the way."
        var story2 = "Investors were encouraged by a healthy gain in the number of people looking at Google's ads, even as the average prices for those marketing messages extended a three-and-half year slump. The market also had been bracing for more disappointing numbers, triggering a 'relief rally' when the results weren't as bad as feared, BGC Partners analyst Colin Gillis said."
        browser.visit(uri, () => {
          browser.fill('content', 'google');
          browser.pressButton('Search').then(() => {
          browser.assert.text('#story1', story1)
          browser.assert.text('#story2', story2)
        })
        .catch((err) => console.log(err))
        .then(done, done);
        });
      }, 2500)

      it("shows the company name in a separate bar at the top of the card", done => {
        browser.visit(uri, () => {
          browser.fill('content', 'google');
          browser.pressButton('Search').then(() => {
          browser.assert.text('#company_name', 'Google Inc')
        })
        .catch((err) => console.log(err))
        .then(done, done);
        });
      }, 2500)

      it("displays smileys corresponding to sentiment of each article", done => {
        browser.visit(uri, () => {
          browser.fill('content', 'google');
          browser.pressButton('Search').then(() => {
          browser.assert.element('[id="neutral_smiley"]')
          browser.assert.element('[id="sad_smiley"]')
        })
        .catch((err) => console.log(err))
        .then(done, done);
        });
      }, 2500)
    })
