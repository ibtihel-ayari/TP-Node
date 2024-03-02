const express = require('express');
const bcrypt =require ('bcryptjs');
const jwt =require ('jsonwebtoken');
const Post = require('../models/post');
const app =express.Router();

app.use(express.json());

// Get all postss
app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single post
app.get('/posts/:id', getPost, (req, res) => {
  res.json(res.post);
});

// Create a new post
app.post('/posts', async (req, res) => {
  const post = new Post({
    name: req.body.name,
    title: req.body.title,
    description: req.body.description
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a post
app.patch('/posts/:id', getPost, async (req, res) => {
  if (req.body.name != null) {
    res.post.name = req.body.name;
  }

  if (req.body.title != null) {
    res.post.title = req.body.title;
  }

  if (req.body.description != null) {
    res.post.description = req.body.description;
  }

  try {
    const updatedPost = await res.post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a POST
app.delete('/posts/:id', getPost, async (req, res) => {
  try {
    await res.post.remove();
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a single post by ID
async function getPost(req, res, next) {
  let post;
  try {
    post = await Post.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: 'Cannot find post' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.post = post;
  next();
}

app.listen(3000, () => console.log('Server started...'));



module.exports = router;

