// import React, { useState } from "react";
// import axios from "axios";
// import Sidebar from "../components/Sidebar"; // Assuming Sidebar is a separate component
// import * as XLSX from "xlsx"; // Correct import

// const AddStaticQuiz = () => {
//   const [quizType] = useState("static"); // Only static
//   const [university, setUniversity] = useState("");
//   const [subjectCode, setSubjectCode] = useState("");
//   const [category, setCategory] = useState("");
//   const [file, setFile] = useState(null);
//   const [staticQuestion, setStaticQuestion] = useState("");
//   const [staticAnswer, setStaticAnswer] = useState("");
//   const [uploadOption, setUploadOption] = useState("file");
//   const [parsedQuestions, setParsedQuestions] = useState([]); // State for parsed questions and answers
//   const [manualQuestions, setManualQuestions] = useState([
//     { question: "", answer: "" },
//   ]); // Array to hold multiple questions and answers

//   // Handle file input and parse the uploaded Excel file
//   const handleFileChange = (e) => {
//     const uploadedFile = e.target.files[0];
//     setFile(uploadedFile);

//     // Parse the Excel file
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const binaryStr = event.target.result;
//       const workbook = XLSX.read(binaryStr, { type: "binary" });

//       // Assuming the data is on the first sheet
//       const worksheet = workbook.Sheets[workbook.SheetNames[0]];

//       // Convert the worksheet data into a JSON format (array of questions and answers)
//       const questionsAndAnswers = XLSX.utils.sheet_to_json(worksheet, {
//         header: 1, // Read the file with headers as the first row
//         defval: "", // Empty cells will be filled with an empty string
//       });

//       console.log(questionsAndAnswers); // Check the data structure

//       // Filter out any rows where the terms "questions" or "answers" are present
//       const filteredData = questionsAndAnswers.filter(([question, answer]) => {
//         return (
//           question.trim().toLowerCase() !== "questions" &&
//           answer.trim().toLowerCase() !== "answers" &&
//           question &&
//           answer
//         );
//       });

//       // Map the filtered rows to a structure suitable for saving
//       const parsedData = filteredData.map(([question, answer]) => ({
//         question,
//         answer,
//       }));

//       setParsedQuestions(parsedData); // Store parsed questions and answers in state
//       console.log(parsedData); // Final mapped questions and answers
//     };

//     reader.readAsBinaryString(uploadedFile);
//   };

//   // Handle adding a new question-answer pair manually
//   const handleAddManualQuestion = () => {
//     setManualQuestions([...manualQuestions, { question: "", answer: "" }]);
//   };

//   // Handle form submission
// const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (quizType === "static") {
//     // Case: File Upload
//     if (uploadOption === "file" && file) {
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("university", university);
//       formData.append("subjectCode", subjectCode);
//       formData.append("category", category);

//       try {
//         const response = await axios.post(
//           "https://requin-quiz-backend.vercel.app/api/quiz/upload", // Backend endpoint for file upload
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );

//         // Now save the parsed questions to the database
//         const quizData = {
//           university,
//           subjectCode,
//           category,
//           questions: parsedQuestions, // Send the parsed questions to the backend
//         };

//         // Sending the parsed questions and other data to the server
//         const quizResponse = await axios.post(
//           "https://requin-quiz-backend.vercel.app/api/quiz/manual", // Backend endpoint to save quiz data (adjust the endpoint if needed)
//           quizData,
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         alert("Quiz uploaded and saved successfully!");
//         console.log(quizResponse.data);
//       } catch (error) {
//         console.error(
//           "Error uploading file or saving quiz:",
//           error.response?.data || error.message
//         );
//         alert("Failed to upload quiz");
//       }
//     }
//     // Case: Manually Adding Questions
//     else if (uploadOption === "manual" && manualQuestions.length > 0) {
//       const manualData = {
//         university,
//         subjectCode,
//         category,
//         questions: manualQuestions,
//       };

//       try {
//         const response = await axios.post(
//           "https://requin-quiz-backend.vercel.app/api/quiz/manual", // Backend endpoint for manual entry
//           manualData,
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         alert("Manual quiz created successfully!");
//         console.log(response.data);
//       } catch (error) {
//         console.error(
//           "Error submitting manual data:",
//           error.response?.data || error.message
//         );
//         alert("Failed to create quiz");
//       }
//     }
//     // Case: File Upload with parsed questions from the Excel file
//     else if (uploadOption === "file" && parsedQuestions.length > 0) {
//       const quizData = {
//         university,
//         subjectCode,
//         category,
//         questions: parsedQuestions, // Use the parsed questions here
//       };

//       try {
//         const response = await axios.post(
//           "https://requin-quiz-backend.vercel.app/api/quiz/upload  ", // Backend endpoint to save quiz data (adjust the endpoint if needed)
//           quizData,
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         alert("All quiz questions uploaded and saved successfully!");
//         console.log(response.data);
//       } catch (error) {
//         console.error(
//           "Error submitting quiz data:",
//           error.response?.data || error.message
//         );
//       }
//     } else {
//       alert("Please provide a file or enter a question and answer manually.");
//     }
//   }
// };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-gray-800 to-gray-900">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main content area */}
//       <div className="flex-1 p-8 bg-gray-100">
//         <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
//           <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
//             Add Static Quiz
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

//             {/* Static Quiz - Upload or Manual */}
//             <div className="flex items-center mb-4">
//               <label className="text-gray-700 font-medium mr-4">
//                 <input
//                   type="radio"
//                   value="file"
//                   checked={uploadOption === "file"}
//                   onChange={() => setUploadOption("file")}
//                   className="mr-2"
//                 />
//                 Upload File (.xlsx)
//               </label>
//               <label className="text-gray-700 font-medium">
//                 <input
//                   type="radio"
//                   value="manual"
//                   checked={uploadOption === "manual"}
//                   onChange={() => setUploadOption("manual")}
//                   className="mr-2"
//                 />
//                 Add Question Manually
//               </label>
//             </div>

//             {/* File Upload */}
//             {uploadOption === "file" && (
//               <div>
//                 <label className="block text-gray-700 font-medium mb-2">
//                   Upload Excel File (.xlsx):
//                 </label>
//                 <input
//                   type="file"
//                   accept=".xlsx"
//                   onChange={handleFileChange}
//                   required
//                   className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>
//             )}

//             {/* Manual Question and Answer Entry */}
//             {uploadOption === "manual" && (
//               <div>
//                 {manualQuestions.map((q, index) => (
//                   <div key={index} className="mb-4">
//                     <label className="block text-gray-700 font-medium mb-2">
//                       Question {index + 1}:
//                     </label>
//                     <input
//                       type="text"
//                       value={q.question}
//                       onChange={(e) => {
//                         const newQuestions = [...manualQuestions];
//                         newQuestions[index].question = e.target.value;
//                         setManualQuestions(newQuestions);
//                       }}
//                       className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
//                     />
//                     <label className="block text-gray-700 font-medium mb-2">
//                       Answer {index + 1}:
//                     </label>
//                     <input
//                       type="text"
//                       value={q.answer}
//                       onChange={(e) => {
//                         const newQuestions = [...manualQuestions];
//                         newQuestions[index].answer = e.target.value;
//                         setManualQuestions(newQuestions);
//                       }}
//                       className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
//                     />
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={handleAddManualQuestion}
//                   className="text-blue-500 hover:underline"
//                 >
//                   Add Another Question
//                 </button>
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

// export default AddStaticQuiz;

// import React, { useState } from "react";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";
// import * as XLSX from "xlsx";

// const AddStaticQuiz = () => {
//   const [quizType] = useState("static"); // Only static
//   const [university, setUniversity] = useState("");
//   const [subjectCode, setSubjectCode] = useState("");
//   const [category, setCategory] = useState("");
//   const [file, setFile] = useState(null);
//   const [uploadOption, setUploadOption] = useState("file");
//   const [parsedQuestions, setParsedQuestions] = useState([]);
//   const [manualQuestions, setManualQuestions] = useState([{ question: "", answer: "" }]);

//   // Handle file input and parse the uploaded Excel file
//   const handleFileChange = (e) => {
//     const uploadedFile = e.target.files[0];
//     setFile(uploadedFile);

//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const binaryStr = event.target.result;
//       const workbook = XLSX.read(binaryStr, { type: "binary" });

//       const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//       const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: "" });

//       const columnHeaders = data[0] || [];
//       let questionIndex = -1;
//       let answerIndex = -1;

//       // Find the column indices for 'questions' and 'answers'
//       columnHeaders.forEach((header, index) => {
//         if (header.toString().toLowerCase().includes("question")) {
//           questionIndex = index;
//         }
//         if (header.toString().toLowerCase().includes("answer")) {
//           answerIndex = index;
//         }
//       });

//       if (questionIndex === -1 || answerIndex === -1) {
//         alert("Error: Could not find appropriate 'Questions' and 'Answers' columns.");
//         return;
//       }

//       const parsedData = data.slice(1).map((row) => {
//         const question = row[questionIndex] || ""; // Extract from question column
//         const answer = row[answerIndex] || ""; // Extract from answer column
//         return { question: question.toString().trim(), answer: answer.toString().trim() };
//       }).filter(({ question, answer }) => question && answer); // Filter empty rows

//       setParsedQuestions(parsedData);
//       console.log(parsedData); // Log final extracted data
//     };

//     reader.readAsBinaryString(uploadedFile);
//   };

//   const handleAddManualQuestion = () => {
//     setManualQuestions([...manualQuestions, { question: "", answer: "" }]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const quizData = {
//       university,
//       subjectCode,
//       category,
//       questions: uploadOption === "file" ? parsedQuestions : manualQuestions,
//     };

//     const url = uploadOption === "file" ? "/api/quiz/upload" : "/api/quiz/manual";

//     try {
//       const response = await axios.post(`https://requin-quiz-backend.vercel.app${url}`, quizData, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       alert("Quiz saved successfully!");
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error saving quiz:", error.response?.data || error.message);
//       alert("Failed to save quiz");
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-gray-800 to-gray-900">
//       <Sidebar />
//       <div className="flex-1 p-8 bg-gray-100">
//         <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
//           <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Add Static Quiz</h2>
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

//             {/* Upload or Manual */}
//             <div className="flex items-center mb-4">
//               <label className="text-gray-700 font-medium mr-4">
//                 <input
//                   type="radio"
//                   value="file"
//                   checked={uploadOption === "file"}
//                   onChange={() => setUploadOption("file")}
//                   className="mr-2"
//                 />
//                 Upload File (.xlsx)
//               </label>
//               <label className="text-gray-700 font-medium">
//                 <input
//                   type="radio"
//                   value="manual"
//                   checked={uploadOption === "manual"}
//                   onChange={() => setUploadOption("manual")}
//                   className="mr-2"
//                 />
//                 Add Manually
//               </label>
//             </div>

//             {/* File Upload */}
//             {uploadOption === "file" && (
//               <div>
//                 <label className="block text-gray-700 font-medium mb-2">
//                   Upload Excel File (.xlsx)
//                 </label>
//                 <input
//                   type="file"
//                   accept=".xlsx"
//                   onChange={handleFileChange}
//                   required
//                   className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>
//             )}

//             {/* Manual Entry */}
//             {uploadOption === "manual" && (
//               <div>
//                 {manualQuestions.map((q, index) => (
//                   <div key={index} className="mb-4">
//                     <label className="block text-gray-700 font-medium mb-2">
//                       Question {index + 1}
//                     </label>
//                     <input
//                       type="text"
//                       value={q.question}
//                       onChange={(e) => {
//                         const newQuestions = [...manualQuestions];
//                         newQuestions[index].question = e.target.value;
//                         setManualQuestions(newQuestions);
//                       }}
//                       className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
//                     />
//                     <label className="block text-gray-700 font-medium mb-2">
//                       Answer {index + 1}
//                     </label>
//                     <input
//                       type="text"
//                       value={q.answer}
//                       onChange={(e) => {
//                         const newQuestions = [...manualQuestions];
//                         newQuestions[index].answer = e.target.value;
//                         setManualQuestions(newQuestions);
//                       }}
//                       className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
//                     />
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={handleAddManualQuestion}
//                   className="text-blue-500 hover:underline"
//                 >
//                   Add Another Question
//                 </button>
//               </div>
//             )}

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

// export default AddStaticQuiz;

// import React, { useState } from "react";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";
// import * as XLSX from "xlsx";

// const AddStaticQuiz = () => {
//   const [quizType] = useState("static"); // Only static
//   const [university, setUniversity] = useState("");
//   const [subjectCode, setSubjectCode] = useState("");
//   const [category, setCategory] = useState("");
//   const [file, setFile] = useState(null);
//   const [uploadOption, setUploadOption] = useState("file");
//   const [parsedQuestions, setParsedQuestions] = useState([]);
//   const [manualQuestions, setManualQuestions] = useState([{ question: "", answer: "" }]);

//   // Handle file input and parse the uploaded Excel file
//   const handleFileChange = (e) => {
//     const uploadedFile = e.target.files[0];
//     setFile(uploadedFile);

//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const binaryStr = event.target.result;
//       const workbook = XLSX.read(binaryStr, { type: "binary" });

//       const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//       const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: "" });

//       const columnHeaders = data[0] || [];
//       let questionIndex = -1;
//       let answerIndex = -1;

//       // Find the column indices for 'questions' and 'answers'
//       columnHeaders.forEach((header, index) => {
//         if (header.toString().toLowerCase().includes("question")) {
//           questionIndex = index;
//         }
//         if (header.toString().toLowerCase().includes("answer")) {
//           answerIndex = index;
//         }
//       });

//       if (questionIndex === -1 || answerIndex === -1) {
//         alert("Error: Could not find appropriate 'Questions' and 'Answers' columns.");
//         return;
//       }

//       const parsedData = data.slice(1).map((row) => {
//         const question = row[questionIndex] || ""; // Extract from question column
//         const answer = row[answerIndex] || ""; // Extract from answer column
//         return { question: question.toString().trim(), answer: answer.toString().trim() };
//       }).filter(({ question, answer }) => question && answer); // Filter empty rows

//       setParsedQuestions(parsedData);
//       console.log(parsedData); // Log final extracted data
//     };

//     reader.readAsBinaryString(uploadedFile);
//   };

//   const handleAddManualQuestion = () => {
//     setManualQuestions([...manualQuestions, { question: "", answer: "" }]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const quizData = {
//       university,
//       subjectCode,
//       category,
//       questions: uploadOption === "file" ? parsedQuestions : manualQuestions,
//     };

//     const formData = new FormData();
//     formData.append("university", university);
//     formData.append("subjectCode", subjectCode);
//     formData.append("category", category);

//     // Append the file if uploading via file option
//     if (uploadOption === "file" && file) {
//       formData.append("file", file);
//     }

//     // Append the questions data as JSON
//     formData.append("questions", JSON.stringify(quizData.questions));

//     const url = uploadOption === "file" ? "/api/quiz/upload" : "/api/quiz/manual";

//     try {
//       const response = await axios.post(`https://requin-quiz-backend.vercel.app${url}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data", // Important for file upload
//         },
//       });
//       alert("Quiz saved successfully!");
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error saving quiz:", error.response?.data || error.message);
//       alert("Failed to save quiz");
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-gray-800 to-gray-900">
//       <Sidebar />
//       <div className="flex-1 p-8 bg-gray-100">
//         <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
//           <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Add Static Quiz</h2>
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

//             {/* Upload or Manual */}
//             <div className="flex items-center mb-4">
//               <label className="text-gray-700 font-medium mr-4">
//                 <input
//                   type="radio"
//                   value="file"
//                   checked={uploadOption === "file"}
//                   onChange={() => setUploadOption("file")}
//                   className="mr-2"
//                 />
//                 Upload File (.xlsx)
//               </label>
//               <label className="text-gray-700 font-medium">
//                 <input
//                   type="radio"
//                   value="manual"
//                   checked={uploadOption === "manual"}
//                   onChange={() => setUploadOption("manual")}
//                   className="mr-2"
//                 />
//                 Add Manually
//               </label>
//             </div>

//             {/* File Upload */}
//             {uploadOption === "file" && (
//               <div>
//                 <label className="block text-gray-700 font-medium mb-2">
//                   Upload Excel File (.xlsx)
//                 </label>
//                 <input
//                   type="file"
//                   accept=".xlsx"
//                   onChange={handleFileChange}
//                   required
//                   className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>
//             )}

//             {/* Manual Entry */}
//             {uploadOption === "manual" && (
//               <div>
//                 {manualQuestions.map((q, index) => (
//                   <div key={index} className="mb-4">
//                     <label className="block text-gray-700 font-medium mb-2">
//                       Question {index + 1}
//                     </label>
//                     <input
//                       type="text"
//                       value={q.question}
//                       onChange={(e) => {
//                         const newQuestions = [...manualQuestions];
//                         newQuestions[index].question = e.target.value;
//                         setManualQuestions(newQuestions);
//                       }}
//                       className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
//                     />
//                     <label className="block text-gray-700 font-medium mb-2">
//                       Answer {index + 1}
//                     </label>
//                     <input
//                       type="text"
//                       value={q.answer}
//                       onChange={(e) => {
//                         const newQuestions = [...manualQuestions];
//                         newQuestions[index].answer = e.target.value;
//                         setManualQuestions(newQuestions);
//                       }}
//                       className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
//                     />
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={handleAddManualQuestion}
//                   className="text-blue-500 hover:underline"
//                 >
//                   Add Another Question
//                 </button>
//               </div>
//             )}

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

// export default AddStaticQuiz;

// import React, { useState } from "react";
// import axios from "axios";
// import * as XLSX from "xlsx";
// import Sidebar from "../components/Sidebar";

// const AddStaticQuiz = () => {
//   const [quizType] = useState("static"); // Only static
//   const [university, setUniversity] = useState("");
//   const [subjectCode, setSubjectCode] = useState("");
//   const [category, setCategory] = useState("");
//   const [file, setFile] = useState(null);
//   const [uploadOption, setUploadOption] = useState("file");
//   const [parsedQuestions, setParsedQuestions] = useState([]);
//   const [manualQuestions, setManualQuestions] = useState([{ question: "", answer: "" }]);

//   const handleFileChange = (e) => {
//     const uploadedFile = e.target.files[0];
//     setFile(uploadedFile);

//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const binaryStr = event.target.result;
//       const workbook = XLSX.read(binaryStr, { type: "binary" });

//       const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//       const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: "" });

//       const columnHeaders = data[0] || [];
//       let questionIndex = -1;
//       let answerIndex = -1;

//       columnHeaders.forEach((header, index) => {
//         if (header.toString().toLowerCase().includes("question")) {
//           questionIndex = index;
//         }
//         if (header.toString().toLowerCase().includes("answer")) {
//           answerIndex = index;
//         }
//       });

//       if (questionIndex === -1 || answerIndex === -1) {
//         alert("Error: Could not find appropriate 'Questions' and 'Answers' columns.");
//         return;
//       }

//       const parsedData = data.slice(1).map((row) => {
//         const question = row[questionIndex] || ""; // Extract from question column
//         const answer = row[answerIndex] || ""; // Extract from answer column
//         return { question: question.toString().trim(), answer: answer.toString().trim() };
//       }).filter(({ question, answer }) => question && answer); // Filter empty rows

//       setParsedQuestions(parsedData);
//     };

//     reader.readAsBinaryString(uploadedFile);
//   };

//   const handleAddManualQuestion = () => {
//     setManualQuestions([...manualQuestions, { question: "", answer: "" }]);
//   };

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (quizType === "static") {
//     // Case: File Upload (with manual questions)
//     if (uploadOption === "file" && file) {
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("university", university);
//       formData.append("subjectCode", subjectCode);
//       formData.append("category", category);

//       try {
//         const fileUploadResponse = await axios.post(
//           "https://requin-quiz-backend.vercel.app/api/quiz/upload", // Backend endpoint for file upload
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );

//         // Now save the parsed questions to the database (assuming file parsing logic exists)
//         const quizData = {
//           university,
//           subjectCode,
//           category,
//           questions: parsedQuestions, // Send the parsed questions to the backend
//         };

//         const saveQuizResponse = await axios.post(
//           "https://requin-quiz-backend.vercel.app/api/quiz/manual", // Backend endpoint to save quiz data (adjust the endpoint if needed)
//           quizData,
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         alert("Quiz uploaded and saved successfully!");
//         console.log(saveQuizResponse.data);
//       } catch (error) {
//         console.error("Error uploading file or saving quiz:", error.response?.data || error.message);
//         alert("Failed to upload quiz");
//       }
//     }

//     // Case: Manually Adding Questions (without file)
//     else if (uploadOption === "manual" && manualQuestions.length > 0) {
//       const manualData = {
//         university,
//         subjectCode,
//         category,
//         questions: manualQuestions,
//       };

//       try {
//         const manualSaveResponse = await axios.post(
//           "https://requin-quiz-backend.vercel.app/api/quiz/manual", // Backend endpoint for manual entry
//           manualData,
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         alert("Manual quiz created successfully!");
//         console.log(manualSaveResponse.data);
//       } catch (error) {
//         console.error("Error submitting manual data:", error.response?.data || error.message);
//         alert("Failed to create quiz");
//       }
//     }

//     // Case: If user uploads file with parsed questions (but no manual data)
//     else if (uploadOption === "file" && parsedQuestions.length > 0) {
//       const quizData = {
//         university,
//         subjectCode,
//         category,
//         questions: parsedQuestions, // Use the parsed questions here
//       };

//       try {
//         const parsedQuizSaveResponse = await axios.post(
//           "https://requin-quiz-backend.vercel.app/api/quiz/upload", // Backend endpoint to save quiz data (adjust the endpoint if needed)
//           quizData,
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         alert("All quiz questions uploaded and saved successfully!");
//         console.log(parsedQuizSaveResponse.data);
//       } catch (error) {
//         console.error("Error submitting quiz data:", error.response?.data || error.message);
//         alert("Failed to save quiz questions");
//       }
//     } else {
//       alert("Please provide a file or enter a question and answer manually.");
//     }
//   }
// };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-gray-800 to-gray-900">
//       <Sidebar />
//       <div className="flex-1 p-8 bg-gray-100">
//         <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
//           <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Add Static Quiz</h2>
//           <form onSubmit={handleSubmit} className="space-y-6">
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

//             <div className="flex items-center mb-4">
//               <label className="text-gray-700 font-medium mr-4">
//                 <input
//                   type="radio"
//                   value="file"
//                   checked={uploadOption === "file"}
//                   onChange={() => setUploadOption("file")}
//                   className="mr-2"
//                 />
//                 Upload File (.xlsx)
//               </label>
//               <label className="text-gray-700 font-medium">
//                 <input
//                   type="radio"
//                   value="manual"
//                   checked={uploadOption === "manual"}
//                   onChange={() => setUploadOption("manual")}
//                   className="mr-2"
//                 />
//                 Add Manually
//               </label>
//             </div>

//             {uploadOption === "file" && (
//               <div>
//                 <label className="block text-gray-700 font-medium mb-2">Upload Excel File (.xlsx)</label>
//                 <input
//                   type="file"
//                   accept=".xlsx"
//                   onChange={handleFileChange}
//                   required
//                   className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>
//             )}

//             {uploadOption === "manual" && (
//               <div>
//                 {manualQuestions.map((q, index) => (
//                   <div key={index} className="mb-4">
//                     <label className="block text-gray-700 font-medium mb-2">Question {index + 1}</label>
//                     <input
//                       type="text"
//                       value={q.question}
//                       onChange={(e) => {
//                         const newQuestions = [...manualQuestions];
//                         newQuestions[index].question = e.target.value;
//                         setManualQuestions(newQuestions);
//                       }}
//                       className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
//                     />
//                     <label className="block text-gray-700 font-medium mb-2">Answer {index + 1}</label>
//                     <input
//                       type="text"
//                       value={q.answer}
//                       onChange={(e) => {
//                         const newQuestions = [...manualQuestions];
//                         newQuestions[index].answer = e.target.value;
//                         setManualQuestions(newQuestions);
//                       }}
//                       className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
//                     />
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={handleAddManualQuestion}
//                   className="text-blue-500 hover:underline"
//                 >
//                   Add Another Question
//                 </button>
//               </div>
//             )}

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

// export default AddStaticQuiz;

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import Sidebar from "../components/Sidebar";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "quill-table-ui/dist/index.css"; // Import table UI styles
import TableUI from "quill-table-ui"; // Import Quill Table UI
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


// Register TableUI for Quill
Quill.register("modules/tableUI", TableUI);

const AddStaticQuiz =() =>{
  
  const [quizType] = useState("static"); // Only static
  const [university, setUniversity] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [uploadOption, setUploadOption] = useState("file");
  const [parsedQuestions, setParsedQuestions] = useState([]);
  const [manualQuestions, setManualQuestions] = useState([
    { question: "", answer: "" },
  ]);

  const quillModules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline", "strike"],
      ["link", "image"],
      [{ align: [] }],
      ["blockquote", "code-block"],
      ["table"], // Table button
      ["clean"],
    ],
    tableUI: true,
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);

    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });

      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        defval: "",
      });

      const columnHeaders = data[0] || [];
      let questionIndex = -1;
      let answerIndex = -1;

      columnHeaders.forEach((header, index) => {
        if (header.toString().toLowerCase().includes("question")) {
          questionIndex = index;
        }
        if (header.toString().toLowerCase().includes("answer")) {
          answerIndex = index;
        }
      });

      if (questionIndex === -1 || answerIndex === -1) {
        alert(
          "Error: Could not find appropriate 'Questions' and 'Answers' columns."
        );
        return;
      }

      const parsedData = data
        .slice(1)
        .map((row) => ({
          question: row[questionIndex]?.toString().trim() || "",
          answer: row[answerIndex]?.toString().trim() || "",
        }))
        .filter(({ question, answer }) => question && answer);

      setParsedQuestions(parsedData);
    };

    reader.readAsBinaryString(uploadedFile);
  };
  //   const handleFileChange = (e) => {
  //   const uploadedFile = e.target.files[0];
  //   setFile(uploadedFile);

  //   const reader = new FileReader();
  //   reader.onload = (event) => {
  //     const binaryStr = event.target.result;
  //     const workbook = XLSX.read(binaryStr, { type: "binary" });

  //     const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  //     const data = XLSX.utils.sheet_to_json(worksheet, {
  //       header: 1,
  //       defval: "",
  //       raw: true // Keeps raw content (HTML-like)
  //     });

  //     const columnHeaders = data[0] || [];
  //     let questionIndex = -1;
  //     let answerIndex = -1;

  //     columnHeaders.forEach((header, index) => {
  //       if (header.toString().toLowerCase().includes("question")) {
  //         questionIndex = index;
  //       }
  //       if (header.toString().toLowerCase().includes("answer")) {
  //         answerIndex = index;
  //       }
  //     });

  //     if (questionIndex === -1 || answerIndex === -1) {
  //       alert("Error: Could not find appropriate 'Questions' and 'Answers' columns.");
  //       return;
  //     }

  //     const parsedData = data.slice(1).map((row) => {
  //       return {
  //         question: row[questionIndex] ? row[questionIndex].toString().replace(/\n/g, "<br/>") : "",
  //         answer: row[answerIndex] ? row[answerIndex].toString().replace(/\n/g, "<br/>") : "",
  //       };
  //     });

  //     setParsedQuestions(parsedData);
  //   };

  //   reader.readAsBinaryString(uploadedFile);
  // };

  const handleAddManualQuestion = () => {
    setManualQuestions([...manualQuestions, { question: "", answer: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (quizType === "static") {
      // Case: File Upload (with manual questions)
      if (uploadOption === "file" && file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("university", university);
        formData.append("subjectCode", subjectCode);
        formData.append("category", category);

        try {
          const fileUploadResponse = await axios.post(
            "https://requin-quiz-backend.vercel.app/api/quiz/upload", // Backend endpoint for file upload
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          // Now save the parsed questions to the database (assuming file parsing logic exists)
          const quizData = {
            university,
            subjectCode,
            category,
            questions: parsedQuestions, // Send the parsed questions to the backend
          };

          const saveQuizResponse = await axios.post(
            "https://requin-quiz-backend.vercel.app/api/quiz/manual", // Backend endpoint to save quiz data (adjust the endpoint if needed)
            quizData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          alert("Quiz uploaded and saved successfully!");
          console.log(saveQuizResponse.data);
        } catch (error) {
          console.error(
            "Error uploading file or saving quiz:",
            error.response?.data || error.message
          );
          alert("Failed to upload quiz");
        }
      }

      // Case: Manually Adding Questions (without file)
      else if (uploadOption === "manual" && manualQuestions.length > 0) {
        const manualData = {
          university,
          subjectCode,
          category,
          questions: manualQuestions,
        };

        try {
          const manualSaveResponse = await axios.post(
            "https://requin-quiz-backend.vercel.app/api/quiz/manual", // Backend endpoint for manual entry
            manualData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          alert("Manual quiz created successfully!");
          console.log(manualSaveResponse.data);
        } catch (error) {
          console.error(
            "Error submitting manual data:",
            error.response?.data || error.message
          );
          alert("Failed to create quiz");
        }
      }

      // Case: If user uploads file with parsed questions (but no manual data)
      else if (uploadOption === "file" && parsedQuestions.length > 0) {
        const quizData = {
          university,
          subjectCode,
          category,
          questions: parsedQuestions, // Use the parsed questions here
        };

        try {
          const parsedQuizSaveResponse = await axios.post(
            "https://requin-quiz-backend.vercel.app/api/quiz/upload", // Backend endpoint to save quiz data (adjust the endpoint if needed)
            quizData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          alert("All quiz questions uploaded and saved successfully!");
          console.log(parsedQuizSaveResponse.data);
        } catch (error) {
          console.error(
            "Error submitting quiz data:",
            error.response?.data || error.message
          );
          alert("Failed to save quiz questions");
        }
      } else {
        alert("Please provide a file or enter a question and answer manually.");
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-800 to-gray-900">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-100">
        <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Add Static Quiz
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
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
                Add Manually
              </label>
            </div>

            {uploadOption === "file" && (
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Upload Excel File (.xlsx)
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

            {uploadOption === "manual" && (
              <div>
                {manualQuestions.map((q, index) => (
                  <div key={index} className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Question {index + 1}
                    </label>
                    <ReactQuill
                      value={q.question}
                      onChange={(value) => {
                        const updatedQuestions = [...manualQuestions];
                        updatedQuestions[index].question = value;
                        setManualQuestions(updatedQuestions);
                      }}
                      modules={quillModules}
                      placeholder="Type your question..."
                    />
                    <label className="block text-gray-700 font-medium mb-2">
                      Answer {index + 1}
                    </label>
                    <ReactQuill
                      value={q.answer}
                      onChange={(value) => {
                        const updatedQuestions = [...manualQuestions];
                        updatedQuestions[index].answer = value;
                        setManualQuestions(updatedQuestions);
                      }}
                      modules={quillModules}
                      placeholder="Type the answer..."
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddManualQuestion}
                  className="text-blue-500 hover:underline"
                >
                  Add Another Question
                </button>
              </div>
            )}

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

export default AddStaticQuiz;

// import React, { useState } from "react";
// import axios from "axios";
// import * as XLSX from "xlsx";
// import Sidebar from "../components/Sidebar";
// import "react-quill/dist/quill.snow.css";

// const AddStaticQuiz = () => {
//   const [university, setUniversity] = useState("");
//   const [subjectCode, setSubjectCode] = useState("");
//   const [category, setCategory] = useState("");
//   const [file, setFile] = useState(null);
//   const [parsedQuestions, setParsedQuestions] = useState([]);

//   const handleFileChange = (e) => {
//     const uploadedFile = e.target.files[0];
//     setFile(uploadedFile);

//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const binaryStr = event.target.result;
//       const workbook = XLSX.read(binaryStr, { type: "binary" });

//       const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//       const data = XLSX.utils.sheet_to_json(worksheet, {
//         header: 1,
//         defval: "",
//         raw: true,
//       });

//       const columnHeaders = data[0] || [];
//       let questionIndex = -1;
//       let answerIndex = -1;

//       columnHeaders.forEach((header, index) => {
//         if (header.toString().toLowerCase().includes("question")) {
//           questionIndex = index;
//         }
//         if (header.toString().toLowerCase().includes("answer")) {
//           answerIndex = index;
//         }
//       });

//       if (questionIndex === -1 || answerIndex === -1) {
//         alert("Error: Could not find 'Questions' or 'Answers' columns.");
//         return;
//       }

//       const parsedData = data.slice(1).map((row) => ({
//         question: row[questionIndex]?.toString() || "",
//         answer: row[answerIndex]?.toString() || "",
//       }));

//       setParsedQuestions(parsedData);
//     };

//     reader.readAsBinaryString(uploadedFile);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!parsedQuestions.length) {
//       alert("Please upload an Excel file with valid questions and answers.");
//       return;
//     }

//     const quizData = {
//       university,
//       subjectCode,
//       category,
//       questions: parsedQuestions,
//     };

//     try {
//       const response = await axios.post("https://requin-quiz-backend.vercel.app/api/quiz/upload", quizData, {
//         headers: { "Content-Type": "application/json" },
//       });
//       alert("Quiz uploaded successfully!");
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error uploading quiz:", error.response?.data || error.message);
//       alert("Failed to upload quiz.");
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-gray-800 to-gray-900">
//       <Sidebar />
//       <div className="flex-1 p-8 bg-gray-100">
//         <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
//           <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Add Static Quiz</h2>
//           <form onSubmit={handleSubmit} className="space-y-6">
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

//             <div>
//               <label className="block text-gray-700 font-medium mb-2">Upload Excel File (.xlsx)</label>
//               <input
//                 type="file"
//                 accept=".xlsx"
//                 onChange={handleFileChange}
//                 required
//                 className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
//               />
//             </div>

//             {parsedQuestions.length > 0 && (
//               <div>
//                 <h3 className="text-xl font-bold mb-4">Parsed Questions</h3>
//                 {parsedQuestions.map((q, index) => (
//                   <div key={index} className="mb-4 border p-4 rounded-lg bg-gray-50">
//                     <p className="font-semibold">Question {index + 1}:</p>
//                     <div dangerouslySetInnerHTML={{ __html: q.question }}></div>
//                     <p className="font-semibold mt-2">Answer:</p>
//                     <div dangerouslySetInnerHTML={{ __html: q.answer }}></div>
//                   </div>
//                 ))}
//               </div>
//             )}

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

// export default AddStaticQuiz;
