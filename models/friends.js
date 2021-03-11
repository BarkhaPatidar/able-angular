const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Friends = sequelize.define( 'friend', {
    friendId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    profile: {
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING
    },
    profession: {
        type: Sequelize.STRING
    },
    jobs: {
        type: Sequelize.STRING
    },
    friendStatus: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.STRING
    }
});

module.exports = { Friends };