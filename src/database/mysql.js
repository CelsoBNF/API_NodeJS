const Sequelize = require('sequelize');
const consts = require('../consts');

const sequelize = new Sequelize(consts.SQL_API_URL);

module.exports = sequelize;
