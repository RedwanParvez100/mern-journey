const express = require("express");
const auth = require("../middleware/auth");
const News = require("../models/News");
const router = express.Router();

// Get top 6 featured news
router.get("/featured", async (req, res) => {
    try {
        const news = await News.find({ isFeatured: true })
            .limit(6)
            .populate("author", "username");
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all news
router.get("/", async (req, res) => {
    try {
        const news = await News.find().populate("author", "username");
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single news
router.get("/:id", async (req, res) => {
    try {
        const news = await News.findByIdAndUpdate(
            req.params.id,
            { $inc: { views: 1 } },
            { new: true }
        ).populate("author", "username");

        if (!news) return res.status(404).json({ message: "News not found" });
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create news (authenticated)
router.post("/", auth, async (req, res) => {
    try {
        const { title, content, category, imageUrl, isFeatured } = req.body;
        const news = new News({
            title,
            content,
            category,
            imageUrl,
            author: req.user.id,
            isFeatured: isFeatured || false,
        });
        await news.save();
        res.status(201).json(news);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update news (author only)
router.put("/:id", auth, async (req, res) => {
    try {
        const news = await News.findOne({
            _id: req.params.id,
            author: req.user.id,
        });
        if (!news)
            return res
                .status(404)
                .json({ message: "News not found or unauthorized" });

        Object.assign(news, req.body);
        news.updatedAt = Date.now();
        await news.save();
        res.json(news);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete news (author only)
router.delete("/:id", auth, async (req, res) => {
    try {
        const news = await News.findOneAndDelete({
            _id: req.params.id,
            author: req.user.id,
        });
        if (!news)
            return res
                .status(404)
                .json({ message: "News not found or unauthorized" });
        res.json({ message: "News deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
