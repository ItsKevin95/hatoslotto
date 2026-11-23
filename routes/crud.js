const router = require('express').Router();
const Huzas = require('../models/Huzas');
const Huzott = require('../models/Huzott');
const Nyeremeny = require('../models/Nyeremeny');
const { ensureAdmin } = require('../middleware/auth');

router.use(ensureAdmin);

function hiba(ev, het) {
  if (!(ev >= 1988 && ev <= 2100)) return 'Az év 1988 és 2100 között legyen.';
  if (!(het >= 1 && het <= 53)) return 'A hét 1 és 53 között legyen.';
  return null;
}

router.get('/', async (req, res) => {
  const huzasok = await Huzas.find().sort({ id: -1 }).lean();
  res.render('crud/list', { huzasok });
});

router.get('/new', (req, res) => {
  res.render('crud/form', { item: {}, action: '/crud/new', error: null });
});

router.post('/new', async (req, res) => {
  const ev = Number(req.body.ev);
  const het = Number(req.body.het);
  const error = hiba(ev, het);
  if (error) return res.render('crud/form', { item: { ev, het }, action: '/crud/new', error });
  const utolso = await Huzas.findOne().sort({ id: -1 });
  await Huzas.create({ id: utolso ? utolso.id + 1 : 1, ev, het });
  res.redirect('/crud');
});

router.get('/:id/edit', async (req, res) => {
  const item = await Huzas.findOne({ id: req.params.id }).lean();
  res.render('crud/form', { item, action: `/crud/${item.id}/edit`, error: null });
});

router.post('/:id/edit', async (req, res) => {
  const id = Number(req.params.id);
  const ev = Number(req.body.ev);
  const het = Number(req.body.het);
  const error = hiba(ev, het);
  if (error) return res.render('crud/form', { item: { id, ev, het }, action: `/crud/${id}/edit`, error });
  await Huzas.updateOne({ id }, { ev, het });
  res.redirect('/crud');
});

router.post('/:id/delete', async (req, res) => {
  const id = Number(req.params.id);
  await Huzas.deleteOne({ id });
  await Huzott.deleteMany({ huzasid: id });
  await Nyeremeny.deleteMany({ huzasid: id });
  res.redirect('/crud');
});

module.exports = router;
