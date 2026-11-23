const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Nyeremeny',
  new mongoose.Schema(
    { id: Number, huzasid: Number, talalat: Number, darab: Number, ertek: Number },
    { collection: 'nyeremeny', versionKey: false }
  )
);
