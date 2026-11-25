require('dotenv').config({ quiet: true });
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const { MongoStore } = require('connect-mongo');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI, collectionName: 'sessions' }),
  })
);
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  res.locals.isAdmin = req.session.user && req.session.user.role === 'admin';
  res.locals.message = req.session.message || '';
  req.session.message = '';
  next();
});

app.use('/', require('./routes/index'));
app.use('/', require('./routes/auth'));
app.use('/adatbazis', require('./routes/adatbazis'));
app.use('/kapcsolat', require('./routes/kapcsolat'));
app.use('/uzenetek', require('./routes/uzenetek'));
app.use('/diagram', require('./routes/diagram'));
app.use('/crud', require('./routes/crud'));

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI).then(() => {
  app.listen(PORT, () => console.log(`Szerver fut: http://localhost:${PORT}`));
});
