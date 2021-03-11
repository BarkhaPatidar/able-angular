const crypto = require('crypto');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require('path');

const { User } = require('../models/user');
const { Friends } = require('../models/friends');
const { Post } = require('../models/posts');
const { Op } = require('sequelize');

var mailer = require('../helpers/mailer');

var privateKEY  = fs.readFileSync((path.join(__dirname ,'private.key')), 'utf8');

var signOptions = {
    expiresIn:  "12h",
    algorithm:  "RS256"
};

var userServices = {};

userServices.generateAccessToken = function(user) {
    return jwt.sign(user, privateKEY, signOptions);
}

userServices.createUser = async function(userInfo) {
    const name = userInfo.name;
    const email = userInfo.email;
    const password = userInfo.password;
    const profile = userInfo.profile;
    const address = userInfo.address;
    const city = address.city;
    const state = address.state;
    const postalCode = address.postalCode;
    const profession = userInfo.profession;
    const gender = userInfo.gender;
    const dob = userInfo.dob;
    const maritalStatus = userInfo.maritalStatus;
    const skills = userInfo.skills;
    const jobs = userInfo.jobs;
    const followers = "2K";

    const success = await User.create({
        name: name,
        email: email,
        password: crypto.createHash('sha256').update(password).digest('base64'),
        profile: profile,
        city: city,
        state: state,
        postalCode: postalCode,
        profession: profession,
        gender: gender,
        dob: dob,
        maritalStatus: maritalStatus,
        skills: skills,
        jobs: jobs,
        followers: followers
    });
    return success;
}

userServices.findUser = async function(userInfo) {
    const user = await User.findOne({ where: userInfo });
    return user;
}

userServices.updatedUser = async function(userData) {
    const updateUser = await User.update(userData.updateValues, {
        where: {
            email: userData.email
        }
    });
    return updateUser;
}

module.exports = userServices;