var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require('express-session');
var indexRouter = require('./routes/index');

var dashboard = require('./routes/dashboard');
var login = require('./routes/login');
var signup = require('./routes/signup');
var usersRouter = require('./routes/users');
var logout = require('./routes/logout');
var payment = require('./routes/payment');
var withdrawl = require('./routes/withdrawl');
var referrals = require('./routes/referrals');
var reinvest = require('./routes/reinvest');
var transactions = require('./routes/transactions');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
}));


app.use('/scripts', express.static(__dirname + '/node_modules/web3/dist/'));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/login', login);
app.use('/dashboard', dashboard);
app.use('/signup', signup);
app.use('/logout',logout);
app.use('/payment',payment);
app.use('/withdrawl',withdrawl);
app.use('/referrals',referrals);
app.use('/reinvest',reinvest);
app.use('/transactions',transactions);

// catch 404 and forward to error handler

app.use(function(req,res,next) {
  if(req.headers["x-forwarded-proto"] == "http") {
      res.redirect("https://aston.run" + req.url, next);
  } else {
      return next();
  } 
});

app.use(function(req, res, next) {
  res.status(404).render('error');
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(PORT, `server started on port PORT`));
