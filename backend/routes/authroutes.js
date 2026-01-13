const express = require("express");
const router = express.Router();

const auth = require("../middleware/authmiddleware");

// ✅ IMPORT CONTROLLER FUNCTIONS
const {
    register,
    login,
    updateProfile,
    deleteProfile
} = require("../controllers/authcontroller");

// ROUTES
router.post("/register", register);
router.post("/login", login);
router.put("/update-profile", auth, updateProfile);
router.delete("/delete-profile", auth, deleteProfile);

module.exports = router;
