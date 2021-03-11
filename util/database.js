const Sequelize = require('sequelize');

const sequelize = new Sequelize('angular_app', 'root', 'Root123!', { 
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;