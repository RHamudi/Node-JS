var express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const Sequelize = require("sequelize");

// Config
// Template Engine
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", "./views");
// Conexão com o banco de dados
const sequelize = new Sequelize("teste", "root", "ramonramos9137", {
  host: "localhost",
  dialect: "mysql",
});
// Rotas

app.get("/cad", (req, res) => {
  res.render("formulario");
});

app.listen(8080, () => {
  console.log("Servidor Rodando Na URL http://localhost/8080");
});
