const mongoose = require("mongoose");

module.exports = async () => {
  await mongoose.connect(process.env.MONGO);

  console.log(`La Base de Datos se ha iniciado con éxito.`);
};