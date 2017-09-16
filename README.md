Acuris Tech Test - Will Gant
=================

Simple news app written with Node.js and Express, to show stories with adjacent smileys representing their 'sentiment' rating, depending on the prevalence of positive and negative words in the article text.

<img src = "https://user-images.githubusercontent.com/20523607/30515002-ae62a25c-9b20-11e7-963d-a21fd8efd926.png">

Installation, Use & Testing
--------

* Simply fork or clone this repo, and run `npm install`
* Run `node server.js` in the main directory and navigate to localhost:3000.
* Enter a company name and hit `Search`
* The app is also hosted on Heroku at https://serene-chamber-12761.herokuapp.com
* Front-end and back-end tests can be run together with `npm test`

Note: search is case-insensitive, and works for partial company names (i.e. 'microsoft' works the same as 'Microsoft Inc')

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

I started out by writing down a list of the different steps that would need to be followed on the back-end following a search by a user for a company. Before long it became clear the first stage would be retrieving a company's ticker from the database, then using that in turn to query a separate API that serves up data for that company as a JSON object. That object would then provide a URI for news stories associated with the company in question, which would need to be queried to get the headlines and article text. At the end of that process, the app would have collected all the information needed to generate a view for the user.

I've had plenty of experience with Node.js, but never in the context of building a full-stack app. Because of this, I decided to start by writing the logic for the process described above.

I began out of sequence, by writing my [SentimentAnalyser](https://github.com/bruxelles86/MM-test/blob/master/lib/SentimentAnalyser.js) prototype first, largely because - boiling down to an analysis of strings - it seemed like it would be the simplest object in the entire project. I used a regular expression to strip text of punctuation, and toLowerCase() to ensure the results wouldn't be affected by capital letters.

Up next, I started work on the [TickerGetter](https://github.com/bruxelles86/MM-test/blob/master/lib/TickerGetter.js) - which ultimately evolved to capture company names as well as their tickers. I had minimal prior experience of using MongoDB, so I spent a while experimenting in the Mongo shell to get the hang of how it works. At this stage, I also made a key decision to use promises in order to chain together asynchronous operations in a neat way. I had already learned how to use these in a [recent personal project](https://github.com/bruxelles86/project-vicentito) as a way of avoiding callback hell, and it seemed they would come in handy serving the same purpose here.

One thing I had never bothered to do with promises before was to catch their errors, so at this point I invested some time in figuring that out, and from then on tried to remember to do proper error handling with the remaining bits of the program.

The next object needed was my [CompanyGetter](https://github.com/bruxelles86/MM-test/blob/master/lib/CompanyGetter.js). It's a pretty simple object which took a ticker string (eventually, an object containing that string as well as the company name), and used Node's http module to get the corresponding JSON data. Its final version then adds the company name to that data, before resolving its promise with the product of that.

After that I made the [NewsGetter](https://github.com/bruxelles86/MM-test/blob/master/lib/NewsGetter.js), which, like the CompanyGetter, makes an HTTP get request. To construct its URI, it uses Node's url module to break the address into its host and path. Once the news is received, it's added on to the object the NewsGetter received as its argument, and its promise resolves.

So far, so familiar.

At this point, I needed to leave my comfort zone and figure out how I would produce a front-end that would make use of all of this. I had never made a full-stack app with Node before (only with Ruby/Rails), and I needed to do some research and experimenting to figure out where to go next. I settled on Express, with Zombie/Mocha/Chai for testing. I wrote a [simple server](https://github.com/bruxelles86/MM-test/blob/master/server.js), and started gradually building a single view - initially just testing for it showing the right title, and then also a form. To get the desired card format, I borrowed some W3 classes that provided these ready-made. In my [view](https://github.com/bruxelles86/MM-test/blob/master/views/index.ejs), I then iterated through the news stories sent through with the rest of the company data. By now - the logic steadily building up in my server - that also included a sentiment rating for each story.

After appropriating some smiley images, it took me a while to figure out how to get these to line up neatly on the right-hand side of the associated story. In the end, W3 came to my rescue again - this time with 12-column 'responsive fluid grids', which allowed me to divide a div into rows with two sections - one for the stories, the other for the images.

By this stage, the app was mostly doing all that it needed to, and all that remained were some style tweaks and a bit of tidying up. I extracted the routes from server.js to a [separate file](https://github.com/bruxelles86/MM-test/blob/master/routes/routes.js), added an [external stylesheet](https://github.com/bruxelles86/MM-test/blob/master/public/css/main.css) to make the view a little prettier, and consolidated my Jasmine and Mocha tests - until now sitting in separate directories - into the same folder. All the business logic went into a 'lib' directory. Importantly, it was also around this time I decided to create a final object, my [CompanySearcher](https://github.com/bruxelles86/MM-test/blob/master/lib/CompanySearcher.js), into which I extracted all the logic that had previously sat in the /company post route.

The final step was to update the /company POST route, so that any errors caught lead to a stack trace appearing in the view along with a message explaining that the search failed. That way, any searches for companies not present in the database or APIs, or whose data is incomplete, result in some useful information being shown to the user, rather than the client waiting for a response that will never come, or the server simply crashing.
