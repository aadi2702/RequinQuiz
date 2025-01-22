// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// const UpdateStatic = () => {
//   const [staticQuestions, setStaticQuestions] = useState([]);
//   const [colleges, setColleges] = useState([]);
//   const [subjectCodes, setSubjectCodes] = useState([]);
//   const [selectedCollege, setSelectedCollege] = useState("");
//   const [selectedSubjectCode, setSelectedSubjectCode] = useState("");
//   const [filteredQuestions, setFilteredQuestions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Modal and edit state
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [editingQuestion, setEditingQuestion] = useState(null);

//   // Quill editor configuration
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

//   // Fetch static questions
//   useEffect(() => {
//     const fetchStaticQuestions = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get("https://requin-quiz-backend.vercel.app/api/quiz/static");

//         // Ensure proper structure and data presence
//         if (response.data.success && Array.isArray(response.data.data)) {
//           const allQuestions = response.data.data.flatMap((quiz) =>
//             quiz.questions.map((q) => ({
//               id: q._id, // Include question ID for operations like edit and delete
//               quizId: quiz._id, // Include quiz ID
//               questionText: q.question,
//               answer: q.answer,
//               college: quiz.university,
//               subjectCode: quiz.subjectCode,
//               category: quiz.category,
//             }))
//           );

//           setStaticQuestions(allQuestions);

//           // Collect unique colleges
//           const dynamicColleges = allQuestions.map((q) => q.college);
//           setColleges([...new Set(dynamicColleges)]);
//         } else {
//           setError("No static questions found.");
//         }
//       } catch (error) {
//         setError("Error fetching static questions. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStaticQuestions();
//   }, []);

//   // Handle college selection
//   const handleCollegeChange = (college) => {
//     setSelectedCollege(college);
//     const filteredSubjectCodes = [
//       ...new Set(
//         staticQuestions.filter((q) => q.college === college).map((q) => q.subjectCode)
//       ),
//     ];
//     setSubjectCodes(filteredSubjectCodes);
//     setSelectedSubjectCode("");
//     setFilteredQuestions([]);
//   };

//   // Handle subject code selection
//   const handleSubjectCodeChange = (subjectCode) => {
//     setSelectedSubjectCode(subjectCode);
//     const filtered = staticQuestions.filter(
//       (q) => q.college === selectedCollege && q.subjectCode === subjectCode
//     );
//     setFilteredQuestions(filtered);
//   };

//   // Edit question functionality
//   const handleEditClick = (question) => {
//     const editQuestion = {
//       ...question,
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
//         answer: editingQuestion.answer,
//       };

//       await axios.put(
//         `https://requin-quiz-backend.vercel.app/api/quiz/static/${editingQuestion.quizId}/question/${editingQuestion.id}`,
//         updatedQuestionData,
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       // Refresh static questions after update
//       const response = await axios.get("https://requin-quiz-backend.vercel.app/api/quiz/static");
//       if (response.data.success) {
//         const allQuestions = response.data.data.flatMap((quiz) =>
//           quiz.questions.map((q) => ({
//             id: q._id,
//             quizId: quiz._id,
//             questionText: q.question,
//             answer: q.answer,
//             college: quiz.university,
//             subjectCode: quiz.subjectCode,
//             category: quiz.category,
//           }))
//         );
//         setStaticQuestions(allQuestions);

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

//   const handleAnswerChange = (value) => {
//     setEditingQuestion({
//       ...editingQuestion,
//       answer: value,
//     });
//   };

//   // Delete question functionality
//   const handleDeleteClick = async (questionId, quizId) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this question?");
//     if (!confirmDelete) return;

//     setLoading(true);
//     try {
//       await axios.delete(
//         `https://requin-quiz-backend.vercel.app/api/quiz/static/${quizId}/question/${questionId}`,
//         {
//           withCredentials: true,
//         }
//       );

//       setStaticQuestions((prevQuestions) =>
//         prevQuestions.filter((q) => q.id !== questionId)
//       );

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
//           Static Quiz Management
//         </h1>

//         {/* Loading/Error Section */}
//         {loading ? (
//           <p className="text-center text-gray-500">Loading...</p>
//         ) : error ? (
//           <p className="text-center text-red-500">{error}</p>
//         ) : (
//           <div>
//             {/* College Selection Section */}
//             <div className="mb-6 text-center">
//               <h2 className="font-bold text-lg mb-4">
//                 Universities with Static Questions
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

//             {/* Subject Code Selection Section */}
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

//             {/* Static Questions Section */}
//             {selectedSubjectCode && filteredQuestions.length > 0 && (
//               <div className="mb-6">
//                 <h3 className="font-bold text-lg text-center">
//                   Static Questions
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

//                       <p className="text-md font-semibold">Answer:</p>
//                       <p className="text-sm text-gray-700">
//                         {question.answer}
//                       </p>

//                       <p className="text-sm text-gray-500 mt-2">
//                         College: {question.college} | Subject Code:{" "}
//                         {question.subjectCode}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Message when no questions are found */}
//             {selectedSubjectCode && filteredQuestions.length === 0 && (
//               <div className="text-center text-gray-500">
//                 No questions found for the selected subject.
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

//                 <div>
//                   <label className="block font-medium mb-2">Answer:</label>
//                   <ReactQuill
//                     value={editingQuestion.answer}
//                     onChange={handleAnswerChange}
//                     modules={modules}
//                     className="bg-white mb-4"
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

// export default UpdateStatic;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// const UpdateStatic = () => {
//   const [staticQuestions, setStaticQuestions] = useState([]);
//   const [colleges, setColleges] = useState([]);
//   const [subjectCodes, setSubjectCodes] = useState([]);
//   const [selectedCollege, setSelectedCollege] = useState("");
//   const [selectedSubjectCode, setSelectedSubjectCode] = useState("");
//   const [filteredQuestions, setFilteredQuestions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchStaticQuestions = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get(
//           "https://requin-quiz-backend.vercel.app/api/quiz/static"
//         );
//         if (response.status === 200 && response.data.data) {
//           const allStaticQuestions = response.data.data.flatMap((quiz) =>
//             quiz.questions.map((q) => ({
//               questionText: q.question,
//               options: [{ optionText: q.answer || "No answer provided" }],
//               college: quiz.university,
//               subjectCode: quiz.subjectCode,
//             }))
//           );

//           setStaticQuestions(allStaticQuestions);

//           // Update colleges based on static questions
//           const staticColleges = allStaticQuestions.map((q) => q.college);
//           setColleges((prevColleges) => [
//             ...new Set([...prevColleges, ...staticColleges]),
//           ]);
//         } else {
//           setError("No static questions found.");
//         }
//       } catch (error) {
//         console.error("Error fetching static questions:", error);
//         setError("Failed to fetch questions. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStaticQuestions();
//   }, []);

//   // Handle college selection
//   const handleCollegeChange = (college) => {
//     setSelectedCollege(college);
//     const filteredSubjectCodes = [
//       ...new Set(
//         staticQuestions.filter((q) => q.college === college).map((q) => q.subjectCode)
//       ),
//     ];
//     setSubjectCodes(filteredSubjectCodes);
//     setSelectedSubjectCode("");
//     setFilteredQuestions([]);
//   };

//   // Handle subject code selection
//   const handleSubjectCodeChange = (subjectCode) => {
//     setSelectedSubjectCode(subjectCode);
//     const filtered = staticQuestions.filter(
//       (q) => q.college === selectedCollege && q.subjectCode === subjectCode
//     );
//     setFilteredQuestions(filtered);
//   };

//   return (
//     <div className="flex min-h-screen">
//       <Sidebar />
//       <div className="flex-1 p-8 bg-gray-100">
//         <h1 className="text-3xl font-bold mb-6 text-center">
//           Static Quiz Management
//         </h1>

//         {/* Loading/Error Section */}
//         {loading ? (
//           <p className="text-center text-gray-500">Loading...</p>
//         ) : error ? (
//           <p className="text-center text-red-500">{error}</p>
//         ) : (
//           <div>
//             {/* College Selection Section */}
//             <div className="mb-6 text-center">
//               <h2 className="font-bold text-lg mb-4">
//                 Universities with Static Questions
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

//             {/* Subject Code Selection Section */}
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

//             {/* Static Questions Section */}
//             {selectedSubjectCode && filteredQuestions.length > 0 && (
//               <div className="mb-6">
//                 <h3 className="font-bold text-lg text-center">
//                   Static Questions
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
//                       </div>

//                       <p className="text-md font-semibold">Answer:</p>
//                       <p className="text-sm text-gray-700">
//                         {question.options[0].optionText}
//                       </p>

//                       <p className="text-sm text-gray-500 mt-2">
//                         College: {question.college} | Subject Code:{" "}
//                         {question.subjectCode}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Message when no questions are found */}
//             {selectedSubjectCode && filteredQuestions.length === 0 && (
//               <div className="text-center text-gray-500">
//                 No questions found for the selected subject.
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UpdateStatic;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// const UpdateStatic = () => {
//   const [staticQuestions, setStaticQuestions] = useState([]);
//   const [colleges, setColleges] = useState([]);
//   const [subjectCodes, setSubjectCodes] = useState([]);
//   const [selectedCollege, setSelectedCollege] = useState("");
//   const [selectedSubjectCode, setSelectedSubjectCode] = useState("");
//   const [filteredQuestions, setFilteredQuestions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchStaticQuestions = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get(
//           "https://requin-quiz-backend.vercel.app/api/quiz/static"
//         );
//         if (response.status === 200 && response.data.data) {
//           const allStaticQuestions = response.data.data.flatMap((quiz) =>
//             quiz.questions.map((q) => ({
//               id: q._id, // Added question ID
//               quizId: quiz._id, // Added quiz ID
//               questionText: q.question,
//               options: [{ optionText: q.answer || "No answer provided" }],
//               college: quiz.university,
//               subjectCode: quiz.subjectCode,
//             }))
//           );

//           setStaticQuestions(allStaticQuestions);

//           const staticColleges = allStaticQuestions.map((q) => q.college);
//           setColleges((prevColleges) => [
//             ...new Set([...prevColleges, ...staticColleges]),
//           ]);
//         } else {
//           setError("No static questions found.");
//         }
//       } catch (error) {
//         console.error("Error fetching static questions:", error);
//         setError("Failed to fetch questions. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStaticQuestions();
//   }, []);

//   const handleCollegeChange = (college) => {
//     setSelectedCollege(college);
//     const filteredSubjectCodes = [
//       ...new Set(
//         staticQuestions.filter((q) => q.college === college).map((q) => q.subjectCode)
//       ),
//     ];
//     setSubjectCodes(filteredSubjectCodes);
//     setSelectedSubjectCode("");
//     setFilteredQuestions([]);
//   };

//   const handleSubjectCodeChange = (subjectCode) => {
//     setSelectedSubjectCode(subjectCode);
//     const filtered = staticQuestions.filter(
//       (q) => q.college === selectedCollege && q.subjectCode === subjectCode
//     );
//     setFilteredQuestions(filtered);
//   };

//   // New delete handler
//   const handleDeleteClick = async (questionId, quizId) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this question?");
//     if (!confirmDelete) return;

//     setLoading(true);
//     try {
//       // Send DELETE request to the backend
//       await axios.delete(
//         `https://requin-quiz-backend.vercel.app/api/quiz/static/${quizId}/${questionId}`,
//         {
//           withCredentials: true,
//         }
//       );

//       // Update local state by removing the deleted question
//       setStaticQuestions((prevQuestions) =>
//         prevQuestions.filter((q) => q.id !== questionId)
//       );

//       // Update filtered questions
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
//           Static Quiz Management
//         </h1>

//         {loading ? (
//           <p className="text-center text-gray-500">Loading...</p>
//         ) : error ? (
//           <p className="text-center text-red-500">{error}</p>
//         ) : (
//           <div>
//             <div className="mb-6 text-center">
//               <h2 className="font-bold text-lg mb-4">
//                 Universities with Static Questions
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

//             {selectedSubjectCode && filteredQuestions.length > 0 && (
//               <div className="mb-6">
//                 <h3 className="font-bold text-lg text-center">
//                   Static Questions
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
//                           onClick={() => handleDeleteClick(question.id, question.quizId)}
//                           className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
//                         >
//                           Delete
//                         </button>
//                       </div>

//                       <p className="text-md font-semibold">Answer:</p>
//                       <p className="text-sm text-gray-700">
//                         {question.options[0].optionText}
//                       </p>

//                       <p className="text-sm text-gray-500 mt-2">
//                         College: {question.college} | Subject Code:{" "}
//                         {question.subjectCode}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {selectedSubjectCode && filteredQuestions.length === 0 && (
//               <div className="text-center text-gray-500">
//                 No questions found for the selected subject.
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UpdateStatic;

//Delete feature added!

// import React, { useEffect, useState } from "react";
// import Sidebar from "../components/Sidebar";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// const UpdateStatic = () => {
//   const [staticQuestions, setStaticQuestions] = useState([]);
//   const [colleges, setColleges] = useState([]);
//   const [subjectCodes, setSubjectCodes] = useState([]);
//   const [selectedCollege, setSelectedCollege] = useState("");
//   const [selectedSubjectCode, setSelectedSubjectCode] = useState("");
//   const [filteredQuestions, setFilteredQuestions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
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

//   useEffect(() => {
//     const fetchStaticQuestions = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await fetch(
//           "https://requin-quiz-backend.vercel.app/api/quiz/static",
//           {
//             credentials: 'include'
//           }
//         );

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();

//         if (data.data) {
//           const allStaticQuestions = data.data.flatMap((quiz) =>
//             quiz.questions.map((q) => ({
//               id: q._id,
//               quizId: quiz._id,
//               questionText: q.question,
//               options: [{ optionText: q.answer || "No answer provided", isCorrect: true }],
//               college: quiz.university,
//               subjectCode: quiz.subjectCode,
//               category: q.category
//             }))
//           );

//           setStaticQuestions(allStaticQuestions);

//           // Extract unique colleges
//           const uniqueColleges = [...new Set(allStaticQuestions.map((q) => q.college))];
//           setColleges(uniqueColleges);
//         } else {
//           setError("No static questions found.");
//         }
//       } catch (error) {
//         console.error("Error fetching static questions:", error);
//         setError("Failed to fetch questions. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStaticQuestions();
//   }, []);

//   const handleCollegeChange = (college) => {
//     setSelectedCollege(college);
//     const filteredSubjectCodes = [
//       ...new Set(
//         staticQuestions.filter((q) => q.college === college).map((q) => q.subjectCode)
//       ),
//     ];
//     setSubjectCodes(filteredSubjectCodes);
//     setSelectedSubjectCode("");
//     setFilteredQuestions([]);
//   };

//   const handleSubjectCodeChange = (subjectCode) => {
//     setSelectedSubjectCode(subjectCode);
//     const filtered = staticQuestions.filter(
//       (q) => q.college === selectedCollege && q.subjectCode === subjectCode
//     );
//     setFilteredQuestions(filtered);
//   };

//   const handleEditClick = (question) => {
//     setEditingQuestion({
//       ...question,
//       questionText: question.questionText || "",
//       options: question.options || [{ optionText: "", isCorrect: true }]
//     });
//     setIsEditModalOpen(true);
//   };

//   // Separate handlers for question text and option changes
//   const handleQuestionTextChange = (value) => {
//     if (!editingQuestion) return;
//     setEditingQuestion(prev => ({
//       ...prev,
//       questionText: value
//     }));
//   };

//   const handleOptionChange = (value) => {
//     if (!editingQuestion) return;
//     setEditingQuestion(prev => ({
//       ...prev,
//       options: [{ optionText: value, isCorrect: true }]
//     }));
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     if (!editingQuestion) return;

//     setLoading(true);

//     try {
//       const response = await fetch(
//         `https://requin-quiz-backend.vercel.app/api/quiz/static/${editingQuestion.quizId}/${editingQuestion.id}`,
//         {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           credentials: 'include',
//           body: JSON.stringify({
//             university: editingQuestion.college,
//             subjectCode: editingQuestion.subjectCode,
//             category: editingQuestion.category,
//             question: editingQuestion.questionText,
//             answer: editingQuestion.options[0].optionText
//           })
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       // Update local state with the edited question
//       const updatedQuestions = staticQuestions.map(q =>
//         q.id === editingQuestion.id ? editingQuestion : q
//       );
//       setStaticQuestions(updatedQuestions);

//       // Update filtered questions if necessary
//       if (selectedSubjectCode) {
//         const updatedFiltered = updatedQuestions.filter(
//           q => q.college === selectedCollege && q.subjectCode === selectedSubjectCode
//         );
//         setFilteredQuestions(updatedFiltered);
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

//   const handleDeleteClick = async (questionId, quizId) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this question?");
//     if (!confirmDelete) return;

//     setLoading(true);
//     try {
//       const response = await fetch(
//         `https://requin-quiz-backend.vercel.app/api/quiz/static/${quizId}/${questionId}`,
//         {
//           method: 'DELETE',
//           credentials: 'include'
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       setStaticQuestions(prevQuestions =>
//         prevQuestions.filter(q => q.id !== questionId)
//       );

//       setFilteredQuestions(prevFiltered =>
//         prevFiltered.filter(q => q.id !== questionId)
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
//           Static Quiz Management
//         </h1>

//         {loading ? (
//           <p className="text-center text-gray-500">Loading...</p>
//         ) : error ? (
//           <p className="text-center text-red-500">{error}</p>
//         ) : (
//           <div>
//             <div className="mb-6 text-center">
//               <h2 className="font-bold text-lg mb-4">
//                 Universities with Static Questions
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

//             {selectedSubjectCode && filteredQuestions.length > 0 && (
//               <div className="mb-6">
//                 <h3 className="font-bold text-lg text-center">
//                   Static Questions
//                 </h3>
//                 <div className="space-y-6">
//                   {filteredQuestions.map((question, index) => (
//                     <div
//                       key={question.id}
//                       className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
//                     >
//                       <div className="flex justify-between items-start mb-4">
//                         <p
//                           className="font-semibold text-lg"
//                           dangerouslySetInnerHTML={{
//                             __html: `Q${index + 1}: ${question.questionText}`,
//                           }}
//                         ></p>
//                         <div className="flex gap-2">
//                           <button
//                             onClick={() => handleEditClick(question)}
//                             className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             onClick={() => handleDeleteClick(question.id, question.quizId)}
//                             className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       </div>

//                       <p className="text-md font-semibold">Answer:</p>
//                       <p
//                         className="text-sm text-gray-700"
//                         dangerouslySetInnerHTML={{
//                           __html: question.options[0].optionText
//                         }}
//                       ></p>

//                       <p className="text-sm text-gray-500 mt-2">
//                         College: {question.college} | Subject Code: {question.subjectCode}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {selectedSubjectCode && filteredQuestions.length === 0 && (
//               <div className="text-center text-gray-500">
//                 No questions found for the selected subject.
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

//                 <div>
//                   <label className="block font-medium mb-2">Answer:</label>
//                   <ReactQuill
//                     value={editingQuestion.options[0].optionText}
//                     onChange={handleOptionChange}
//                     modules={modules}
//                     className="bg-white mb-4"
//                   />
//                 </div>

//                 <div className="flex justify-end space-x-4">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setIsEditModalOpen(false);
//                       setEditingQuestion(null);
//                     }}
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

// export default UpdateStatic;

// import React, { useEffect, useState } from "react";
// import Sidebar from "../components/Sidebar";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// const UpdateStatic = () => {
//   // ... (previous state declarations remain the same)

//   const handleEditClick = (question) => {
//     setEditingQuestion({
//       ...question,
//       correctOption: 0  // Since static questions only have one correct answer
//     });
//     setIsEditModalOpen(true);
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

//   const handleInputChange = (field, value) => {
//     setEditingQuestion({
//       ...editingQuestion,
//       [field]: value,
//     });
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await fetch(
//         `https://requin-quiz-backend.vercel.app/api/quiz/static/${editingQuestion.quizId}/${editingQuestion.id}`,
//         {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           credentials: 'include',
//           body: JSON.stringify({
//             university: editingQuestion.college,
//             subjectCode: editingQuestion.subjectCode,
//             category: editingQuestion.category,
//             question: editingQuestion.questionText,
//             answer: editingQuestion.options[0].optionText
//           })
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       // Update local state with the new values
//       const updatedQuestion = {
//         ...editingQuestion,
//         college: editingQuestion.college,
//         subjectCode: editingQuestion.subjectCode,
//         category: editingQuestion.category
//       };

//       setStaticQuestions(prevQuestions =>
//         prevQuestions.map(q =>
//           q.id === editingQuestion.id ? updatedQuestion : q
//         )
//       );

//       setFilteredQuestions(prevFiltered =>
//         prevFiltered.map(q =>
//           q.id === editingQuestion.id ? updatedQuestion : q
//         )
//       );

//       // Update the colleges and subject codes lists if necessary
//       if (!colleges.includes(editingQuestion.college)) {
//         setColleges(prev => [...prev, editingQuestion.college]);
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

//   // ... (rest of the component remains the same until the edit modal)

//   return (
//     <div className="flex min-h-screen">
//       <Sidebar />
//       <div className="flex-1 p-8 bg-gray-100">
//         {/* ... (previous content remains the same) */}

//         {/* Updated Edit Modal */}
//         {isEditModalOpen && editingQuestion && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//             <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-90vh overflow-y-auto">
//               <h2 className="text-2xl font-bold mb-6">Edit Question</h2>
//               <form onSubmit={handleEditSubmit} className="space-y-6">
//                 <div>
//                   <label className="block font-medium mb-2">University:</label>
//                   <input
//                     type="text"
//                     value={editingQuestion.college}
//                     onChange={(e) => handleInputChange('college', e.target.value)}
//                     className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block font-medium mb-2">Subject Code:</label>
//                   <input
//                     type="text"
//                     value={editingQuestion.subjectCode}
//                     onChange={(e) => handleInputChange('subjectCode', e.target.value)}
//                     className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block font-medium mb-2">Category:</label>
//                   <input
//                     type="text"
//                     value={editingQuestion.category}
//                     onChange={(e) => handleInputChange('category', e.target.value)}
//                     className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block font-medium mb-2">Question Text:</label>
//                   <ReactQuill
//                     value={editingQuestion.questionText}
//                     onChange={handleQuestionTextChange}
//                     modules={modules}
//                     className="bg-white mb-4"
//                   />
//                 </div>

//                 <div>
//                   <label className="block font-medium mb-2">Answer:</label>
//                   <ReactQuill
//                     value={editingQuestion.options[0].optionText}
//                     onChange={(value) => handleOptionChange(0, value)}
//                     modules={modules}
//                     className="bg-white mb-4"
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

// export default UpdateStatic;

//Editing feature added!!

// import React, { useEffect, useState } from "react";
// import Sidebar from "../components/Sidebar";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// const UpdateStatic = () => {
//   const [staticQuestions, setStaticQuestions] = useState([]);
//   const [colleges, setColleges] = useState([]);
//   const [subjectCodes, setSubjectCodes] = useState([]);
//   const [selectedCollege, setSelectedCollege] = useState("");
//   const [selectedSubjectCode, setSelectedSubjectCode] = useState("");
//   const [filteredQuestions, setFilteredQuestions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [editingQuestion, setEditingQuestion] = useState(null);

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

//   useEffect(() => {
//     const fetchStaticQuestions = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await fetch("https://requin-quiz-backend.vercel.app/api/quiz/static", {
//           credentials: "include",
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();

//         if (data.data) {
//           const allStaticQuestions = data.data.flatMap((quiz) =>
//             quiz.questions.map((q) => ({
//               id: q._id,
//               quizId: quiz._id,
//               questionText: q.question,
//               options: [{ optionText: q.answer || "No answer provided", isCorrect: true }],
//               college: quiz.university,
//               subjectCode: quiz.subjectCode,
//               category: q.category,
//             }))
//           );

//           setStaticQuestions(allStaticQuestions);

//           const uniqueColleges = [...new Set(allStaticQuestions.map((q) => q.college))];
//           setColleges(uniqueColleges);
//         } else {
//           setError("No static questions found.");
//         }
//       } catch (error) {
//         console.error("Error fetching static questions:", error);
//         setError("Failed to fetch questions. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStaticQuestions();
//   }, []);

//   const handleCollegeChange = (college) => {
//     setSelectedCollege(college);
//     const filteredSubjectCodes = [
//       ...new Set(staticQuestions.filter((q) => q.college === college).map((q) => q.subjectCode)),
//     ];
//     setSubjectCodes(filteredSubjectCodes);
//     setSelectedSubjectCode("");
//     setFilteredQuestions([]);
//   };

//   const handleSubjectCodeChange = (subjectCode) => {
//     setSelectedSubjectCode(subjectCode);
//     const filtered = staticQuestions.filter(
//       (q) => q.college === selectedCollege && q.subjectCode === subjectCode
//     );
//     setFilteredQuestions(filtered);
//   };

//   const handleEditClick = (question) => {
//     setEditingQuestion({
//       ...question,
//       questionText: question.questionText || "",
//       options: question.options || [{ optionText: "", isCorrect: true }],
//     });
//     setIsEditModalOpen(true);
//   };

//   const handleQuestionTextChange = (value) => {
//     if (!editingQuestion) return;
//     setEditingQuestion((prev) => ({ ...prev, questionText: value }));
//   };

//   const handleOptionChange = (value) => {
//     if (!editingQuestion) return;
//     setEditingQuestion((prev) => ({
//       ...prev,
//       options: [{ optionText: value, isCorrect: true }],
//     }));
//   };

//   const handleInputChange = (field, value) => {
//     if (!editingQuestion) return;
//     setEditingQuestion((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     if (!editingQuestion) return;

//     setLoading(true);

//     try {
//       const response = await fetch(
//         `https://requin-quiz-backend.vercel.app/api/quiz/static/${editingQuestion.quizId}/${editingQuestion.id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include",
//           body: JSON.stringify({
//             university: editingQuestion.college,
//             subjectCode: editingQuestion.subjectCode,
//             category: editingQuestion.category,
//             question: editingQuestion.questionText,
//             answer: editingQuestion.options[0].optionText,
//           }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const updatedQuestions = staticQuestions.map((q) =>
//         q.id === editingQuestion.id ? editingQuestion : q
//       );
//       setStaticQuestions(updatedQuestions);

//       if (selectedSubjectCode) {
//         const updatedFiltered = updatedQuestions.filter(
//           (q) => q.college === selectedCollege && q.subjectCode === selectedSubjectCode
//         );
//         setFilteredQuestions(updatedFiltered);
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

//   return (
//     <div className="flex min-h-screen">
//       <Sidebar />
//       <div className="flex-1 p-8 bg-gray-100">
//         <div>
//           <label className="block font-medium mb-2">Select College:</label>
//           <select
//             className="w-full p-2 border rounded-lg mb-4"
//             onChange={(e) => handleCollegeChange(e.target.value)}
//             value={selectedCollege}
//           >
//             <option value="">Choose a College</option>
//             {colleges.map((college, index) => (
//               <option key={index} value={college}>{college}</option>
//             ))}
//           </select>
//         </div>
//         {subjectCodes.length > 0 && (
//           <div>
//             <label className="block font-medium mb-2">Select Subject Code:</label>
//             <select
//               className="w-full p-2 border rounded-lg mb-4"
//               onChange={(e) => handleSubjectCodeChange(e.target.value)}
//               value={selectedSubjectCode}
//             >
//               <option value="">Choose a Subject Code</option>
//               {subjectCodes.map((code, index) => (
//                 <option key={index} value={code}>{code}</option>
//               ))}
//             </select>
//           </div>
//         )}

//         {loading && <p>Loading...</p>}
//         {error && <p className="text-red-500">{error}</p>}
//         {!loading && !error && filteredQuestions.length > 0 && (
//           <div className="space-y-4">
//             {filteredQuestions.map((question) => (
//               <div key={question.id} className="p-4 border rounded shadow">
//                 <h3 className="font-semibold mb-2">{question.questionText}</h3>
//                 <p><strong>Answer:</strong> {question.options[0].optionText}</p>
//                 <button
//                   onClick={() => handleEditClick(question)}
//                   className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                 >
//                   Edit
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}

//         {isEditModalOpen && editingQuestion && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//             <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-90vh overflow-y-auto">
//               <h2 className="text-2xl font-bold mb-6">Edit Question</h2>
//               <form onSubmit={handleEditSubmit} className="space-y-6">
//                 <div>
//                   <label className="block font-medium mb-2">University:</label>
//                   <input
//                     type="text"
//                     value={editingQuestion.college}
//                     onChange={(e) => handleInputChange("college", e.target.value)}
//                     className="w-full p-2 border rounded-lg"
//                   />
//                 </div>
//                 <div>
//                   <label className="block font-medium mb-2">Subject Code:</label>
//                   <input
//                     type="text"
//                     value={editingQuestion.subjectCode}
//                     onChange={(e) => handleInputChange("subjectCode", e.target.value)}
//                     className="w-full p-2 border rounded-lg"
//                   />
//                 </div>
//                 <div>
//                   <label className="block font-medium mb-2">Category:</label>
//                   <input
//                     type="text"
//                     value={editingQuestion.category}
//                     onChange={(e) => handleInputChange("category", e.target.value)}
//                     className="w-full p-2 border rounded-lg"
//                   />
//                 </div>
//                 <div>
//                   <label className="block font-medium mb-2">Question Text:</label>
//                   <ReactQuill value={editingQuestion.questionText} onChange={handleQuestionTextChange} modules={modules} />
//                 </div>
//                 <div>
//                   <label className="block font-medium mb-2">Answer:</label>
//                   <ReactQuill value={editingQuestion.options[0].optionText} onChange={handleOptionChange} modules={modules} />
//                 </div>
//                 <div className="flex justify-end space-x-4">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setIsEditModalOpen(false);
//                       setEditingQuestion(null);
//                     }}
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

// export default UpdateStatic;

// import React, { useEffect, useState } from "react";
// import Sidebar from "../components/Sidebar";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// const UpdateStatic = () => {
//   const [staticQuestions, setStaticQuestions] = useState([]);
//   const [colleges, setColleges] = useState([]);
//   const [subjectCodes, setSubjectCodes] = useState([]);
//   const [selectedCollege, setSelectedCollege] = useState("");
//   const [selectedSubjectCode, setSelectedSubjectCode] = useState("");
//   const [filteredQuestions, setFilteredQuestions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [editingQuestion, setEditingQuestion] = useState(null);

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

//   useEffect(() => {
//     const fetchStaticQuestions = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await fetch(
//           "https://requin-quiz-backend.vercel.app/api/quiz/static",
//           {
//             credentials: 'include'
//           }
//         );

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();

//         if (data.data) {
//           const allStaticQuestions = data.data.flatMap((quiz) =>
//             quiz.questions.map((q) => ({
//               id: q._id,
//               quizId: quiz._id,
//               questionText: q.question,
//               options: [{ optionText: q.answer || "No answer provided", isCorrect: true }],
//               college: quiz.university,
//               subjectCode: quiz.subjectCode,
//               category: q.category
//             }))
//           );

//           setStaticQuestions(allStaticQuestions);
//           const uniqueColleges = [...new Set(allStaticQuestions.map((q) => q.college))];
//           setColleges(uniqueColleges);
//         } else {
//           setError("No static questions found.");
//         }
//       } catch (error) {
//         console.error("Error fetching static questions:", error);
//         setError("Failed to fetch questions. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStaticQuestions();
//   }, []);

//   const handleCollegeChange = (college) => {
//     setSelectedCollege(college);
//     const filteredSubjectCodes = [
//       ...new Set(
//         staticQuestions.filter((q) => q.college === college).map((q) => q.subjectCode)
//       ),
//     ];
//     setSubjectCodes(filteredSubjectCodes);
//     setSelectedSubjectCode("");
//     setFilteredQuestions([]);
//   };

//   const handleSubjectCodeChange = (subjectCode) => {
//     setSelectedSubjectCode(subjectCode);
//     const filtered = staticQuestions.filter(
//       (q) => q.college === selectedCollege && q.subjectCode === subjectCode
//     );
//     setFilteredQuestions(filtered);
//   };

//   // Updated Edit Functionality
//   const handleEditClick = (question) => {
//     setEditingQuestion({
//       ...question,
//       questionText: question.questionText || "",
//       options: question.options || [{ optionText: "", isCorrect: true }],
//     });
//     setIsEditModalOpen(true);
//   };

//   const handleQuestionTextChange = (value) => {
//     if (!editingQuestion) return;
//     setEditingQuestion(prev => ({
//       ...prev,
//       questionText: value
//     }));
//   };

//   const handleOptionChange = (value) => {
//     if (!editingQuestion) return;
//     setEditingQuestion(prev => ({
//       ...prev,
//       options: [{ optionText: value, isCorrect: true }]
//     }));
//   };

//   const handleInputChange = (field, value) => {
//     if (!editingQuestion) return;
//     setEditingQuestion(prev => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     if (!editingQuestion) return;

//     setLoading(true);

//     try {
//       const response = await fetch(
//         `https://requin-quiz-backend.vercel.app/api/quiz/static/${editingQuestion.quizId}/${editingQuestion.id}`,
//         {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           credentials: 'include',
//           body: JSON.stringify({
//             university: editingQuestion.college,
//             subjectCode: editingQuestion.subjectCode,
//             category: editingQuestion.category,
//             question: editingQuestion.questionText,
//             answer: editingQuestion.options[0].optionText
//           })
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const updatedQuestions = staticQuestions.map(q =>
//         q.id === editingQuestion.id ? editingQuestion : q
//       );
//       setStaticQuestions(updatedQuestions);

//       if (selectedSubjectCode) {
//         const updatedFiltered = updatedQuestions.filter(
//           q => q.college === selectedCollege && q.subjectCode === selectedSubjectCode
//         );
//         setFilteredQuestions(updatedFiltered);
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

//   const handleDeleteClick = async (questionId, quizId) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this question?");
//     if (!confirmDelete) return;

//     setLoading(true);
//     try {
//       const response = await fetch(
//         `https://requin-quiz-backend.vercel.app/api/quiz/static/${quizId}/${questionId}`,
//         {
//           method: 'DELETE',
//           credentials: 'include'
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       setStaticQuestions(prevQuestions =>
//         prevQuestions.filter(q => q.id !== questionId)
//       );

//       setFilteredQuestions(prevFiltered =>
//         prevFiltered.filter(q => q.id !== questionId)
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
//           Static Quiz Management
//         </h1>

//         {loading ? (
//           <p className="text-center text-gray-500">Loading...</p>
//         ) : error ? (
//           <p className="text-center text-red-500">{error}</p>
//         ) : (
//           <div>
//             <div className="mb-6 text-center">
//               <h2 className="font-bold text-lg mb-4">
//                 Universities with Static Questions
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

//             {selectedSubjectCode && filteredQuestions.length > 0 && (
//               <div className="mb-6">
//                 <h3 className="font-bold text-lg text-center">
//                   Static Questions
//                 </h3>
//                 <div className="space-y-6">
//                   {filteredQuestions.map((question, index) => (
//                     <div
//                       key={question.id}
//                       className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
//                     >
//                       <div className="flex justify-between items-start mb-4">
//                         <p
//                           className="font-semibold text-lg"
//                           dangerouslySetInnerHTML={{
//                             __html: `Q${index + 1}: ${question.questionText}`,
//                           }}
//                         ></p>
//                         <div className="flex gap-2">
//                           <button
//                             onClick={() => handleEditClick(question)}
//                             className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             onClick={() => handleDeleteClick(question.id, question.quizId)}
//                             className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       </div>

//                       <p className="text-md font-semibold">Answer:</p>
//                       <p
//                         className="text-sm text-gray-700"
//                         dangerouslySetInnerHTML={{
//                           __html: question.options[0].optionText
//                         }}
//                       ></p>

//                       <p className="text-sm text-gray-500 mt-2">
//                         College: {question.college} | Subject Code: {question.subjectCode}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {selectedSubjectCode && filteredQuestions.length === 0 && (
//               <div className="text-center text-gray-500">
//                 No questions found for the selected subject.
//               </div>
//             )}
//           </div>
//         )}

//         {/* Updated Edit Modal */}
//         {isEditModalOpen && editingQuestion && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//             <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-90vh overflow-y-auto">
//               <h2 className="text-2xl font-bold mb-6">Edit Question</h2>
//               <form onSubmit={handleEditSubmit} className="space-y-6">
//                 <div>
//                   <label className="block font-medium mb-2">University:</label>
//                   <input
//                     type="text"
//                     value={editingQuestion.college}
//                     onChange={(e) => handleInputChange("college", e.target.value)}
//                     className="w-full p-2 border rounded-lg"
//                   />
//                 </div>
//                 <div>
//                   <label className="block font-medium mb-2">Subject Code:</label>
//                   <input
//                     type="text"
//                     value={editingQuestion.subjectCode}
//                     onChange={(e) => handleInputChange("subjectCode", e.target.value)}
//                     className="w-full p-2 border rounded-lg"
//                   />
//                 </div>
//                 <div>
//                   <label className="block font-medium mb-2">Category:</label>
//                   <input
//                     type="text"
//                     value={editingQuestion.category}
//                     onChange={(e) => handleInputChange("category", e.target.value)}
//                     className="w-full p-2 border rounded-lg"
//                   />
//                 </div>
//                 <div>
//                   <label className="block font-medium mb-2">Question Text:</label>
//                   <ReactQuill
//                     value={editingQuestion.questionText}
//                     onChange={handleQuestionTextChange}
//                     modules={modules}
//                     className="bg-white"
//                   />
//                 </div>
//                 <div>
//                   <label className="block font-medium mb-2">Answer:</label>
//                   <ReactQuill
//                     value={editingQuestion.options[0].optionText}
//                     onChange={handleOptionChange}
//                     modules={modules}
//                     className="bg-white"
//                   />
//                 </div>
//                 <div className="flex justify-end space-x-4">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setIsEditModalOpen(false);
//                       setEditingQuestion(null);
//                     }}
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

// export default UpdateStatic;

// import React, { useEffect, useState } from "react";
// import Sidebar from "../components/Sidebar";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// const UpdateStatic = () => {
//   const [staticQuestions, setStaticQuestions] = useState([]);
//   const [colleges, setColleges] = useState([]);
//   const [subjectCodes, setSubjectCodes] = useState([]);
//   const [selectedCollege, setSelectedCollege] = useState("");
//   const [selectedSubjectCode, setSelectedSubjectCode] = useState("");
//   const [filteredQuestions, setFilteredQuestions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [editingQuestion, setEditingQuestion] = useState(null);

//   // Add useEffect to handle body scroll
//   useEffect(() => {
//     if (isEditModalOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }

//     // Cleanup function
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isEditModalOpen]);

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

//   useEffect(() => {
//     const fetchStaticQuestions = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await fetch(
//           "https://requin-quiz-backend.vercel.app/api/quiz/static",
//           {
//             credentials: 'include'
//           }
//         );

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();

//         if (data.data) {
//           const allStaticQuestions = data.data.flatMap((quiz) =>
//             quiz.questions.map((q) => ({
//               id: q._id,
//               quizId: quiz._id,
//               questionText: q.question,
//               options: [{ optionText: q.answer || "No answer provided", isCorrect: true }],
//               college: quiz.university,
//               subjectCode: quiz.subjectCode,
//               category: q.category
//             }))
//           );

//           setStaticQuestions(allStaticQuestions);
//           const uniqueColleges = [...new Set(allStaticQuestions.map((q) => q.college))];
//           setColleges(uniqueColleges);
//         } else {
//           setError("No static questions found.");
//         }
//       } catch (error) {
//         console.error("Error fetching static questions:", error);
//         setError("Failed to fetch questions. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStaticQuestions();
//   }, []);

//   const handleCollegeChange = (college) => {
//     setSelectedCollege(college);
//     const filteredSubjectCodes = [
//       ...new Set(
//         staticQuestions.filter((q) => q.college === college).map((q) => q.subjectCode)
//       ),
//     ];
//     setSubjectCodes(filteredSubjectCodes);
//     setSelectedSubjectCode("");
//     setFilteredQuestions([]);
//   };

//   const handleSubjectCodeChange = (subjectCode) => {
//     setSelectedSubjectCode(subjectCode);
//     const filtered = staticQuestions.filter(
//       (q) => q.college === selectedCollege && q.subjectCode === subjectCode
//     );
//     setFilteredQuestions(filtered);
//   };

//   const handleEditClick = (question) => {
//     setEditingQuestion({
//       ...question,
//       questionText: question.questionText || "",
//       options: question.options || [{ optionText: "", isCorrect: true }],
//     });
//     setIsEditModalOpen(true);
//   };

//   const handleQuestionTextChange = (value) => {
//     if (!editingQuestion) return;
//     setEditingQuestion(prev => ({
//       ...prev,
//       questionText: value
//     }));
//   };

//   const handleOptionChange = (value) => {
//     if (!editingQuestion) return;
//     setEditingQuestion(prev => ({
//       ...prev,
//       options: [{ optionText: value, isCorrect: true }]
//     }));
//   };

//   const handleInputChange = (field, value) => {
//     if (!editingQuestion) return;
//     setEditingQuestion(prev => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     if (!editingQuestion) return;

//     setLoading(true);

//     try {
//       const response = await fetch(
//         `https://requin-quiz-backend.vercel.app/api/quiz/static/${editingQuestion.quizId}/${editingQuestion.id}`,
//         {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           credentials: 'include',
//           body: JSON.stringify({
//             university: editingQuestion.college,
//             subjectCode: editingQuestion.subjectCode,
//             category: editingQuestion.category,
//             question: editingQuestion.questionText,
//             answer: editingQuestion.options[0].optionText
//           })
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const updatedQuestions = staticQuestions.map(q =>
//         q.id === editingQuestion.id ? editingQuestion : q
//       );
//       setStaticQuestions(updatedQuestions);

//       if (selectedSubjectCode) {
//         const updatedFiltered = updatedQuestions.filter(
//           q => q.college === selectedCollege && q.subjectCode === selectedSubjectCode
//         );
//         setFilteredQuestions(updatedFiltered);
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

//   const handleDeleteClick = async (questionId, quizId) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this question?");
//     if (!confirmDelete) return;

//     setLoading(true);
//     try {
//       const response = await fetch(
//         `https://requin-quiz-backend.vercel.app/api/quiz/static/${quizId}/${questionId}`,
//         {
//           method: 'DELETE',
//           credentials: 'include'
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       setStaticQuestions(prevQuestions =>
//         prevQuestions.filter(q => q.id !== questionId)
//       );

//       setFilteredQuestions(prevFiltered =>
//         prevFiltered.filter(q => q.id !== questionId)
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
//           Static Quiz Management
//         </h1>

//         {loading ? (
//           <p className="text-center text-gray-500">Loading...</p>
//         ) : error ? (
//           <p className="text-center text-red-500">{error}</p>
//         ) : (
//           <div>
//             <div className="mb-6 text-center">
//               <h2 className="font-bold text-lg mb-4">
//                 Universities with Static Questions
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

//             {selectedSubjectCode && filteredQuestions.length > 0 && (
//               <div className="mb-6">
//                 <h3 className="font-bold text-lg text-center">
//                   Static Questions
//                 </h3>
//                 <div className="space-y-6">
//                   {filteredQuestions.map((question, index) => (
//                     <div
//                       key={question.id}
//                       className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
//                     >
//                       <div className="flex justify-between items-start mb-4">
//                         <p
//                           className="font-semibold text-lg"
//                           dangerouslySetInnerHTML={{
//                             __html: `Q${index + 1}: ${question.questionText}`,
//                           }}
//                         ></p>
//                         <div className="flex gap-2">
//                           <button
//                             onClick={() => handleEditClick(question)}
//                             className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             onClick={() => handleDeleteClick(question.id, question.quizId)}
//                             className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       </div>

//                       <p className="text-md font-semibold">Answer:</p>
//                       <p
//                         className="text-sm text-gray-700"
//                         dangerouslySetInnerHTML={{
//                           __html: question.options[0].optionText
//                         }}
//                       ></p>

//                       <p className="text-sm text-gray-500 mt-2">
//                         College: {question.college} | Subject Code: {question.subjectCode}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {selectedSubjectCode && filteredQuestions.length === 0 && (
//               <div className="text-center text-gray-500">
//                 No questions found for the selected subject.
//               </div>
//             )}
//           </div>
//         )}

//         {/* Edit Modal with fixed positioning and overflow prevention */}
//         {isEditModalOpen && editingQuestion && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center">
//             <div className="absolute inset-0 bg-black bg-opacity-50"></div>
//             <div className="relative bg-white rounded-lg p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
//               <h2 className="text-2xl font-bold mb-6">Edit Question</h2>
//               <form onSubmit={handleEditSubmit} className="space-y-6">
//                 <div>
//                   <label className="block font-medium mb-2">University:</label>
//                   <input
//                     type="text"
//                     value={editingQuestion.college}
//                     onChange={(e) => handleInputChange("college", e.target.value)}
//                     className="w-full p-2 border rounded-lg"
//                   />
//                 </div>
//                 <div>
//                   <label className="block font-medium mb-2">Subject Code:</label>
//                   <input
//                     type="text"
//                     value={editingQuestion.subjectCode}
//                     onChange={(e) => handleInputChange("subjectCode", e.target.value)}
//                     className="w-full p-2 border rounded-lg"
//                   />
//                 </div>
//                 <div>
//                   <label className="block font-medium mb-2">Category:</label>
//                   <input
//                     type="text"
//                     value={editingQuestion.category}
//                     onChange={(e) => handleInputChange("category", e.target.value)}
//                     className="w-full p-2 border rounded-lg"
//                   />
//                 </div>
//                 <div>
//                   <label className="block font-medium mb-2">Question Text:</label>
//                   <ReactQuill
//                     value={editingQuestion.questionText}
//                     onChange={handleQuestionTextChange}
//                     modules={modules}
//                     className="bg-white"
//                   />
//                 </div>
//                 <div>
//                   <label className="block font-medium mb-2">Answer:</label>
//                   <ReactQuill
//                     value={editingQuestion.options[0].optionText}
//                     onChange={handleOptionChange}
//                     modules={modules}
//                     className="bg-white"
//                   />
//                 </div>
//                 <div className="flex justify-end space-x-4">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setIsEditModalOpen(false);
//                       setEditingQuestion(null);
//                     }}
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

// export default UpdateStatic;

// import React, { useEffect, useState } from "react";
// import Sidebar from "../components/Sidebar";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// const UpdateStatic = () => {
//   const [staticQuestions, setStaticQuestions] = useState([]);
//   const [colleges, setColleges] = useState([]);
//   const [subjectCodes, setSubjectCodes] = useState([]);
//   const [selectedCollege, setSelectedCollege] = useState("");
//   const [selectedSubjectCode, setSelectedSubjectCode] = useState("");
//   const [filteredQuestions, setFilteredQuestions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [editingQuestion, setEditingQuestion] = useState(null);

//   useEffect(() => {
//     if (isEditModalOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }

//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isEditModalOpen]);

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

//   useEffect(() => {
//     const fetchStaticQuestions = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await fetch("https://requin-quiz-backend.vercel.app/api/quiz/static", {
//           credentials: "include",
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();

//         if (data.data) {
//           const allStaticQuestions = data.data.flatMap((quiz) =>
//             quiz.questions.map((q) => ({
//               id: q._id,
//               quizId: quiz._id,
//               questionText: q.question,
//               options: [
//                 {
//                   optionText: q.answer || "No answer provided",
//                   isCorrect: true,
//                 },
//               ],
//               college: quiz.university,
//               subjectCode: quiz.subjectCode,
//               category: q.category || "", // Ensure category is included in the mapping
//             }))
//           );

//           setStaticQuestions(allStaticQuestions);
//           const uniqueColleges = [
//             ...new Set(allStaticQuestions.map((q) => q.college)),
//           ];
//           setColleges(uniqueColleges);
//         } else {
//           setError("No static questions found.");
//         }
//       } catch (error) {
//         console.error("Error fetching static questions:", error);
//         setError("Failed to fetch questions. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStaticQuestions();
//   }, []);

//   const handleCollegeChange = (college) => {
//     setSelectedCollege(college);
//     const filteredSubjectCodes = [
//       ...new Set(
//         staticQuestions
//           .filter((q) => q.college === college)
//           .map((q) => q.subjectCode)
//       ),
//     ];
//     setSubjectCodes(filteredSubjectCodes);
//     setSelectedSubjectCode("");
//     setFilteredQuestions([]);
//   };

//   const handleSubjectCodeChange = (subjectCode) => {
//     setSelectedSubjectCode(subjectCode);
//     const filtered = staticQuestions.filter(
//       (q) => q.college === selectedCollege && q.subjectCode === subjectCode
//     );
//     setFilteredQuestions(filtered);
//   };

//   const handleEditClick = (question) => {
//     setEditingQuestion({
//       ...question,
//       questionText: question.questionText || "",
//       options: question.options || [{ optionText: "", isCorrect: true }],
//       category: question.category || "", // Ensure category is included when setting editing question
//     });
//     setIsEditModalOpen(true);
//   };

//   const handleQuestionTextChange = (value) => {
//     if (!editingQuestion) return;
//     setEditingQuestion((prev) => ({
//       ...prev,
//       questionText: value,
//     }));
//   };

//   const handleOptionChange = (value) => {
//     if (!editingQuestion) return;
//     setEditingQuestion((prev) => ({
//       ...prev,
//       options: [{ optionText: value, isCorrect: true }],
//     }));
//   };

//   const handleInputChange = (field, value) => {
//     if (!editingQuestion) return;
//     setEditingQuestion((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     if (!editingQuestion) return;

//     setLoading(true);

//     try {
//       const response = await fetch(
//         `https://requin-quiz-backend.vercel.app/api/quiz/static/${editingQuestion.quizId}/${editingQuestion.id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include",
//           body: JSON.stringify({
//             university: editingQuestion.college,
//             subjectCode: editingQuestion.subjectCode,
//             category: editingQuestion.category,
//             question: editingQuestion.questionText,
//             answer: editingQuestion.options[0].optionText,
//           }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const updatedQuestions = staticQuestions.map((q) =>
//         q.id === editingQuestion.id ? editingQuestion : q
//       );
//       setStaticQuestions(updatedQuestions);

//       if (selectedSubjectCode) {
//         const updatedFiltered = updatedQuestions.filter(
//           (q) =>
//             q.college === selectedCollege &&
//             q.subjectCode === selectedSubjectCode
//         );
//         setFilteredQuestions(updatedFiltered);
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

//   const handleDeleteClick = async (questionId, quizId) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this question?"
//     );
//     if (!confirmDelete) return;

//     setLoading(true);
//     try {
//       const response = await fetch(
//         `https://requin-quiz-backend.vercel.app/api/quiz/static/${quizId}/${questionId}`,
//         {
//           method: "DELETE",
//           credentials: "include",
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       setStaticQuestions((prevQuestions) =>
//         prevQuestions.filter((q) => q.id !== questionId)
//       );

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
//           Static Quiz Management
//         </h1>

//         {loading ? (
//           <p className="text-center text-gray-500">Loading...</p>
//         ) : error ? (
//           <p className="text-center text-red-500">{error}</p>
//         ) : (
//           <div>
//             <div className="mb-6 text-center">
//               <h2 className="font-bold text-lg mb-4">
//                 Universities with Static Questions
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

//             {selectedSubjectCode && filteredQuestions.length > 0 && (
//               <div className="mb-6">
//                 <h3 className="font-bold text-lg text-center">
//                   Static Questions
//                 </h3>
//                 <div className="space-y-6">
//                   {filteredQuestions.map((question, index) => (
//                     <div
//                       key={question.id}
//                       className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
//                     >
//                       <div className="flex justify-between items-start mb-4">
//                         <p
//                           className="font-semibold text-lg"
//                           dangerouslySetInnerHTML={{
//                             __html: `Q${index + 1}: ${question.questionText}`,
//                           }}
//                         ></p>
//                         <div className="flex gap-2">
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

//                       <p className="text-md font-semibold">Answer:</p>
//                       <p
//                         className="text-sm text-gray-700"
//                         dangerouslySetInnerHTML={{
//                           __html: question.options[0].optionText,
//                         }}
//                       ></p>

//                       <p className="text-sm text-gray-500 mt-2">
//                         College: {question.college} | Subject Code:{" "}
//                         {question.subjectCode} | Category: {question.category}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {selectedSubjectCode && filteredQuestions.length === 0 && (
//               <div className="text-center text-gray-500">
//                 No questions found for the selected subject.
//               </div>
//             )}
//           </div>
//         )}

//         {/* Edit Modal with fixed positioning and overflow prevention */}
//         {isEditModalOpen && editingQuestion && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center">
//             <div className="absolute inset-0 bg-black bg-opacity-50"></div>
//             <div className="relative bg-white rounded-lg p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
//               <h2 className="text-2xl font-bold mb-6">Edit Question</h2>
//               <form onSubmit={handleEditSubmit} className="space-y-6">
//                 <div>
//                   <label className="block font-medium mb-2">University:</label>
//                   <input
//                     type="text"
//                     value={editingQuestion.college}
//                     onChange={(e) =>
//                       handleInputChange("college", e.target.value)
//                     }
//                     className="w-full p-2 border rounded-lg"
//                   />
//                 </div>
//                 <div>
//                   <label className="block font-medium mb-2">
//                     Subject Code:
//                   </label>
//                   <input
//                     type="text"
//                     value={editingQuestion.subjectCode}
//                     onChange={(e) =>
//                       handleInputChange("subjectCode", e.target.value)
//                     }
//                     className="w-full p-2 border rounded-lg"
//                   />
//                 </div>
//                 <div>
//                   <label className="block font-medium mb-2">Category:</label>
//                   <input
//                     type="text"
//                     value={editingQuestion.category}
//                     onChange={(e) =>
//                       handleInputChange("category", e.target.value)
//                     }
//                     className="w-full p-2 border rounded-lg"
//                   />
//                 </div>
//                 <div>
//                   <label className="block font-medium mb-2">
//                     Question Text:
//                   </label>
//                   <ReactQuill
//                     value={editingQuestion.questionText}
//                     onChange={handleQuestionTextChange}
//                     modules={modules}
//                     className="bg-white"
//                   />
//                 </div>
//                 <div>
//                   <label className="block font-medium mb-2">Answer:</label>
//                   <ReactQuill
//                     value={editingQuestion.options[0].optionText}
//                     onChange={handleOptionChange}
//                     modules={modules}
//                     className="bg-white"
//                   />
//                 </div>
//                 <div className="flex justify-end space-x-4">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setIsEditModalOpen(false);
//                       setEditingQuestion(null);
//                     }}
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

// export default UpdateStatic;

import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


const UpdateStatic = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token"); // Get token from cookies
    if (!token) {
      navigate("/admin-login"); // Redirect to login if no token
    }
  }, [navigate]);
  const [staticQuestions, setStaticQuestions] = useState([]);
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

  useEffect(() => {
    if (isEditModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isEditModalOpen]);

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
    const fetchStaticQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "https://requin-quiz-backend.vercel.app/api/quiz/static",
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.data) {
          const allStaticQuestions = data.data.flatMap((quiz) =>
            quiz.questions.map((q) => ({
              id: q._id,
              quizId: quiz._id,
              questionText: q.question,
              options: [
                {
                  optionText: q.answer || "No answer provided",
                  isCorrect: true,
                },
              ],
              college: quiz.university,
              subjectCode: quiz.subjectCode,
              category: q.category || "",
            }))
          );

          setStaticQuestions(allStaticQuestions);
          const uniqueColleges = [
            ...new Set(allStaticQuestions.map((q) => q.college)),
          ];
          setColleges(uniqueColleges);
        } else {
          setError("No static questions found.");
        }
      } catch (error) {
        console.error("Error fetching static questions:", error);
        setError("Failed to fetch questions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchStaticQuestions();
  }, []);

  // Added effect for updating categories when subject code changes
  useEffect(() => {
    if (selectedSubjectCode) {
      const subjectQuestions = staticQuestions.filter(
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
  }, [selectedSubjectCode, selectedCollege, staticQuestions]);

  const handleCollegeChange = (college) => {
    setSelectedCollege(college);
    const filteredSubjectCodes = [
      ...new Set(
        staticQuestions
          .filter((q) => q.college === college)
          .map((q) => q.subjectCode)
      ),
    ];
    setSubjectCodes(filteredSubjectCodes);
    setSelectedSubjectCode("");
    setSelectedCategory(""); // Reset category when college changes
    setFilteredQuestions([]);
  };

  const handleSubjectCodeChange = (subjectCode) => {
    setSelectedSubjectCode(subjectCode);
    const filtered = staticQuestions.filter(
      (q) =>
        q.college === selectedCollege &&
        q.subjectCode === subjectCode &&
        (!selectedCategory || q.category === selectedCategory)
    );
    setFilteredQuestions(filtered);
  };

  // Added handler for category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const filtered = staticQuestions.filter(
      (q) =>
        q.college === selectedCollege &&
        q.subjectCode === selectedSubjectCode &&
        (!category || q.category === category)
    );
    setFilteredQuestions(filtered);
  };

  const handleEditClick = (question) => {
    setEditingQuestion({
      ...question,
      questionText: question.questionText || "",
      options: question.options || [{ optionText: "", isCorrect: true }],
      category: question.category || "",
    });
    setIsEditModalOpen(true);
  };

  const handleQuestionTextChange = (value) => {
    if (!editingQuestion) return;
    setEditingQuestion((prev) => ({
      ...prev,
      questionText: value,
    }));
  };

  const handleOptionChange = (value) => {
    if (!editingQuestion) return;
    setEditingQuestion((prev) => ({
      ...prev,
      options: [{ optionText: value, isCorrect: true }],
    }));
  };

  const handleInputChange = (field, value) => {
    if (!editingQuestion) return;
    setEditingQuestion((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingQuestion) return;

    setLoading(true);

    try {
      const response = await fetch(
        `https://requin-quiz-backend.vercel.app/api/quiz/static/${editingQuestion.quizId}/${editingQuestion.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            university: editingQuestion.college,
            subjectCode: editingQuestion.subjectCode,
            category: editingQuestion.category,
            question: editingQuestion.questionText,
            answer: editingQuestion.options[0].optionText,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedQuestions = staticQuestions.map((q) =>
        q.id === editingQuestion.id ? editingQuestion : q
      );
      setStaticQuestions(updatedQuestions);

      if (selectedSubjectCode) {
        const updatedFiltered = updatedQuestions.filter(
          (q) =>
            q.college === selectedCollege &&
            q.subjectCode === selectedSubjectCode &&
            (!selectedCategory || q.category === selectedCategory)
        );
        setFilteredQuestions(updatedFiltered);
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

  const handleDeleteClick = async (questionId, quizId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this question?"
    );
    if (!confirmDelete) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://requin-quiz-backend.vercel.app/api/quiz/static/${quizId}/${questionId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setStaticQuestions((prevQuestions) =>
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
          Static Quiz Management
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div>
            <div className="mb-6 text-center">
              <h2 className="font-bold text-lg mb-4">
                Universities with Static Questions
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
                  Static Questions
                </h3>
                <div className="space-y-6">
                  {filteredQuestions.map((question, index) => (
                    <div
                      key={question.id}
                      className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <p
                          className="font-semibold text-lg"
                          dangerouslySetInnerHTML={{
                            __html: `Q${index + 1}: ${question.questionText}`,
                          }}
                        ></p>
                        <div className="flex gap-2">
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

                      <p className="text-md font-semibold">Answer:</p>
                      <p
                        className="text-sm text-gray-700"
                        dangerouslySetInnerHTML={{
                          __html: question.options[0].optionText,
                        }}
                      ></p>

                      <p className="text-sm text-gray-500 mt-2">
                        College: {question.college} | Subject Code:{" "}
                        {question.subjectCode} | Category: {question.category}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedSubjectCode && filteredQuestions.length === 0 && (
              <div className="text-center text-gray-500">
                No questions found for the selected subject.
              </div>
            )}
          </div>
        )}

        {/* Edit Modal with fixed positioning and overflow prevention */}
        {isEditModalOpen && editingQuestion && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative bg-white rounded-lg p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">Edit Question</h2>
              <form onSubmit={handleEditSubmit} className="space-y-6">
                <div>
                  <label className="block font-medium mb-2">University:</label>
                  <input
                    type="text"
                    value={editingQuestion.college}
                    onChange={(e) =>
                      handleInputChange("college", e.target.value)
                    }
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-2">
                    Subject Code:
                  </label>
                  <input
                    type="text"
                    value={editingQuestion.subjectCode}
                    onChange={(e) =>
                      handleInputChange("subjectCode", e.target.value)
                    }
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-2">Category:</label>
                  <input
                    type="text"
                    value={editingQuestion.category}
                    onChange={(e) =>
                      handleInputChange("category", e.target.value)
                    }
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-2">
                    Question Text:
                  </label>
                  <ReactQuill
                    value={editingQuestion.questionText}
                    onChange={handleQuestionTextChange}
                    modules={modules}
                    className="bg-white"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-2">Answer:</label>
                  <ReactQuill
                    value={editingQuestion.options[0].optionText}
                    onChange={handleOptionChange}
                    modules={modules}
                    className="bg-white"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setEditingQuestion(null);
                    }}
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

export default UpdateStatic;

// import React, { useEffect, useState } from "react";
// import Sidebar from "../components/Sidebar";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// const UpdateStatic = () => {
//   const [staticQuestions, setStaticQuestions] = useState([]);
//   const [colleges, setColleges] = useState([]);
//   const [subjectCodes, setSubjectCodes] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCollege, setSelectedCollege] = useState("");
//   const [selectedSubjectCode, setSelectedSubjectCode] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [filteredQuestions, setFilteredQuestions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [editingQuestion, setEditingQuestion] = useState(null);

//   useEffect(() => {
//     if (isEditModalOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }

//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isEditModalOpen]);

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

//   useEffect(() => {
//     const fetchStaticQuestions = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await fetch("https://requin-quiz-backend.vercel.app/api/quiz/static", {
//           credentials: "include",
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();

//         if (data.data) {
//           const allStaticQuestions = data.data.flatMap((quiz) =>
//             quiz.questions.map((q) => ({
//               id: q._id,
//               quizId: quiz._id,
//               questionText: q.question,
//               options: [
//                 {
//                   optionText: q.answer || "No answer provided",
//                   isCorrect: true,
//                 },
//               ],
//               college: quiz.university,
//               subjectCode: quiz.subjectCode,
//               category: q.category || "Uncategorized", // Set default category
//             }))
//           );

//           setStaticQuestions(allStaticQuestions);
//           const uniqueColleges = [
//             ...new Set(allStaticQuestions.map((q) => q.college)),
//           ];
//           setColleges(uniqueColleges);
//         } else {
//           setError("No static questions found.");
//         }
//       } catch (error) {
//         console.error("Error fetching static questions:", error);
//         setError("Failed to fetch questions. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStaticQuestions();
//   }, []);

//   // Update categories when college or subject code changes
//   useEffect(() => {
//     if (selectedCollege && selectedSubjectCode) {
//       const subjectQuestions = staticQuestions.filter(
//         (q) => q.college === selectedCollege && q.subjectCode === selectedSubjectCode
//       );
//       const availableCategories = [...new Set(subjectQuestions.map((q) => q.category))];
//       setCategories(availableCategories);

//       // Update filtered questions based on all current selections
//       filterQuestions(selectedCollege, selectedSubjectCode, selectedCategory);
//     } else {
//       setCategories([]);
//       setFilteredQuestions([]);
//     }
//   }, [selectedCollege, selectedSubjectCode, staticQuestions]);

//   // Function to filter questions based on all criteria
//   const filterQuestions = (college, subjectCode, category) => {
//     let filtered = staticQuestions.filter(
//       (q) => q.college === college && q.subjectCode === subjectCode
//     );

//     if (category) {
//       filtered = filtered.filter((q) => q.category === category);
//     }

//     setFilteredQuestions(filtered);
//   };

//   const handleCollegeChange = (college) => {
//     setSelectedCollege(college);
//     setSelectedSubjectCode("");
//     setSelectedCategory("");
//     const filteredSubjectCodes = [
//       ...new Set(
//         staticQuestions
//           .filter((q) => q.college === college)
//           .map((q) => q.subjectCode)
//       ),
//     ];
//     setSubjectCodes(filteredSubjectCodes);
//     setFilteredQuestions([]);
//   };

//   const handleSubjectCodeChange = (subjectCode) => {
//     setSelectedSubjectCode(subjectCode);
//     setSelectedCategory("");
//     filterQuestions(selectedCollege, subjectCode, "");
//   };

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//     filterQuestions(selectedCollege, selectedSubjectCode, category);
//   };

//   const handleEditClick = (question) => {
//     setEditingQuestion({
//       ...question,
//       questionText: question.questionText || "",
//       options: question.options || [{ optionText: "", isCorrect: true }],
//       category: question.category || "Uncategorized",
//     });
//     setIsEditModalOpen(true);
//   };

//   const handleQuestionTextChange = (value) => {
//     if (!editingQuestion) return;
//     setEditingQuestion((prev) => ({
//       ...prev,
//       questionText: value,
//     }));
//   };

//   const handleOptionChange = (value) => {
//     if (!editingQuestion) return;
//     setEditingQuestion((prev) => ({
//       ...prev,
//       options: [{ optionText: value, isCorrect: true }],
//     }));
//   };

//   const handleInputChange = (field, value) => {
//     if (!editingQuestion) return;
//     setEditingQuestion((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     if (!editingQuestion) return;

//     setLoading(true);

//     try {
//       const response = await fetch(
//         `https://requin-quiz-backend.vercel.app/api/quiz/static/${editingQuestion.quizId}/${editingQuestion.id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include",
//           body: JSON.stringify({
//             university: editingQuestion.college,
//             subjectCode: editingQuestion.subjectCode,
//             category: editingQuestion.category,
//             question: editingQuestion.questionText,
//             answer: editingQuestion.options[0].optionText,
//           }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       // Update staticQuestions state
//       const updatedQuestions = staticQuestions.map((q) =>
//         q.id === editingQuestion.id ? editingQuestion : q
//       );
//       setStaticQuestions(updatedQuestions);

//       // Reapply filters to update the view
//       filterQuestions(selectedCollege, selectedSubjectCode, selectedCategory);

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

//   const handleDeleteClick = async (questionId, quizId) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this question?"
//     );
//     if (!confirmDelete) return;

//     setLoading(true);
//     try {
//       const response = await fetch(
//         `https://requin-quiz-backend.vercel.app/api/quiz/static/${quizId}/${questionId}`,
//         {
//           method: "DELETE",
//           credentials: "include",
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       // Update both staticQuestions and filteredQuestions states
//       const updatedStaticQuestions = staticQuestions.filter((q) => q.id !== questionId);
//       setStaticQuestions(updatedStaticQuestions);

//       // Reapply filters to update the view
//       filterQuestions(selectedCollege, selectedSubjectCode, selectedCategory);

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
//           Static Quiz Management
//         </h1>

//         {loading ? (
//           <p className="text-center text-gray-500">Loading...</p>
//         ) : error ? (
//           <p className="text-center text-red-500">{error}</p>
//         ) : (
//           <div>
//             <div className="mb-6 text-center">
//               <h2 className="font-bold text-lg mb-4">
//                 Universities with Static Questions
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

//             {selectedSubjectCode && categories.length > 0 && (
//               <div className="mb-6 text-center">
//                 <h2 className="font-bold text-lg mb-4">Categories</h2>
//                 <div className="flex flex-wrap justify-center gap-4">
//                   <button
//                     className={`px-4 py-2 border rounded-lg text-center w-auto max-w-sm ${
//                       selectedCategory === ""
//                         ? "bg-blue-500 text-white"
//                         : "bg-gray-100"
//                     } hover:bg-blue-100 transition-colors`}
//                     onClick={() => handleCategoryChange("")}
//                   >
//                     All Categories
//                   </button>
//                   {categories.map((category) => (
//                     <button
//                       key={category}
//                       className={`px-4 py-2 border rounded-lg text-center w-auto max-w-sm ${
//                         selectedCategory === category
//                           ? "bg-blue-500 text-white"
//                           : "bg-gray-100"
//                       } hover:bg-blue-100 transition-colors`}
//                       onClick={() => handleCategoryChange(category)}
//                     >
//                       {category}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {selectedSubjectCode && (
//               <div className="mb-6">
//                 <h3 className="font-bold text-lg text-center">
//                   Static Questions {filteredQuestions.length > 0 ? `(${filteredQuestions.length})` : ""}
//                 </h3>
//                 {filteredQuestions.length > 0 ? (
//                   <div className="space-y-6">
//                     {filteredQuestions.map((question, index) => (
//                       <div
//                         key={question.id}
//                         className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
//                       >
//                         <div className="flex justify-between items-start mb-4">
//                           <p
//                             className="font-semibold text-lg"
//                             dangerouslySetInnerHTML={{
//                               __html: `Q${index + 1}: ${question.questionText}`,
//                             }}
//                           ></p>
//                           <div className="flex gap-2">
//                             <button
//                               onClick={() => handleEditClick(question)}
//                               className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//                             >
//                               Edit
//                             </button>
//                             <button
//                               onClick={() =>
//                                 handleDeleteClick(question.id, question.quizId)
//                               }
//                               className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
//                             >
//                               Delete
//                             </button>
//                           </div>
//                         </div>

//                         <p className="text-md font-semibold">Answer:</p>
//                         <p
//                           className="text-sm text-gray-700"
//                           dangerouslySetInnerHTML={{
//                             __html: question.options[0].optionText,
//                           }}
//                         ></p>

//                         <p className="text-sm text-gray-500 mt-2">
//                           College: {question.college} | Subject Code:{" "}
//                           {question.subjectCode} | Category: {question.category || "Uncategorized"}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center text-gray-500">
//                     No questions found for the selected criteria.
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         )}

//         {/* Edit Modal with fixed positioning and overflow prevention */}
//         {isEditModalOpen && editingQuestion && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center">
//             <div className="absolute inset-0 bg-black bg-opacity-50"></div>
//             <div className="relative bg-white rounded-lg p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
//               <h2 className="text-2xl font-bold mb-6">Edit Question</h2>
//               <form onSubmit={handleEditSubmit} className="space-y-6">
//                 <div>
//                   <label className="block font-medium mb-2">University:</label>
//                   <input
//                     type="text"
//                     value={editingQuestion.college}
//                     onChange={(e) =>
//                       handleInputChange("college", e.target.value)
//                     }
//                     className="w-full p-2 border rounded-lg"
//                   />
//                 </div>
//                 <div>
//                   <label className="block font-medium mb-2">
//                     Subject Code:
//                   </label>
//                   <input
//                     type="text"
//                     value={editingQuestion.subjectCode}
//                     onChange={(e) =>
//                       handleInputChange("subjectCode", e.target.value)
//                     }
//                     className="w-full p-2 border rounded-lg"
//                   />
//                 </div>
//                 <div>
//                   <label className="block font-medium mb-2">Category:</label>
//                   <input
//                     type="text"
//                     value={editingQuestion.category}
//                     onChange={(e) =>
//                       handleInputChange("category", e.target.value)
//                     }
//                     className="w-full p-2 border rounded-lg"
//                   />
//                 </div>
//                 <div>
//                   <label className="block font-medium mb-2">
//                     Question Text:
//                   </label>
//                   <ReactQuill
//                     value={editingQuestion.questionText}
//                     onChange={handleQuestionTextChange}
//                     modules={modules}
//                     className="bg-white"
//                   />
//                 </div>
//                 <div>
//                   <label className="block font-medium mb-2">Answer:</label>
//                   <ReactQuill
//                     value={editingQuestion.options[0].optionText}
//                     onChange={handleOptionChange}
//                     modules={modules}
//                     className="bg-white"
//                   />
//                 </div>
//                 <div className="flex justify-end space-x-4">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setIsEditModalOpen(false);
//                       setEditingQuestion(null);
//                     }}
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

// export default UpdateStatic;
