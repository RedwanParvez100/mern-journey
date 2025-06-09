const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// CRUD operations
router.post("/create-user", userController.createUser);
router.get("/read-user", userController.readUser);
router.put("/update-user", userController.updateUser);
router.delete("/delete-user", userController.deleteUser);

// User listing
router.get("/all-users", userController.getAllUsers);
router.get("/user/:id", userController.getUserById);

// Auth
router.post("/login", userController.loginUser);
router.post("/logout", userController.logoutUser);

// Account management
router.put("/change-password", userController.changePassword);
router.put("/update-profile", userController.updateProfile);

// Role management
router.put("/make-admin/:id", userController.makeAdmin);
router.put("/remove-admin/:id", userController.removeAdmin);

// Search and filter
router.get("/search", userController.searchUsers);
router.get("/filter", userController.filterUsers);

// Block/unblock
router.patch("/block-user/:id", userController.blockUser);
router.patch("/unblock-user/:id", userController.unblockUser);

// Verification
router.post("/verify-email", userController.verifyEmail);
router.post("/resend-verification", userController.resendVerification);

// Profile picture
router.post("/upload-profile-picture", userController.uploadProfilePicture);

// Delete Account
router.delete("/delete-account", userController.deleteAccount);

module.exports = router;
