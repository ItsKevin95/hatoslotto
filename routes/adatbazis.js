const router = require('express').Router();
const Huzas = require('../models/Huzas');
const Huzott = require('../models/Huzott');
const Nyeremeny = require('../models/Nyeremeny');

router.get('/', async (req, res) => {
  const huzasok = await Huzas.find().sort({ ev: -1, het: -1 }).lean();
  const szamok = await Huzott.find().lean();
  const nyeremenyek = await Nyeremeny.find().lean();

  const sorok = huzasok.map((h) => {
    const nyer = {};
    nyeremenyek.filter((n) => n.huzasid === h.id).forEach((n) => (nyer[n.talalat] = n));
    const huzott = szamok.filter((s) => s.huzasid === h.id).map((s) => s.szam).sort((a, b) => a - b);
    return { ...h, szamok: huzott, nyer };
  });

  res.render('adatbazis', { sorok });
});

module.exports = router;
