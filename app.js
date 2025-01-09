const express = require('express');

const app = express();

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
app.use((express.static('public')))

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