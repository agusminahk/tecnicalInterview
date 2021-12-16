const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'moviesdb.sqlite',
    logging: false,
});

module.exports = sequelize;
