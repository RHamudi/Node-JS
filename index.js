var express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/html/index.html");
  console.log(__dirname);
});

app.get("/sobre", (req, res) => {
  res.send("Minha Pagina Sobre");
});

app.get("/blog", (req, res) => {
  res.send("Bem vindo ao meu blog");
});

app.get("/ola/:nome/:cargo", (req, res) => {
  res.send("Ola" + req.params.nome);
});

app.listen(8081, () => {
  console.log("Servidor Rodando Na URL http://localhost/8081");
});
