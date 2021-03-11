const { User } = require('../models/user');
const { Friends } = require('../models/friends');
const { Post } = require('../models/posts');
const { Op } = require('sequelize');
const crypto = require('crypto');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require('path');

var mailer = require('../helpers/mailer');

const userServices = require('../services/user')
const friendServices = require('../services/friend')
const postServices = require('../services/post')

exports.register = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = { 
        email: email,
        password: password
    };
    const isUser = await userServices.findUser({email: email});
    if(isUser) {
        res.sendStatus(409);
    } else {
        var userInfo = await userServices.createUser(req.body);
        if(userInfo) {
            mailer(email);
            const accessToken = userServices.generateAccessToken(user);
            res.status(200).send({"user": userInfo, accessToken: accessToken});
        } else {
            res.sendStatus(401);
        }
    }
}

exports.login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = { 
        email: email,
        password: password
    };
    const userCondition = {
        [Op.and]: {
            email: email,
            password: crypto.createHash('sha256').update(password).digest('base64')
        }
    }
    const currentUser = await userServices.findUser(userCondition);
    if(currentUser) {
        const accessToken = userServices.generateAccessToken(user);
        res.status(200).send({"user": currentUser, accessToken: accessToken}); 
    } else {
        res.sendStatus(401); 
    }
}

exports.userDashboard = async (req, res) => {
    const user = await userServices.findUser({email: req.user.email});
    if(user) {
        res.status(200).send({user: user});
    } else {
        res.sendStatus(401);
    }
}

exports.friends = async (req, res) => {
    const friends = await friendServices.findFriends();
    if(friends) {
        res.status(200).send({friends: friends});
    } else {
        res.sendStatus(401);
    }
}

exports.posts = async (req, res) => {
    const posts = await postServices.findPosts();
    if(posts) {
        res.status(200).send({posts: posts});
    } else {
        res.sendStatus(401);
    }
}

exports.addPost = async (req, res) => {
    const newPost = await postServices.addPost(req.body);
    if(newPost) {
        const posts = await postServices.findPosts();
        if(posts) {
            res.status(200).send({posts: posts});
        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
}

exports.updatePost = async (req, res) => {
    const updatedPost = await postServices.updatePost(req.body.postId);
    if(updatedPost) {
        const posts = await postServices.findPosts();
        if(posts) {
            res.status(200).send({posts: posts});
        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
}

exports.updateUser = async (req, res) => {
    const updatedUser = await userServices.updatedUser({updateValues: req.body, email: req.user.email});
    if(updatedUser) {
        const user = await userServices.findUser({email: req.user.email});
        if(user) {
            res.status(200).send({user: user});
        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
}

exports.updateFriend = async (req, res) => {
    const updatedUser = await friendServices.updateFriend(req.body.userId);
    if(updatedUser) {
        const friends = await friendServices.findFriends();
        if(friends) {
            res.status(200).send({friends: friends});
        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
}