require('dotenv').config();
require('./config/dbConfig/mongo-db-instance');

var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    swagger_ui = require('swagger-ui-express'),
    cors = require('cors'),
    { success } = require("consola");

var app = express(),routes = require('./express/routers');;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.disable('x-powered-by');
app.use(cors());

var swagger_doc = require('./lib/swagger-ui/api_docs');


app.use('/', routes);
app.use('/sakshi/api_docs', swagger_ui.serve, swagger_ui.setup(swagger_doc));
app.get('/', (req, res) => {
  res.redirect('/sakshi/api_docs');
});

// Start server
var server = app.listen(process.env.PORT, function () {
  success({ message: `Express server listening on ${process.env.PORT}, in mode ${app.get('env')}`, badge: true })
  // connectdb
});