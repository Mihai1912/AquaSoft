const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mydatabase', 'user', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;