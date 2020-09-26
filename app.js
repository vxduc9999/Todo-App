const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: true }));

const todos = require('./router/todoCall');

app.use(todos);

app.listen(PORT, function () {
  console.log('Express listening on port' + PORT + '!');
});