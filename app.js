var express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
const Post = require("./models/Post");

// Config
// Template Engine
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", "./views");
// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Conexão com o banco de dados

// Rotas

app.get("/", (req, res) => {
  Post.findAll().then((posts) => {
    res.render("home", {
      Posts: posts,
    });
  });
});

app.get("/cad", (req, res) => {
  res.render("formulario");
});

app.post("/add", (req, res) => {
  Post.create({
    titulo: req.body.titulo,
    conteudo: req.body.conteudo,
  })
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => {
      res.send("Houve um erro" + error);
    });
});

app.get("/deletar/:id", (req, res) => {
  Post.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.send("Postagem deletada com sucesso");
    })
    .catch((erro) => {
      res.send("Esta postagem não existe!s" + erro);
    });
});

app.listen(8080, () => {
  console.log("Servidor Rodando Na URL http://localhost/8080");
});
