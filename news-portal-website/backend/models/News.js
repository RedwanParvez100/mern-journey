const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isFeatured: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
});

module.exports = mongoose.model("News", newsSchema);
