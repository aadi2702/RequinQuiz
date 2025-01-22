import XLSX from "xlsx";
// export const extractExcelData = (req, res) => {
//   try {
//     console.log(req.file); // Debugging line

//     // Check if a file exists
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     // Parse Excel file from memory
//     const workbook = XLSX.read(req.file.buffer, { type: "buffer" });

//     // Get the first sheet
//     const sheetName = workbook.SheetNames[0];
//     const sheet = workbook.Sheets[sheetName];

//     // Convert sheet data to JSON (array of arrays)
//     const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

//     // Check if the file has data (after excluding the header row)
//     if (data.length <= 1) {
//       return res
//         .status(400)
//         .json({ message: "Excel file contains no data rows." });
//     }

//     // Skip the header row and map valid data
//     const extractedData = data
//       .slice(1)
//       .filter((row) => {
//         // Skip rows with incomplete or invalid data
//         return (
//           row[0] &&
//           row[1] && // Ensure both question and answer exist
//           row[0] !== "Question" &&
//           row[1] !== "Answer" // Skip rows with only "Question" or "Answer"
//         );
//       })
//       .map((row) => ({
//         question: row[0], // First column as question
//         answer: row[1], // Second column as answer
//       }));

//     // Send extracted data as response
//     res
//       .status(200)
//       .json({ message: "Data extracted successfully", data: extractedData });
//   } catch (error) {
//     res.status(500).json({ message: error.message }); 
//   }
// };
export const extractExcelData = (req, res) => {
  try {
    console.log(req.file); // Debugging line

    // Check if a file exists
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Parse Excel file from memory
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });

    // Get the first sheet
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert sheet data to JSON (array of arrays)
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    // Check if the file has data (after excluding the header row)
    if (data.length <= 1) {
      return res
        .status(400)
        .json({ message: "Excel file contains no data rows." });
    }

    // Skip the header row and map valid data
    const extractedData = data
      .slice(1)
      .filter((row) => {
        // Skip rows with incomplete or invalid data
        return (
          row[0] &&
          row[1] && // Ensure both question and answer exist
          row[0] !== "Question" &&
          row[1] !== "Answer" // Skip rows with only "Question" or "Answer"
        );
      })
      .map((row) => ({
        question: row[0], // First column as question
        answer: row[1], // Second column as answer
      }));

    // Send extracted data as response
    res
      .status(200)
      .json({ message: "Data extracted successfully", data: extractedData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Manual entry for adding a new question
import Question from "../models/Question.js";
export const manualEntry = async (req, res) => {
  const { university, subjectCode, category, questions } = req.body;

  try {
    // Create a new Question document
    const newQuiz = new Question({
      university,
      subjectCode,
      category,
      questions, // This will be an array of { question, answer }
    });

    // Save the quiz to the database
    const savedQuiz = await newQuiz.save();

    res.status(201).json({
      message: "Quiz created successfully!",
      quiz: savedQuiz,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create quiz",
      error: error.message,
    });
  }
};
// export { uploadQuizFile, manualEntry };

// Controller to fetch all manual quizzes
// export const getManualQuizzes = async (req, res) => {
//   try {
//     // Fetch all quizzes from the database
//     // const quizzes = await Question.find();
//     const quizzes = await Question.find().populate("questions"); // Populate questions
//     console.log("Controller error", quizzes);

//     if (!quizzes || quizzes.length === 0) {
//       return res.status(404).json({ message: "No quizzes found." });
//     }

//     res.status(200).json({
//       message: "Quizzes fetched successfully!",
//       data: quizzes,
//     });
//   } catch (error) {
//     console.error("Error fetching quizzes: ", error);
//     res.status(500).json({
//       message: "Failed to fetch quizzes.",
//       error: error.message,
//     });
//   }
// };

// import Question from "../models/Question.js";
// import Quiz from "../models/quiz.js";  // Make sure to import the Quiz model as well

// export const getManualQuizzes = async (req, res) => {
//   try {
//     // Fetch all quizzes from the database and populate the 'questions' field
//     const quizzes = await Quiz.find()
//       .populate({
//         path: "questions",    // Populate the 'questions' field
//         model: "Question",    // Specify that the 'questions' are of model 'Question'
//         match: { _id: { $ne: "static" } }  // Optional: match only valid ObjectIds for questions
//       });

//     console.log("Controller result", quizzes);

//     // Check if quizzes are empty or null
//     if (!quizzes || quizzes.length === 0) {
//       return res.status(404).json({ message: "No quizzes found." });
//     }

//     res.status(200).json({
//       message: "Quizzes fetched successfully!",
//       data: quizzes,
//     });
//   } catch (error) {
//     console.error("Error fetching quizzes: ", error);
//     res.status(500).json({
//       message: "Failed to fetch quizzes.",
//       error: error.message,
//     });
//   }
// };

export const getManualQuizzes = async (req, res) => {
  try {
    // Fetch all quizzes directly without populate
    const fetch = await Question.find();

    if (!fetch) {
      return res.status(404).json({ message: "No quizzes found." });
    }

    res.status(200).json({
      message: "Quizzes fetched successfully!",
      data: fetch,
    });
  } catch (error) {
    console.error("Error fetching quizzes: ", error);
    res.status(500).json({
      message: "Failed to fetch quizzes.",
      error: error.message,
    });
  }
};


//deleting specific question from static questions

// import Question from '../models/Question.js'; 

// Controller function to delete a particular question
export const deleteQuestion = async (req, res) => {
  try {
    const { quizId, questionId } = req.params;

    // Find the quiz by its ID
    const quiz = await Question.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Find the question index in the questions array
    const questionIndex = quiz.questions.findIndex(q => q._id.toString() === questionId);

    if (questionIndex === -1) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Remove the question from the array
    quiz.questions.splice(questionIndex, 1);

    // Save the updated quiz document
    await quiz.save();

    return res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


// import Question from "../models/Question.js";

export const updateQuestion = async (req, res) => {
  try {
    const { quizId, questionId } = req.params;
    const updateData = req.body;

    // First, find the quiz document
    const quiz = await Question.findById(quizId);
    
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found"
      });
    }

    // If updating parent document fields
    if (updateData.university || updateData.subjectCode || updateData.category) {
      const fieldsToUpdate = {};
      
      if (updateData.university) fieldsToUpdate.university = updateData.university;
      if (updateData.subjectCode) fieldsToUpdate.subjectCode = updateData.subjectCode;
      if (updateData.category) fieldsToUpdate.category = updateData.category;

      Object.assign(quiz, fieldsToUpdate);
    }

    // If updating a specific question
    if (updateData.question || updateData.answer) {
      // Find the specific question in the questions array
      const questionIndex = quiz.questions.findIndex(
        (q) => q._id.toString() === questionId
      );

      if (questionIndex === -1) {
        return res.status(404).json({
          success: false,
          message: "Question not found in the quiz"
        });
      }

      // Update the question fields
      if (updateData.question) {
        quiz.questions[questionIndex].question = updateData.question;
      }
      if (updateData.answer) {
        quiz.questions[questionIndex].answer = updateData.answer;
      }
    }

    // Save the updated document
    await quiz.save();

    return res.status(200).json({
      success: true,
      message: "Question updated successfully",
      data: quiz
    });

  } catch (error) {
    console.error("Error in updateQuestion:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating question",
      error: error.message
    });
  }
};

// Example usage in routes file:  
// router.put('/static/:quizId/:questionId', updateQuestion);