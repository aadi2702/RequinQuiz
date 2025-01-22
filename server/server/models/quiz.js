import mongoose from "mongoose"; // Import mongoose

// Question Schema (nested)
const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true, // Question text is mandatory
  },
  options: [
    {
      optionText: {
        type: String,
        required: true, // Option text is mandatory
      },
      isCorrect: {
        type: Boolean,
        default: false, // By default, options are incorrect
      },
    },
  ],
});

// Quiz Schema
const quizSchema = new mongoose.Schema(
  {
    University: {
      type: String,
      required: true, // Quiz title is mandatory
    },
    Subject_code: {
      type: String,
      required: true, // Description is mandatory 
    },
    category: {
      type: String,
      required: true, // Category is mandatory (e.g., Science, Math)
    },
    questions: [questionSchema], // Array of nested questionSchema
  },
  { timestamps: true }
); // Automatically adds createdAt and updatedAt fields

// Create and Export Quiz Model
const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
