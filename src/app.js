' use strict ';

const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const agenda = require('./agenda');
const consultaController = require('./controllers/consulta');
const resultadoController = require('./controllers/resultado');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/resultados', resultadoController);
app.use('/consultas', consultaController);
agenda.start().then(() => console.log('Its on!! Great Job'));

module.exports = app;
