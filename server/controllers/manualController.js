import Question from '../models/Question.js';// Assuming you have a Question schema

// Manual entry for adding a new question
const manualEntry = async (req, res) => {
    try {
      // Destructuring the data from the request body
      const { university, subjectCode, category, question, answer } = req.body; 
  
      // Input validation
      if (!university || !subjectCode || !category || !question || !answer) {
        return res.status(400).json({ message: 'All fields are required.' });
      }
  
      // Create a new question entry
      const newQuestion = new Question({
        university,
        subjectCode,
        category,
        question,
        answer,
      });
  
      // Save the question in the database
      await newQuestion.save();
  
      // Respond with success message
      res.status(201).json({ message: 'Question created successfully!', data: newQuestion });
    } catch (error) {
      console.error('Error in manual entry:', error);
      res.status(500).json({ message: 'Failed to create question. Please try again later.' });
    }
  };
  
  // Exporting the manualEntry function
  export default manualEntry;