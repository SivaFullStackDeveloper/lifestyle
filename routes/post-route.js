const express = require('express')
const router = express.Router()
const post = require('../controllers/post-controller') 
router.post('/posts',post.save)
router.get('/posts/:id',post.getPost)
router.get('/postsgetAll',post.getPostsFindALL)
router.patch('/updateposts/:id',post.udatePost)
router.delete('/destroyPost/:id',post.destroyPost)


module.exports = router
