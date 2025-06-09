const jwt = require("jsonwebtoken");

/**
 * Generate JWT Token
 * @param {Object} user - User object
 * @returns {String} JWT token
 */
exports.generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

/**
 * Format response messages consistently
 * @param {String} message
 * @param {Object} [data]
 * @returns {Object}
 */
exports.responseMessage = (message, data = {}) => {
    return {
        success: true,
        message,
        data,
    };
};

/**
 * Send error response
 * @param {Response} res
 * @param {Number} code
 * @param {String} message
 */
exports.sendError = (res, code, message) => {
    return res.status(code).json({
        success: false,
        message,
    });
};
