const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog.js');

const app = express();

const dbURI = "mongodb+srv://jogo:jogo1234@cluster0.sd03q.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log('connected to DB'))
  .catch((error) => console.log(error));

app.listen(3000);

// middleware & static files
app.use((req, res, next) => {
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  next();
})
app.use((req, res, next) => {
  console.log('in the next middleware');
  next();
})
// Static Files
app.use((express.static('public')))

app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: '2new Blog',
    snippet: '2about Blog',
    body: '2test body'
  })

  blog.save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => console.log(err));
})

app.get('/all-blogs', (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => console.log(err))
})

app.get('/single-blog', (req,res) => {
  Blog.findById('677fdd63e495a81cbb6ee30d')
  .then((result) => {
    res.send(result)
  })
  .catch((err) => console.log(err))
})

// Routes
app.get('/', (req, res) => {
  res.sendFile('./views/index.html', { root: __dirname });
})

app.get('/blog', (req, res) => {
  res.sendFile('./views/blog.html', { root: __dirname });
})

app.get('/blog-us', (req, res) => {
  res.redirect('/blog');
})

app.use((req, res) => {
  res.status(404).sendFile('./views/404.html', { root: __dirname });
})