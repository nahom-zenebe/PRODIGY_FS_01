const User = require("../model/usermodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

const signup = async (req, res) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists." });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();
  
      res
        .status(201)
        .json({ message: "User created successfully", user: { name, email } });
    } catch (err) {
      res.status(500).json({ message: "Error creating user", error: err.message });
    }
  };
  
  // Login function with JWT token stored in cookie
  const login = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password." });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password." });
      }
  
      
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: "1h",
      });
  
   
      res.setHeader("Set-Cookie", cookie.serialize("token", token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production",  
        maxAge: 3600,  // Cookie expiration time (1 hour)
        path: "/",  // Path where the cookie is valid
      }));
  
      res.status(200).json({ message: "Login successful" });
    } catch (err) {
      res.status(500).json({ message: "Error logging in", error: err.message });
    }
  };
  
=
  const logout = (req, res) => {

    res.setHeader("Set-Cookie", cookie.serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0), 
      path: "/",
    }));
  
    res.status(200).json({ message: "Logout successful" });
  };
  
  module.exports = { signup, login, logout };