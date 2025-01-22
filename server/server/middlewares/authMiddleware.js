// import jwt from 'jsonwebtoken'

// // Middleware to verify JWT token
// const authMiddleware = (req, res, next) => {
//   try {
//     // Get token from Authorization header
//     // const token = req.headers.authorization?.split(' ')[1];
//     // console.log("token ",token);

//     console.log("Full Headers: ", req.headers);

//     const authHeader = req.headers.authorization;
//     console.log("Authorization Header: ", authHeader);

//     const token = authHeader?.split(' ')[1];
//     console.log("Extracted Token: ", token); 
    

//     // If no token is provided
//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: 'Access denied. No token provided.',
//       });
//     }

//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode and verify token
//     req.user = decoded; // Attach decoded user data to the request object
//     next(); // Pass control to the next middleware or route handler
//   } catch (error) {
//     res.status(403).json({
//       success: false,
//       message: 'Invalid or expired token.',
//     });
//   }
// };

// export default authMiddleware 


import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/user.js';

const authMiddleware = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token; // Token from cookies
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDgyNmU0M2NjM2M2N2Q0NjhjZWU5ZSIsImlhdCI6MTczMzczNTQ0MCwiZXhwIjoxNzMzNzM5MDQwfQ.c4ntGEyD0uUPP3zwpzuYdzQxAf6DQUy7Z6BuYovy8WQ'; // need to save this!!
    // console.log(token); 
    
    if (!token) {
      return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }

    // Verify the token 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password'); // Attach user to req
    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    res.status(401).json({ success: false, message: 'Invalid token.' });
  }
});

export default authMiddleware;
