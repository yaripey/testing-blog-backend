const express = require('express')
const app = express()

app.use(express.json())

let posts = []

// Posts =============================

// List all posts
app.get('/posts', (request, response) => {
    response.json(posts)
})

// Retrieve a post
app.get('/posts/:id', (request, response) => {
    const id = request.params.id
    const post = posts.find(post => post.id === id)
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
    response.json("hi")
})

// Update a post
app.put('/posts/:id', (request, response) => {
    const id = request.params.id
    const newText = request.body.content
    const post = posts.find(post => post.id === id)
    const newPost = { ...post, content: newText }
    posts = posts.map(post => post.id === id ? newPost : post)
    response.json(newPost)
})

// Delete a posts
app.delete('/posts/:id', (request, response) => {
    const id = request.params.id
    posts = posts.filter(post => post.id != id)
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
    response.json(newComment)
})


const PORT = 3001
app.listen(PORT)
console.log(`Server runnin on port ${PORT}`)