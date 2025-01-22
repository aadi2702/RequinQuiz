import express from "express";
import {
  createQuiz,
  getAllQuizzes,
  // getSingleQuiz,
  updateQuiz,
  deleteQuiz,
  updateQuestionInQuiz,
  deleteQuestionFromQuiz,
} from "../controllers/quizController.js";
import {
  deleteQuestion,
  extractExcelData,
  getManualQuizzes,
  manualEntry,
  updateQuestion,
} from "../controllers/questionController.js";

const router = express.Router();

import upload from "../middlewares/multerMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js"; // Import auth middleware (if required)
// import manualEntry from "../controllers/manualController.js";

router.post("/", authMiddleware, createQuiz);
router.get("/", getAllQuizzes);
// router.get("/:id", authMiddleware, getSingleQuiz);
router.put("/:id", authMiddleware, updateQuiz);
router.delete("/:id", authMiddleware, deleteQuiz);

//update question from quiz
router.put('/:quizId/question/:questionId', updateQuestionInQuiz);

//update the static quesion
router.put('/static/:quizId/:questionId', updateQuestion);

//delete dynamic question
router.delete('/dynamic/:quizId/:questionId', deleteQuestionFromQuiz);

//deleting static question
router.delete('/static/:quizId/:questionId', deleteQuestion); 

// router.delete('/delete/:subjectCode/:category/:questionId',deleteQuestion);

// File upload route for extracting questions from Excel
router.post("/upload", upload.single("file"), extractExcelData);

// Route for manual question entry (POST request)
router.post("/manual", manualEntry);

// router.get("/upload", getManualQuizzes);
router.get("/static", getManualQuizzes);

export default router;
