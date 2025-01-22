// import User from '../models/user.js';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // 1. Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found',
//       });
//     }

//     // 2. Verify password
//     const isMatch = await bcrypt.compare(password, user.password); // Compare hashed passwords
//     if (!isMatch) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid credentials',
//       });
//     }

//     // 3. Generate JWT token
//     const token = jwt.sign(
//       { id: user._id, email: user.email },
//       process.env.JWT_SECRET, // Secret key from environment variables
//       { expiresIn: '1d' } // Token expiration time
//     );

//     // Debug logs
//     console.log("Generated Token:", token);
//     console.log("User ID:", user._id);

//     // 4. Send token and user info in response
//     res.status(200).json({
//       success: true,
//       message: 'Login successful',
//       token, // Frontend will store this token
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Something went wrong',
//       error: error.message,
//     });
//   }
// };

// export const logout = async (req, res) => {
//   try {
//     // Logout is typically handled on the frontend by removing token from storage
//     res.status(200).json({
//       success: true,
//       message: 'Logout successful',
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Something went wrong',
//       error: error.message,
//     });
//   }
// };

// module.exports = { login, logout };
// export { login, logout }

import jwt from "jsonwebtoken";
import User from "../models/user.js";
import bcrypt from "bcrypt"; // Ensure you're using bcrypt for password hashing

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h", // Token expires in 1 hour
    });

    // Set token as HTTP-only cookie
    res
      .cookie("token", token, {
        httpOnly: true, // Prevent JavaScript access
        secure: process.env.NODE_ENV === "production", // HTTPS in production
        sameSite: "strict", // CSRF protection
      })
      .status(200)
      .json({ success: true, message: "Login successful" });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
