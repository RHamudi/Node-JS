const mongoose = require("mongoose");

// conectando com o mongodb
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost/aprendendo", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("MongoDB conectado!");
  })
  .catch((erro) => {
    console.log("Houve um ero ao se conectar ao mongodb" + erro);
  });
// Model usuarios

// Definindo o model
const UserSchema = mongoose.Schema({
  nome: {
    type: String,
    require: true,
  },
  sobrenome: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  idade: {
    type: Number,
    require: true,
  },
  pais: {
    type: String,
  },
});

// Informando a collection
mongoose.model("user", UserSchema);

// Inserindo dados na collection

const NewUser = mongoose.model("user");

new NewUser({
  nome: "Ramon",
  sobrenome: "Ramons",
  email: "example@example.com",
  idade: 19,
  pais: "Brasil",
})
  .save()
  .then(() => {
    console.log("user created successfully");
  })
  .catch((erro) => {
    console.log("error creating user " + erro);
  });
