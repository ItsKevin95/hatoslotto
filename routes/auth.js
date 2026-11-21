const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.get('/register', (req, res) => res.render('register', { error: null }));

router.post('/register', async (req, res) => {
  const name = req.body.name.trim();
  const email = req.body.email.trim().toLowerCase();
  const password = req.body.password;
  let error = null;
  if (!name || !email || password.length < 6) error = 'Minden mező kötelező, a jelszó legalább 6 karakter.';
  else if (await User.exists({ email })) error = 'Ezzel az e-mail címmel már regisztráltak.';
  if (error) return res.render('register', { error });
  await User.create({ name, email, password: await bcrypt.hash(password, 10) });
  res.render('login', { error: null, success: 'Sikeres regisztráció, jelentkezzen be!' });
});

router.get('/login', (req, res) => res.render('login', { error: null, success: null }));

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.render('login', { error: info.message, success: null });
    req.login(user, (err) => (err ? next(err) : res.redirect('/')));
  })(req, res, next);
});

router.get('/logout', (req, res, next) => {
  req.logout((err) => (err ? next(err) : res.redirect('/')));
});

module.exports = router;
