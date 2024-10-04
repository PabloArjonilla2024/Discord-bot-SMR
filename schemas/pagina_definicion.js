const mongoose = require('mongoose');

const Pagina_definicion = new mongoose.Schema({
  Usuario: { type: String },
  Pag: { type: Number }
});

module.exports = mongoose.model('Pagina_definicion', Pagina_definicion);