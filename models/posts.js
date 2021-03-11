const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Post = sequelize.define( 'post', {
    postId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user: {
        type: Sequelize.STRING
    },
    userProfile: {
        type: Sequelize.STRING
    },
    pic: {
        type: Sequelize.STRING
    },
    caption: {
        type: Sequelize.STRING
    },
    time: {
        type: Sequelize.STRING
    },
    likes: {
        type: Sequelize.INTEGER
    },
    comments: {
        type: Sequelize.INTEGER
    },
    share: {
        type: Sequelize.INTEGER
    },
    liked: {
        type: Sequelize.STRING
    }
});

module.exports = { Post };