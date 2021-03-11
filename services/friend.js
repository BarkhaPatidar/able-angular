const { Friends } = require('../models/friends');
const { Op } = require('sequelize');

var friendServices = {};


friendServices.findFriends = async function() {
    const friends = await Friends.findAll();
    return friends;
}

friendServices.updateFriend = async function(userId) {
    var followStatus;
    var following = "Following"
    var unfollowing = "Unfollowing"
    var user = await Friends.findOne({ where: { friendId: userId } });
      if(user) {
        if(user.friendStatus == following) {
            followStatus = unfollowing
        } else {
            followStatus = following
        }
      }
    const updateUser = await Friends.update({friendStatus: followStatus}, {
        where: {
            friendId: userId
        }
    });
    return updateUser;
}

module.exports = friendServices;