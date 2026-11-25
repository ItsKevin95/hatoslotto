function ensureAuth(req, res, next) {
  if (req.session.user) return next();
  res.redirect('/login');
}

function ensureAdmin(req, res, next) {
  if (req.session.user && req.session.user.role === 'admin') return next();
  res.redirect('/');
}

module.exports = { ensureAuth, ensureAdmin };
