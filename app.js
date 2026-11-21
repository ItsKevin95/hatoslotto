require('dotenv').config({ quiet: true });
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('./models/User');

passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return done(null, false, { message: 'Hibás e-mail cím vagy jelszó.' });
    }
    done(null, user);
  })
);
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => done(null, await User.findById(id)));

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: process.env.SESSION_SECRET || 'titok', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.isAdmin = req.user && req.user.role === 'admin';
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
