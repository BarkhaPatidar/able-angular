const { Post } = require('../models/posts');
const { Op } = require('sequelize');

var postServices = {};

postServices.findPosts = async function() {
    const posts = await Post.findAll();
    return posts;
}

postServices.addPost = async function(postData) {
    const success = await Post.create(postData);
    return success;
}

postServices.updatePost = async function(postId) {
    const post = await Post.findOne({ where: { postId: postId } });
      if(post) {
        var liked = "liked";
        var likeStatus = post.liked;
        var likedValue;
        var likesCount = 0;
        if(likeStatus == liked) {
            likedValue = "";
            likesCount = post.likes - 1;
        } else {
            likedValue = liked;
            likesCount = post.likes + 1;
        }

        const updatePost = await Post.update({liked: likedValue, likes: likesCount}, {
            where: {
                postId: postId
            }
        });
        return updatePost;
    }
}

module.exports = postServices;