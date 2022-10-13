const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Categoria");
const Categoria = mongoose.model("categorias");

router.get("/", (req, res) => {
  res.render("admin/index");
});

router.get("/posts", (req, res) => {
  res.send("Página de posts");
});

router.get("/categorias", (req, res) => {
  Categoria.find()
    .lean()
    .sort({ date: "desc" })
    .then((categ) => {
      res.render("admin/categorias", { categorias: categ });
    })
    .catch((err) => {
      req.flash("error_msg", "houve um erro ao listar as categorias");
      res.redirect("/admin");
    });
});

router.get("/categorias/add", (req, res) => {
  res.render("admin/addcategoria");
});

router.post("/categorias/nova", (req, res) => {
  var erros = [];

  if (
    (!req.body.nome && req.body.nome == undefined) ||
    req.body.nome == null ||
    req.body.nome.length <= 0
  ) {
    erros.push({ texto: "Nome inválido" });
  }
  if (
    (!req.body.slug && req.body.slug == undefined) ||
    req.body.slug == null ||
    req.body.slug.length <= 0
  ) {
    erros.push({ texto: "Slug inválido" });
  }

  if (erros.length > 0) {
    res.render("admin/addcategoria", { erros: erros });
  } else {
    const novaCategoria = {
      nome: req.body.nome,
      slug: req.body.slug,
    };

    new Categoria(novaCategoria)
      .save()
      .then(() => {
        req.flash("success_msg", "Categoria criada com sucesso!");
        res.redirect("/admin/categorias");
      })
      .catch((err) => {
        req.flash(
          "error_msg",
          "Houve um erro ao salvar a categoria, tente novamente"
        );
        res.redirect("/admin");
      });
  }
});

router.get("/categorias/edit/:id", (req, res) => {
  Categoria.findOne({ _id: req.params.id })
    .lean()
    .then((categoria) => {
      res.render("admin/editcategoria", {
        categoria: categoria,
      });
    })
    .catch((err) => {
      req.flash("error_msg", "essa categoria não existe");
      res.redirect("/admin/categorias");
    });
});

router.post("/categorias/edit", (req, res) => {
  Categoria.findOne({ _id: req.body.id })
    .then((categ) => {
      categ.nome = req.body.nome;
      categ.slug = req.body.slug;
      categ
        .save()
        .then(() => {
          req.flash("success_msg", "Categoria editada com sucesso!");
          res.redirect("/admin/categorias");
        })
        .catch((err) => {
          req.flash(
            "error_msg",
            "Houve um erro ao salvar a edição da categoria"
          );
          res.redirect("/admin/categorias");
        });
    })
    .catch(() => {
      req.flash("error_msg", "houve um erro ao editar a categoria");
      res.redirect("/admin/categorias");
    });
});

router.post("/categorias/deletar", (req, res) => {
  Categoria.deleteOne({ _id: req.body.id })
    .then(() => {
      req.flash("success_msg", "Categoria deletada com sucesso");
      res.redirect("/admin/categorias");
    })
    .catch((err) => {
      req.flash(
        "error_msg",
        "Houve um erro ao tentar deletar a categoria " + err
      );
      res.redirect("/admin/categorias");
    });
});

router.get("/postagens", (req, res) => {
  res.render("admin/postagens");
});

router.get("/postagens/add", (req, res) => {
  Categoria.find()
    .lean()
    .then((categorias) => {
      res.render("admin/addpostagem", { categorias: categorias });
    })
    .catch((err) => {
      req.flash("error_msg", "Houve um erro para carregar os usuarios");
      res.redirect("/admin/postagens");
    });
});

router.get("/testando", (req, res) => {
  Categoria.find().then((respost) => {
    res.send(respost);
  });
});

module.exports = router;
