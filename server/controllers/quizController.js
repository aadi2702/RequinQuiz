import Quiz from "../models/quiz.js";

const createQuiz = async (req, res) => {
  try {
    const { University, Subject_code, category, questions } = req.body;

    // Create a new quiz
    const quiz = await Quiz.create({
      University,
      Subject_code,
      category,
      questions,
    });

    res.status(201).json({
      success: true,
      data: quiz,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create quiz",
      error: error.message,
    });
  }
};


const getAllQuizzes = async (req, res) => {
  try {
    // const quizzes = await Quiz.find(); // Fetch all quizzes
    const quizzes = await Quiz.find().populate("questions"); // Populate questions

    if (!quizzes || quizzes.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No quizzes found" });
    }

    res.status(200).json({
      success: true,
      data: quizzes, // Send quizzes with questions and options
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch quizzessssss",
      error: error.message,
    });
  }
};

// const getSingleQuiz = async (req, res) => {
//   try {
//     const quiz = await Quiz.findById(req.params.id);

//     if (!quiz) {
//       return res.status(404).json({
//         success: false,
//         message: "Quiz not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: quiz,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch quizssss",
//       error: error.message,
//     });
//   }
// };

// import Quiz from '../models/quizModel'; // Import the Quiz model

// Controller to update a question in a quiz
export const updateQuestionInQuiz = async (req, res) => {
  const { quizId, questionId } = req.params; // Extract quizId and questionId from the params
  const { questionText, options } = req.body; // Extract the updated question and options from the body

  try {
    // Find the quiz by ID
    const quiz = await Quiz.findById(quizId);

    // If quiz not found
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Find the question by ID within the questions array
    const questionIndex = quiz.questions.findIndex(
      (q) => q._id.toString() === questionId
    );

    // If question not found
    if (questionIndex === -1) {
      return res
        .status(404)
        .json({ message: "Question not found in this quiz" });
    }

    // Update the question
    quiz.questions[questionIndex].questionText =
      questionText || quiz.questions[questionIndex].questionText;
    quiz.questions[questionIndex].options =
      options || quiz.questions[questionIndex].options;

    // Save the updated quiz document
    await quiz.save();

    // Respond with the updated quiz
    return res
      .status(200)
      .json({ message: "Question updated successfully", updatedQuiz: quiz });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

//delete a specific question
// quizController.js
// import Quiz from '../models/Quiz.js';

export const deleteQuestionFromQuiz = async (req, res) => {
  const { quizId, questionId } = req.params;

  try {
    // Find the quiz
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    // Find the question index in the quiz
    const questionIndex = quiz.questions.findIndex(
      (question) => question._id.toString() === questionId
    );

    if (questionIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Question not found in the quiz",
      });
    }

    // Remove the question from the questions array
    quiz.questions.splice(questionIndex, 1);

    // Save the updated quiz
    await quiz.save();

    return res.status(200).json({
      success: true,
      message: "Question deleted successfully",
      quiz: quiz,
    });
  } catch (error) {
    console.error("Error in deleteQuestionFromQuiz:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const updateQuiz = async (req, res) => {
  try {
    const { University, Subject_code, category, questions } = req.body;

    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      { University, Subject_code, category, questions },
      { new: true, runValidators: true }
    );

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    res.status(200).json({
      success: true,
      data: quiz,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update quiz",
      error: error.message,
    });
  }
};

const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Quiz deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete quiz",
      error: error.message,
    });
  }
};

export { createQuiz, getAllQuizzes, updateQuiz, deleteQuiz };

// import Quiz from "../models/Quiz"; // Import the Quiz model

// const createQuiz = async (req, res) => {
//   try {
//     // Destructure the incoming data from the request body
//     const { University, Subject_code, category, type, questions } = req.body;

//     // Validate input: Ensure that type and questions are provided
//     if (!University || !Subject_code || !category || !type || !questions) {
//       return res.status(400).json({
//         success: false,
//         message: 'All fields (University, Subject_code, category, type, questions) are required!',
//       });
//     }

//     // Validate that type is either 'dynamic' or 'static'
//     if (!['dynamic', 'static'].includes(type)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Quiz type must be either "dynamic" or "static".',
//       });
//     }

//     // Handle dynamic quiz creation
//     if (type === 'dynamic') {
//       // Create a dynamic quiz
//       const quiz = await Quiz.create({
//         University,
//         Subject_code,
//         category,
//         type: 'dynamic', // Ensure it's marked as dynamic
//         questions,
//       });

//       return res.status(201).json({
//         success: true,
//         message: 'Dynamic quiz created successfully!',
//         data: quiz,
//       });
//     }

//     // Handle static quiz creation
//     if (type === 'static') {
//       // For static quiz, you can assume the questions are already being entered manually
//       const quiz = await Quiz.create({
//         University,
//         Subject_code,
//         category,
//         type: 'static', // Ensure it's marked as static
//         questions,
//       });

//       return res.status(201).json({
//         success: true,
//         message: 'Static quiz created successfully!',
//         data: quiz,
//       });
//     }

//     // If the type is neither 'dynamic' nor 'static', return an error
//     return res.status(400).json({
//       success: false,
//       message: 'Invalid quiz type!',
//     });

//   } catch (error) {
//     console.error('Error creating quiz:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Failed to create quiz.',
//       error: error.message,
//     });
//   }
// };

// export { createQuiz };

// import mongoose from "mongoose"; // Import mongoose

// // Question Schema (nested)
// const questionSchema = new mongoose.Schema({
//   questionText: {
//     type: String,
//     required: true, // Question text is mandatory
//   },
//   options: [
//     {
//       optionText: {
//         type: String,
//         required: true, // Option text is mandatory
//       },
//       isCorrect: {
//         type: Boolean,
//         default: false, // By default, options are incorrect
//       },
//     },
//   ],
// });

// // Quiz Schema
// const quizSchema = new mongoose.Schema(
//   {
//     University: {
//       type: String,
//       required: true, // Quiz title is mandatory
//     },
//     Subject_code: {
//       type: String,
//       required: true, // Description is mandatory
//     },
//     category: {
//       type: String,
//       required: true, // Category is mandatory (e.g., Science, Math)
//     },
//     type: {
//       type: String,
//       enum: ['dynamic', 'static'], // This will distinguish dynamic from static quizzes
//       required: true, // Type is mandatory (either 'dynamic' or 'static')
//     },
//     questions: [questionSchema], // Array of nested questionSchema
//   },
//   { timestamps: true }
// ); // Automatically adds createdAt and updatedAt fields

// // Create and Export Quiz Model
// const Quiz = mongoose.model("Quiz", quizSchema);
// export default Quiz;

// import Quiz from "../models/Quiz"; // Import the Quiz model

// const createQuiz = async (req, res) => {
//   try {
//     // Destructure the incoming data from the request body
//     const { University, Subject_code, category, type, questions } = req.body;

//     // Validate input: Ensure that type and questions are provided
//     if (!University || !Subject_code || !category || !type || !questions) {
//       return res.status(400).json({
//         success: false,
//         message: 'All fields (University, Subject_code, category, type, questions) are required!',
//       });
//     }

//     // Validate that type is either 'dynamic' or 'static'
//     if (!['dynamic', 'static'].includes(type)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Quiz type must be either "dynamic" or "static".',
//       });
//     }

//     // Handle dynamic quiz creation
//     if (type === 'dynamic') {
//       // Create a dynamic quiz with question options
//       const quiz = await Quiz.create({
//         University,
//         Subject_code,
//         category,
//         type: 'dynamic', // Mark it as dynamic
//         questions,
//       });

//       return res.status(201).json({
//         success: true,
//         message: 'Dynamic quiz created successfully!',
//         data: quiz,
//       });
//     }

//     // Handle static quiz creation (only question and correct answer)
//     if (type === 'static') {
//       // Create a static quiz with only questionText and correctAnswer
//       const quiz = await Quiz.create({
//         University,
//         Subject_code,
//         category,
//         type: 'static', // Mark it as static
//         questions: questions.map(q => ({
//           questionText: q.questionText,
//           correctAnswer: q.correctAnswer,
//         })),
//       });

//       return res.status(201).json({
//         success: true,
//         message: 'Static quiz created successfully!',
//         data: quiz,
//       });
//     }

//     // If the type is neither 'dynamic' nor 'static', return an error
//     return res.status(400).json({
//       success: false,
//       message: 'Invalid quiz type!',
//     });

//   } catch (error) {
//     console.error('Error creating quiz:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Failed to create quiz.',
//       error: error.message,
//     });
//   }
// };

// export { createQuiz };
