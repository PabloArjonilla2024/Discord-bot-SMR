const mongoose = require('mongoose');

const Pagina_instruccion = new mongoose.Schema({
  Usuario: { type: String },
  Pag: { type: Number }
});

module.exports = mongoose.model('Pagina_instruccion', Pagina_instruccion);