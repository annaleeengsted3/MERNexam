module.exports = (postsDB) => {
  const express = require("express");
  const router = express.Router();

  /**** Routes ****/
  router.get('/', async (req, res) => {
    const posts = await postsDB.getPosts(); 
    res.json(posts);
  });

  router.get('/topics', async (req, res) => {
    const topics = await postsDB.getTopics();
    res.json(topics);
  });
  
  router.get('/:_id', async (req, res) => {
    const post = await postsDB.getPost(req.params._id);
    res.json(post);
  });


  router.post('/comment/:_id', async (req, res) => {
   const post = await postsDB.updateComments(req.body);
    res.json(post);
  });

  router.post('/post/:_id', async (req, res) => {
    const post = await postsDB.updatePost(req.body);
     res.json(post);
   });

  router.post('/', async (req, res) => {
    // const post = await postsDB.createPost({title: req.body.title, topic: req.body.topic, author: req.body.author, date: req.body.date, comments: req.body.comments});
    const post = await postsDB.createPost(req.body);
    res.json(post);
  });

  return router;
}
