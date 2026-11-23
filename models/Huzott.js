const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Huzott',
  new mongoose.Schema({ id: Number, huzasid: Number, szam: Number }, { collection: 'huzott', versionKey: false })
);
