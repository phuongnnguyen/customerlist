const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 4000;

// database
mongoose.connect('mongodb+srv://phuongnguyen952501:PAcnxcRmniPN25@songsingerapi-hhtzl.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser:true});
mongoose.connection.once('open', () => console.log('DB connected'))
mongoose.set('useFindAndModify', false);
mongoose.promise = global.Promise;

// config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Request-Method', '*');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PATCH, DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// routes
app.get('/', (req, res) => res.send('MAIN'))
app.use('/', require('./routes/customers'));

console.clear();
app.listen(port, () => console.log('server is running at ' + port));