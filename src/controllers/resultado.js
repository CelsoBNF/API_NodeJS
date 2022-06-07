const express = require('express');

const router = express.Router();
const resultado = require('../models/resultado');

router.get('/', async (req, res) => {
  const resultados = await resultado.find();
  res.status(200).send(resultados);
});

router.get('/:id', async (req, res) => {
  const resultadoRow = await resultado.findOne({
    consultaId: req.params.id,
  });
  res.status(200).send(resultadoRow);
});

module.exports = router;
