"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;

var prodId = 0;
var insId = 0;
var productos = [
  { id: 1, nombre: "monitor", cant: 12 },
  { id: 2, nombre: "CPU", cant: 3 },
  { id: 3, nombre: "teclado", cant: 20 },
];

var insumos = [
  { id: 1, nombre: "tinta 952", cant: 6 },
  { id: 2, nombre: "papel A4", cant: 5 },
];

function getProd(prodId) {
  return productos.find(function (prod) {
    return prod.id == prodId;
  });
}

function getIns(insId) {
  return insumos.find(function (ins) {
    return ins.id == insId;
  });
}

function getProdByName(prodName) {
  return productos.find(function (prod) {
    return prod.nombre == prodName;
  });
}

function getInsByName(insNombre) {
  return insumos.find(function (ins) {
    return ins.nombre == insNombre;
  });
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//queryParam, ex. http://localhost:3000/api/producto?id=1
app.get("/api/producto", (req, res) => {
  if (req.query.id) {
    var result = getProd(req.query.id);
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(200).send({ mensaje: "Producto no encontrado" });
    }
  } else if (req.query.nombre) {
    var result = getProdByName(req.query.nombre);
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(200).send({ mensaje: "Producto no encontrado" });
    }
  } else {
    res.status(200).send({ productos: productos });
  }
});

//pathParam en productos por ID, ej. http://localhost:3000/api/producto/1
app.get("/api/producto/:id", (req, res) => {
  var result = getProd(req.params.id);
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(200).send({ mensaje: "Producto no encontrado" });
  }
});

app.post("/api/producto", (req, res) => {
  console.log(req.body);
  if (req.body) {
    productos.push(req.body);
  }
  res.status(201).send({ mesaje: "El producto se ha agregado" });
});

app.put("/api/producto/:productoId", (req, res) => {});

app.delete("/api/producto/:productoId", (req, res) => {});

//queryParam, ex. http://localhost:3000/api/insumo?id=1
app.get("/api/insumo", (req, res) => {
  if (req.query.id) {
    var result = getIns(req.query.id);
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(200).send({ mensaje: "Insumo no encontrado" });
    }
  } else if (req.query.nombre) {
    var result = getInsByName(req.query.nombre);
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(200).send({ mensaje: "Insumo no encontrado" });
    }
  } else {
    res.status(200).send({ insumos: insumos });
  }
});

//pathParam en insumos por Nombre, ej. http://localhost:3000/api/insumo/tinta 952
app.get("/api/insumo/:nombre", (req, res) => {
  var result = getIns(req.params.nombre);
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(200).send({ mensaje: "Insumo no encontrado" });
  }
});

//pathParam
//  http://localhost:3000/api/insumo/1
app.get("/api/insumo/:id", (req, res) => {
  var result = getIns(req.params.id);
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(200).send({ mensaje: "Insumo no encontrado" });
  }
});

app.post("/api/insumo", (req, res) => {
  console.log(req.body);
  if (req.body) {
    insumos.push(req.body);
  }
  res.status(201).send({ mensaje: "El insumo se ha agregado" });
});

app.put("/api/insumo", (req, res) => {});

app.delete("/api/insumo", (req, res) => {});

app.listen(port, () => {
  console.log(`API REST corriendo en http://localhost:${port}`);
});
