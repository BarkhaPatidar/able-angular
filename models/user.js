const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const User = sequelize.define( 'user', {
    user_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    profile: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
    state: {
        type: Sequelize.STRING
    },
    postalCode: {
        type: Sequelize.STRING
    },
    profession: {
        type: Sequelize.STRING
    },
    gender: {
        type: Sequelize.STRING
    },
    dob: {
        type: Sequelize.STRING
    },
    maritalStatus: {
        type: Sequelize.STRING
    },
    skills: {
        type: Sequelize.STRING
    },
    jobs: {
        type: Sequelize.STRING
    },
    followers: {
        type: Sequelize.STRING
    }
});

module.exports = { User };