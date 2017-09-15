const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const routes = require('./routes/routes');

app.use('/', routes);
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.listen(3000, () => {
  console.log('listening on port 3000')
})

module.exports = app;
