const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
    createBlog,
    getAllBlogs,
    updateBlog,
    deleteBlog,
} = require("../controllers/blogController");

const router = express.Router();

// Apply auth middleware to all blog routes
router.use(authMiddleware);

// Create a new blog
router.post("/", createBlog);

// Get all blogs
router.get("/", getAllBlogs);

// Update a blog
router.put("/:id", updateBlog);

// Delete a blog
router.delete("/:id", deleteBlog);

module.exports = router;
