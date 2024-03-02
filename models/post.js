const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    name: String,
    title: String,
    description: String
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;