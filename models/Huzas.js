const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Huzas',
  new mongoose.Schema({ id: Number, ev: Number, het: Number }, { collection: 'huzas', versionKey: false })
);
