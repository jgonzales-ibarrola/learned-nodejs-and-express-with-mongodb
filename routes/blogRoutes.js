const express = require('express');
const { FetchAllBlogs, DeleteSingleBlog, CreateNewBlog, FetchSingleBlog } = require('../controllers/blogControllers');

const router = express.Router();

router.post("/create", CreateNewBlog);

router.get("/", FetchAllBlogs);

router.delete("/:id", DeleteSingleBlog);

router.get("/:id", FetchSingleBlog);

module.exports = router;