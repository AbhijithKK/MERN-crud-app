var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var userRouter = require('./routes/user');
var adminRouter = require('./routes/admin');
const db = require('./model/serverConnector')
const cors = require('cors')

var app = express();

app.use(cors({ origin: ["http://localhost:3000",], credentials: true }))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

db()
app.use('/', userRouter);
app.use('/admin', adminRouter);


module.exports = app;
