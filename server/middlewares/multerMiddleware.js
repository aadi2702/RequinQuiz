// import multer from 'multer';
// const storage = multer.memoryStorage(); // Store file in memory, not disk 
// const fileFilter = (req, file, cb) => {
//   if ( 
//     file.mimetype ===
//     'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
//   ) {
//     cb(null, true); // Accept Excel files
//   } else {
//     cb(new Error('Invalid file type. Only .xlsx files are allowed.'), false); // Reject non-Excel files
//   }
// };

// const upload = multer({ storage, fileFilter });

// export default upload; 

import multer from 'multer';
const storage = multer.memoryStorage(); // Store file in memory, not disk
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype ===
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ) {
    cb(null, true); // Accept Excel files
  } else {
    cb(new Error('Invalid file type. Only .xlsx files are allowed.'), false); // Reject non-Excel files
  }
};

const upload = multer({ storage, fileFilter });

export default upload;

// import express from 'express';
// import multer from 'multer'; // For handling file uploads
// import createQuiz from '../controllers/quizController.js'; // Your controller

// const router = express.Router();

// // Setup multer for in-memory file uploads
// const storage = multer.memoryStorage(); // This stores the file in memory
// const upload = multer({ storage: storage });

// // Route for creating a quiz
// router.post('/create', upload.single('quizFile'), createQuiz); // `quizFile` is the name of the file input field from the frontend

// export default router;

