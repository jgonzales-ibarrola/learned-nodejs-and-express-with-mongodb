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
