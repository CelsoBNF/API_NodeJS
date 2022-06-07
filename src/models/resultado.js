const mongoose = require('../database/mongodb');
const headerSchema = require('../schemas/header');
const repositoriesSchema = require('../schemas/repositories');
const pinnedSchema = require('../schemas/pinned');

const ResultadoSchema = new mongoose.Schema({
  consultaId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  header: headerSchema,
  pinned: [pinnedSchema],
  repositories: [repositoriesSchema],
});

const Resultado = mongoose.model('Resultado', ResultadoSchema);

module.exports = Resultado;
