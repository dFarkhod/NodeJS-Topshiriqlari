require('express-async-errors');
const express = require('express');
const categoriesRoute = require('./routes/categories');
const customersRoute = require('./routes/customers');
const coursesRoute = require('./routes/courses');
const entrollmentsRoute = require('./routes/enrollments');
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const errorMiddleware = require('./middleware/error');
const app = express();
const mongoose = require('mongoose');
const config = require('config');
const winston = require('winston');

winston.add(new winston.transports.File({ filename: 'virtualdars-logs.log' }));
if (!config.get('jwtPrivateKey')) {
  console.error('JIDDIY XATO: virtualdars_jwtPrivateKey muhit o\'zgaruvchisi aniqlanmagan.');
  process.exit(1);
}

mongoose.connect('mongodb://localhost/virtualdars', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDBga ulanish hosil qilindi...');
  })
  .catch((err) => {
    console.error('MongoDBga ulanish vaqtida xato ro\'y berdi...', err);
  });
mongoose.set('useFindAndModify', false);
app.use(express.json());

app.use('/api/categories', categoriesRoute);
app.use('/api/customers', customersRoute);
app.use('/api/courses', coursesRoute);
app.use('/api/enrollments', entrollmentsRoute);
app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute);
app.use(errorMiddleware);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`${port}chi portni eshitishni boshladim...`);
});