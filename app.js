const express = require('express');

const app = express();

app.listen(3000);

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