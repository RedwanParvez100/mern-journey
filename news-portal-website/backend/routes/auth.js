const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Register with improved duplicate handling
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // First check if username exists
        const usernameExists = await User.findOne({ username });
        if (usernameExists) {
            return res.status(409).json({
                // 409 Conflict is more appropriate
                success: false,
                message:
                    "This username is already taken. Please try a different one.",
                field: "username", // Indicates which field caused the conflict
            });
        }

        // Then check if email exists
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(409).json({
                success: false,
                message:
                    "This email is already registered. Please use a different email or try logging in.",
                field: "email",
            });
        }

        // Create new user if no duplicates found
        const user = new User({ username, email, password });
        await user.save();

        res.status(201).json({
            success: true,
            message: "Registration successful! Welcome to our community!",
            user: {
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        // Fallback error handling
        if (error.code === 11000) {
            // MongoDB duplicate key error
            return res.status(409).json({
                success: false,
                message:
                    "This account already exists. Please try logging in instead.",
            });
        }

        // Handle other errors
        res.status(400).json({
            success: false,
            message:
                "Registration failed. Please check your information and try again.",
            error: error.message,
        });
    }
});

// Login (unchanged)
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await user.comparePassword(password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
