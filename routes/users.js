import { Router } from "express";
import bcrypt from "bcrypt";
import User from "../models/users.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import checkToken from "../middleware/checkToken.js";
import checkIsAdmin from "../middleware/checkIsAdmin.js";
dotenv.config();

const usersRouter = Router();
const saltRunde = 10;

// POST/create new donation
usersRouter.post("/register", async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }
    const hashPassword = await bcrypt.hash(req.body.password, saltRunde);
    // Create a new user
    const newUser = new User({ ...req.body, password: hashPassword });
    await newUser.save();

    //Generate JWT token for authentication
    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res
      .status(201)
      .json({ token, message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Registration failed:", error);
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
});

usersRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token for authentication
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

usersRouter.get("/role", checkToken, checkIsAdmin, async (req, res) => {
  try {
    const userRole = req.user.role;
    console.log("Sending role response:", { role: userRole }); // Server-side log
    res.json({ role: userRole });
  } catch (error) {
    console.error("Error occurred while fetching user role:", error); // Server-side error log
    res.status(403).send(`Error occurred while fetching user role`);
  }
});



export default usersRouter;
