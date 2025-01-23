// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const UniversitySubjectPage = () => {
//   const [questions, setQuestions] = useState([]); // Holds dynamic questions
//   const [colleges, setColleges] = useState([]); // List of universities (colleges)
//   const [subjectCodes, setSubjectCodes] = useState([]); // Subject codes for selected university
//   const [selectedCollege, setSelectedCollege] = useState(""); // Selected university
//   const [selectedSubjectCode, setSelectedSubjectCode] = useState(""); // Selected subject code
//   const [filteredQuestions, setFilteredQuestions] = useState([]); // Filtered questions based on selected subject code
//   const [loading, setLoading] = useState(false); // For loading state
//   const [error, setError] = useState(null); // For error handling

//   // Fetch dynamic questions from the API
//   useEffect(() => {
//     const fetchDynamicQuestions = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get("https://requin-quiz-backend.vercel.app/api/quiz");
//         if (response.data.success) {
//           const allQuestions = response.data.data.flatMap((quiz) =>
//             quiz.questions.map((q) => ({
//               questionText: q.questionText,
//               college: quiz.University,
//               subjectCode: quiz.Subject_code,
//               options: q.options, // Options for each question
//               correctAnswer:
//                 q.options.find((option) => option.isCorrect)?.optionText ||
//                 "No answer available", // Find correct answer
//             }))
//           );
//           setQuestions(allQuestions);

//           // Extract university names (colleges) from questions
//           const dynamicColleges = allQuestions.map((q) => q.college);
//           setColleges((prevColleges) => [...new Set(dynamicColleges)]);
//         } else {
//           setError("No dynamic questions found.");
//         }
//       } catch (error) {
//         setError("Error fetching dynamic questions. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDynamicQuestions();
//   }, []);

//   // Handle university selection and display the subject codes for that university
//   const handleCollegeChange = (college) => {
//     setSelectedCollege(college);

//     // Filter questions for the selected college and extract unique subject codes
//     const filteredSubjectCodes = [
//       ...new Set(
//         questions.filter((q) => q.college === college).map((q) => q.subjectCode)
//       ),
//     ];
//     setSubjectCodes(filteredSubjectCodes);
//     setSelectedSubjectCode(""); // Reset selected subject code when switching colleges
//     setFilteredQuestions([]); // Clear previous questions when changing college
//   };

//   // Handle subject code selection and filter questions based on college and subject code
//   const handleSubjectCodeChange = (subjectCode) => {
//     setSelectedSubjectCode(subjectCode);

//     // Filter questions for the selected college and subject code
//     const filtered = questions.filter(
//       (q) => q.college === selectedCollege && q.subjectCode === subjectCode
//     );
//     setFilteredQuestions(filtered);
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6 text-center">
//         Dynamic Quiz Management
//       </h1>

//       {loading ? (
//         <p className="text-center text-gray-500">Loading universities...</p>
//       ) : error ? (
//         <p className="text-center text-red-500">{error}</p>
//       ) : (
//         <div>
//           {/* Universities (Colleges) */}
//           <div className="mb-6 text-center">
//             <h2 className="font-bold text-lg mb-4">
//               Universities with Dynamic Questions
//             </h2>
//             <div className="flex flex-wrap justify-center gap-4">
//               {colleges.length > 0 ? (
//                 colleges.map((college) => (
//                   <button
//                     key={college}
//                     className={`px-4 py-2 border rounded-lg text-center w-auto max-w-sm ${
//                       selectedCollege === college
//                         ? "bg-blue-500 text-white"
//                         : "bg-gray-100"
//                     } hover:bg-blue-100 transition-colors`}
//                     onClick={() => handleCollegeChange(college)}
//                   >
//                     {college}
//                   </button>
//                 ))
//               ) : (
//                 <p>No universities available</p>
//               )}
//             </div>
//           </div>

//           {/* Subject Codes */}
//           {selectedCollege && subjectCodes.length > 0 && (
//             <div className="mb-6 text-center">
//               <h2 className="font-bold text-lg mb-4">
//                 Subject Codes for {selectedCollege}
//               </h2>
//               <div className="flex flex-wrap justify-center gap-4">
//                 {subjectCodes.map((subjectCode) => (
//                   <button
//                     key={subjectCode}
//                     className={`px-4 py-2 border rounded-lg text-center w-auto max-w-sm ${
//                       selectedSubjectCode === subjectCode
//                         ? "bg-blue-500 text-white"
//                         : "bg-gray-100"
//                     } hover:bg-blue-100 transition-colors`}
//                     onClick={() => handleSubjectCodeChange(subjectCode)}
//                   >
//                     {subjectCode}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Render Dynamic Questions */}
//           {selectedSubjectCode && filteredQuestions.length > 0 && (
//             <div className="mb-6">
//               <h3 className="font-bold text-lg text-center">
//                 Dynamic Questions
//               </h3>
//               <div className="space-y-6">
//                 {filteredQuestions.map((question, index) => (
//                   <div
//                     key={index}
//                     className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
//                   >
//                     <p
//                       className="font-semibold text-lg mb-4"
//                       dangerouslySetInnerHTML={{
//                         __html: `Q${index + 1}: ${question.questionText}`,
//                       }}
//                     ></p>

//                     {/* Render Options */}
//                     <div className="space-y-2 mb-4">
//                       {question.options.map((option, optionIndex) => (
//                         <div
//                           key={optionIndex}
//                           className={`px-4 py-2 border rounded-md bg-gray-100 border-gray-300 text-gray-700 ${
//                             option.isCorrect ? "bg-green-200" : ""
//                           }`}
//                           dangerouslySetInnerHTML={{
//                             __html: option.optionText,
//                           }}
//                         ></div>
//                       ))}
//                     </div>

//                     {/* Correct Answer */}
//                     <p className="text-sm text-gray-700 mb-4">
//                       <strong>Correct Answer:</strong>{" "}
//                       <span
//                         dangerouslySetInnerHTML={{
//                           __html: question.correctAnswer,
//                         }}
//                       ></span>
//                     </p>

//                     <p className="text-sm text-gray-500">
//                       College: {question.college} | Subject Code:{" "}
//                       {question.subjectCode}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* If no questions are found */}
//           {selectedSubjectCode && filteredQuestions.length === 0 && (
//             <p className="text-center text-gray-500">
//               No dynamic questions available for this subject.
//             </p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UniversitySubjectPage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const UniversitySubjectPage = () => {
//   const [questions, setQuestions] = useState([]); // Holds dynamic questions
//   const [colleges, setColleges] = useState([]); // List of universities (colleges)
//   const [subjectCodes, setSubjectCodes] = useState([]); // Subject codes for selected university
//   const [selectedCollege, setSelectedCollege] = useState(""); // Selected university
//   const [selectedSubjectCode, setSelectedSubjectCode] = useState(""); // Selected subject code
//   const [filteredQuestions, setFilteredQuestions] = useState([]); // Filtered questions based on selected subject code
//   const [loading, setLoading] = useState(false); // For loading state
//   const [error, setError] = useState(null); // For error handling

//   // For the edit modal
//   const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
//   const [currentQuestion, setCurrentQuestion] = useState(null); // Holds the current question being edited

//   // Fetch dynamic questions from the API
//   useEffect(() => {
//     const fetchDynamicQuestions = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get("https://requin-quiz-backend.vercel.app/api/quiz");
//         if (response.data.success) {
//           const allQuestions = response.data.data.flatMap((quiz) =>
//             quiz.questions.map((q) => ({
//               questionText: q.questionText,
//               college: quiz.University,
//               subjectCode: quiz.Subject_code,
//               options: q.options, // Options for each question
//               correctAnswer:
//                 q.options.find((option) => option.isCorrect)?.optionText ||
//                 "No answer available", // Find correct answer
//             }))
//           );
//           setQuestions(allQuestions);

//           // Extract university names (colleges) from questions
//           const dynamicColleges = allQuestions.map((q) => q.college);
//           setColleges((prevColleges) => [...new Set(dynamicColleges)]);
//         } else {
//           setError("No dynamic questions found.");
//         }
//       } catch (error) {
//         setError("Error fetching dynamic questions. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDynamicQuestions();
//   }, []);

//   // Handle university selection and display the subject codes for that university
//   const handleCollegeChange = (college) => {
//     setSelectedCollege(college);

//     // Filter questions for the selected college and extract unique subject codes
//     const filteredSubjectCodes = [
//       ...new Set(
//         questions.filter((q) => q.college === college).map((q) => q.subjectCode)
//       ),
//     ];
//     setSubjectCodes(filteredSubjectCodes);
//     setSelectedSubjectCode(""); // Reset selected subject code when switching colleges
//     setFilteredQuestions([]); // Clear previous questions when changing college
//   };

//   // Handle subject code selection and filter questions based on college and subject code
//   const handleSubjectCodeChange = (subjectCode) => {
//     setSelectedSubjectCode(subjectCode);

//     // Filter questions for the selected college and subject code
//     const filtered = questions.filter(
//       (q) => q.college === selectedCollege && q.subjectCode === subjectCode
//     );
//     setFilteredQuestions(filtered);
//   };

//   // Open the edit modal with the selected question's data
//   const handleEditQuestion = (question) => {
//     setCurrentQuestion(question); // Set the current question data
//     setIsModalOpen(true); // Show the modal
//   };

//   // Handle form data change in modal
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCurrentQuestion((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle updating options in modal
//   const handleOptionChange = (index, value) => {
//     const updatedOptions = [...currentQuestion.options];
//     updatedOptions[index] = value;
//     setCurrentQuestion((prev) => ({
//       ...prev,
//       options: updatedOptions,
//     }));
//   };

//   // Handle submitting the edited question to the server
//   const handleSubmitEdit = async () => {
//     try {
//       const updatedData = {
//         questionText: currentQuestion.questionText,
//         options: currentQuestion.options.map((option, index) => ({
//           optionText: option,
//           isCorrect: index === parseInt(currentQuestion.correctAnswer), // Set correct answer based on index
//         })),
//         correctAnswer: currentQuestion.correctAnswer,
//         college: currentQuestion.college,
//         subjectCode: currentQuestion.subjectCode,
//       };

//       const response = await axios.put(
//         `https://requin-quiz-backend.vercel.app/api/quiz/update/${currentQuestion._id}`, // Assuming you have a question ID for update
//         updatedData
//       );
//       if (response.data.success) {
//         // Update the questions list with the new data
//         const updatedQuestions = questions.map((q) =>
//           q._id === currentQuestion._id ? { ...q, ...updatedData } : q
//         );
//         setQuestions(updatedQuestions);
//         setIsModalOpen(false); // Close the modal
//         setCurrentQuestion(null); // Clear current question data
//         alert("Question updated successfully!");
//       } else {
//         alert("Failed to update the question. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error updating question:", error);
//       alert("Failed to update the question. Please try again.");
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6 text-center">
//         Dynamic Quiz Management
//       </h1>

//       {loading ? (
//         <p className="text-center text-gray-500">Loading universities...</p>
//       ) : error ? (
//         <p className="text-center text-red-500">{error}</p>
//       ) : (
//         <div>
//           {/* Universities (Colleges) */}
//           <div className="mb-6 text-center">
//             <h2 className="font-bold text-lg mb-4">
//               Universities with Dynamic Questions
//             </h2>
//             <div className="flex flex-wrap justify-center gap-4">
//               {colleges.length > 0 ? (
//                 colleges.map((college) => (
//                   <button
//                     key={college}
//                     className={`px-4 py-2 border rounded-lg text-center w-auto max-w-sm ${
//                       selectedCollege === college
//                         ? "bg-blue-500 text-white"
//                         : "bg-gray-100"
//                     } hover:bg-blue-100 transition-colors`}
//                     onClick={() => handleCollegeChange(college)}
//                   >
//                     {college}
//                   </button>
//                 ))
//               ) : (
//                 <p>No universities available</p>
//               )}
//             </div>
//           </div>

//           {/* Subject Codes */}
//           {selectedCollege && subjectCodes.length > 0 && (
//             <div className="mb-6 text-center">
//               <h2 className="font-bold text-lg mb-4">
//                 Subject Codes for {selectedCollege}
//               </h2>
//               <div className="flex flex-wrap justify-center gap-4">
//                 {subjectCodes.map((subjectCode) => (
//                   <button
//                     key={subjectCode}
//                     className={`px-4 py-2 border rounded-lg text-center w-auto max-w-sm ${
//                       selectedSubjectCode === subjectCode
//                         ? "bg-blue-500 text-white"
//                         : "bg-gray-100"
//                     } hover:bg-blue-100 transition-colors`}
//                     onClick={() => handleSubjectCodeChange(subjectCode)}
//                   >
//                     {subjectCode}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Render Dynamic Questions */}
//           {selectedSubjectCode && filteredQuestions.length > 0 && (
//             <div className="mb-6">
//               <h3 className="font-bold text-lg text-center">
//                 Dynamic Questions
//               </h3>
//               <div className="space-y-6">
//                 {filteredQuestions.map((question, index) => (
//                   <div
//                     key={index}
//                     className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
//                   >
//                     <p
//                       className="font-semibold text-lg mb-4"
//                       dangerouslySetInnerHTML={{
//                         __html: `Q${index + 1}: ${question.questionText}`,
//                       }}
//                     ></p>

//                     {/* Render Options */}
//                     <div className="space-y-2 mb-4">
//                       {question.options.map((option, optionIndex) => (
//                         <div
//                           key={optionIndex}
//                           className={`px-4 py-2 border rounded-md bg-gray-100 border-gray-300 text-gray-700 ${
//                             option.isCorrect ? "bg-green-200" : ""
//                           }`}
//                           dangerouslySetInnerHTML={{
//                             __html: option.optionText,
//                           }}
//                         ></div>
//                       ))}
//                     </div>

//                     {/* Correct Answer */}
//                     <p className="text-sm text-gray-700 mb-4">
//                       <strong>Correct Answer:</strong>{" "}
//                       <span
//                         dangerouslySetInnerHTML={{
//                           __html: question.correctAnswer,
//                         }}
//                       ></span>
//                     </p>

//                     <p className="text-sm text-gray-500">
//                       College: {question.college} | Subject Code:{" "}
//                       {question.subjectCode}
//                     </p>

//                     {/* Edit Button */}
//                     <button
//                       className="px-4 py-2 bg-yellow-500 text-white rounded-md mt-4 hover:bg-yellow-600"
//                       onClick={() => handleEditQuestion(question)}
//                     >
//                       Edit
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* If no questions are found */}
//           {selectedSubjectCode && filteredQuestions.length === 0 && (
//             <p className="text-center text-gray-500">
//               No dynamic questions available for this subject.
//             </p>
//           )}
//         </div>
//       )}

//       {/* Modal for Editing Question */}
//       {isModalOpen && currentQuestion && (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
//           <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
//             <h2 className="text-2xl font-bold mb-6 text-center">Edit Question</h2>

//             {/* University */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium">University</label>
//               <input
//                 type="text"
//                 name="college"
//                 value={currentQuestion.college}
//                 onChange={handleInputChange}
//                 className="w-full p-3 rounded-md border"
//               />
//             </div>

//             {/* Subject Code */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium">Subject Code</label>
//               <input
//                 type="text"
//                 name="subjectCode"
//                 value={currentQuestion.subjectCode}
//                 onChange={handleInputChange}
//                 className="w-full p-3 rounded-md border"
//               />
//             </div>

//             {/* Question Text */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium">Question</label>
//               <textarea
//                 name="questionText"
//                 value={currentQuestion.questionText}
//                 onChange={handleInputChange}
//                 className="w-full p-3 rounded-md border"
//                 rows="4"
//               />
//             </div>

//             {/* Options */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium">Options</label>
//               {currentQuestion.options.map((option, index) => (
//                 <input
//                   key={index}
//                   type="text"
//                   value={option}
//                   onChange={(e) => handleOptionChange(index, e.target.value)}
//                   className="w-full p-3 mb-2 rounded-md border"
//                   placeholder={`Option ${index + 1}`}
//                 />
//               ))}
//             </div>

//             {/* Correct Answer */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium">Correct Answer</label>
//               <select
//                 name="correctAnswer"
//                 value={currentQuestion.correctAnswer}
//                 onChange={handleInputChange}
//                 className="w-full p-3 rounded-md border"
//               >
//                 {currentQuestion.options.map((option, index) => (
//                   <option key={index} value={index}>
//                     Option {index + 1}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="flex justify-between">
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="px-4 py-2 bg-gray-500 text-white rounded-md"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSubmitEdit}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-md"
//               >
//                 Submit Changes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UniversitySubjectPage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Sidebar from "../components/Sidebar"; // Make sure to import the Sidebar component

// const UniversitySubjectPage = () => {
//   const [questions, setQuestions] = useState([]); // Holds dynamic questions
//   const [colleges, setColleges] = useState([]); // List of universities (colleges)
//   const [subjectCodes, setSubjectCodes] = useState([]); // Subject codes for selected university
//   const [selectedCollege, setSelectedCollege] = useState(""); // Selected university
//   const [selectedSubjectCode, setSelectedSubjectCode] = useState(""); // Selected subject code
//   const [filteredQuestions, setFilteredQuestions] = useState([]); // Filtered questions based on selected subject code
//   const [loading, setLoading] = useState(false); // For loading state
//   const [error, setError] = useState(null); // For error handling

//   // Fetch dynamic questions from the API
//   useEffect(() => {
//     const fetchDynamicQuestions = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get("https://requin-quiz-backend.vercel.app/api/quiz");
//         if (response.data.success) {
//           const allQuestions = response.data.data.flatMap((quiz) =>
//             quiz.questions.map((q) => ({
//               questionText: q.questionText,
//               college: quiz.University,
//               subjectCode: quiz.Subject_code,
//               options: q.options, // Options for each question
//               correctAnswer:
//                 q.options.find((option) => option.isCorrect)?.optionText ||
//                 "No answer available", // Find correct answer
//             }))
//           );
//           setQuestions(allQuestions);

//           // Extract university names (colleges) from questions
//           const dynamicColleges = allQuestions.map((q) => q.college);
//           setColleges((prevColleges) => [...new Set(dynamicColleges)]);
//         } else {
//           setError("No dynamic questions found.");
//         }
//       } catch (error) {
//         setError("Error fetching dynamic questions. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDynamicQuestions();
//   }, []);

//   // Handle university selection and display the subject codes for that university
//   const handleCollegeChange = (college) => {
//     setSelectedCollege(college);

//     // Filter questions for the selected college and extract unique subject codes
//     const filteredSubjectCodes = [
//       ...new Set(
//         questions.filter((q) => q.college === college).map((q) => q.subjectCode)
//       ),
//     ];
//     setSubjectCodes(filteredSubjectCodes);
//     setSelectedSubjectCode(""); // Reset selected subject code when switching colleges
//     setFilteredQuestions([]); // Clear previous questions when changing college
//   };

//   // Handle subject code selection and filter questions based on college and subject code
//   const handleSubjectCodeChange = (subjectCode) => {
//     setSelectedSubjectCode(subjectCode);

//     // Filter questions for the selected college and subject code
//     const filtered = questions.filter(
//       (q) => q.college === selectedCollege && q.subjectCode === subjectCode
//     );
//     setFilteredQuestions(filtered);
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Content Area */}
//       <div className="flex-1 p-8 bg-gray-100">
//         <h1 className="text-3xl font-bold mb-6 text-center">
//           Dynamic Quiz Management
//         </h1>

//         {loading ? (
//           <p className="text-center text-gray-500">Loading universities...</p>
//         ) : error ? (
//           <p className="text-center text-red-500">{error}</p>
//         ) : (
//           <div>
//             {/* Universities (Colleges) */}
//             <div className="mb-6 text-center">
//               <h2 className="font-bold text-lg mb-4">
//                 Universities with Dynamic Questions
//               </h2>
//               <div className="flex flex-wrap justify-center gap-4">
//                 {colleges.length > 0 ? (
//                   colleges.map((college) => (
//                     <button
//                       key={college}
//                       className={`px-4 py-2 border rounded-lg text-center w-auto max-w-sm ${
//                         selectedCollege === college
//                           ? "bg-blue-500 text-white"
//                           : "bg-gray-100"
//                       } hover:bg-blue-100 transition-colors`}
//                       onClick={() => handleCollegeChange(college)}
//                     >
//                       {college}
//                     </button>
//                   ))
//                 ) : (
//                   <p>No universities available</p>
//                 )}
//               </div>
//             </div>

//             {/* Subject Codes */}
//             {selectedCollege && subjectCodes.length > 0 && (
//               <div className="mb-6 text-center">
//                 <h2 className="font-bold text-lg mb-4">
//                   Subject Codes for {selectedCollege}
//                 </h2>
//                 <div className="flex flex-wrap justify-center gap-4">
//                   {subjectCodes.map((subjectCode) => (
//                     <button
//                       key={subjectCode}
//                       className={`px-4 py-2 border rounded-lg text-center w-auto max-w-sm ${
//                         selectedSubjectCode === subjectCode
//                           ? "bg-blue-500 text-white"
//                           : "bg-gray-100"
//                       } hover:bg-blue-100 transition-colors`}
//                       onClick={() => handleSubjectCodeChange(subjectCode)}
//                     >
//                       {subjectCode}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Render Dynamic Questions */}
//             {selectedSubjectCode && filteredQuestions.length > 0 && (
//               <div className="mb-6">
//                 <h3 className="font-bold text-lg text-center">
//                   Dynamic Questions
//                 </h3>
//                 <div className="space-y-6">
//                   {filteredQuestions.map((question, index) => (
//                     <div
//                       key={index}
//                       className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
//                     >
//                       <p
//                         className="font-semibold text-lg mb-4"
//                         dangerouslySetInnerHTML={{
//                           __html: `Q${index + 1}: ${question.questionText}`,
//                         }}
//                       ></p>

//                       {/* Render Options */}
//                       <div className="space-y-2 mb-4">
//                         {question.options.map((option, optionIndex) => (
//                           <div
//                             key={optionIndex}
//                             className={`px-4 py-2 border rounded-md bg-gray-100 border-gray-300 text-gray-700 ${
//                               option.isCorrect ? "bg-green-200" : ""
//                             }`}
//                             dangerouslySetInnerHTML={{
//                               __html: option.optionText,
//                             }}
//                           ></div>
//                         ))}
//                       </div>

//                       {/* Correct Answer */}
//                       <p className="text-sm text-gray-700 mb-4">
//                         <strong>Correct Answer:</strong>{" "}
//                         <span
//                           dangerouslySetInnerHTML={{
//                             __html: question.correctAnswer,
//                           }}
//                         ></span>
//                       </p>

//                       <p className="text-sm text-gray-500">
//                         College: {question.college} | Subject Code:{" "}
//                         {question.subjectCode}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* If no questions are found */}
//             {selectedSubjectCode && filteredQuestions.length === 0 && (
//               <p className="text-center text-gray-500">
//                 No dynamic questions available for this subject.
//               </p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UniversitySubjectPage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";

// const UniversitySubjectPage = () => {
//   const [questions, setQuestions] = useState([]);
//   const [colleges, setColleges] = useState([]);
//   const [subjectCodes, setSubjectCodes] = useState([]);
//   const [selectedCollege, setSelectedCollege] = useState("");
//   const [selectedSubjectCode, setSelectedSubjectCode] = useState("");
//   const [filteredQuestions, setFilteredQuestions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // For editing questions
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [currentQuestion, setCurrentQuestion] = useState(null);
//   const [updatedQuestion, setUpdatedQuestion] = useState({});

//   useEffect(() => {
//     const fetchDynamicQuestions = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get("https://requin-quiz-backend.vercel.app/api/quiz");
//         if (response.data.success) {
//           const allQuestions = response.data.data.flatMap((quiz) =>
//             quiz.questions.map((q) => ({
//               questionText: q.questionText,
//               college: quiz.University,
//               subjectCode: quiz.Subject_code,
//               options: q.options,
//               correctAnswer:
//                 q.options.find((option) => option.isCorrect)?.optionText || "No answer available",
//             }))
//           );
//           setQuestions(allQuestions);
//           const dynamicColleges = allQuestions.map((q) => q.college);
//           setColleges([...new Set(dynamicColleges)]);
//         } else {
//           setError("No dynamic questions found.");
//         }
//       } catch (error) {
//         setError("Error fetching dynamic questions. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDynamicQuestions();
//   }, []);

//   const handleCollegeChange = (college) => {
//     setSelectedCollege(college);
//     const filteredSubjectCodes = [
//       ...new Set(
//         questions.filter((q) => q.college === college).map((q) => q.subjectCode)
//       ),
//     ];
//     setSubjectCodes(filteredSubjectCodes);
//     setSelectedSubjectCode("");
//     setFilteredQuestions([]);
//   };

//   const handleSubjectCodeChange = (subjectCode) => {
//     setSelectedSubjectCode(subjectCode);
//     const filtered = questions.filter(
//       (q) => q.college === selectedCollege && q.subjectCode === subjectCode
//     );
//     setFilteredQuestions(filtered);
//   };

//   const openEditModal = (question) => {
//     setCurrentQuestion(question);
//     setUpdatedQuestion({ ...question });
//     setEditModalOpen(true);
//   };

//   const handleEditChange = (field, value) => {
//     setUpdatedQuestion((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleOptionChange = (index, value) => {
//     const updatedOptions = updatedQuestion.options.map((opt, idx) =>
//       idx === index ? { ...opt, optionText: value } : opt
//     );
//     setUpdatedQuestion((prev) => ({ ...prev, options: updatedOptions }));
//   };

//   const handleSaveChanges = async () => {
//     try {
//       // Add your API endpoint to update the question
//       await axios.post("https://requin-quiz-backend.vercel.app/api/quiz/update", updatedQuestion);
//       alert("Question updated successfully!");
//       setEditModalOpen(false);
//     } catch {
//       alert("Failed to update question.");
//     }
//   };

//   return (
//     <div className="flex min-h-screen">
//       <Sidebar />
//       <div className="flex-1 p-8 bg-gray-100">
//         <h1 className="text-3xl font-bold mb-6 text-center">Dynamic Quiz Management</h1>

//         {loading ? (
//           <p className="text-center text-gray-500">Loading universities...</p>
//         ) : error ? (
//           <p className="text-center text-red-500">{error}</p>
//         ) : (
//           <div>
//             <div className="mb-6 text-center">
//               <h2 className="font-bold text-lg mb-4">Universities with Dynamic Questions</h2>
//               <div className="flex flex-wrap justify-center gap-4">
//                 {colleges.map((college) => (
//                   <button
//                     key={college}
//                     className={`px-4 py-2 border rounded-lg w-auto max-w-sm ${
//                       selectedCollege === college ? "bg-blue-500 text-white" : "bg-gray-100"
//                     } hover:bg-blue-100 transition-colors`}
//                     onClick={() => handleCollegeChange(college)}
//                   >
//                     {college}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {selectedCollege && subjectCodes.length > 0 && (
//               <div className="mb-6 text-center">
//                 <h2 className="font-bold text-lg mb-4">Subject Codes for {selectedCollege}</h2>
//                 <div className="flex flex-wrap justify-center gap-4">
//                   {subjectCodes.map((subjectCode) => (
//                     <button
//                       key={subjectCode}
//                       className={`px-4 py-2 border rounded-lg w-auto max-w-sm ${
//                         selectedSubjectCode === subjectCode ? "bg-blue-500 text-white" : "bg-gray-100"
//                       } hover:bg-blue-100 transition-colors`}
//                       onClick={() => handleSubjectCodeChange(subjectCode)}
//                     >
//                       {subjectCode}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {selectedSubjectCode && filteredQuestions.length > 0 && (
//               <div>
//                 <h3 className="font-bold text-lg text-center">Dynamic Questions</h3>
//                 <div className="space-y-6">
//                   {filteredQuestions.map((question, index) => (
//                     <div
//                       key={index}
//                       className="p-6 border border-gray-300 rounded-lg shadow-md bg-white"
//                     >
//                       <p className="font-semibold text-lg mb-4">{`Q${index + 1}: ${question.questionText}`}</p>
//                       <div className="space-y-2 mb-4">
//                         {question.options.map((option, idx) => (
//                           <div
//                             key={idx}
//                             className={`px-4 py-2 border rounded-md ${
//                               option.isCorrect ? "bg-green-200" : "bg-gray-100"
//                             }`}
//                           >
//                             {option.optionText}
//                           </div>
//                         ))}
//                       </div>
//                       <button
//                         onClick={() => openEditModal(question)}
//                         className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//                       >
//                         Edit
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Edit Modal */}
//       {editModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg w-full max-w-lg">
//             <h2 className="text-2xl font-bold mb-4">Edit Question</h2>
//             <label className="block mb-2">Question</label>
//             <input
//               type="text"
//               value={updatedQuestion.questionText}
//               onChange={(e) => handleEditChange("questionText", e.target.value)}
//               className="w-full p-2 border rounded mb-4"
//             />
//             {updatedQuestion.options.map((option, index) => (
//               <div key={index} className="mb-2">
//                 <label>{`Option ${index + 1}`}</label>
//                 <input
//                   type="text"
//                   value={option.optionText}
//                   onChange={(e) => handleOptionChange(index, e.target.value)}
//                   className="w-full p-2 border rounded"
//                 />
//               </div>
//             ))}
//             <button
//               onClick={handleSaveChanges}
//               className="mt-4 w-full bg-green-500 text-white py-2 rounded"
//             >
//               Save Changes
//             </button>
//             <button
//               onClick={() => setEditModalOpen(false)}
//               className="mt-2 w-full bg-red-500 text-white py-2 rounded"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UniversitySubjectPage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";

// const UniversitySubjectPage = () => {
//   const [questions, setQuestions] = useState([]);
//   const [colleges, setColleges] = useState([]);
//   const [subjectCodes, setSubjectCodes] = useState([]);
//   const [selectedCollege, setSelectedCollege] = useState("");
//   const [selectedSubjectCode, setSelectedSubjectCode] = useState("");
//   const [filteredQuestions, setFilteredQuestions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Edit state
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [currentQuestion, setCurrentQuestion] = useState(null);
//   const [updatedQuestion, setUpdatedQuestion] = useState({
//     university: "",
//     subjectCode: "",
//     category: "",
//     questionText: "",
//     options: [],
//     correctOption: "",
//   });

//   useEffect(() => {
//     const fetchDynamicQuestions = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get("https://requin-quiz-backend.vercel.app/api/quiz");
//         if (response.data.success) {
//           const allQuestions = response.data.data.flatMap((quiz) =>
//             quiz.questions.map((q) => ({
//               questionText: q.questionText,
//               college: quiz.University,
//               subjectCode: quiz.Subject_code,
//               category: quiz.category,
//               options: q.options,
//               correctAnswer:
//                 q.options.find((option) => option.isCorrect)?.optionText ||
//                 "No answer available",
//             }))
//           );
//           setQuestions(allQuestions);
//           const dynamicColleges = allQuestions.map((q) => q.college);
//           setColleges([...new Set(dynamicColleges)]);
//         } else {
//           setError("No dynamic questions found.");
//         }
//       } catch (error) {
//         setError("Error fetching dynamic questions. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDynamicQuestions();
//   }, []);

//   const handleCollegeChange = (college) => {
//     setSelectedCollege(college);
//     const filteredSubjectCodes = [
//       ...new Set(
//         questions.filter((q) => q.college === college).map((q) => q.subjectCode)
//       ),
//     ];
//     setSubjectCodes(filteredSubjectCodes);
//     setSelectedSubjectCode("");
//     setFilteredQuestions([]);
//   };

//   const handleSubjectCodeChange = (subjectCode) => {
//     setSelectedSubjectCode(subjectCode);
//     const filtered = questions.filter(
//       (q) => q.college === selectedCollege && q.subjectCode === subjectCode
//     );
//     setFilteredQuestions(filtered);
//   };

//   const openEditModal = (question) => {
//     setCurrentQuestion(question);
//     setUpdatedQuestion({
//       university: question.college,
//       subjectCode: question.subjectCode,
//       category: question.category,
//       questionText: question.questionText,
//       options: question.options,
//       correctOption: question.options.find((opt) => opt.isCorrect)?.optionText,
//     });
//     setEditModalOpen(true);
//   };

//   const handleEditChange = (field, value) => {
//     setUpdatedQuestion((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleOptionChange = (index, value) => {
//     const updatedOptions = updatedQuestion.options.map((opt, idx) =>
//       idx === index ? { ...opt, optionText: value } : opt
//     );
//     setUpdatedQuestion((prev) => ({ ...prev, options: updatedOptions }));
//   };

//   const handleCorrectOptionChange = (optionText) => {
//     setUpdatedQuestion((prev) => ({
//       ...prev,
//       options: prev.options.map((opt) =>
//         opt.optionText === optionText
//           ? { ...opt, isCorrect: true }
//           : { ...opt, isCorrect: false }
//       ),
//       correctOption: optionText,
//     }));
//   };

//   const handleSaveChanges = async () => {
//     try {
//       await axios.put(
//         `https://requin-quiz-backend.vercel.app/api/quiz/${currentQuestion.quizId}/question/${currentQuestion._id}`,
//         updatedQuestion
//       );
//       alert("Question updated successfully!");
//       setEditModalOpen(false);
//     } catch {
//       alert("Failed to update question.");
//     }
//   };

//   return (
//     <div className="flex min-h-screen">
//       <Sidebar />
//       <div className="flex-1 p-8 bg-gray-100">
//         <h1 className="text-3xl font-bold mb-6 text-center">Dynamic Quiz Management</h1>

//         {loading ? (
//           <p className="text-center text-gray-500">Loading universities...</p>
//         ) : error ? (
//           <p className="text-center text-red-500">{error}</p>
//         ) : (
//           <div>
//             <div className="mb-6 text-center">
//               <h2 className="font-bold text-lg mb-4">Select University</h2>
//               <div className="flex flex-wrap justify-center gap-4">
//                 {colleges.map((college) => (
//                   <button
//                     key={college}
//                     className={`px-4 py-2 border rounded-lg ${
//                       selectedCollege === college
//                         ? "bg-blue-500 text-white"
//                         : "bg-gray-100"
//                     }`}
//                     onClick={() => handleCollegeChange(college)}
//                   >
//                     {college}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {selectedCollege && (
//               <div className="mb-6 text-center">
//                 <h2 className="font-bold text-lg mb-4">
//                   Subject Codes for {selectedCollege}
//                 </h2>
//                 <div className="flex flex-wrap justify-center gap-4">
//                   {subjectCodes.map((subjectCode) => (
//                     <button
//                       key={subjectCode}
//                       className={`px-4 py-2 border rounded-lg ${
//                         selectedSubjectCode === subjectCode
//                           ? "bg-blue-500 text-white"
//                           : "bg-gray-100"
//                       }`}
//                       onClick={() => handleSubjectCodeChange(subjectCode)}
//                     >
//                       {subjectCode}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {selectedSubjectCode && filteredQuestions.length > 0 && (
//               <div>
//                 <h3 className="font-bold text-lg text-center">Dynamic Questions</h3>
//                 <div className="space-y-6">
//                   {filteredQuestions.map((question, index) => (
//                     <div
//                       key={index}
//                       className="p-6 border border-gray-300 rounded-lg shadow-md bg-white"
//                     >
//                       <p className="font-semibold text-lg mb-4">{`Q${index + 1}: ${question.questionText}`}</p>
//                       <div className="space-y-2 mb-4">
//                         {question.options.map((option, idx) => (
//                           <div
//                             key={idx}
//                             className={`px-4 py-2 border rounded-md ${
//                               option.isCorrect ? "bg-green-200" : "bg-gray-100"
//                             }`}
//                           >
//                             {option.optionText}
//                           </div>
//                         ))}
//                       </div>
//                       <button
//                         onClick={() => openEditModal(question)}
//                         className="px-4 py-2 bg-blue-500 text-white rounded-md"
//                       >
//                         Edit
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {editModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg w-full max-w-lg">
//             <h2 className="text-2xl font-bold mb-4">Edit Question</h2>
//             <div>
//               <label className="block mb-2">University Name</label>
//               <input
//                 type="text"
//                 value={updatedQuestion.university}
//                 onChange={(e) => handleEditChange("university", e.target.value)}
//                 className="w-full p-2 border rounded mb-4"
//               />
//             </div>
//             {/* More fields for editing */}
//             <button
//               onClick={handleSaveChanges}
//               className="mt-4 w-full bg-green-500 text-white py-2 rounded"
//             >
//               Save Changes
//             </button>
//             <button
//               onClick={() => setEditModalOpen(false)}
//               className="mt-2 w-full bg-red-500 text-white py-2 rounded"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UniversitySubjectPage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// const UniversitySubjectPage = () => {
//   const [questions, setQuestions] = useState([]);
//   const [colleges, setColleges] = useState([]);
//   const [subjectCodes, setSubjectCodes] = useState([]);
//   const [selectedCollege, setSelectedCollege] = useState("");
//   const [selectedSubjectCode, setSelectedSubjectCode] = useState("");
//   const [filteredQuestions, setFilteredQuestions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // New state for edit modal
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [editingQuestion, setEditingQuestion] = useState(null);

//   // Rich text editor modules configuration
//   const modules = {
//     toolbar: [
//       [{ header: "1" }, { header: "2" }, { font: [] }],
//       [{ list: "ordered" }, { list: "bullet" }],
//       ["bold", "italic", "underline", "strike"],
//       ["link", "image"],
//       [{ align: [] }],
//       ["blockquote", "code-block"],
//       ["clean"],
//     ],
//   };

//   // Existing useEffect and fetch logic...
//   useEffect(() => {
//     const fetchDynamicQuestions = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get("https://requin-quiz-backend.vercel.app/api/quiz");
//         if (response.data.success) {
//           const allQuestions = response.data.data.flatMap((quiz) =>
//             quiz.questions.map((q) => ({
//               id: q._id, // Make sure to include the question ID
//               quizId: quiz._id, // Include the quiz ID
//               questionText: q.questionText,
//               college: quiz.University,
//               subjectCode: quiz.Subject_code,
//               category: quiz.category,
//               options: q.options,
//               correctAnswer: q.options.find((option) => option.isCorrect)?.optionText || "No answer available",
//             }))
//           );
//           setQuestions(allQuestions);
//           const dynamicColleges = allQuestions.map((q) => q.college);
//           setColleges([...new Set(dynamicColleges)]);
//         } else {
//           setError("No dynamic questions found.");
//         }
//       } catch (error) {
//         setError("Error fetching dynamic questions. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDynamicQuestions();
//   }, []);

//   // Existing handlers...
//   const handleCollegeChange = (college) => {
//     setSelectedCollege(college);
//     const filteredSubjectCodes = [
//       ...new Set(
//         questions.filter((q) => q.college === college).map((q) => q.subjectCode)
//       ),
//     ];
//     setSubjectCodes(filteredSubjectCodes);
//     setSelectedSubjectCode("");
//     setFilteredQuestions([]);
//   };

//   const handleSubjectCodeChange = (subjectCode) => {
//     setSelectedSubjectCode(subjectCode);
//     const filtered = questions.filter(
//       (q) => q.college === selectedCollege && q.subjectCode === subjectCode
//     );
//     setFilteredQuestions(filtered);
//   };

//   // New handlers for edit functionality
//   const handleEditClick = (question) => {
//     const editQuestion = {
//       ...question,
//       correctOption: question.options.findIndex(opt => opt.isCorrect),
//     };
//     setEditingQuestion(editQuestion);
//     setIsEditModalOpen(true);
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const updatedQuestionData = {
//         questionText: editingQuestion.questionText,
//         options: editingQuestion.options.map((option, index) => ({
//           optionText: option.optionText,
//           isCorrect: index === parseInt(editingQuestion.correctOption)
//         })),
//       };

//       await axios.put(
//         `https://requin-quiz-backend.vercel.app/api/quiz/${editingQuestion.quizId}/question/${editingQuestion.id}`,
//         updatedQuestionData,
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       // Refresh questions after update
//       const response = await axios.get("https://requin-quiz-backend.vercel.app/api/quiz");
//       if (response.data.success) {
//         const allQuestions = response.data.data.flatMap((quiz) =>
//           quiz.questions.map((q) => ({
//             id: q._id,
//             quizId: quiz._id,
//             questionText: q.questionText,
//             college: quiz.University,
//             subjectCode: quiz.Subject_code,
//             category: quiz.category,
//             options: q.options,
//             correctAnswer: q.options.find((option) => option.isCorrect)?.optionText || "No answer available",
//           }))
//         );
//         setQuestions(allQuestions);

//         // Update filtered questions
//         const filtered = allQuestions.filter(
//           (q) => q.college === selectedCollege && q.subjectCode === selectedSubjectCode
//         );
//         setFilteredQuestions(filtered);
//       }

//       setIsEditModalOpen(false);
//       setEditingQuestion(null);
//       alert("Question updated successfully!");
//     } catch (error) {
//       console.error("Error updating question:", error);
//       alert("Failed to update question");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleQuestionTextChange = (value) => {
//     setEditingQuestion({
//       ...editingQuestion,
//       questionText: value
//     });
//   };

//   const handleOptionChange = (optionIndex, value) => {
//     const updatedOptions = [...editingQuestion.options];
//     updatedOptions[optionIndex] = {
//       ...updatedOptions[optionIndex],
//       optionText: value
//     };
//     setEditingQuestion({
//       ...editingQuestion,
//       options: updatedOptions
//     });
//   };

//   return (
//     <div className="flex min-h-screen">
//       <Sidebar />
//       <div className="flex-1 p-8 bg-gray-100">
//         <h1 className="text-3xl font-bold mb-6 text-center">
//           Dynamic Quiz Management
//         </h1>

//         {/* Existing UI components... */}
//         {loading ? (
//           <p className="text-center text-gray-500">Loading...</p>
//         ) : error ? (
//           <p className="text-center text-red-500">{error}</p>
//         ) : (
//           <div>
//             {/* Universities Section */}
//             <div className="mb-6 text-center">
//               <h2 className="font-bold text-lg mb-4">
//                 Universities with Dynamic Questions
//               </h2>
//               <div className="flex flex-wrap justify-center gap-4">
//                 {colleges.map((college) => (
//                   <button
//                     key={college}
//                     className={`px-4 py-2 border rounded-lg text-center w-auto max-w-sm ${
//                       selectedCollege === college
//                         ? "bg-blue-500 text-white"
//                         : "bg-gray-100"
//                     } hover:bg-blue-100 transition-colors`}
//                     onClick={() => handleCollegeChange(college)}
//                   >
//                     {college}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Subject Codes Section */}
//             {selectedCollege && (
//               <div className="mb-6 text-center">
//                 <h2 className="font-bold text-lg mb-4">
//                   Subject Codes for {selectedCollege}
//                 </h2>
//                 <div className="flex flex-wrap justify-center gap-4">
//                   {subjectCodes.map((subjectCode) => (
//                     <button
//                       key={subjectCode}
//                       className={`px-4 py-2 border rounded-lg text-center w-auto max-w-sm ${
//                         selectedSubjectCode === subjectCode
//                           ? "bg-blue-500 text-white"
//                           : "bg-gray-100"
//                       } hover:bg-blue-100 transition-colors`}
//                       onClick={() => handleSubjectCodeChange(subjectCode)}
//                     >
//                       {subjectCode}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Questions Section */}
//             {selectedSubjectCode && filteredQuestions.length > 0 && (
//               <div className="mb-6">
//                 <h3 className="font-bold text-lg text-center">
//                   Dynamic Questions
//                 </h3>
//                 <div className="space-y-6">
//                   {filteredQuestions.map((question, index) => (
//                     <div
//                       key={index}
//                       className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
//                     >
//                       <div className="flex justify-between items-start mb-4">
//                         <p
//                           className="font-semibold text-lg"
//                           dangerouslySetInnerHTML={{
//                             __html: `Q${index + 1}: ${question.questionText}`,
//                           }}
//                         ></p>
//                         <button
//                           onClick={() => handleEditClick(question)}
//                           className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//                         >
//                           Edit
//                         </button>
//                       </div>

//                       <div className="space-y-2 mb-4">
//                         {question.options.map((option, optionIndex) => (
//                           <div
//                             key={optionIndex}
//                             className={`px-4 py-2 border rounded-md ${
//                               option.isCorrect ? "bg-green-200" : "bg-gray-100"
//                             } border-gray-300 text-gray-700`}
//                             dangerouslySetInnerHTML={{
//                               __html: option.optionText,
//                             }}
//                           ></div>
//                         ))}
//                       </div>

//                       <p className="text-sm text-gray-500">
//                         College: {question.college} | Subject Code:{" "}
//                         {question.subjectCode}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Edit Modal */}
//         {isEditModalOpen && editingQuestion && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//             <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-90vh overflow-y-auto">
//               <h2 className="text-2xl font-bold mb-6">Edit Question</h2>
//               <form onSubmit={handleEditSubmit} className="space-y-6">
//                 <div>
//                   <label className="block font-medium mb-2">Question Text:</label>
//                   <ReactQuill
//                     value={editingQuestion.questionText}
//                     onChange={handleQuestionTextChange}
//                     modules={modules}
//                     className="bg-white mb-4"
//                   />
//                 </div>

//                 <div className="space-y-4">
//                   <label className="block font-medium">Options:</label>
//                   {editingQuestion.options.map((option, index) => (
//                     <div key={index}>
//                       <ReactQuill
//                         value={option.optionText}
//                         onChange={(value) => handleOptionChange(index, value)}
//                         modules={modules}
//                         className="bg-white mb-2"
//                       />
//                     </div>
//                   ))}
//                 </div>

//                 <div>
//                   <label className="block font-medium mb-2">
//                     Correct Option (0-3):
//                   </label>
//                   <input
//                     type="number"
//                     value={editingQuestion.correctOption}
//                     onChange={(e) =>
//                       setEditingQuestion({
//                         ...editingQuestion,
//                         correctOption: e.target.value,
//                       })
//                     }
//                     min="0"
//                     max="3"
//                     required
//                     className="w-full p-2 border rounded"
//                   />
//                 </div>

//                 <div className="flex justify-end space-x-4">
//                   <button
//                     type="button"
//                     onClick={() => setIsEditModalOpen(false)}
//                     className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                   >
//                     Save Changes
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UniversitySubjectPage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// const UniversitySubjectPage = () => {
//   const [questions, setQuestions] = useState([]);
//   const [colleges, setColleges] = useState([]);
//   const [subjectCodes, setSubjectCodes] = useState([]);
//   const [selectedCollege, setSelectedCollege] = useState("");
//   const [selectedSubjectCode, setSelectedSubjectCode] = useState("");
//   const [filteredQuestions, setFilteredQuestions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // New state for edit modal
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [editingQuestion, setEditingQuestion] = useState(null);

//   // Rich text editor modules configuration
//   const modules = {
//     toolbar: [
//       [{ header: "1" }, { header: "2" }, { font: [] }],
//       [{ list: "ordered" }, { list: "bullet" }],
//       ["bold", "italic", "underline", "strike"],
//       ["link", "image"],
//       [{ align: [] }],
//       ["blockquote", "code-block"],
//       ["clean"],
//     ],
//   };

//   // Existing useEffect and fetch logic...
//   useEffect(() => {
//     const fetchDynamicQuestions = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get("https://requin-quiz-backend.vercel.app/api/quiz");
//         if (response.data.success) {
//           const allQuestions = response.data.data.flatMap((quiz) =>
//             quiz.questions.map((q) => ({
//               id: q._id, // Make sure to include the question ID
//               quizId: quiz._id, // Include the quiz ID
//               questionText: q.questionText,
//               college: quiz.University,
//               subjectCode: quiz.Subject_code,
//               category: quiz.category,
//               options: q.options,
//               correctAnswer: q.options.find((option) => option.isCorrect)?.optionText || "No answer available",
//             }))
//           );
//           setQuestions(allQuestions);
//           const dynamicColleges = allQuestions.map((q) => q.college);
//           setColleges([...new Set(dynamicColleges)]);
//         } else {
//           setError("No dynamic questions found.");
//         }
//       } catch (error) {
//         setError("Error fetching dynamic questions. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDynamicQuestions();
//   }, []);

//   // Existing handlers...
//   const handleCollegeChange = (college) => {
//     setSelectedCollege(college);
//     const filteredSubjectCodes = [
//       ...new Set(
//         questions.filter((q) => q.college === college).map((q) => q.subjectCode)
//       ),
//     ];
//     setSubjectCodes(filteredSubjectCodes);
//     setSelectedSubjectCode("");
//     setFilteredQuestions([]);
//   };

//   const handleSubjectCodeChange = (subjectCode) => {
//     setSelectedSubjectCode(subjectCode);
//     const filtered = questions.filter(
//       (q) => q.college === selectedCollege && q.subjectCode === subjectCode
//     );
//     setFilteredQuestions(filtered);
//   };

//   // New handlers for edit functionality
//   const handleEditClick = (question) => {
//     const editQuestion = {
//       ...question,
//       correctOption: question.options.findIndex((opt) => opt.isCorrect),
//     };
//     setEditingQuestion(editQuestion);
//     setIsEditModalOpen(true);
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const updatedQuestionData = {
//         questionText: editingQuestion.questionText,
//         options: editingQuestion.options.map((option, index) => ({
//           optionText: option.optionText,
//           isCorrect: index === parseInt(editingQuestion.correctOption),
//         })),
//       };

//       await axios.put(
//         `https://requin-quiz-backend.vercel.app/api/quiz/${editingQuestion.quizId}/question/${editingQuestion.id}`,
//         updatedQuestionData,
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       // Refresh questions after update
//       const response = await axios.get("https://requin-quiz-backend.vercel.app/api/quiz");
//       if (response.data.success) {
//         const allQuestions = response.data.data.flatMap((quiz) =>
//           quiz.questions.map((q) => ({
//             id: q._id,
//             quizId: quiz._id,
//             questionText: q.questionText,
//             college: quiz.University,
//             subjectCode: quiz.Subject_code,
//             category: quiz.category,
//             options: q.options,
//             correctAnswer:
//               q.options.find((option) => option.isCorrect)?.optionText ||
//               "No answer available",
//           }))
//         );
//         setQuestions(allQuestions);

//         // Update filtered questions
//         const filtered = allQuestions.filter(
//           (q) => q.college === selectedCollege && q.subjectCode === selectedSubjectCode
//         );
//         setFilteredQuestions(filtered);
//       }

//       setIsEditModalOpen(false);
//       setEditingQuestion(null);
//       alert("Question updated successfully!");
//     } catch (error) {
//       console.error("Error updating question:", error);
//       alert("Failed to update question");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleQuestionTextChange = (value) => {
//     setEditingQuestion({
//       ...editingQuestion,
//       questionText: value,
//     });
//   };

//   const handleOptionChange = (optionIndex, value) => {
//     const updatedOptions = [...editingQuestion.options];
//     updatedOptions[optionIndex] = {
//       ...updatedOptions[optionIndex],
//       optionText: value,
//     };
//     setEditingQuestion({
//       ...editingQuestion,
//       options: updatedOptions,
//     });
//   };

//   // New delete handler
//   const handleDeleteClick = async (questionId, quizId) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this question?");
//     if (!confirmDelete) return;

//     setLoading(true);
//     try {
//       // Sending the DELETE request to the backend
//       await axios.delete(
//         `https://requin-quiz-backend.vercel.app/api/quiz/${quizId}/question/${questionId}`,
//         {
//           withCredentials: true,
//         }
//       );

//       // Removing the deleted question from the local state
//       setQuestions((prevQuestions) =>
//         prevQuestions.filter((q) => q.id !== questionId)
//       );
//       // Optionally, update the filtered questions list
//       setFilteredQuestions((prevFiltered) =>
//         prevFiltered.filter((q) => q.id !== questionId)
//       );

//       alert("Question deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting question:", error);
//       alert("Failed to delete question.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen">
//       <Sidebar />
//       <div className="flex-1 p-8 bg-gray-100">
//         <h1 className="text-3xl font-bold mb-6 text-center">
//           Dynamic Quiz Management
//         </h1>

//         {/* Existing UI components... */}
//         {loading ? (
//           <p className="text-center text-gray-500">Loading...</p>
//         ) : error ? (
//           <p className="text-center text-red-500">{error}</p>
//         ) : (
//           <div>
//             {/* Universities Section */}
//             <div className="mb-6 text-center">
//               <h2 className="font-bold text-lg mb-4">
//                 Universities with Dynamic Questions
//               </h2>
//               <div className="flex flex-wrap justify-center gap-4">
//                 {colleges.map((college) => (
//                   <button
//                     key={college}
//                     className={`px-4 py-2 border rounded-lg text-center w-auto max-w-sm ${
//                       selectedCollege === college
//                         ? "bg-blue-500 text-white"
//                         : "bg-gray-100"
//                     } hover:bg-blue-100 transition-colors`}
//                     onClick={() => handleCollegeChange(college)}
//                   >
//                     {college}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Subject Codes Section */}
//             {selectedCollege && (
//               <div className="mb-6 text-center">
//                 <h2 className="font-bold text-lg mb-4">
//                   Subject Codes for {selectedCollege}
//                 </h2>
//                 <div className="flex flex-wrap justify-center gap-4">
//                   {subjectCodes.map((subjectCode) => (
//                     <button
//                       key={subjectCode}
//                       className={`px-4 py-2 border rounded-lg text-center w-auto max-w-sm ${
//                         selectedSubjectCode === subjectCode
//                           ? "bg-blue-500 text-white"
//                           : "bg-gray-100"
//                       } hover:bg-blue-100 transition-colors`}
//                       onClick={() => handleSubjectCodeChange(subjectCode)}
//                     >
//                       {subjectCode}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Questions Section */}
//             {selectedSubjectCode && filteredQuestions.length > 0 && (
//               <div className="mb-6">
//                 <h3 className="font-bold text-lg text-center">
//                   Dynamic Questions
//                 </h3>
//                 <div className="space-y-6">
//                   {filteredQuestions.map((question, index) => (
//                     <div
//                       key={index}
//                       className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
//                     >
//                       <div className="flex justify-between items-start mb-4">
//                         <p
//                           className="font-semibold text-lg"
//                           dangerouslySetInnerHTML={{
//                             __html: `Q${index + 1}: ${question.questionText}`,
//                           }}
//                         ></p>
//                         <div className="flex space-x-2">
//                           <button
//                             onClick={() => handleEditClick(question)}
//                             className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             onClick={() =>
//                               handleDeleteClick(question.id, question.quizId)
//                             }
//                             className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       </div>

//                       <div className="space-y-2 mb-4">
//                         {question.options.map((option, optionIndex) => (
//                           <div
//                             key={optionIndex}
//                             className={`px-4 py-2 border rounded-md ${
//                               option.isCorrect ? "bg-green-200" : "bg-gray-100"
//                             } border-gray-300 text-gray-700`}
//                             dangerouslySetInnerHTML={{
//                               __html: option.optionText,
//                             }}
//                           ></div>
//                         ))}
//                       </div>

//                       <p className="text-sm text-gray-500">
//                         College: {question.college} | Subject Code:{" "}
//                         {question.subjectCode}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Edit Modal */}
//         {isEditModalOpen && editingQuestion && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//             <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-90vh overflow-y-auto">
//               <h2 className="text-2xl font-bold mb-6">Edit Question</h2>
//               <form onSubmit={handleEditSubmit} className="space-y-6">
//                 <div>
//                   <label className="block font-medium mb-2">Question Text:</label>
//                   <ReactQuill
//                     value={editingQuestion.questionText}
//                     onChange={handleQuestionTextChange}
//                     modules={modules}
//                     className="bg-white mb-4"
//                   />
//                 </div>

//                 <div className="space-y-4">
//                   <label className="block font-medium">Options:</label>
//                   {editingQuestion.options.map((option, index) => (
//                     <div key={index}>
//                       <ReactQuill
//                         value={option.optionText}
//                         onChange={(value) => handleOptionChange(index, value)}
//                         modules={modules}
//                         className="bg-white mb-2"
//                       />
//                     </div>
//                   ))}
//                 </div>

//                 <div>
//                   <label className="block font-medium mb-2">
//                     Correct Option (0-3):
//                   </label>
//                   <input
//                     type="number"
//                     value={editingQuestion.correctOption}
//                     onChange={(e) =>
//                       setEditingQuestion({
//                         ...editingQuestion,
//                         correctOption: e.target.value,
//                       })
//                     }
//                     min="0"
//                     max="3"
//                     required
//                     className="w-full p-2 border rounded"
//                   />
//                 </div>

//                 <div className="flex justify-end space-x-4">
//                   <button
//                     type="button"
//                     onClick={() => setIsEditModalOpen(false)}
//                     className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                   >
//                     Save Changes
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UniversitySubjectPage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


const UniversitySubjectPage = () => {
  
  const [questions, setQuestions] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [subjectCodes, setSubjectCodes] = useState([]);
  const [categories, setCategories] = useState([]); // Added for category feature
  const [selectedCollege, setSelectedCollege] = useState("");
  const [selectedSubjectCode, setSelectedSubjectCode] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // Added for category feature
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline", "strike"],
      ["link", "image"],
      [{ align: [] }],
      ["blockquote", "code-block"],
      ["clean"],
    ],
  };

  useEffect(() => {
    const fetchDynamicQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          "https://requin-quiz-backend.vercel.app/api/quiz"
        );
        if (response.data.success) {
          const allQuestions = response.data.data.flatMap((quiz) =>
            quiz.questions.map((q) => ({
              id: q._id,
              quizId: quiz._id,
              questionText: q.questionText,
              college: quiz.University,
              subjectCode: quiz.Subject_code,
              category: quiz.category,
              options: q.options,
              correctAnswer:
                q.options.find((option) => option.isCorrect)?.optionText ||
                "No answer available",
            }))
          );
          setQuestions(allQuestions);
          const dynamicColleges = allQuestions.map((q) => q.college);
          setColleges([...new Set(dynamicColleges)]);
        } else {
          setError("No dynamic questions found.");
        }
      } catch (error) {
        setError("Error fetching dynamic questions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDynamicQuestions();
  }, []);

  // Added effect for updating categories when subject code changes
  useEffect(() => {
    if (selectedSubjectCode) {
      const subjectQuestions = questions.filter(
        (q) =>
          q.college === selectedCollege && q.subjectCode === selectedSubjectCode
      );
      const availableCategories = [
        ...new Set(subjectQuestions.map((q) => q.category)),
      ];
      setCategories(availableCategories.filter(Boolean));
      setSelectedCategory(""); // Reset category when subject code changes
    } else {
      setCategories([]);
      setSelectedCategory("");
    }
  }, [selectedSubjectCode, selectedCollege, questions]);

  const handleCollegeChange = (college) => {
    setSelectedCollege(college);
    const filteredSubjectCodes = [
      ...new Set(
        questions.filter((q) => q.college === college).map((q) => q.subjectCode)
      ),
    ];
    setSubjectCodes(filteredSubjectCodes);
    setSelectedSubjectCode("");
    setSelectedCategory(""); // Reset category when college changes
    setFilteredQuestions([]);
  };

  const handleSubjectCodeChange = (subjectCode) => {
    setSelectedSubjectCode(subjectCode);
    const filtered = questions.filter(
      (q) =>
        q.college === selectedCollege &&
        q.subjectCode === subjectCode &&
        (!selectedCategory || q.category === selectedCategory) // Added category filter
    );
    setFilteredQuestions(filtered);
  };

  // Added handler for category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const filtered = questions.filter(
      (q) =>
        q.college === selectedCollege &&
        q.subjectCode === selectedSubjectCode &&
        (!category || q.category === category)
    );
    setFilteredQuestions(filtered);
  };

  const handleEditClick = (question) => {
    const editQuestion = {
      ...question,
      correctOption: question.options.findIndex((opt) => opt.isCorrect),
    };
    setEditingQuestion(editQuestion);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedQuestionData = {
        questionText: editingQuestion.questionText,
        options: editingQuestion.options.map((option, index) => ({
          optionText: option.optionText,
          isCorrect: index === parseInt(editingQuestion.correctOption),
        })),
      };

      await axios.put(
        `https://requin-quiz-backend.vercel.app/api/quiz/${editingQuestion.quizId}/question/${editingQuestion.id}`,
        updatedQuestionData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const response = await axios.get(
        "https://requin-quiz-backend.vercel.app/api/quiz"
      );
      if (response.data.success) {
        const allQuestions = response.data.data.flatMap((quiz) =>
          quiz.questions.map((q) => ({
            id: q._id,
            quizId: quiz._id,
            questionText: q.questionText,
            college: quiz.University,
            subjectCode: quiz.Subject_code,
            category: quiz.category,
            options: q.options,
            correctAnswer:
              q.options.find((option) => option.isCorrect)?.optionText ||
              "No answer available",
          }))
        );
        setQuestions(allQuestions);

        const filtered = allQuestions.filter(
          (q) =>
            q.college === selectedCollege &&
            q.subjectCode === selectedSubjectCode &&
            (!selectedCategory || q.category === selectedCategory)
        );
        setFilteredQuestions(filtered);
      }

      setIsEditModalOpen(false);
      setEditingQuestion(null);
      alert("Question updated successfully!");
    } catch (error) {
      console.error("Error updating question:", error);
      alert("Failed to update question");
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionTextChange = (value) => {
    setEditingQuestion({
      ...editingQuestion,
      questionText: value,
    });
  };

  const handleOptionChange = (optionIndex, value) => {
    const updatedOptions = [...editingQuestion.options];
    updatedOptions[optionIndex] = {
      ...updatedOptions[optionIndex],
      optionText: value,
    };
    setEditingQuestion({
      ...editingQuestion,
      options: updatedOptions,
    });
  };

  const handleDeleteClick = async (questionId, quizId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this question?"
    );
    if (!confirmDelete) return;

    setLoading(true);
    try {
      await axios.delete(
        `https://requin-quiz-backend.vercel.app/api/quiz/dynamic/${quizId}/${questionId}`,
        {
          withCredentials: true,
        }
      );

      setQuestions((prevQuestions) =>
        prevQuestions.filter((q) => q.id !== questionId)
      );
      setFilteredQuestions((prevFiltered) =>
        prevFiltered.filter((q) => q.id !== questionId)
      );

      alert("Question deleted successfully!");
    } catch (error) {
      console.error("Error deleting question:", error);
      alert("Failed to delete question.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Dynamic Quiz Management
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div>
            <div className="mb-6 text-center">
              <h2 className="font-bold text-lg mb-4">
                Universities with Dynamic Questions
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                {colleges.map((college) => (
                  <button
                    key={college}
                    className={`px-4 py-2 border rounded-lg text-center w-auto max-w-sm ${
                      selectedCollege === college
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100"
                    } hover:bg-blue-100 transition-colors`}
                    onClick={() => handleCollegeChange(college)}
                  >
                    {college}
                  </button>
                ))}
              </div>
            </div>

            {selectedCollege && (
              <div className="mb-6 text-center">
                <h2 className="font-bold text-lg mb-4">
                  Subject Codes for {selectedCollege}
                </h2>
                <div className="flex flex-wrap justify-center gap-4">
                  {subjectCodes.map((subjectCode) => (
                    <button
                      key={subjectCode}
                      className={`px-4 py-2 border rounded-lg text-center w-auto max-w-sm ${
                        selectedSubjectCode === subjectCode
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100"
                      } hover:bg-blue-100 transition-colors`}
                      onClick={() => handleSubjectCodeChange(subjectCode)}
                    >
                      {subjectCode}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Added Categories Section */}
            {selectedSubjectCode && categories.length > 0 && (
              <div className="mb-6 text-center">
                <h2 className="font-bold text-lg mb-4">Categories</h2>
                <div className="flex flex-wrap justify-center gap-4">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`px-4 py-2 border rounded-lg text-center w-auto max-w-sm ${
                        selectedCategory === category
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100"
                      } hover:bg-blue-100 transition-colors`}
                      onClick={() => handleCategoryChange(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedSubjectCode && filteredQuestions.length > 0 && (
              <div className="mb-6">
                <h3 className="font-bold text-lg text-center">
                  Dynamic Questions
                </h3>
                <div className="space-y-6">
                  {filteredQuestions.map((question, index) => (
                    <div
                      key={index}
                      className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <p
                          className="font-semibold text-lg"
                          dangerouslySetInnerHTML={{
                            __html: `Q${index + 1}: ${question.questionText}`,
                          }}
                        ></p>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditClick(question)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteClick(question.id, question.quizId)
                            }
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        {question.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className={`px-4 py-2 border rounded-md ${
                              option.isCorrect ? "bg-green-200" : "bg-gray-100"
                            } border-gray-300 text-gray-700`}
                            dangerouslySetInnerHTML={{
                              __html: option.optionText,
                            }}
                          ></div>
                        ))}
                      </div>

                      <p className="text-sm text-gray-500">
                        College: {question.college} | Subject Code:{" "}
                        {question.subjectCode}
                        {question.category &&
                          ` | Category: ${question.category}`}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {isEditModalOpen && editingQuestion && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-90vh overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">Edit Question</h2>
              <form onSubmit={handleEditSubmit} className="space-y-6">
                <div>
                  <label className="block font-medium mb-2">
                    Question Text:
                  </label>
                  <ReactQuill
                    value={editingQuestion.questionText}
                    onChange={handleQuestionTextChange}
                    modules={modules}
                    className="bg-white mb-4"
                  />
                </div>

                <div className="space-y-4">
                  <label className="block font-medium">Options:</label>
                  {editingQuestion.options.map((option, index) => (
                    <div key={index}>
                      <ReactQuill
                        value={option.optionText}
                        onChange={(value) => handleOptionChange(index, value)}
                        modules={modules}
                        className="bg-white mb-2"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block font-medium mb-2">
                    Correct Option (0-3):
                  </label>
                  <input
                    type="number"
                    value={editingQuestion.correctOption}
                    onChange={(e) =>
                      setEditingQuestion({
                        ...editingQuestion,
                        correctOption: e.target.value,
                      })
                    }
                    min="0"
                    max="3"
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversitySubjectPage;
