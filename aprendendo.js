const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost/aprendendo", {
    useMongoClient: true,
  })
  .then(() => {
    console.log("MongoDB conectado!");
  })
  .catch((erro) => {
    console.log("Houve um ero ao se conectar ao mongodb" + erro);
  });
