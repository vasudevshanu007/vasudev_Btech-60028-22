const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* ================= REGISTER ================= */
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // ✅ VALIDATION (INSIDE FUNCTION)
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ message: "Registration failed" });
    }
};

/* ================= LOGIN ================= */
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // ✅ VALIDATION (INSIDE FUNCTION)
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: "Login failed" });
    }
};

/* ================= UPDATE PROFILE ================= */
exports.updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user,
            { name, email },
            { new: true }
        );

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Profile update failed" });
    }
};

/* ================= DELETE PROFILE ================= */
exports.deleteProfile = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user);
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Delete failed" });
    }
};
