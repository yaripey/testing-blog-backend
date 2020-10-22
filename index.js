const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

let posts = []

// Posts =============================

// List all posts
app.get('/posts', (request, response) => {
  console.log('All posts request')
  response.json(posts)
})

// Retrieve a post
app.get('/posts/:id', (request, response) => {
  const id = request.params.id
  const post = posts.find(post => post.id === id)
  console.log('Single post request')
  response.json(post)
})

// Create a posts
app.post('/posts', (request, response) => {
  const post = request.body.content
  const id = (Math.random() * 10000000).toFixed(0)
  const newPost = {
    id: id,
    content: post,
    comments: []
  }

  posts = posts.concat(newPost)
  console.log('New post added: ', newPost)
  response.json("hi")
})

// Update a post
app.put('/posts/:id', (request, response) => {
  const id = request.params.id
  const newText = request.body.content
  const post = posts.find(post => post.id === id)
  const newPost = { ...post, content: newText }
  posts = posts.map(post => post.id === id ? newPost : post)
  console.log('Post updated: ', newPost)
  response.json(newPost)
})

// Delete a posts
app.delete('/posts/:id', (request, response) => {
  const id = request.params.id
  posts = posts.filter(post => post.id !== id)
  console.log('Post deleted')
  response.json(posts)
})

// Comments ==========================

// Create a comment
app.post('/comments', (request, response) => {
  const id = Number(request.body.postId)
  const commentText = request.body.content
  const commentId = (Math.random() * 10000000).toFixed(0)
  const newComment = {
    postId: id,
    body: commentText,
    id: commentId
  }
  const post = posts.find(post => Number(post.id) === id)
  post.comments = post.comments.concat(newComment)
  posts = posts.map(oldPost => Number(post.id) === id ? post : oldPost)
  console.log('Comment added')
  response.json(post)
})

// Delete a comment
app.delete('/comments', (request, response) => {
  const postId = Number(request.body.postId)
  console.log(request.body)
  const commentId = Number(request.body.id)
  const post = posts.find(post => post.id === postId)
  const newComments = post.comments.filter(comment => comment.id !== commentId)
  const newPost = { ...post, comments: newComments }
  posts = posts.map(oldPost => Number(post.id) === id ? post : oldPost)
  response.json(post)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server runnin on port ${PORT}`)