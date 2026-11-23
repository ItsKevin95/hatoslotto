require('dotenv').config({ quiet: true });
const fs = require('fs');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Huzas = require('../models/Huzas');
const Huzott = require('../models/Huzott');
const Nyeremeny = require('../models/Nyeremeny');
const User = require('../models/User');

function beolvas(fajl) {
  const sorok = fs.readFileSync(`data/${fajl}`, 'utf8').trim().split(/\r?\n/);
  const fejlec = sorok.shift().split('\t');
  return sorok.map((sor) => {
    const ertekek = sor.split('\t');
    const obj = {};
    fejlec.forEach((mezo, i) => (obj[mezo.trim()] = Number(ertekek[i])));
    return obj;
  });
}

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);

  for (const [Model, fajl] of [[Huzas, 'huzas.txt'], [Huzott, 'huzott.txt'], [Nyeremeny, 'nyeremeny.txt']]) {
    const adatok = beolvas(fajl);
    await Model.deleteMany({});
    await Model.insertMany(adatok);
    console.log(`${fajl}: ${adatok.length} rekord betöltve`);
  }

  const email = (process.env.ADMIN_EMAIL || 'admin@hatoslotto.hu').toLowerCase();
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  await User.deleteOne({ email });
  await User.create({ name: 'Admin', email, password: await bcrypt.hash(password, 10), role: 'admin' });
  console.log(`Admin: ${email} / ${password}`);

  await mongoose.disconnect();
}

main();
