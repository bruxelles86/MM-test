module.exports = (function() {
    'use strict';
    const router = require('express').Router();
    const bodyParser = require('body-parser')

    const CompanySearcher = require('../lib/CompanySearcher.js')
    var companySearcher = new CompanySearcher()

    router.use(bodyParser.urlencoded({extended: true}))
    router.use(bodyParser.json());

    router.get('/', (req, res) => {
      res.render('index.ejs')
    })

    router.post('/company', (req,res) => {
      var company = req.body.content;
      companySearcher.search(company).then(json => {
        res.render('index.ejs', { data: json })
      }
    ).catch((err) => console.log(err))
    });
    return router;
})();
