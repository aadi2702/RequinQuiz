// import React, { useState } from "react";
// import axios from "axios";
// import Sidebar from "../components/Sidebar"; // Assuming Sidebar is a separate component

// const AddDynamicQuiz = () => {
//   const [quizType] = useState("dynamic"); // Only dynamic
//   const [university, setUniversity] = useState("");
//   const [subjectCode, setSubjectCode] = useState("");
//   const [category, setCategory] = useState("");
//   const [questions, setQuestions] = useState([
//     { questionText: "", options: ["", "", "", ""], correctOption: "" },
//   ]);

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

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Handling dynamic quiz creation
//     try {
//       const quizData = {
//         University: university,
//         Subject_code: subjectCode,
//         category,
//         questions: questions.map((q) => ({
//           questionText: q.questionText,
//           options: q.options.map((option, index) => ({
//             optionText: option,
//             isCorrect: index === parseInt(q.correctOption),
//           })),
//         })),
//       };

//       const response = await axios.post(
//         "http://localhost:5000/api/quiz/",
//         quizData,
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       alert("Quiz created successfully!");
//       console.log(response.data);

//       // Reset form
//       setUniversity("");
//       setSubjectCode("");
//       setCategory("");
//       setQuestions([
//         { questionText: "", options: ["", "", "", ""], correctOption: "" },
//       ]);
//     } catch (error) {
//       console.error(
//         "Error creating quiz:",
//         error.response?.data || error.message
//       );
//       alert("Failed to create quiz");
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-gray-800 to-gray-900">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main content area */}
//       <div className="flex-1 p-8 bg-gray-100">
//         <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
//           <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
//             Add Dynamic Quiz
//           </h2>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* University, Subject Code, Category */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div>
//                 <label className="block text-gray-700 font-medium mb-2">
//                   University
//                 </label>
//                 <input
//                   type="text"
//                   value={university}
//                   onChange={(e) => setUniversity(e.target.value)}
//                   required
//                   className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-medium mb-2">
//                   Subject Code
//                 </label>
//                 <input
//                   type="text"
//                   value={subjectCode}
//                   onChange={(e) => setSubjectCode(e.target.value)}
//                   required
//                   className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-medium mb-2">
//                   Category
//                 </label>
//                 <input
//                   type="text"
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                   required
//                   className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>
//             </div>

//             {/* Dynamic Quiz - Questions */}
//             <div className="space-y-4">
//               <h3 className="text-xl font-semibold text-gray-700">Questions</h3>
//               {questions.map((q, index) => (
//                 <div
//                   key={index}
//                   className="p-4 bg-white border border-gray-200 rounded-lg shadow-md space-y-3"
//                 >
//                   <label className="block text-gray-700 font-medium">
//                     Question {index + 1}:
//                   </label>
//                   <input
//                     type="text"
//                     value={q.questionText}
//                     onChange={(e) =>
//                       handleQuestionChange(
//                         index,
//                         "questionText",
//                         e.target.value
//                       )
//                     }
//                     required
//                     className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
//                   />
//                   <label className="block text-gray-700 font-medium">
//                     Options:
//                   </label>
//                   {q.options.map((option, optionIndex) => (
//                     <input
//                       key={optionIndex}
//                       type="text"
//                       value={option}
//                       placeholder={`Option ${optionIndex + 1}`}
//                       onChange={(e) =>
//                         handleOptionChange(index, optionIndex, e.target.value)
//                       }
//                       required
//                       className="w-full p-2 mb-2 border rounded focus:ring-2 focus:ring-blue-400"
//                     />
//                   ))}
//                   <label className="block text-gray-700 font-medium">
//                     Correct Option (0-3):
//                   </label>
//                   <input
//                     type="number"
//                     value={q.correctOption}
//                     onChange={(e) =>
//                       handleQuestionChange(
//                         index,
//                         "correctOption",
//                         e.target.value
//                       )
//                     }
//                     min="0"
//                     max="3"
//                     required
//                     className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
//                   />
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 onClick={handleAddQuestion}
//                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//               >
//                 Add Another Question
//               </button>
//             </div>

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

// export default AddDynamicQuiz;

// import React, { useState } from "react";
// import axios from "axios";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css"; // Import styles for the editor
// import Sidebar from "../components/Sidebar"; // Assuming Sidebar is a separate component

// const AddDynamicQuiz = () => {
//   const [quizType] = useState("dynamic"); // Only dynamic
//   const [university, setUniversity] = useState("");
//   const [subjectCode, setSubjectCode] = useState("");
//   const [category, setCategory] = useState("");
//   const [questions, setQuestions] = useState([
//     { questionText: "", options: ["", "", "", ""], correctOption: "" },
//   ]);

//   const handleAddQuestion = () => {
//     setQuestions([
//       ...questions,
//       { questionText: "", options: ["", "", "", ""], correctOption: "" },
//     ]);
//   };

//   const handleQuestionChange = (index, value) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[index].questionText = value; // Rich text from editor
//     setQuestions(updatedQuestions);
//   };

//   const handleOptionChange = (questionIndex, optionIndex, value) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[questionIndex].options[optionIndex] = value;
//     setQuestions(updatedQuestions);
//   };

//   const handleCorrectOptionChange = (index, value) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[index].correctOption = value;
//     setQuestions(updatedQuestions);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const quizData = {
//         university,
//         subjectCode,
//         category,
//         questions: questions.map((q) => ({
//           questionText: q.questionText,
//           options: q.options.map((option, index) => ({
//             optionText: option,
//             isCorrect: index === parseInt(q.correctOption),
//           })),
//         })),
//       };

//       const response = await axios.post(
//         "http://localhost:5000/api/quiz/",
//         quizData,
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       alert("Quiz created successfully!");
//       console.log(response.data);

//       // Reset form
//       setUniversity("");
//       setSubjectCode("");
//       setCategory("");
//       setQuestions([{ questionText: "", options: ["", "", "", ""], correctOption: "" }]);
//     } catch (error) {
//       console.error("Error creating quiz:", error.response?.data || error.message);
//       alert("Failed to create quiz");
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-gray-800 to-gray-900">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main content area */}
//       <div className="flex-1 p-8 bg-gray-100">
//         <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
//           <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Add Dynamic Quiz</h2>
//           <form onSubmit={handleSubmit} className="space-y-6">
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

//             {/* Dynamic Quiz - Questions */}
//             <div className="space-y-4">
//               <h3 className="text-xl font-semibold text-gray-700">Questions</h3>
//               {questions.map((q, index) => (
//                 <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg shadow-md space-y-3">
//                   <label className="block text-gray-700 font-medium">Question {index + 1}:</label>
//                   <ReactQuill
//                     theme="snow"
//                     value={q.questionText}
//                     onChange={(value) => handleQuestionChange(index, value)}
//                   />
//                   <label className="block text-gray-700 font-medium">Options:</label>
//                   {q.options.map((option, optionIndex) => (
//                     <input
//                       key={optionIndex}
//                       type="text"
//                       value={option}
//                       placeholder={`Option ${optionIndex + 1}`}
//                       onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
//                       required
//                       className="w-full p-2 mb-2 border rounded focus:ring-2 focus:ring-blue-400"
//                     />
//                   ))}
//                   <label className="block text-gray-700 font-medium">Correct Option (0-3):</label>
//                   <input
//                     type="number"
//                     value={q.correctOption}
//                     onChange={(e) => handleCorrectOptionChange(index, e.target.value)}
//                     min="0"
//                     max="3"
//                     required
//                     className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
//                   />
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 onClick={handleAddQuestion}
//                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//               >
//                 Add Another Question
//               </button>
//             </div>

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

// export default AddDynamicQuiz;

// import React, { useState } from "react";
// import axios from "axios";
// import Sidebar from "../components/Sidebar"; // Assuming Sidebar is a separate component
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css"; // Import styles for the rich text editor

// // Utility function to strip unnecessary tags
// const stripTags = (html) => {
//   const tempDiv = document.createElement("div");
//   tempDiv.innerHTML = html;
//   return tempDiv.textContent || tempDiv.innerText || "";
// };

// const AddDynamicQuiz = () => {
//   const [quizType] = useState("dynamic"); // Only dynamic
//   const [university, setUniversity] = useState("");
//   const [subjectCode, setSubjectCode] = useState("");
//   const [category, setCategory] = useState("");
//   const [questions, setQuestions] = useState([
//     { questionText: "", options: ["", "", "", ""], correctOption: "" },
//   ]);

//   const handleAddQuestion = () => {
//     setQuestions([
//       ...questions,
//       { questionText: "", options: ["", "", "", ""], correctOption: "" },
//     ]);
//   };

//   const handleQuestionChange = (index, value) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[index].questionText = value;
//     setQuestions(updatedQuestions);
//   };

//   const handleOptionChange = (questionIndex, optionIndex, value) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[questionIndex].options[optionIndex] = value;
//     setQuestions(updatedQuestions);
//   };

//   const handleCorrectOptionChange = (index, value) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[index].correctOption = value;
//     setQuestions(updatedQuestions);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Handling dynamic quiz creation
//     try {
//       const quizData = {
//         University: university,
//         Subject_code: subjectCode,
//         category,
//         questions: questions.map((q) => ({
//           questionText: q.questionText,
//           options: q.options.map((option, index) => ({
//             optionText: option,
//             isCorrect: index === parseInt(q.correctOption),
//           })),
//         })),
//       };

//       const response = await axios.post(
//         "http://localhost:5000/api/quiz/",
//         quizData,
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       alert("Quiz created successfully!");
//       console.log(response.data);

//       // Reset form
//       setUniversity("");
//       setSubjectCode("");
//       setCategory("");
//       setQuestions([{ questionText: "", options: ["", "", "", ""], correctOption: "" }]);
//     } catch (error) {
//       console.error("Error creating quiz:", error.response?.data || error.message);
//       alert("Failed to create quiz");
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-gray-800 to-gray-900">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main content area */}
//       <div className="flex-1 p-8 bg-gray-100">
//         <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
//           <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Add Dynamic Quiz</h2>
//           <form onSubmit={handleSubmit} className="space-y-6">
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

//             {/* Dynamic Quiz - Questions */}
//             <div className="space-y-4">
//               <h3 className="text-xl font-semibold text-gray-700">Questions</h3>
//               {questions.map((q, index) => (
//                 <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg shadow-md space-y-3">
//                   {/* Question Text */}
//                   <label className="block text-gray-700 font-medium">Question {index + 1}:</label>
//                   <ReactQuill
//                     theme="snow"
//                     value={q.questionText}
//                     onChange={(value) => handleQuestionChange(index, value)}
//                   />
//                   {/* Render the question preview */}
//                   <div className="mt-2 text-sm text-gray-600">
//                     {stripTags(q.questionText)}
//                   </div>

//                   {/* Options */}
//                   <label className="block text-gray-700 font-medium">Options:</label>
//                   {q.options.map((option, optionIndex) => (
//                     <div key={optionIndex} className="space-y-1">
//                       <ReactQuill
//                         theme="snow"
//                         value={option}
//                         placeholder={`Option ${optionIndex + 1}`}
//                         onChange={(value) => handleOptionChange(index, optionIndex, value)}
//                       />
//                       {/* Render the option preview */}
//                       <div className="mt-2 text-sm text-gray-600">
//                         {stripTags(option)}
//                       </div>
//                     </div>
//                   ))}

//                   {/* Correct Option */}
//                   <label className="block text-gray-700 font-medium">Correct Option (0-3):</label>
//                   <input
//                     type="number"
//                     value={q.correctOption}
//                     onChange={(e) => handleCorrectOptionChange(index, e.target.value)}
//                     min="0"
//                     max="3"
//                     required
//                     className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
//                   />
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 onClick={handleAddQuestion}
//                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//               >
//                 Add Another Question
//               </button>
//             </div>

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

// export default AddDynamicQuiz;

// import React, { useState, useRef } from "react";
// import axios from "axios";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css"; // Import Quill styles

// import Sidebar from "../components/Sidebar"; // Assuming Sidebar is a separate component

// const AddDynamicQuiz = () => {
//   const [quizType] = useState("dynamic");
//   const [university, setUniversity] = useState("");
//   const [subjectCode, setSubjectCode] = useState("");
//   const [category, setCategory] = useState("");
//   const [questions, setQuestions] = useState([
//     { questionText: "", options: ["", "", "", ""], correctOption: "" },
//   ]);
  
//   const quillRef = useRef(null); // Reference for Quill editor

//   // Handle adding new questions
//   const handleAddQuestion = () => {
//     setQuestions([
//       ...questions,
//       { questionText: "", options: ["", "", "", ""], correctOption: "" },
//     ]);
//   };

//   // Handle change in question and options
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

//   // Image handler for inserting images in the editor
//   const imageHandler = () => {
//     const input = document.createElement("input");
//     input.setAttribute("type", "file");
//     input.setAttribute("accept", "image/*");
//     input.click();

//     input.onchange = async () => {
//       const file = input.files[0];
//       const formData = new FormData();
//       formData.append("image", file);

//       try {
//         const response = await axios.post("YOUR_IMAGE_UPLOAD_URL", formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         });

//         const imageUrl = response.data.url; // Adjust this based on your server response
//         const range = quillRef.current.getEditor().getSelection();
//         quillRef.current.getEditor().insertEmbed(range.index, "image", imageUrl);
//       } catch (error) {
//         console.error("Error uploading image:", error);
//       }
//     };
//   };

//   // Handle submit logic
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Handle dynamic quiz creation
//     try {
//       const quizData = {
//         University: university,
//         Subject_code: subjectCode,
//         category,
//         questions: questions.map((q) => ({
//           questionText: q.questionText,
//           options: q.options.map((option, index) => ({
//             optionText: option,
//             isCorrect: index === parseInt(q.correctOption),
//           })),
//         })),
//       };

//       const response = await axios.post("http://localhost:5000/api/quiz/", quizData, {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       alert("Quiz created successfully!");
//       console.log(response.data);

//       // Reset form
//       setUniversity("");
//       setSubjectCode("");
//       setCategory("");
//       setQuestions([{ questionText: "", options: ["", "", "", ""], correctOption: "" }]);
//     } catch (error) {
//       console.error("Error creating quiz:", error.response?.data || error.message);
//       alert("Failed to create quiz");
//     }
//   };

//   // Modules for the React-Quill editor (customized for image and table)
//   const modules = {
//     toolbar: [
//       [{ header: "1" }, { header: "2" }, { font: [] }],
//       [{ list: "ordered" }, { list: "bullet" }],
//       ["bold", "italic", "underline", "strike"],
//       ["link", "image"],
//       [{ align: [] }],
//       ["blockquote", "code-block"],
//       [{ "insert-table": "Table" }], // Custom button for inserting table
//     ],
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-gray-800 to-gray-900">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main content area */}
//       <div className="flex-1 p-8 bg-gray-100">
//         <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
//           <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Add Dynamic Quiz</h2>
//           <form onSubmit={handleSubmit} className="space-y-6">
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

//             {/* Dynamic Quiz - Questions */}
//             <div className="space-y-4">
//               <h3 className="text-xl font-semibold text-gray-700">Questions</h3>
//               {questions.map((q, index) => (
//                 <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg shadow-md space-y-3">
//                   <label className="block text-gray-700 font-medium">Question {index + 1}:</label>
//                   <ReactQuill
//                     value={q.questionText}
//                     onChange={(value) => handleQuestionChange(index, "questionText", value)}
//                     modules={modules}
//                     placeholder="Type your question here..."
//                     ref={quillRef}
//                     className="w-full"
//                   />
//                   <label className="block text-gray-700 font-medium">Options:</label>
//                   {q.options.map((option, optionIndex) => (
//                     <input
//                       key={optionIndex}
//                       type="text"
//                       value={option}
//                       placeholder={`Option ${optionIndex + 1}`}
//                       onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
//                       required
//                       className="w-full p-2 mb-2 border rounded focus:ring-2 focus:ring-blue-400"
//                     />
//                   ))}
//                   <label className="block text-gray-700 font-medium">Correct Option (0-3):</label>
//                   <input
//                     type="number"
//                     value={q.correctOption}
//                     onChange={(e) => handleQuestionChange(index, "correctOption", e.target.value)}
//                     min="0"
//                     max="3"
//                     required
//                     className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
//                   />
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 onClick={handleAddQuestion}
//                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//               >
//                 Add Another Question
//               </button>
//             </div>

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

// export default AddDynamicQuiz;

// import React, { useState, useRef } from "react";
// import axios from "axios";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css"; // Import Quill styles

// import Sidebar from "../components/Sidebar"; // Assuming Sidebar is a separate component

// const AddDynamicQuiz = () => {
//   const [quizType] = useState("dynamic");
//   const [university, setUniversity] = useState("");
//   const [subjectCode, setSubjectCode] = useState("");
//   const [category, setCategory] = useState("");
//   const [questions, setQuestions] = useState([
//     { questionText: "", options: ["", "", "", ""], correctOption: "" },
//   ]);

//   const quillRef = useRef(null); // Reference for Quill editor

//   // Handle adding new questions
//   const handleAddQuestion = () => {
//     setQuestions([
//       ...questions,
//       { questionText: "", options: ["", "", "", ""], correctOption: "" },
//     ]);
//   };

//   // Handle change in question and options
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

//   // Image handler for inserting images in the editor
//   const imageHandler = () => {
//     const input = document.createElement("input");
//     input.setAttribute("type", "file");
//     input.setAttribute("accept", "image/*");
//     input.click();

//     input.onchange = async () => {
//       const file = input.files[0];
//       const formData = new FormData();
//       formData.append("image", file);

//       try {
//         const response = await axios.post("YOUR_IMAGE_UPLOAD_URL", formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         });

//         const imageUrl = response.data.url; // Adjust this based on your server response
//         const range = quillRef.current.getEditor().getSelection();
//         quillRef.current.getEditor().insertEmbed(range.index, "image", imageUrl);
//       } catch (error) {
//         console.error("Error uploading image:", error);
//       }
//     };
//   };

//   // Handle submit logic
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Handle dynamic quiz creation
//     try {
//       const quizData = {
//         University: university,
//         Subject_code: subjectCode,
//         category,
//         questions: questions.map((q) => ({
//           questionText: q.questionText,
//           options: q.options.map((option, index) => ({
//             optionText: option,
//             isCorrect: index === parseInt(q.correctOption),
//           })),
//         })),
//       };

//       const response = await axios.post("http://localhost:5000/api/quiz/", quizData, {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       alert("Quiz created successfully!");
//       console.log(response.data);

//       // Reset form
//       setUniversity("");
//       setSubjectCode("");
//       setCategory("");
//       setQuestions([{ questionText: "", options: ["", "", "", ""], correctOption: "" }]);
//     } catch (error) {
//       console.error("Error creating quiz:", error.response?.data || error.message);
//       alert("Failed to create quiz");
//     }
//   };

//   // Modules for the React-Quill editor (customized for image and table)
//   const modules = {
//     toolbar: [
//       [{ header: "1" }, { header: "2" }, { font: [] }],
//       [{ list: "ordered" }, { list: "bullet" }],
//       ["bold", "italic", "underline", "strike"],
//       ["link", "image"],
//       [{ align: [] }],
//       ["blockquote", "code-block"],
//       [{ "insert-table": "Table" }], // Custom button for inserting table
//     ],
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-gray-800 to-gray-900">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main content area */}
//       <div className="flex-1 p-8 bg-gray-100">
//         <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
//           <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Add Dynamic Quiz</h2>
//           <form onSubmit={handleSubmit} className="space-y-6">
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

//             {/* Dynamic Quiz - Questions */}
//             <div className="space-y-4">
//               <h3 className="text-xl font-semibold text-gray-700">Questions</h3>
//               {questions.map((q, index) => (
//                 <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg shadow-md space-y-3">
//                   <label className="block text-gray-700 font-medium">Question {index + 1}:</label>
//                   <ReactQuill
//                     value={q.questionText}
//                     onChange={(value) => handleQuestionChange(index, "questionText", value)}
//                     modules={modules}
//                     placeholder="Type your question here..."
//                     ref={quillRef}
//                     className="w-full mb-4"
//                   />
//                   <label className="block text-gray-700 font-medium">Options:</label>
//                   {q.options.map((option, optionIndex) => (
//                     <div key={optionIndex} className="mb-4">
//                       <label className="block text-gray-700 font-medium">Option {optionIndex + 1}:</label>
//                       <ReactQuill
//                         value={option}
//                         onChange={(value) => handleOptionChange(index, optionIndex, value)}
//                         modules={modules}
//                         placeholder={`Type option ${optionIndex + 1} here...`}
//                         ref={quillRef}
//                         className="w-full"
//                       />
//                     </div>
//                   ))}
//                   <label className="block text-gray-700 font-medium">Correct Option (0-3):</label>
//                   <input
//                     type="number"
//                     value={q.correctOption}
//                     onChange={(e) => handleQuestionChange(index, "correctOption", e.target.value)}
//                     min="0"
//                     max="3"
//                     required
//                     className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
//                   />
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 onClick={handleAddQuestion}
//                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//               >
//                 Add Another Question
//               </button>
//             </div>

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

// export default AddDynamicQuiz;

import React, { useState, useRef } from "react";
import axios from "axios";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "quill-table-ui/dist/index.css"; // Import table UI styles
import Sidebar from "../components/Sidebar";

// Import Quill Table UI
import TableUI from "quill-table-ui"; 

// Register the Quill Table module
Quill.register("modules/tableUI", TableUI);

const AddDynamicQuiz = () => {
  const [quizType] = useState("dynamic");
  const [university, setUniversity] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [category, setCategory] = useState("");
  const [questions, setQuestions] = useState([
    { questionText: "", options: ["", "", "", ""], correctOption: "" },
  ]);

  const quillRef = useRef(null); // Reference for Quill editor

  // Handle adding new questions
  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", options: ["", "", "", ""], correctOption: "" },
    ]);
  };

  // Handle change in question and options
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

  // Image handler for inserting images in the editor
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post("YOUR_IMAGE_UPLOAD_URL", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const imageUrl = response.data.url; // Adjust this based on your server response
        const range = quillRef.current.getEditor().getSelection();
        quillRef.current.getEditor().insertEmbed(range.index, "image", imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    };
  };

  // Handle submit logic
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle dynamic quiz creation
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

      const response = await axios.post("http://localhost:5000/api/quiz/", quizData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Quiz created successfully!");
      console.log(response.data);

      // Reset form
      setUniversity("");
      setSubjectCode("");
      setCategory("");
      setQuestions([{ questionText: "", options: ["", "", "", ""], correctOption: "" }]);
    } catch (error) {
      console.error("Error creating quiz:", error.response?.data || error.message);
      alert("Failed to create quiz");
    }
  };

  // Modules for the React-Quill editor (customized for image and table)
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline", "strike"],
      ["link", "image"],
      [{ align: [] }],
      ["blockquote", "code-block"],
      ["table"], // Table button added here
      ["clean"],
    ],
    tableUI: true, // Enable table UI
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-800 to-gray-900">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-100">
        <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Add Dynamic Quiz</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* University, Subject Code, Category */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">University</label>
                <input
                  type="text"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Subject Code</label>
                <input
                  type="text"
                  value={subjectCode}
                  onChange={(e) => setSubjectCode(e.target.value)}
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Category</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Dynamic Quiz Questions */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-700">Questions</h3>
              {questions.map((q, index) => (
                <div key={index} className="p-4 bg-white border rounded-lg space-y-3">
                  <label className="block font-medium">Question {index + 1}:</label>
                  <ReactQuill
                    value={q.questionText}
                    onChange={(value) => handleQuestionChange(index, "questionText", value)}
                    modules={modules}
                    placeholder="Type your question here..."
                    className="w-full"
                  />
                  <label className="block font-medium">Options:</label>
                  {q.options.map((option, optionIndex) => (
                    <div key={optionIndex}>
                      <ReactQuill
                        value={option}
                        onChange={(value) => handleOptionChange(index, optionIndex, value)}
                        modules={modules}
                        placeholder={`Option ${optionIndex + 1}`}
                        className="w-full"
                      />
                    </div>
                  ))}
                  <label className="block text-gray-700 font-medium">Correct Option (0-3):</label>
                  <input
                    type="number"
                    value={q.correctOption}
                    onChange={(e) => handleQuestionChange(index, "correctOption", e.target.value)}
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

            {/* Submit */}
            <button
              type="submit"
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

export default AddDynamicQuiz;
  