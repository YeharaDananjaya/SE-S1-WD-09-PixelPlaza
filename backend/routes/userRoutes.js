const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// JWT Secret Key
const JWT_SECRET =
  process.env.JWT_SECRET ||
  "e933a2f6a85c7950edee4cb716e68706006e7510717ce6a2d58cfd4cec88c3ec6b604e09806e8f0e26ee3ae3e1f5537b89e800234903ea957bec8bb5e1365ec8"; // Use environment variable or fallback

// Hash password helper function
const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Register a new user (customer)
router.post("/register", async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      userLevel: 0,
    });
    await user.save();

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Failed to register user:", error.message);
    res
      .status(400)
      .json({ message: "Failed to register user", error: error.message });
  }
});

// Login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, userLevel: user.userLevel },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    console.error("Failed to login user:", error.message);
    res
      .status(400)
      .json({ message: "Failed to login user", error: error.message });
  }
});

// Admin route to add a seller
router.post("/add-seller", verifyToken, checkUserLevel(2), async (req, res) => {
  const { name, email, password, phone, sellerId, shopId } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const seller = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      userLevel: 1,
      sellerId,
      shopId,
    });

    await seller.save();

    res.status(201).json({ message: "Seller added successfully", seller });
  } catch (error) {
    console.error("Failed to add seller:", error.message);
    res
      .status(400)
      .json({ message: "Failed to add seller", error: error.message });
  }
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

// Middleware to check user roles
const checkUserLevel = (requiredLevel) => {
  return (req, res, next) => {
    if (req.user.userLevel < requiredLevel) {
      return res
        .status(403)
        .json({ message: "Access denied, insufficient permissions" });
    }
    next();
  };
};

// Route to get user profile
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Failed to get user profile:", error.message);
    res
      .status(400)
      .json({ message: "Failed to get user profile", error: error.message });
  }
});

// Example of a protected route for admins
router.get("/admin", verifyToken, checkUserLevel(2), (req, res) => {
  res.status(200).json({ message: "Welcome, Admin!" });
});

// Get all users (admin-only)
router.get("/users", verifyToken, checkUserLevel(2), async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Failed to retrieve users:", error.message);
    res
      .status(400)
      .json({ message: "Failed to retrieve users", error: error.message });
  }
});

// Admin route to create a new admin user
router.post(
  "/create-admin",
  verifyToken,
  checkUserLevel(2),
  async (req, res) => {
    const { name, email, password, phone } = req.body;

    try {
      // Check if the admin already exists
      const existingAdmin = await User.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({ message: "Admin already exists" });
      }

      // Create a new admin user
      const hashedPassword = await hashPassword(password);

      const admin = new User({
        name,
        email,
        password: hashedPassword,
        phone,
        userLevel: 2, // Set userLevel to 2 for admin
      });

      await admin.save();

      res.status(201).json({ message: "Admin created successfully", admin });
    } catch (error) {
      console.error("Failed to create admin:", error.message);
      res
        .status(400)
        .json({ message: "Failed to create admin", error: error.message });
    }
  }
);

module.exports = router;
