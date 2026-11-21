const router = require('express').Router();
const Message = require('../models/Message');

router.get('/', (req, res) => res.render('kapcsolat', { errors: [], old: {}, success: false }));

router.post('/', async (req, res) => {
  const old = {
    name: req.body.name.trim(),
    email: req.body.email.trim(),
    subject: req.body.subject.trim(),
    message: req.body.message.trim(),
  };
  const errors = [];
  if (old.name.length < 2) errors.push('A név legalább 2 karakter legyen.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(old.email)) errors.push('Érvényes e-mail címet adjon meg.');
  if (old.subject.length < 3) errors.push('A tárgy legalább 3 karakter legyen.');
  if (old.message.length < 10) errors.push('Az üzenet legalább 10 karakter legyen.');

  if (errors.length) return res.render('kapcsolat', { errors, old, success: false });
  await Message.create(old);
  res.render('kapcsolat', { errors: [], old: {}, success: true });
});

module.exports = router;
