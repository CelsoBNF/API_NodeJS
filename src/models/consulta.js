const Sequelize = require('sequelize');
const mysql = require('../database/mysql');

const Consulta = mysql.define('Consultas', {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  param_request: Sequelize.DataTypes.TEXT(255),
  response: Sequelize.DataTypes.JSON,
  finalized: Sequelize.DataTypes.BOOLEAN,
  created_at: Sequelize.DataTypes.DATE,
  finalized_at: Sequelize.DataTypes.DATE,
  updated_at: Sequelize.DataTypes.DATE,
}, { underscored: true });

module.exports = Consulta;
