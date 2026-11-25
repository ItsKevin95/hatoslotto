const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.registerGet = (req, res) => res.render('register');

exports.registerPost = async (req, res) => {
  const username = req.body.username.trim();
  const password = req.body.password;
  if (!username || password.length < 6) {
    req.session.message = 'A felhasználónév kötelező, a jelszó legalább 6 karakter.';
    return res.redirect('/register');
  }
  if (await User.findOne({ username })) {
    req.session.message = 'Ez a felhasználónév már foglalt.';
    return res.redirect('/register');
  }
  await User.create({ username, password: await bcrypt.hash(password, 10), role: 'user' });
  req.session.message = 'Sikeres regisztráció, jelentkezzen be!';
  res.redirect('/login');
};

exports.loginGet = (req, res) => res.render('login');

exports.loginPost = async (req, res) => {
  const user = await User.findOne({ username: req.body.username.trim() });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    req.session.message = 'Hibás felhasználónév vagy jelszó.';
    return res.redirect('/login');
  }
  req.session.user = { id: user._id, username: user.username, role: user.role };
  res.redirect('/');
};

exports.logout = (req, res) => {
  req.session.destroy(() => res.redirect('/'));
};
