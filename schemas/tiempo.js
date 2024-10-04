const mongoose = require('mongoose');

const Tiempo = new mongoose.Schema({
  Valor: { type: Number }
});

module.exports = mongoose.model('Tiempo', Tiempo);