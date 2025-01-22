// import React, { useState } from "react";
// import axios from "axios";
// // import { Link } from 'react-router-dom';
// import Sidebar from "../components/Sidebar";// Assuming Sidebar is a separate component

// const AddQuiz = () => {
//   const [quizType, setQuizType] = useState("dynamic"); // dynamic or static
//   const [university, setUniversity] = useState("");
//   const [subjectCode, setSubjectCode] = useState("");
//   const [category, setCategory] = useState("");
//   const [questions, setQuestions] = useState([
//     { questionText: "", options: ["", "", "", ""], correctOption: "" },
//   ]);
//   const [file, setFile] = useState(null);

//   const handleAddQuestion = () => {
//     setQuestions([
//       ...questions,
//       { questionText: "", options: ["", "", "", ""], correctOption: "" },
//     ]);
//   };

//   const handleQuestionChange = (index, field, value) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[index][field] = value;
//     setQuestions(updatedQuestions);
//   };

//   const handleOptionChange = (questionIndex, optionIndex, value) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[questionIndex].options[optionIndex] = value;
//     setQuestions(updatedQuestions);
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (quizType === "dynamic") {
//       try {
//         const quizData = {
//           University: university,
//           Subject_code: subjectCode,
//           category,
//           questions: questions.map((q) => ({
//             questionText: q.questionText,
//             options: q.options.map((option, index) => ({
//               optionText: option,
//               isCorrect: index === parseInt(q.correctOption),
//             })),
//           })),
//         };

//         const response = await axios.post(
//           "https://requin-quiz-backend.vercel.app/api/quiz/",
//           quizData,
//           {
//             withCredentials: true,
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         alert("Quiz created successfully!");
//         console.log(response.data);

//         // Reset form
//         setUniversity("");
//         setSubjectCode("");
//         setCategory("");
//         setQuestions([ { questionText: "", options: ["", "", "", ""], correctOption: "" }, ]);
//       } catch (error) {
//         console.error("Error creating quiz:", error.response?.data || error.message);
//         alert("Failed to create quiz");
//       }
//     } else if (quizType === "static" && file) {
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("university", university);
//       formData.append("subjectCode", subjectCode);
//       formData.append("category", category);

//       try {
//         const response = await axios.post(
//           "https://requin-quiz-backend.vercel.app/api/quiz/upload",
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );

//         alert("Quiz uploaded successfully!");
//         console.log(response.data);
//       } catch (error) {
//         console.error("Error uploading file:", error.response?.data || error.message);
//         alert("Failed to upload quiz");
//       }
//     } else {
//       alert("Please select a valid quiz type or upload a file");
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-gray-800 to-gray-900">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main content area */}
//       <div className="flex-1 p-8 bg-gray-100">
//         <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
//           <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Add Quiz</h2>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Quiz Type Selection */}
//             <div className="flex items-center justify-around">
//               <label className="text-gray-700 font-medium">
//                 <input
//                   type="radio"
//                   value="dynamic"
//                   checked={quizType === "dynamic"}
//                   onChange={() => setQuizType("dynamic")}
//                   className="mr-2"
//                 />
//                 Dynamic
//               </label>
//               <label className="text-gray-700 font-medium">
//                 <input
//                   type="radio"
//                   value="static"
//                   checked={quizType === "static"}
//                   onChange={() => setQuizType("static")}
//                   className="mr-2"
//                 />
//                 Static (File Upload)
//               </label>
//             </div>

//             {/* University, Subject Code, Category */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div>
//                 <label className="block text-gray-700 font-medium mb-2">University</label>
//                 <input
//                   type="text"
//                   value={university}
//                   onChange={(e) => setUniversity(e.target.value)}
//                   required
//                   className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-medium mb-2">Subject Code</label>
//                 <input
//                   type="text"
//                   value={subjectCode}
//                   onChange={(e) => setSubjectCode(e.target.value)}
//                   required
//                   className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-medium mb-2">Category</label>
//                 <input
//                   type="text"
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                   required
//                   className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>
//             </div>

//             {/* Dynamic Questions */}
//             {quizType === "dynamic" && (
//               <div className="space-y-4">
//                 <h3 className="text-xl font-semibold text-gray-700">Questions</h3>
//                 {questions.map((q, index) => (
//                   <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg shadow-md space-y-3">
//                     <label className="block text-gray-700 font-medium">Question {index + 1}:</label>
//                     <input
//                       type="text"
//                       value={q.questionText}
//                       onChange={(e) => handleQuestionChange(index, "questionText", e.target.value)}
//                       required
//                       className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
//                     />
//                     <label className="block text-gray-700 font-medium">Options:</label>
//                     {q.options.map((option, optionIndex) => (
//                       <input
//                         key={optionIndex}
//                         type="text"
//                         value={option}
//                         placeholder={`Option ${optionIndex + 1}`}
//                         onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
//                         required
//                         className="w-full p-2 mb-2 border rounded focus:ring-2 focus:ring-blue-400"
//                       />
//                     ))}
//                     <label className="block text-gray-700 font-medium">Correct Option (0-3):</label>
//                     <input
//                       type="number"
//                       value={q.correctOption}
//                       onChange={(e) => handleQuestionChange(index, "correctOption", e.target.value)}
//                       min="0"
//                       max="3"
//                       required
//                       className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
//                     />
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={handleAddQuestion}
//                   className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//                 >
//                   Add Another Question
//                 </button>
//               </div>
//             )}

//             {/* Static File Upload */}
//             {quizType === "static" && (
//               <div>
//                 <label className="block text-gray-700 font-medium mb-2">Upload Excel File (.xlsx):</label>
//                 <input
//                   type="file"
//                   accept=".xlsx"
//                   onChange={handleFileChange}
//                   required
//                   className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>
//             )}

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full py-3 bg-green-500 text-white text-lg font-semibold rounded-lg hover:bg-green-600 transition"
//             >
//               Create Quiz
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddQuiz;

// import React, { useState } from "react";
// import axios from "axios";
// // import { Link } from 'react-router-dom';
// import Sidebar from "../components/Sidebar"; // Assuming Sidebar is a separate component

// const AddQuiz = () => {
//   const [quizType, setQuizType] = useState("dynamic"); // dynamic or static
//   const [university, setUniversity] = useState("");
//   const [subjectCode, setSubjectCode] = useState("");
//   const [category, setCategory] = useState("");
//   const [questions, setQuestions] = useState([
//     { questionText: "", options: ["", "", "", ""], correctOption: "" },
//   ]);
//   const [file, setFile] = useState(null);

//   // For static quiz: manual question and answer
//   const [staticQuestion, setStaticQuestion] = useState(""); // Manual question input
//   const [staticAnswer, setStaticAnswer] = useState(""); // Manual answer input
//   const [uploadOption, setUploadOption] = useState("file"); // Choose between file upload or manual entry

//   const handleAddQuestion = () => {
//     setQuestions([
//       ...questions,
//       { questionText: "", options: ["", "", "", ""], correctOption: "" },
//     ]);
//   };

//   const handleQuestionChange = (index, field, value) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[index][field] = value;
//     setQuestions(updatedQuestions);
//   };

//   const handleOptionChange = (questionIndex, optionIndex, value) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[questionIndex].options[optionIndex] = value;
//     setQuestions(updatedQuestions);
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (quizType === "dynamic") {
//       try {
//         const quizData = {
//           University: university,
//           Subject_code: subjectCode,
//           category,
//           questions: questions.map((q) => ({
//             questionText: q.questionText,
//             options: q.options.map((option, index) => ({
//               optionText: option,
//               isCorrect: index === parseInt(q.correctOption),
//             })),
//           })),
//         };

//         const response = await axios.post(
//           "https://requin-quiz-backend.vercel.app/api/quiz/",
//           quizData,
//           {
//             withCredentials: true,
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         alert("Quiz created successfully!");
//         console.log(response.data);

//         // Reset form
//         setUniversity("");
//         setSubjectCode("");
//         setCategory("");
//         setQuestions([ { questionText: "", options: ["", "", "", ""], correctOption: "" }, ]);
//       } catch (error) {
//         console.error("Error creating quiz:", error.response?.data || error.message);
//         alert("Failed to create quiz");
//       }
//     } else if (quizType === "static") {
//       if (uploadOption === "file" && file) {
//         const formData = new FormData();
//         formData.append("file", file);
//         formData.append("university", university);
//         formData.append("subjectCode", subjectCode);
//         formData.append("category", category);

//         try {
//           const response = await axios.post(
//             "https://requin-quiz-backend.vercel.app/api/quiz/upload",
//             formData,
//             {
//               headers: {
//                 "Content-Type": "multipart/form-data",
//               },
//             }
//           );

//           alert("Quiz uploaded successfully!");
//           console.log(response.data);
//         } catch (error) {
//           console.error("Error uploading file:", error.response?.data || error.message);
//           alert("Failed to upload quiz");
//         }
//       } else if (uploadOption === "manual" && staticQuestion && staticAnswer) {
//         const manualData = {
//           University: university,
//           Subject_code: subjectCode,
//           category,
//           question: staticQuestion,
//           answer: staticAnswer,
//         };

//         try {
//           const response = await axios.post(
//             "https://requin-quiz-backend.vercel.app/api/quiz/manual",
//             manualData,
//             {
//               headers: {
//                 "Content-Type": "application/json",
//               },
//             }
//           );

//           alert("Manual quiz created successfully!");
//           console.log(response.data);
//         } catch (error) {
//           console.error("Error submitting manual data:", error.response?.data || error.message);
//           alert("Failed to create quiz");
//         }
//       } else {
//         alert("Please provide a file or enter a question and answer manually.");
//       }
//     } else {
//       alert("Please select a valid quiz type or upload a file");
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-gray-800 to-gray-900">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main content area */}
//       <div className="flex-1 p-8 bg-gray-100">
//         <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
//           <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Add Quiz</h2>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Quiz Type Selection */}
//             <div className="flex items-center justify-around">
//               <label className="text-gray-700 font-medium">
//                 <input
//                   type="radio"
//                   value="dynamic"
//                   checked={quizType === "dynamic"}
//                   onChange={() => setQuizType("dynamic")}
//                   className="mr-2"
//                 />
//                 Dynamic
//               </label>
//               <label className="text-gray-700 font-medium">
//                 <input
//                   type="radio"
//                   value="static"
//                   checked={quizType === "static"}
//                   onChange={() => setQuizType("static")}
//                   className="mr-2"
//                 />
//                 Static (File Upload / Manual)
//               </label>
//             </div>

//             {/* University, Subject Code, Category */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div>
//                 <label className="block text-gray-700 font-medium mb-2">University</label>
//                 <input
//                   type="text"
//                   value={university}
//                   onChange={(e) => setUniversity(e.target.value)}
//                   required
//                   className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-medium mb-2">Subject Code</label>
//                 <input
//                   type="text"
//                   value={subjectCode}
//                   onChange={(e) => setSubjectCode(e.target.value)}
//                   required
//                   className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-medium mb-2">Category</label>
//                 <input
//                   type="text"
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                   required
//                   className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>
//             </div>

//             {/* Static Quiz - File Upload or Manual Entry */}
//             {quizType === "static" && (
//               <div>
//                 <div className="flex items-center justify-around mb-4">
//                   <label className="text-gray-700 font-medium">
//                     <input
//                       type="radio"
//                       value="file"
//                       checked={uploadOption === "file"}
//                       onChange={() => setUploadOption("file")}
//                       className="mr-2"
//                     />
//                     Upload Excel File
//                   </label>
//                   <label className="text-gray-700 font-medium">
//                     <input
//                       type="radio"
//                       value="manual"
//                       checked={uploadOption === "manual"}
//                       onChange={() => setUploadOption("manual")}
//                       className="mr-2"
//                     />
//                     Enter Question & Answer Manually
//                   </label>
//                 </div>

//                 {/* Show File Upload if 'file' option is selected */}
//                 {uploadOption === "file" && (
//                   <div>
//                     <label className="block text-gray-700 font-medium mb-2">Upload Excel File (.xlsx):</label>
//                     <input
//                       type="file"
//                       accept=".xlsx"
//                       onChange={handleFileChange}
//                       required
//                       className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
//                     />
//                   </div>
//                 )}

//                 {/* Show Manual Question & Answer Fields if 'manual' option is selected */}
//                 {uploadOption === "manual" && (
//                   <div>
//                     <div className="mt-4">
//                       <label className="block text-gray-700 font-medium mb-2">Question</label>
//                       <input
//                         type="text"
//                         value={staticQuestion}
//                         onChange={(e) => setStaticQuestion(e.target.value)}
//                         className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
//                       />
//                     </div>

//                     <div className="mt-4">
//                       <label className="block text-gray-700 font-medium mb-2">Answer</label>
//                       <input
//                         type="text"
//                         value={staticAnswer}
//                         onChange={(e) => setStaticAnswer(e.target.value)}
//                         className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
//                       />
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full py-3 bg-green-500 text-white text-lg font-semibold rounded-lg hover:bg-green-600 transition"
//             >
//               Create Quiz
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddQuiz;

import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar"; // Assuming Sidebar is a separate component

const AddQuiz = () => {
  const [quizType, setQuizType] = useState("dynamic"); // dynamic or static
  const [university, setUniversity] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [category, setCategory] = useState("");
  const [questions, setQuestions] = useState([
    { questionText: "", options: ["", "", "", ""], correctOption: "" },
  ]);
  const [file, setFile] = useState(null);

  // Static question and answer state
  const [staticQuestion, setStaticQuestion] = useState(""); // Manual question input
  const [staticAnswer, setStaticAnswer] = useState(""); // Manual answer input
  const [uploadOption, setUploadOption] = useState("file"); // Choose between file upload or manual entry

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", options: ["", "", "", ""], correctOption: "" },
    ]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handling dynamic quiz creation
    if (quizType === "dynamic") {
      try {
        const quizData = {
          University: university,
          Subject_code: subjectCode,
          category,
          questions: questions.map((q) => ({
            questionText: q.questionText,
            options: q.options.map((option, index) => ({
              optionText: option,
              isCorrect: index === parseInt(q.correctOption),
            })),
          })),
        };

        const response = await axios.post(
          "https://requin-quiz-backend.vercel.app/api/quiz/",
          quizData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        alert("Quiz created successfully!");
        console.log(response.data);

        // Reset form
        setUniversity("");
        setSubjectCode("");
        setCategory("");
        setQuestions([
          { questionText: "", options: ["", "", "", ""], correctOption: "" },
        ]);
      } catch (error) {
        console.error(
          "Error creating quiz:",
          error.response?.data || error.message
        );
        alert("Failed to create quiz");
      }
    }
    // Handling static quiz with file upload or manual entry
    else if (quizType === "static") {
      if (uploadOption === "file" && file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("university", university);
        formData.append("subjectCode", subjectCode);
        formData.append("category", category);

        try {
          const response = await axios.post(
            "https://requin-quiz-backend.vercel.app/api/quiz/upload",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          alert("Quiz uploaded successfully!");
          console.log(response.data);
        } catch (error) {
          console.error(
            "Error uploading file:",
            error.response?.data || error.message
          );
          alert("Failed to upload quiz");
        }
      } else if (uploadOption === "manual" && staticQuestion && staticAnswer) {
        const manualData = {
          University: university,
          Subject_code: subjectCode,
          category,
          question: staticQuestion,
          answer: staticAnswer,
        };

        try {
          const response = await axios.post(
            "https://requin-quiz-backend.vercel.app/api/quiz/manual",
            manualData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          alert("Manual quiz created successfully!");
          console.log(response.data);
        } catch (error) {
          console.error(
            "Error submitting manual data:",
            error.response?.data || error.message
          );
          alert("Failed to create quiz");
        }
      } else {
        alert("Please provide a file or enter a question and answer manually.");
      }
    } else {
      alert("Please select a valid quiz type or upload a file");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-800 to-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 p-8 bg-gray-100">
        <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Add Quiz
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Quiz Type Selection */}
            <div className="flex items-center justify-around">
              <label className="text-gray-700 font-medium">
                <input
                  type="radio"
                  value="dynamic"
                  checked={quizType === "dynamic"}
                  onChange={() => setQuizType("dynamic")}
                  className="mr-2"
                />
                Dynamic
              </label>
              <label className="text-gray-700 font-medium">
                <input
                  type="radio"
                  value="static"
                  checked={quizType === "static"}
                  onChange={() => setQuizType("static")}
                  className="mr-2"
                />
                Static (File Upload / Manual)
              </label>
            </div>

            {/* University, Subject Code, Category */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  University
                </label>
                <input
                  type="text"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Subject Code
                </label>
                <input
                  type="text"
                  value={subjectCode}
                  onChange={(e) => setSubjectCode(e.target.value)}
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Category
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Dynamic Quiz - Questions */}
            {quizType === "dynamic" && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-700">
                  Questions
                </h3>
                {questions.map((q, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white border border-gray-200 rounded-lg shadow-md space-y-3"
                  >
                    <label className="block text-gray-700 font-medium">
                      Question {index + 1}:
                    </label>
                    <input
                      type="text"
                      value={q.questionText}
                      onChange={(e) =>
                        handleQuestionChange(
                          index,
                          "questionText",
                          e.target.value
                        )
                      }
                      required
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
                    />
                    <label className="block text-gray-700 font-medium">
                      Options:
                    </label>
                    {q.options.map((option, optionIndex) => (
                      <input
                        key={optionIndex}
                        type="text"
                        value={option}
                        placeholder={`Option ${optionIndex + 1}`}
                        onChange={(e) =>
                          handleOptionChange(index, optionIndex, e.target.value)
                        }
                        required
                        className="w-full p-2 mb-2 border rounded focus:ring-2 focus:ring-blue-400"
                      />
                    ))}
                    <label className="block text-gray-700 font-medium">
                      Correct Option (0-3):
                    </label>
                    <input
                      type="number"
                      value={q.correctOption}
                      onChange={(e) =>
                        handleQuestionChange(
                          index,
                          "correctOption",
                          e.target.value
                        )
                      }
                      min="0"
                      max="3"
                      required
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddQuestion}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  Add Another Question
                </button>
              </div>
            )}

            {/* Static Quiz - Upload or Manual */}
            {quizType === "static" && (
              <div>
                <div className="flex items-center mb-4">
                  <label className="text-gray-700 font-medium mr-4">
                    <input
                      type="radio"
                      value="file"
                      checked={uploadOption === "file"}
                      onChange={() => setUploadOption("file")}
                      className="mr-2"
                    />
                    Upload File (.xlsx)
                  </label>
                  <label className="text-gray-700 font-medium">
                    <input
                      type="radio"
                      value="manual"
                      checked={uploadOption === "manual"}
                      onChange={() => setUploadOption("manual")}
                      className="mr-2"
                    />
                    Add Question Manually
                  </label>
                </div>

                {/* File Upload */}
                {uploadOption === "file" && (
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Upload Excel File (.xlsx):
                    </label>
                    <input
                      type="file"
                      accept=".xlsx"
                      onChange={handleFileChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                )}

                {/* Manual Question and Answer Entry */}
                {uploadOption === "manual" && (
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Question:
                    </label>
                    <input
                      type="text"
                      value={staticQuestion}
                      onChange={(e) => setStaticQuestion(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                    />
                    <label className="block text-gray-700 font-medium mb-2">
                      Answer:
                    </label>
                    <input
                      type="text"
                      value={staticAnswer}
                      onChange={(e) => setStaticAnswer(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full py-3 bg-green-500 text-white text-lg font-semibold rounded-lg hover:bg-green-600 transition"
            >
              Create Quiz
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddQuiz;
