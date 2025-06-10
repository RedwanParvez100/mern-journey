const Blog = require("../models/Blog");

// Create a new blog
const createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const blog = new Blog({
            title,
            content,
            author: req.user._id,
        });

        await blog.save();
        res.status(201).json(blog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all blogs
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate("author", "username");
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a blog
const updateBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const blog = await Blog.findOneAndUpdate(
            { _id: req.params.id, author: req.user._id },
            { title, content },
            { new: true, runValidators: true }
        );

        if (!blog) {
            return res
                .status(404)
                .json({ message: "Blog not found or not authorized" });
        }

        res.json(blog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a blog
const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findOneAndDelete({
            _id: req.params.id,
            author: req.user._id,
        });

        if (!blog) {
            return res
                .status(404)
                .json({ message: "Blog not found or not authorized" });
        }

        res.json({ message: "Blog deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createBlog,
    getAllBlogs,
    updateBlog,
    deleteBlog,
};
