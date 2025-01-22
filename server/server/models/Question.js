  import mongoose from "mongoose";

  // Question Schema (nested)
  const quesSchema = new mongoose.Schema({
    question: {
      type: String,
      required: true, // Question text is mandatory 
    },
    answer: {
      type: String,
      required: true, // Answer text is mandatory
    },
  });

  const questionSchema = new mongoose.Schema(
    {
      university: {
        type: String,
        required: true,
      },
      subjectCode: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      questions: [quesSchema],
    },
    { timestamps: true }
  );

  const Question = mongoose.model("Question", questionSchema);

  export default Question;
