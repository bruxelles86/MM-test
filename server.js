const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const routes = require('./routes/routes');

var port = process.env.PORT || 3000;

app.use('/', routes);
app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'))

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

module.exports = app;
