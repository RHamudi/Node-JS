// Carregando modulos
const express = require("express");
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();
const admin = require("./routes/admin");
const path = require("path");
const { default: mongoose } = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
// const mongoose = require("mongoose");

// Configurações
//sessão
app.use(
  session({
    secret: "cursonode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
// Middleware
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("succses_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});
// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Handlebars
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", "./views");
// mongoose
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost/blogapp")
  .then(() => {
    console.log("conectado ao mongo");
  })
  .catch((err) => {
    console.log("Erro ao conectar-se ao mongo " + err);
  });
//public
app.use(express.static(path.join(__dirname, "public")));

// Rotas
app.get("/", (req, res) => {
  res.send("pagina principal");
});

app.use("/admin", admin);
// Outros

// Porta da api
const port = 8081;
app.listen(port, () => {
  console.log("Servidor rodando!");
});
