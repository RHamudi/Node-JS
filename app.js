// Carregando modulos
const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();
// const mongoose = require("mongoose");

// Configurações

// Rotas

// Outros
const port = 8081;
app.listen(port, () => {
  console.log("Servidor rodando!");
});
