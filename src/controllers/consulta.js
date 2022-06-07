const express = require('express');
const agenda = require('../agenda');

const router = express.Router();
const Consulta = require('../models/consulta');

router.get('/', async (req, res) => {
  const consultas = await Consulta.findAll({
    raw: true,
  });
  res.status(200).send(consultas);
});

router.get('/:id', async (req, res) => {
  const consulta = await Consulta.findByPk(req.params.id);
  res.status(200).send(consulta);
});

router.post('/', async (req, res) => {
  const { name } = req.body;
  if (name === undefined) {
    res.status(400).send({ error: 'Nome indefinido' });
    return;
  }
  const consulta = await Consulta.create({
    param_request: name,
    created_at: new Date(),
  });
  agenda.now('crawler', consulta.get({ plain: true }));
  res.send(consulta);
});

module.exports = router;
