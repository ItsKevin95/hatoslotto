const router = require('express').Router();
const Huzott = require('../models/Huzott');
const { ensureAuth } = require('../middleware/auth');

router.get('/', ensureAuth, async (req, res) => {
  const huzottak = await Huzott.find().lean();
  const gyakorisag = Array(45).fill(0);
  huzottak.forEach((h) => gyakorisag[h.szam - 1]++);
  res.render('diagram', { gyakorisag });
});

module.exports = router;
