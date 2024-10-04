const express = require('express');
const app = express();

app.use(express.static("./extras/pagina"));

module.exports = () => {
  console.log(`Página web iniciada con éxito.`);
  app.listen(3000);
  return true;
};
