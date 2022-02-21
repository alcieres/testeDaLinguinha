const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const dbConfig = require('./config/db');
const expressSession = require('express-session');
const passport = require('passport');
const bodyParser = require("body-parser");
const flash = require('connect-flash');

const loginRouter = require('./routes/login');
const homeRouter = require('./routes/home');
const assessmentRouter = require('./routes/assessment');
const assessmentExtractRouter = require('./routes/assessmentExtract');
const findPatientRouter = require('./routes/findPatient');
const editPatientRouter = require('./routes/editPatient');
const deletePatientAssessmentRouter = require('./routes/deletePatientAssessment');
const reportsRouter = require('./routes/reports');
const usersRouter = require('./routes/users');
const userRouter = require('./routes/user');
const logoutRouter = require('./routes/logout');
const cityRouter = require('./routes/city');
const testRouter = require('./test/test');

const methodOverride = require("method-override");

const favicon = require('serve-favicon');

const app = express();

//Configuração do Express Session
app.use(expressSession({
  secret: '#projetoTccTesteDaLinguinha2019*',
  resave: false,
  saveUninitialized: false
}));

//Configuração do Passport
require('./config/passport')(passport);

// Configuração do EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Ícone da Barra da guia do navegador
app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Configuração do Passport
app.use(passport.initialize());
app.use(passport.session());

//Conexão do mongoose
mongoose.connect(dbConfig.url, function(err) {
    if (err) {
        console.log('Erro de conexão com o banco de dados!');
    }
});

//mongoose.set('useCreateIndex', true);

//Configuração do Body Parser
app.use(bodyParser.urlencoded({extended: true}));

//Flash messages
app.use(flash());

// Method Override
app.use(methodOverride("_method"));

app.use('/', loginRouter);
app.use('/home', homeRouter);
app.use('/assessment', assessmentRouter);
app.use('/assessmentExtract', assessmentExtractRouter); 
app.use('/findPatient', findPatientRouter);
app.use('/editPatient', editPatientRouter);
app.use('/delete', deletePatientAssessmentRouter);
app.use('/reports', reportsRouter);
app.use('/users', usersRouter);
app.use('/user', userRouter);
app.use('/logout', logoutRouter);
app.use('/city', cityRouter);
app.use('/test', testRouter);

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
/* 
const User = require("./models/User");
User.register(new User({
        cpf: "83266238060",
        name: "Clark",
        lastName: "Kent",
        occupation: "Super Fonoaudiólogo",
        email: "kal-el@gmail.com",
        registry: "11223344",
        date: new Date,
        admin: true
    }),
      "oi1234", function(err) {
      if (err) {
        console.log('error while user register!', err);
        return;
      }
      console.log('user registered!');
    });

User.register(new User({
        cpf: "30091046009",
        name: "Tony",
        lastName: "Stark",
        occupation: "Fonoaudiólogo de Ferro",
        email: "markvii@gmail.com",
        registry: "33665588",
        date: new Date,
        admin: false
    }),
    "oi1234", function(err) {
        if (err) {
            console.log('error while user register!', err);
            return;
        }
        console.log('user registered!');
    });
User.register(new User({
        cpf: "01617131067",
        name: "Bruce",
        lastName: "Banner",
        occupation: "Fonoaudiólogo Furioso",
        email: "hulk@gmail.com",
        registry: "99665533",
        date: new Date,
        admin: false
    }),
    "oi1234", function(err) {
        if (err) {
            console.log('error while user register!', err);
            return;
        }
        console.log('user registered!');
    });
 */
module.exports = app;
