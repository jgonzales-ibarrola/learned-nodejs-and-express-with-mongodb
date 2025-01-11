## Notes


### Basics
- `global`
- `setTimeout(() => {}, 3000)` (method of global object)
- `setInterval(() => {}, 3000)` (method of global object)
- `clearInterval()` (to stop the interval in a timeout)
- `__dirname` (directory "/directory")
- `__filename` (filename "test-file".js)
- `const xyz = require('./placeholder-people.json')` (modules & require)
- `module.exports = {}`
- `const os = require('os')` (built in Node JS)
- `os.platform()` (Win32)
- `os.homedir()` (C:\Users\[your-device-name])
- `const fs = require('fs');` (file system)
- `fs.readFile('./docs/blog1.txt', (err, data) => {}` (reading a file)
- `fs.writeFile("./docs/blog1.txt", "A new line of text!", () => {}` (writing a new line of text or adding new file and write text)
- `if (!fs.existsSync('./assets')) {}` (check of directory is not exist)
- `fs.mkdir("./assets", (err) => {}` (create/make directory)
- `fs.rmdir("./assets", (err) => {}` (remove directory)
- `fs.unlink('./docs/deleteme.txt', (err) => {}` (deleting a file)
- `const readStream = fs.createReadStream('./docs/blog3.txt', { encoding: 'utf-8'});` (read a file to stream)
- `const writeStream = fs.createWriteStream('./docs/blog4.txt');` (create or write new file where chunk of 
stream goes in)
- How to use Streams & Buffers:
```
readStream.on('data', (chunk) => {
  console.log('---new chunk---');
  console.log(chunk);
  writeStream.write('\nNEW CHUNCK\n');
  writeStream.write(chunk);
})
```
- Simplified Code of Streams & Buffers but must have to write
`readStream.pipe(writeStream);`

### Client & Servers
- `const server = http.createServer((req, res) => {})` (creates server)

### Requests & Responses
```
const http = require('http')
const fs = require('fs');

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  res.setHeader('Content-Type', 'text/html');

  let path = './views/';

  switch (req.url) {
    case '/':
      path += 'index.html';
      res.statusCode = 200;
      break;
    case '/blog':
      path += 'blog.html';
      res.statusCode = 200;
      break;
    case '/blog-x':
      path += 'blog.html';
      res.statusCode = 301;
      res.setHeader('Location', '/blog');
      break;
    default:
      path += '404.html'
      res.statusCode = 404;
  }
  
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.end(data);
    }
  })
})

server.listen(3000, 'localhost', () => {
  console.log('listening on port 3000');
})
```

### Express
**Basics**
```
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
```

**Middleware & Static**
```
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
// other routes...
```

**Mongo DB Basics**
```
const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog.js');

const app = express();

const dbURI = "mongodb+srv://jogo:jogo1234@cluster0.sd03q.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log('connected to DB'))
  .catch((error) => console.log(error));

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

// /models/blog.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  snippet: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  }
}, { timestamps: true })

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog
```

### Model, View, Controller MVC
```
// app.js
// Static Files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
	res.sendFile("./views/index.html", { root: __dirname });
});

app.use("/blogs", blogRoutes);

app.use((req, res) => {
	res.status(404).sendFile("./views/404.html", { root: __dirname });
});


// models/blog.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  snippet: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  }
}, { timestamps: true })

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog

// routes/blogRoutes.js
const express = require('express');
const { FetchAllBlogs, DeleteSingleBlog, CreateNewBlog, FetchSingleBlog } = require('../controllers/blogControllers');

const router = express.Router();

router.post("/create", CreateNewBlog);

router.get("/", FetchAllBlogs);

router.delete("/:id", DeleteSingleBlog);

router.get("/:id", FetchSingleBlog);

module.exports = router;

// controllers/blogControllers.js
const Blog = require('../models/blog');

const FetchAllBlogs =  (req, res) => {
	Blog.find()
		.then((result) => {
			res.send(result);
		})
		.catch((err) => console.log(err));
}

const DeleteSingleBlog = (req, res) => {
  const id = req.params.id;

	Blog.findByIdAndDelete(id)
		.then((result) => {
			res.send(result);
		})
		.catch((err) => console.log(err));
}

const CreateNewBlog = (req, res) => {
  console.log(req.body)
  // const blog = new Blog();

  // blog.save()
  // 	.then((result) => {
  // 		res.send(result);
  // 	})
  // 	.catch((err) => console.log(err));
}

const FetchSingleBlog = (req, res) => {
  const id = req.params.id;

	Blog.findById(id)
		.then((result) => {
			res.send(result);
		})
		.catch((err) => console.log(err));
}

module.exports = {
  FetchAllBlogs,
  DeleteSingleBlog,
  CreateNewBlog,
  FetchSingleBlog
}

```