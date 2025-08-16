const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");
const News = require("../models/News");
const router = express.Router();

// Get user profile
router.get("/me", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update user profile
router.put("/me", auth, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: req.body, updatedAt: Date.now() },
            { new: true }
        ).select("-password");
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get user's news
router.get("/me/news", auth, async (req, res) => {
    try {
        const news = await News.find({ author: req.user.id });
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
