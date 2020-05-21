const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin');

//middleware
const {checkLoggedIn} = require('./middlewares/checklogin');

const app = express();

const db = require("./models");
db.sequelize.sync();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: '123abcd',
  resave: true,
  saveUninitialized: true,
  rolling: true,
  cookie: {maxAge: 60*60*1000}
}));

app.use( (req, res, next) => {
  res.locals.signUpSuccessMessage = req.session.signUpSuccessMessage;
  res.locals.signUpErrorMessage = req.session.signUpErrorMessage;
  res.locals.loginSuccessMessage = req.session.loginSuccessMessage;
  res.locals.loginErrorMessage = req.session.loginErrorMessage;
  res.locals.profileChangeMessage = req.session.profileChangeMessage;
  res.locals.passwordChangeMessage = req.session.passwordChangeMessage;
  res.locals.user = req.session.user;
  next();
});

app.use('/', indexRouter);
app.use('/user', checkLoggedIn, usersRouter);
app.use('/admin', checkLoggedIn, adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
