const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const options = require('./swagger/definition')
require('dotenv').config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const activitiesRouter = require('./routes/activities');
const authRouter = require('./routes/auth');
const categoriesRouter = require('./routes/categories');
const rolesRouter = require('./routes/roles');
const organizationsRouter = require('./routes/organizations');
const newsRouter = require('./routes/news');
const testimonialsRouter = require('./routes/testimonials');

const membersRouter = require('./routes/members');
const commentsRouter = require('./routes/comments');
const contactsRouter = require('./routes/contacts');
const slidesRouter = require('./routes/slides');
const imagesRouter = require('./routes/image');

const specs = swaggerJsDoc(options);

const app = express();
app.use(cors());

// swagger documentation UI
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(specs));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/activities', activitiesRouter);
app.use('/auth', authRouter);
app.use('/categories', categoriesRouter);
app.use('/roles', rolesRouter);
app.use('/organizations', organizationsRouter);
app.use('/news', newsRouter);
app.use('/testimonials', testimonialsRouter);
app.use('/slides', slidesRouter);
app.use('/contacts', contactsRouter);
app.use('/images', imagesRouter);
app.use('/members', membersRouter);
app.use('/comments', commentsRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

/*
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/

app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const body = {
        code: "error",
        message: err.message,
        data: err.data    
      }
  res.status(status).json(body);
  });


module.exports = app;
