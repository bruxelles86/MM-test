const express = require('express');
const app = express();

app.set('view engine', 'ejs')

app.listen(3000, () => {
  console.log('listening on port 3000')
})

app.get('/', (req, res) => {
  res.render('index.ejs')
})

app.post('/company', (req,res) => {
  res.send('<p id=ticker_price>GOOG 54407</p>')
});

module.exports = app;
