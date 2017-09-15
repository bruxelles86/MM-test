Acuris Tech Test - Will Gant
=================

Simple news app written with Node.js and Express.

<img src = "https://user-images.githubusercontent.com/20523607/30482304-bb9d0290-9a22-11e7-94e9-c235683ab258.png">

Installation & Testing
--------

* Simply fork or clone this repo, and run `npm install`
* Run `node server.js` in the main directory and navigate to localhost:3000.
* Enter a company name and hit `Search`
* Front-end and back-end tests can be run together with `npm test`

Technologies & Dependencies
-------------

* Node.js
* MongoDB
* Express
* Body-parser
* EJS
* Jasmine
* Mocha
* Chai
* Zombie

Approach
----------

I started out by writing down a list of the different steps that would need to be followed on the back-end following a search by a user for a company. Before long it became clear the first stage would be retrieving a company's ticker from the database, then using that in turn to query a separate API that serves up data for that company as a JSON object. That object would then provide a URI for news stories associated with the company in question. At the end of that process, the app would have collected all the information needed to generate a view for the user.

I've had plenty of experience with Node.js, but never in the context of building a full-stack app. Because of this, I decided to start by writing the logic for the process described above.

I began out of sequence, by writing my [SentimentAnalyser](https://github.com/bruxelles86/MM-test/blob/master/lib/SentimentAnalyser.js) prototype first, largely because - boiling down to an analysis of strings - it seemed like it would be the simplest object in the entire project. I used a regular expression to strip text of punctuation, and toLowerCase() to ensure the results wouldn't be affected by capital letters.

Up next, I started work on the [TickerGetter](https://github.com/bruxelles86/MM-test/blob/master/lib/TickerGetter.js) - which ultimately evolved to capture company names as well as their tickers. I had minimal prior experience of using MongoDB, so I spent a while experimenting in the Mongo shell to get the hang of how it works. At this stage, I also made a key decision to use promises in order to chain together asynchronous operations in a neat way. I had already learned how to use these in a [recent personal project](https://github.com/bruxelles86/project-vicentito) as a way of avoiding callback hell, and it seemed they would come in handy serving the same purpose here.
