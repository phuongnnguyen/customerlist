const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 4000;
const isProduction = process.env.NODE_ENV === 'production';

// database
mongoose.connect('mongodb+srv://phuongnguyen952501:PAcnxcRmniPN25@songsingerapi-hhtzl.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser:true});
mongoose.connection.once('open', () => console.log('DB connected'))
mongoose.promise = global.Promise;

// config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Request-Method', '*');
  res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PATCH, DELETE, PUT');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// routes
app.use('/', require('./routes/customers'));
app.get('/', (req, res) => res.send('MAIN'))

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  if (!isProduction) {
    app.use((err, req, res) => {
      res.status(err.status || 500);
  
      res.json({
        errors: {
          message: err.message,
          error: err,
        },
      });
    });
  }
  
  app.use((err, req, res) => {
    res.status(err.status || 500);
  
    res.json({
      errors: {
        message: err.message,
        error: {},
      },
    });
  });
app.listen(port, () => console.log('server is running at ' + port));