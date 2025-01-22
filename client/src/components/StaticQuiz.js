// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const SearchBar = ({ searchKeyword, onSearch }) => (
//   <div className="mb-6 text-center">
//     <input
//       type="text"
//       className="w-1/2 p-2 border border-gray-500 rounded-lg"
//       placeholder="Search questions..."
//       value={searchKeyword}
//       onChange={onSearch}
//     />
//   </div>
// );

// const CombinedQuizPage = () => {
//   const [questions, setQuestions] = useState([]); // Dynamic questions
//   const [staticQuestions, setStaticQuestions] = useState([]); // Static questions
//   const [colleges, setColleges] = useState([]); // All colleges from both dynamic and static data
//   const [subjectCodes, setSubjectCodes] = useState([]);
//   const [selectedCollege, setSelectedCollege] = useState("");
//   const [selectedSubjectCode, setSelectedSubjectCode] = useState("");
//   const [filteredQuestions, setFilteredQuestions] = useState([]);
//   const [searchKeyword, setSearchKeyword] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDynamicQuestions = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/quiz");
//         console.log("Dynamic response", response.data.data.questions);

//         if (response.data.success) {
//           const allQuestions = response.data.data.flatMap((quiz) =>
//             quiz.questions.map((q) => ({
//               questionText: q.questionText,
//               options: q.options, // options now includes 'isCorrect'
//               category: quiz.category,
//               college: quiz.University,
//               subjectCode: quiz.Subject_code,
//             }))
//           );

//           setQuestions(allQuestions);

//           // Collect unique colleges from dynamic questions
//           const dynamicColleges = allQuestions.map((q) => q.college);

//           // Merge dynamic colleges with the existing colleges and remove duplicates
//           setColleges((prevColleges) => [
//             ...new Set([...prevColleges, ...dynamicColleges]),
//           ]);
//         } else {
//           console.error("No questions found.");
//         }
//       } catch (error) {
//         console.error("Error fetching dynamic questions:", error);
//       }
//     };

//     const fetchStaticQuestions = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/quiz/static"
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

//           // Collect unique colleges from static questions
//           const staticColleges = allStaticQuestions.map((q) => q.college);

//           // Merge static colleges with the existing colleges and remove duplicates
//           setColleges((prevColleges) => [
//             ...new Set([...prevColleges, ...staticColleges]),
//           ]);
//         } else {
//           setError("No questions found in the database.");
//         }
//       } catch (error) {
//         console.error("Error fetching static questions:", error);
//         setError("Failed to fetch questions. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDynamicQuestions();
//     fetchStaticQuestions();
//   }, []);

//   useEffect(() => {
//     // Merge both dynamic and static questions to display them together
//     const allQuestions = [...questions, ...staticQuestions];
//     setFilteredQuestions(allQuestions); // Initialize filteredQuestions with all questions
//   }, [questions, staticQuestions]);

//   const handleCollegeChange = (college) => {
//     if (selectedCollege === college) {
//       setSelectedCollege("");
//       setSubjectCodes([]);
//       setSelectedSubjectCode("");
//       setFilteredQuestions([]);
//     } else {
//       setSelectedCollege(college);

//       // Filter subject codes by college
//       const filteredSubjectCodes = [
//         ...new Set(
//           [...questions, ...staticQuestions]
//             .filter((q) => q.college === college)
//             .map((q) => q.subjectCode)
//         ),
//       ];
//       setSubjectCodes(filteredSubjectCodes);
//       setSelectedSubjectCode("");
//       setFilteredQuestions([]);
//     }
//   };

//   const handleSubjectCodeChange = (subjectCode) => {
//     if (selectedSubjectCode === subjectCode) {
//       setSelectedSubjectCode("");
//       setFilteredQuestions([]);
//     } else {
//       setSelectedSubjectCode(subjectCode);

//       // Filter questions by subject code and selected college
//       const filtered = [...questions].filter(
//         (q) => q.college === selectedCollege && q.subjectCode === subjectCode
//       );
//       setFilteredQuestions(filtered);
//     }
//   };

//   const handleSearch = (e) => {
//     const keyword = e.target.value.trim();
//     setSearchKeyword(keyword);

//     if (keyword === "") {
//       setSearchResults([]); // Clear search results if no keyword
//     } else {
//       // Search through both dynamic and static questions combined
//       const allQuestions = [...questions, ...staticQuestions];
//       const results = allQuestions.filter((q) =>
//         q.questionText.toLowerCase().includes(keyword.toLowerCase())
//       );
//       setSearchResults(results);
//     }
//   };

//   // Filter static questions for table rendering
//   const staticQuestionsForTable = staticQuestions.filter(
//     (q) =>
//       q.college === selectedCollege && q.subjectCode === selectedSubjectCode
//   );

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6 text-center">
//         Questions & Answers
//       </h1>

//       {/* Search Bar */}
//       <SearchBar searchKeyword={searchKeyword} onSearch={handleSearch} />

//       <div className="mb-6 text-center">
//         <h2 className="font-bold text-lg mb-4">Universities</h2>
//         <div className="flex flex-wrap justify-center gap-4">
//           {colleges.length > 0 ? (
//             colleges.map((college) => (
//               <button
//                 key={college}
//                 className={`px-4 py-2 border rounded-lg text-center w-auto max-w-sm ${
//                   selectedCollege === college
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-100"
//                 } hover:bg-blue-100 transition-colors`}
//                 onClick={() => handleCollegeChange(college)} // Use handleCollegeChange here
//               >
//                 {college}
//               </button>
//             ))
//           ) : (
//             <p>No colleges available</p>
//           )}
//         </div>
//       </div>

//       <div className="flex gap-8">
//         {selectedCollege && (
//           <div className="w-1/4">
//             <h2 className="font-bold text-lg mb-4 text-center">
//               Subject Codes
//             </h2>
//             <div className="space-y-2">
//               {subjectCodes.length > 0 ? (
//                 subjectCodes.map((subjectCode) => (
//                   <button
//                     key={subjectCode}
//                     className={`block px-4 py-2 border rounded-lg text-center w-full ${
//                       selectedSubjectCode === subjectCode
//                         ? "bg-blue-500 text-white"
//                         : "bg-gray-100"
//                     } hover:bg-blue-100 transition-colors`}
//                     onClick={() => handleSubjectCodeChange(subjectCode)}
//                   >
//                     {subjectCode}
//                   </button>
//                 ))
//               ) : (
//                 <p className="text-center text-gray-500">
//                   No subject codes available
//                 </p>
//               )}
//             </div>
//           </div>
//         )}

//         <div className="w-3/4">
//           {loading ? (
//             <p className="text-center text-gray-500">Loading questions...</p>
//           ) : error ? (
//             <p className="text-center text-red-500">{error}</p>
//           ) : searchResults.length > 0 ? (
//             <div className="space-y-6">
//               {searchResults.map((question, index) => (
//                 <div
//                   key={index}
//                   className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
//                 >
//                   <p className="font-semibold text-lg mb-4">{`Q${index + 1}: ${
//                     question.questionText
//                   }`}</p>
//                   <ul className="space-y-2">
//                     {question.options.map((option, idx) => (
//                       <li
//                         key={idx}
//                         className={`px-4 py-2 border rounded-md bg-gray-100 border-gray-300 text-gray-700 ${
//                           option.isCorrect ? "bg-green-200" : ""
//                         }`}
//                       >
//                         {option.optionText}
//                       </li>
//                     ))}
//                   </ul>
//                   <p className="text-sm text-gray-500 mt-4">
//                     College: {question.college} | Subject Code:{" "}
//                     {question.subjectCode}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           ) : searchKeyword ? (
//             <p className="text-center text-gray-500">
//               No questions found matching your search.
//             </p>
//           ) : !selectedSubjectCode ? (
//             <p className="text-center text-gray-500 mt-8">
//               Select a subject code to view questions.
//             </p>
//           ) : filteredQuestions.length > 0 ? (
//             <div className="space-y-6">
//               {filteredQuestions.map((question, index) => (
//                 <div
//                   key={index}
//                   className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
//                 >
//                   <p className="font-semibold text-lg mb-4">{`Q${index + 1}: ${
//                     question.questionText
//                   }`}</p>
//                   <ul className="space-y-2">
//                     {question.options.map((option, idx) => (
//                       <li
//                         key={idx}
//                         className={`px-4 py-2 border rounded-md bg-gray-100 border-gray-300 text-gray-700 ${
//                           option.isCorrect ? "bg-green-200" : ""
//                         }`}
//                       >
//                         {option.optionText}
//                       </li>
//                     ))}
//                   </ul>
//                   <p className="text-sm text-gray-500 mt-4">
//                     College: {question.college} | Subject Code:{" "}
//                     {question.subjectCode}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-center text-gray-500">No questions found.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CombinedQuizPage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const SearchBar = ({ searchKeyword, onSearch }) => (
//   <div className="mb-6 text-center">
//     <input
//       type="text"
//       className="w-1/2 p-2 border border-gray-500 rounded-lg"
//       placeholder="Search questions..."
//       value={searchKeyword}
//       onChange={onSearch}
//     />
//   </div>
// );

// const CombinedQuizPage = () => {
//   const [questions, setQuestions] = useState([]); // Dynamic questions
//   const [staticQuestions, setStaticQuestions] = useState([]); // Static questions
//   const [colleges, setColleges] = useState([]); // All colleges from both dynamic and static data
//   const [subjectCodes, setSubjectCodes] = useState([]);
//   const [selectedCollege, setSelectedCollege] = useState("");
//   const [selectedSubjectCode, setSelectedSubjectCode] = useState("");
//   const [filteredQuestions, setFilteredQuestions] = useState([]);
//   const [searchKeyword, setSearchKeyword] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDynamicQuestions = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/quiz");
//         console.log("Dynamic response", response.data.data.questions);

//         if (response.data.success) {
//           const allQuestions = response.data.data.flatMap((quiz) =>
//             quiz.questions.map((q) => ({
//               questionText: q.questionText,
//               options: q.options, // options now includes 'isCorrect'
//               category: quiz.category,
//               college: quiz.University,
//               subjectCode: quiz.Subject_code,
//             }))
//           );

//           setQuestions(allQuestions);

//           const dynamicColleges = allQuestions.map((q) => q.college);
//           setColleges((prevColleges) => [
//             ...new Set([...prevColleges, ...dynamicColleges]),
//           ]);
//         } else {
//           console.error("No questions found.");
//         }
//       } catch (error) {
//         console.error("Error fetching dynamic questions:", error);
//       }
//     };

//     const fetchStaticQuestions = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/quiz/static"
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

//           const staticColleges = allStaticQuestions.map((q) => q.college);
//           setColleges((prevColleges) => [
//             ...new Set([...prevColleges, ...staticColleges]),
//           ]);
//         } else {
//           setError("No questions found in the database.");
//         }
//       } catch (error) {
//         console.error("Error fetching static questions:", error);
//         setError("Failed to fetch questions. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDynamicQuestions();
//     fetchStaticQuestions();
//   }, []);

//   useEffect(() => {
//     const allQuestions = [...questions, ...staticQuestions];
//     setFilteredQuestions(allQuestions);
//   }, [questions, staticQuestions]);

//   const handleCollegeChange = (college) => {
//     if (selectedCollege === college) {
//       setSelectedCollege("");
//       setSubjectCodes([]);
//       setSelectedSubjectCode("");
//       setFilteredQuestions([]);
//     } else {
//       setSelectedCollege(college);

//       const filteredSubjectCodes = [
//         ...new Set(
//           [...questions, ...staticQuestions]
//             .filter((q) => q.college === college)
//             .map((q) => q.subjectCode)
//         ),
//       ];
//       setSubjectCodes(filteredSubjectCodes);
//       setSelectedSubjectCode("");
//       setFilteredQuestions([]);
//     }
//   };

//   const handleSubjectCodeChange = (subjectCode) => {
//     if (selectedSubjectCode === subjectCode) {
//       setSelectedSubjectCode("");
//       setFilteredQuestions([]);
//     } else {
//       setSelectedSubjectCode(subjectCode);

//       const filtered = [...questions].filter(
//         (q) => q.college === selectedCollege && q.subjectCode === subjectCode
//       );
//       setFilteredQuestions(filtered);
//     }
//   };

//   const handleSearch = (e) => {
//     const keyword = e.target.value.trim();
//     setSearchKeyword(keyword);

//     if (keyword === "") {
//       setSearchResults([]);
//     } else {
//       const allQuestions = [...questions, ...staticQuestions];
//       const results = allQuestions.filter((q) =>
//         q.questionText.toLowerCase().includes(keyword.toLowerCase())
//       );
//       setSearchResults(results);
//     }
//   };

//   const staticQuestionsForTable = staticQuestions.filter(
//     (q) =>
//       q.college === selectedCollege && q.subjectCode === selectedSubjectCode
//   );

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6 text-center">
//         Questions & Answers
//       </h1>

//       <SearchBar searchKeyword={searchKeyword} onSearch={handleSearch} />

//       <div className="mb-6 text-center">
//         <h2 className="font-bold text-lg mb-4">Universities</h2>
//         <div className="flex flex-wrap justify-center gap-4">
//           {colleges.length > 0 ? (
//             colleges.map((college) => (
//               <button
//                 key={college}
//                 className={`px-4 py-2 border rounded-lg text-center w-auto max-w-sm ${
//                   selectedCollege === college
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-100"
//                 } hover:bg-blue-100 transition-colors`}
//                 onClick={() => handleCollegeChange(college)}
//               >
//                 {college}
//               </button>
//             ))
//           ) : (
//             <p>No colleges available</p>
//           )}
//         </div>
//       </div>

//       <div className="flex gap-8">
//         {selectedCollege && (
//           <div className="w-1/4">
//             <h2 className="font-bold text-lg mb-4 text-center">Subject Codes</h2>
//             <div className="space-y-2">
//               {subjectCodes.length > 0 ? (
//                 subjectCodes.map((subjectCode) => (
//                   <button
//                     key={subjectCode}
//                     className={`block px-4 py-2 border rounded-lg text-center w-full ${
//                       selectedSubjectCode === subjectCode
//                         ? "bg-blue-500 text-white"
//                         : "bg-gray-100"
//                     } hover:bg-blue-100 transition-colors`}
//                     onClick={() => handleSubjectCodeChange(subjectCode)}
//                   >
//                     {subjectCode}
//                   </button>
//                 ))
//               ) : (
//                 <p className="text-center text-gray-500">
//                   No subject codes available
//                 </p>
//               )}
//             </div>
//           </div>
//         )}

//         <div className="w-3/4">
//           {loading ? (
//             <p className="text-center text-gray-500">Loading questions...</p>
//           ) : error ? (
//             <p className="text-center text-red-500">{error}</p>
//           ) : searchResults.length > 0 ? (
//             <div className="space-y-6">
//               {searchResults.map((question, index) => (
//                 <div
//                   key={index}
//                   className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
//                 >
//                   <p
//                     className="font-semibold text-lg mb-4"
//                     dangerouslySetInnerHTML={{
//                       __html: `Q${index + 1}: ${question.questionText}`,
//                     }}
//                   />
//                   <ul className="space-y-2">
//                     {question.options.map((option, idx) => (
//                       <li
//                         key={idx}
//                         className={`px-4 py-2 border rounded-md bg-gray-100 border-gray-300 text-gray-700 ${
//                           option.isCorrect ? "bg-green-200" : ""
//                         }`}
//                       >
//                         {option.optionText}
//                       </li>
//                     ))}
//                   </ul>
//                   <p className="text-sm text-gray-500 mt-4">
//                     College: {question.college} | Subject Code:{" "}
//                     {question.subjectCode}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           ) : searchKeyword ? (
//             <p className="text-center text-gray-500">
//               No questions found matching your search.
//             </p>
//           ) : !selectedSubjectCode ? (
//             <p className="text-center text-gray-500 mt-8">
//               Select a subject code to view questions.
//             </p>
//           ) : filteredQuestions.length > 0 ? (
//             <div className="space-y-6">
//               {filteredQuestions.map((question, index) => (
//                 <div
//                   key={index}
//                   className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
//                 >
//                   <p
//                     className="font-semibold text-lg mb-4"
//                     dangerouslySetInnerHTML={{
//                       __html: `Q${index + 1}: ${question.questionText}`,
//                     }}
//                   />
//                   <ul className="space-y-2">
//                     {question.options.map((option, idx) => (
//                       <li
//                         key={idx}
//                         className={`px-4 py-2 border rounded-md bg-gray-100 border-gray-300 text-gray-700 ${
//                           option.isCorrect ? "bg-green-200" : ""
//                         }`}
//                       >
//                         {option.optionText}
//                       </li>
//                     ))}
//                   </ul>
//                   <p className="text-sm text-gray-500 mt-4">
//                     College: {question.college} | Subject Code:{" "}
//                     {question.subjectCode}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-center text-gray-500">No questions found.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CombinedQuizPage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const SearchBar = ({ searchKeyword, onSearch }) => (
//   <div className="mb-6 text-center">
//     <input
//       type="text"
//       className="w-1/2 p-2 border border-gray-500 rounded-lg"
//       placeholder="Search questions..."
//       value={searchKeyword}
//       onChange={onSearch}
//     />
//   </div>
// );

// const CombinedQuizPage = () => {
//   const [questions, setQuestions] = useState([]); // Dynamic questions
//   const [staticQuestions, setStaticQuestions] = useState([]); // Static questions
//   const [colleges, setColleges] = useState([]); // All colleges from both dynamic and static data
//   const [subjectCodes, setSubjectCodes] = useState([]);
//   const [selectedCollege, setSelectedCollege] = useState("");
//   const [selectedSubjectCode, setSelectedSubjectCode] = useState("");
//   const [filteredQuestions, setFilteredQuestions] = useState([]);
//   const [searchKeyword, setSearchKeyword] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDynamicQuestions = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/quiz");
//         console.log("Dynamic response", response.data.data.questions);

//         if (response.data.success) {
//           const allQuestions = response.data.data.flatMap((quiz) =>
//             quiz.questions.map((q) => ({
//               questionText: q.questionText,
//               options: q.options, // options now includes 'isCorrect'
//               category: quiz.category,
//               college: quiz.University,
//               subjectCode: quiz.Subject_code,
//             }))
//           );

//           setQuestions(allQuestions);

//           // Collect unique colleges from dynamic questions
//           const dynamicColleges = allQuestions.map((q) => q.college);

//           // Merge dynamic colleges with the existing colleges and remove duplicates
//           setColleges((prevColleges) => [
//             ...new Set([...prevColleges, ...dynamicColleges]),
//           ]);
//         } else {
//           console.error("No questions found.");
//         }
//       } catch (error) {
//         console.error("Error fetching dynamic questions:", error);
//       }
//     };

//     const fetchStaticQuestions = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/quiz/static"
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

//           // Collect unique colleges from static questions
//           const staticColleges = allStaticQuestions.map((q) => q.college);

//           // Merge static colleges with the existing colleges and remove duplicates
//           setColleges((prevColleges) => [
//             ...new Set([...prevColleges, ...staticColleges]),
//           ]);
//         } else {
//           setError("No questions found in the database.");
//         }
//       } catch (error) {
//         console.error("Error fetching static questions:", error);
//         setError("Failed to fetch questions. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDynamicQuestions();
//     fetchStaticQuestions();
//   }, []);

//   useEffect(() => {
//     // Merge both dynamic and static questions to display them together
//     const allQuestions = [...questions, ...staticQuestions];
//     setFilteredQuestions(allQuestions); // Initialize filteredQuestions with all questions
//   }, [questions, staticQuestions]);

//   const handleCollegeChange = (college) => {
//     if (selectedCollege === college) {
//       setSelectedCollege("");
//       setSubjectCodes([]);
//       setSelectedSubjectCode("");
//       setFilteredQuestions([]);
//     } else {
//       setSelectedCollege(college);

//       // Filter subject codes by college
//       const filteredSubjectCodes = [
//         ...new Set(
//           [...questions, ...staticQuestions]
//             .filter((q) => q.college === college)
//             .map((q) => q.subjectCode)
//         ),
//       ];
//       setSubjectCodes(filteredSubjectCodes);
//       setSelectedSubjectCode("");
//       setFilteredQuestions([]);
//     }
//   };

//   const handleSubjectCodeChange = (subjectCode) => {
//     if (selectedSubjectCode === subjectCode) {
//       setSelectedSubjectCode("");
//       setFilteredQuestions([]);
//     } else {
//       setSelectedSubjectCode(subjectCode);

//       // Filter questions by subject code and selected college
//       const filtered = [...questions].filter(
//         (q) => q.college === selectedCollege && q.subjectCode === subjectCode
//       );
//       setFilteredQuestions(filtered);
//     }
//   };

//   const handleSearch = (e) => {
//     const keyword = e.target.value.trim();
//     setSearchKeyword(keyword);

//     if (keyword === "") {
//       setSearchResults([]); // Clear search results if no keyword
//     } else {
//       // Search through both dynamic and static questions combined
//       const allQuestions = [...questions, ...staticQuestions];
//       const results = allQuestions.filter((q) =>
//         q.questionText.toLowerCase().includes(keyword.toLowerCase())
//       );
//       setSearchResults(results);
//     }
//   };

//   // Filter static questions for table rendering
//   const staticQuestionsForTable = staticQuestions.filter(
//     (q) =>
//       q.college === selectedCollege && q.subjectCode === selectedSubjectCode
//   );

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6 text-center">
//         Questions & Answers
//       </h1>

//       {/* Search Bar */}
//       <SearchBar searchKeyword={searchKeyword} onSearch={handleSearch} />

//       <div className="mb-6 text-center">
//         <h2 className="font-bold text-lg mb-4">Universities</h2>
//         <div className="flex flex-wrap justify-center gap-4">
//           {colleges.length > 0 ? (
//             colleges.map((college) => (
//               <button
//                 key={college}
//                 className={`px-4 py-2 border rounded-lg text-center w-auto max-w-sm ${
//                   selectedCollege === college
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-100"
//                 } hover:bg-blue-100 transition-colors`}
//                 onClick={() => handleCollegeChange(college)} // Use handleCollegeChange here
//               >
//                 {college}
//               </button>
//             ))
//           ) : (
//             <p>No colleges available</p>
//           )}
//         </div>
//       </div>

//       <div className="flex gap-8">
//         {selectedCollege && (
//           <div className="w-1/4">
//             <h2 className="font-bold text-lg mb-4 text-center">
//               Subject Codes
//             </h2>
//             <div className="space-y-2">
//               {subjectCodes.length > 0 ? (
//                 subjectCodes.map((subjectCode) => (
//                   <button
//                     key={subjectCode}
//                     className={`block px-4 py-2 border rounded-lg text-center w-full ${
//                       selectedSubjectCode === subjectCode
//                         ? "bg-blue-500 text-white"
//                         : "bg-gray-100"
//                     } hover:bg-blue-100 transition-colors`}
//                     onClick={() => handleSubjectCodeChange(subjectCode)}
//                   >
//                     {subjectCode}
//                   </button>
//                 ))
//               ) : (
//                 <p className="text-center text-gray-500">
//                   No subject codes available
//                 </p>
//               )}
//             </div>
//           </div>
//         )}

//         <div className="w-3/4">
//           {loading ? (
//             <p className="text-center text-gray-500">Loading questions...</p>
//           ) : error ? (
//             <p className="text-center text-red-500">{error}</p>
//           ) : searchResults.length > 0 ? (
//             <div className="space-y-6">
//               {searchResults.map((question, index) => (
//                 <div
//                   key={index}
//                   className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
//                 >
//                   <p className="font-semibold text-lg mb-4">{`Q${index + 1}: ${
//                     question.questionText
//                   }`}</p>
//                   <ul className="space-y-2">
//                     {question.options.map((option, idx) => (
//                       <li
//                         key={idx}
//                         className={`px-4 py-2 border rounded-md bg-gray-100 border-gray-300 text-gray-700 ${
//                           option.isCorrect ? "bg-green-200" : ""
//                         }`}
//                       >
//                         {option.optionText}
//                       </li>
//                     ))}
//                   </ul>
//                   <p className="text-sm text-gray-500 mt-4">
//                     College: {question.college} | Subject Code:{" "}
//                     {question.subjectCode}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           ) : searchKeyword ? (
//             <p className="text-center text-gray-500">
//               No questions found matching your search.
//             </p>
//           ) : !selectedSubjectCode ? (
//             <p className="text-center text-gray-500 mt-8">
//               Select a subject code to view questions.
//             </p>
//           ) : filteredQuestions.length > 0 ? (
//             <div className="space-y-6">
//               {filteredQuestions.map((question, index) => (
//                 <div
//                   key={index}
//                   className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
//                 >
//                   <p className="font-semibold text-lg mb-4">{`Q${index + 1}: ${
//                     question.questionText
//                   }`}</p>
//                   <ul className="space-y-2">
//                     {question.options.map((option, idx) => (
//                       <li
//                         key={idx}
//                         className={`px-4 py-2 border rounded-md bg-gray-100 border-gray-300 text-gray-700 ${
//                           option.isCorrect ? "bg-green-200" : ""
//                         }`}
//                       >
//                         {option.optionText}
//                       </li>
//                     ))}
//                   </ul>
//                   <p className="text-sm text-gray-500 mt-4">
//                     College: {question.college} | Subject Code:{" "}
//                     {question.subjectCode}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-center text-gray-500">No questions found.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CombinedQuizPage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const SearchBar = ({ searchKeyword, onSearch }) => (
//   <div className="mb-6 text-center">
//     <input
//       type="text"
//       className="w-1/2 p-2 border border-gray-500 rounded-lg"
//       placeholder="Search questions..."
//       value={searchKeyword}
//       onChange={onSearch}
//     />
//   </div>
// );

// const CombinedQuizPage = () => {
//   const [questions, setQuestions] = useState([]); // Dynamic questions
//   const [staticQuestions, setStaticQuestions] = useState([]); // Static questions
//   const [colleges, setColleges] = useState([]); // All colleges from both dynamic and static data
//   const [subjectCodes, setSubjectCodes] = useState([]);
//   const [selectedCollege, setSelectedCollege] = useState("");
//   const [selectedSubjectCode, setSelectedSubjectCode] = useState("");
//   const [filteredQuestions, setFilteredQuestions] = useState([]);
//   const [searchKeyword, setSearchKeyword] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDynamicQuestions = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/quiz");
//         console.log("Dynamic response", response.data.data.questions);

//         if (response.data.success) {
//           const allQuestions = response.data.data.flatMap((quiz) =>
//             quiz.questions.map((q) => ({
//               questionText: q.questionText,
//               options: q.options, // options now includes 'isCorrect'
//               category: quiz.category,
//               college: quiz.University,
//               subjectCode: quiz.Subject_code,
//             }))
//           );

//           setQuestions(allQuestions);

//           const dynamicColleges = allQuestions.map((q) => q.college);
//           setColleges((prevColleges) => [
//             ...new Set([...prevColleges, ...dynamicColleges]),
//           ]);
//         } else {
//           console.error("No questions found.");
//         }
//       } catch (error) {
//         console.error("Error fetching dynamic questions:", error);
//       }
//     };

//     const fetchStaticQuestions = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/quiz/static"
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

//           const staticColleges = allStaticQuestions.map((q) => q.college);
//           setColleges((prevColleges) => [
//             ...new Set([...prevColleges, ...staticColleges]),
//           ]);
//         } else {
//           setError("No questions found in the database.");
//         }
//       } catch (error) {
//         console.error("Error fetching static questions:", error);
//         setError("Failed to fetch questions. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDynamicQuestions();
//     fetchStaticQuestions();
//   }, []);

//   useEffect(() => {
//     const allQuestions = [...questions, ...staticQuestions];
//     setFilteredQuestions(allQuestions);
//   }, [questions, staticQuestions]);

//   const handleCollegeChange = (college) => {
//     if (selectedCollege === college) {
//       setSelectedCollege("");
//       setSubjectCodes([]);
//       setSelectedSubjectCode("");
//       setFilteredQuestions([]);
//     } else {
//       setSelectedCollege(college);

//       const filteredSubjectCodes = [
//         ...new Set(
//           [...questions, ...staticQuestions]
//             .filter((q) => q.college === college)
//             .map((q) => q.subjectCode)
//         ),
//       ];
//       setSubjectCodes(filteredSubjectCodes);
//       setSelectedSubjectCode("");
//       setFilteredQuestions([]);
//     }
//   };

//   const handleSubjectCodeChange = (subjectCode) => {
//     if (selectedSubjectCode === subjectCode) {
//       setSelectedSubjectCode("");
//       setFilteredQuestions([]);
//     } else {
//       setSelectedSubjectCode(subjectCode);

//       const filtered = [...questions].filter(
//         (q) => q.college === selectedCollege && q.subjectCode === subjectCode
//       );
//       setFilteredQuestions(filtered);
//     }
//   };

//   const handleSearch = (e) => {
//     const keyword = e.target.value.trim();
//     setSearchKeyword(keyword);

//     if (keyword === "") {
//       setSearchResults([]);
//     } else {
//       const allQuestions = [...questions, ...staticQuestions];
//       const results = allQuestions.filter((q) =>
//         q.questionText.toLowerCase().includes(keyword.toLowerCase())
//       );
//       setSearchResults(results);
//     }
//   };

//   const staticQuestionsForTable = staticQuestions.filter(
//     (q) =>
//       q.college === selectedCollege && q.subjectCode === selectedSubjectCode
//   );

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6 text-center">
//         Questions & Answers
//       </h1>

//       <SearchBar searchKeyword={searchKeyword} onSearch={handleSearch} />

//       <div className="mb-6 text-center">
//         <h2 className="font-bold text-lg mb-4">Universities</h2>
//         <div className="flex flex-wrap justify-center gap-4">
//           {colleges.length > 0 ? (
//             colleges.map((college) => (
//               <button
//                 key={college}
//                 className={`px-4 py-2 border rounded-lg text-center w-auto max-w-sm ${
//                   selectedCollege === college
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-100"
//                 } hover:bg-blue-100 transition-colors`}
//                 onClick={() => handleCollegeChange(college)}
//               >
//                 {college}
//               </button>
//             ))
//           ) : (
//             <p>No colleges available</p>
//           )}
//         </div>
//       </div>

//       <div className="flex gap-8">
//         {selectedCollege && (
//           <div className="w-1/4">
//             <h2 className="font-bold text-lg mb-4 text-center">Subject Codes</h2>
//             <div className="space-y-2">
//               {subjectCodes.length > 0 ? (
//                 subjectCodes.map((subjectCode) => (
//                   <button
//                     key={subjectCode}
//                     className={`block px-4 py-2 border rounded-lg text-center w-full ${
//                       selectedSubjectCode === subjectCode
//                         ? "bg-blue-500 text-white"
//                         : "bg-gray-100"
//                     } hover:bg-blue-100 transition-colors`}
//                     onClick={() => handleSubjectCodeChange(subjectCode)}
//                   >
//                     {subjectCode}
//                   </button>
//                 ))
//               ) : (
//                 <p className="text-center text-gray-500">
//                   No subject codes available
//                 </p>
//               )}
//             </div>
//           </div>
//         )}

//         <div className="w-3/4">
//           {loading ? (
//             <p className="text-center text-gray-500">Loading questions...</p>
//           ) : error ? (
//             <p className="text-center text-red-500">{error}</p>
//           ) : searchResults.length > 0 ? (
//             <div className="space-y-6">
//               {searchResults.map((question, index) => (
//                 <div
//                   key={index}
//                   className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
//                 >
//                   <p
//                     className="font-semibold text-lg mb-4"
//                     dangerouslySetInnerHTML={{
//                       __html: `Q${index + 1}: ${question.questionText}`,
//                     }}
//                   />
//                   <ul className="space-y-2">
//                     {question.options.map((option, idx) => (
//                       <li
//                         key={idx}
//                         className={`px-4 py-2 border rounded-md bg-gray-100 border-gray-300 text-gray-700 ${
//                           option.isCorrect ? "bg-green-200" : ""
//                         }`}
//                       >
//                         {option.optionText}
//                       </li>
//                     ))}
//                   </ul>
//                   <p className="text-sm text-gray-500 mt-4">
//                     College: {question.college} | Subject Code:{" "}
//                     {question.subjectCode}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           ) : searchKeyword ? (
//             <p className="text-center text-gray-500">
//               No questions found matching your search.
//             </p>
//           ) : !selectedSubjectCode ? (
//             <p className="text-center text-gray-500 mt-8">
//               Select a subject code to view questions.
//             </p>
//           ) : filteredQuestions.length > 0 ? (
//             <div className="space-y-6">
//               {filteredQuestions.map((question, index) => (
//                 <div
//                   key={index}
//                   className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
//                 >
//                   <p
//                     className="font-semibold text-lg mb-4"
//                     dangerouslySetInnerHTML={{
//                       __html: `Q${index + 1}: ${question.questionText}`,
//                     }}
//                   />
//                   <ul className="space-y-2">
//                     {question.options.map((option, idx) => (
//                       <li
//                         key={idx}
//                         className={`px-4 py-2 border rounded-md bg-gray-100 border-gray-300 text-gray-700 ${
//                           option.isCorrect ? "bg-green-200" : ""
//                         }`}
//                       >
//                         {option.optionText}
//                       </li>
//                     ))}
//                   </ul>
//                   <p className="text-sm text-gray-500 mt-4">
//                     College: {question.college} | Subject Code:{" "}
//                     {question.subjectCode}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-center text-gray-500">No questions found.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CombinedQuizPage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const SearchBar = ({ searchKeyword, onSearch }) => (
//   <div className="mb-6 text-center">
//     <input
//       type="text"
//       className="w-1/2 p-2 border border-gray-500 rounded-lg"
//       placeholder="Search questions..."
//       value={searchKeyword}
//       onChange={onSearch}
//     />
//   </div>
// );

// const CombinedQuizPage = () => {
//   const [questions, setQuestions] = useState([]);
//   const [staticQuestions, setStaticQuestions] = useState([]);
//   const [colleges, setColleges] = useState([]);
//   const [subjectCodes, setSubjectCodes] = useState([]);
//   const [selectedCollege, setSelectedCollege] = useState("");
//   const [selectedSubjectCode, setSelectedSubjectCode] = useState("");
//   const [filteredQuestions, setFilteredQuestions] = useState([]);
//   const [searchKeyword, setSearchKeyword] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDynamicQuestions = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/quiz");
//         if (response.data.success) {
//           const allQuestions = response.data.data.flatMap((quiz) =>
//             quiz.questions.map((q) => ({
//               questionText: q.questionText,
//               options: q.options,
//               category: quiz.category,
//               college: quiz.University,
//               subjectCode: quiz.Subject_code,
//             }))
//           );

//           setQuestions(allQuestions);
//           const dynamicColleges = allQuestions.map((q) => q.college);
//           setColleges((prevColleges) => [
//             ...new Set([...prevColleges, ...dynamicColleges]),
//           ]);
//         } else {
//           console.error("No questions found.");
//         }
//       } catch (error) {
//         console.error("Error fetching dynamic questions:", error);
//       }
//     };

//     const fetchStaticQuestions = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/quiz/static"
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
//           const staticColleges = allStaticQuestions.map((q) => q.college);
//           setColleges((prevColleges) => [
//             ...new Set([...prevColleges, ...staticColleges]),
//           ]);
//         } else {
//           setError("No questions found in the database.");
//         }
//       } catch (error) {
//         console.error("Error fetching static questions:", error);
//         setError("Failed to fetch questions. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDynamicQuestions();
//     fetchStaticQuestions();
//   }, []);

//   useEffect(() => {
//     const allQuestions = [...questions, ...staticQuestions];
//     setFilteredQuestions(allQuestions);
//   }, [questions, staticQuestions]);

//   const handleCollegeChange = (college) => {
//     if (selectedCollege === college) {
//       setSelectedCollege("");
//       setSubjectCodes([]);
//       setSelectedSubjectCode("");
//       setFilteredQuestions([]);
//     } else {
//       setSelectedCollege(college);
//       const filteredSubjectCodes = [
//         ...new Set(
//           [...questions, ...staticQuestions]
//             .filter((q) => q.college === college)
//             .map((q) => q.subjectCode)
//         ),
//       ];
//       setSubjectCodes(filteredSubjectCodes);
//       setSelectedSubjectCode("");
//       setFilteredQuestions([]);
//     }
//   };

//   const handleSubjectCodeChange = (subjectCode) => {
//     if (selectedSubjectCode === subjectCode) {
//       setSelectedSubjectCode("");
//       setFilteredQuestions([]);
//     } else {
//       setSelectedSubjectCode(subjectCode);
//       const filtered = [...questions].filter(
//         (q) => q.college === selectedCollege && q.subjectCode === subjectCode
//       );
//       setFilteredQuestions(filtered);
//     }
//   };

//   const handleSearch = (e) => {
//     const keyword = e.target.value.trim();
//     setSearchKeyword(keyword);

//     if (keyword === "") {
//       setSearchResults([]);
//     } else {
//       const allQuestions = [...questions, ...staticQuestions];
//       const results = allQuestions.filter((q) =>
//         q.questionText.toLowerCase().includes(keyword.toLowerCase())
//       );
//       setSearchResults(results);
//     }
//   };

//   const staticQuestionsForTable = staticQuestions.filter(
//     (q) =>
//       q.college === selectedCollege && q.subjectCode === selectedSubjectCode
//   );

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6 text-center">
//         Questions & Answers
//       </h1>

//       <SearchBar searchKeyword={searchKeyword} onSearch={handleSearch} />

//       <div className="mb-6 text-center">
//         <h2 className="font-bold text-lg mb-4">Universities</h2>
//         <div className="flex flex-wrap justify-center gap-4">
//           {colleges.length > 0 ? (
//             colleges.map((college) => (
//               <button
//                 key={college}
//                 className={`px-4 py-2 border rounded-lg text-center w-auto max-w-sm ${
//                   selectedCollege === college
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-100"
//                 } hover:bg-blue-100 transition-colors`}
//                 onClick={() => handleCollegeChange(college)}
//               >
//                 {college}
//               </button>
//             ))
//           ) : (
//             <p>No colleges available</p>
//           )}
//         </div>
//       </div>

//       <div className="flex gap-8">
//         {selectedCollege && (
//           <div className="w-1/4">
//             <h2 className="font-bold text-lg mb-4 text-center">Subject Codes</h2>
//             <div className="space-y-2">
//               {subjectCodes.length > 0 ? (
//                 subjectCodes.map((subjectCode) => (
//                   <button
//                     key={subjectCode}
//                     className={`block px-4 py-2 border rounded-lg text-center w-full ${
//                       selectedSubjectCode === subjectCode
//                         ? "bg-blue-500 text-white"
//                         : "bg-gray-100"
//                     } hover:bg-blue-100 transition-colors`}
//                     onClick={() => handleSubjectCodeChange(subjectCode)}
//                   >
//                     {subjectCode}
//                   </button>
//                 ))
//               ) : (
//                 <p className="text-center text-gray-500">
//                   No subject codes available
//                 </p>
//               )}
//             </div>
//           </div>
//         )}

//         <div className="w-3/4">
//           {loading ? (
//             <p className="text-center text-gray-500">Loading questions...</p>
//           ) : error ? (
//             <p className="text-center text-red-500">{error}</p>
//           ) : searchResults.length > 0 ? (
//             <div className="space-y-6">
//               {searchResults.map((question, index) => (
//                 <div
//                   key={index}
//                   className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
//                 >
//                   <p
//                     className="font-semibold text-lg mb-4"
//                     dangerouslySetInnerHTML={{ __html: `Q${index + 1}: ${question.questionText}` }}
//                   ></p>
//                   <ul className="space-y-2">
//                     {question.options.map((option, idx) => (
//                       <li
//                         key={idx}
//                         className={`px-4 py-2 border rounded-md bg-gray-100 border-gray-300 text-gray-700 ${
//                           option.isCorrect ? "bg-green-200" : ""
//                         }`}
//                         dangerouslySetInnerHTML={{ __html: option.optionText }}
//                       ></li>
//                     ))}
//                   </ul>
//                   <p className="text-sm text-gray-500 mt-4">
//                     College: {question.college} | Subject Code: {question.subjectCode}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           ) : searchKeyword ? (
//             <p className="text-center text-gray-500">
//               No questions found matching your search.
//             </p>
//           ) : !selectedSubjectCode ? (
//             <p className="text-center text-gray-500 mt-8">
//               Select a subject code to view questions.
//             </p>
//           ) : filteredQuestions.length > 0 ? (
//             <div className="space-y-6">
//               {filteredQuestions.map((question, index) => (
//                 <div
//                   key={index}
//                   className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
//                 >
//                   <p
//                     className="font-semibold text-lg mb-4"
//                     dangerouslySetInnerHTML={{ __html: `Q${index + 1}: ${question.questionText}` }}
//                   ></p>
//                   <ul className="space-y-2">
//                     {question.options.map((option, idx) => (
//                       <li
//                         key={idx}
//                         className={`px-4 py-2 border rounded-md bg-gray-100 border-gray-300 text-gray-700 ${
//                           option.isCorrect ? "bg-green-200" : ""
//                         }`}
//                         dangerouslySetInnerHTML={{ __html: option.optionText }}
//                       ></li>
//                     ))}
//                   </ul>
//                   <p className="text-sm text-gray-500 mt-4">
//                     College: {question.college} | Subject Code: {question.subjectCode}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-center text-gray-500">No questions found.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CombinedQuizPage;

//last perfect

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const SearchBar = ({ searchKeyword, onSearch }) => (
//   <div className="mb-6 text-center">
//     <input
//       type="text"
//       className="w-1/2 p-2 border border-gray-500 rounded-lg"
//       placeholder="Search questions..."
//       value={searchKeyword}
//       onChange={onSearch}
//     />
//   </div>
// );

// const CombinedQuizPage = () => {
//   const [questions, setQuestions] = useState([]);
//   const [staticQuestions, setStaticQuestions] = useState([]);
//   const [colleges, setColleges] = useState([]);
//   const [subjectCodes, setSubjectCodes] = useState([]);
//   const [selectedCollege, setSelectedCollege] = useState("");
//   const [selectedSubjectCode, setSelectedSubjectCode] = useState("");
//   const [filteredQuestions, setFilteredQuestions] = useState([]);
//   const [searchKeyword, setSearchKeyword] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDynamicQuestions = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/quiz");
//         if (response.data.success) {
//           const allQuestions = response.data.data.flatMap((quiz) =>
//             quiz.questions.map((q) => ({
//               questionText: q.questionText,
//               options: q.options,
//               category: quiz.category,
//               college: quiz.University,
//               subjectCode: quiz.Subject_code,
//             }))
//           );

//           setQuestions(allQuestions);
//           const dynamicColleges = allQuestions.map((q) => q.college);
//           setColleges((prevColleges) => [
//             ...new Set([...prevColleges, ...dynamicColleges]),
//           ]);
//         } else {
//           console.error("No questions found.");
//         }
//       } catch (error) {
//         console.error("Error fetching dynamic questions:", error);
//       }
//     };

//     const fetchStaticQuestions = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/quiz/static"
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
//           const staticColleges = allStaticQuestions.map((q) => q.college);
//           setColleges((prevColleges) => [
//             ...new Set([...prevColleges, ...staticColleges]),
//           ]);
//         } else {
//           setError("No questions found in the database.");
//         }
//       } catch (error) {
//         console.error("Error fetching static questions:", error);
//         setError("Failed to fetch questions. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDynamicQuestions();
//     fetchStaticQuestions();
//   }, []);

//   useEffect(() => {
//     const allQuestions = [...questions, ...staticQuestions];
//     setFilteredQuestions(allQuestions);
//   }, [questions, staticQuestions]);

//   const handleCollegeChange = (college) => {
//     if (selectedCollege === college) {
//       setSelectedCollege("");
//       setSubjectCodes([]);
//       setSelectedSubjectCode("");
//       setFilteredQuestions([]);
//     } else {
//       setSelectedCollege(college);
//       const filteredSubjectCodes = [
//         ...new Set(
//           [...questions, ...staticQuestions]
//             .filter((q) => q.college === college)
//             .map((q) => q.subjectCode)
//         ),
//       ];
//       setSubjectCodes(filteredSubjectCodes);
//       setSelectedSubjectCode("");
//       setFilteredQuestions([]);
//     }
//   };

//   const handleSubjectCodeChange = (subjectCode) => {
//     if (selectedSubjectCode === subjectCode) {
//       setSelectedSubjectCode("");
//       setFilteredQuestions([]);
//     } else {
//       setSelectedSubjectCode(subjectCode);
//       const filtered = [...questions].filter(
//         (q) => q.college === selectedCollege && q.subjectCode === subjectCode
//       );
//       setFilteredQuestions(filtered);
//     }
//   };

//   const handleSearch = (e) => {
//     const keyword = e.target.value.trim();
//     setSearchKeyword(keyword);

//     if (keyword === "") {
//       setSearchResults([]);
//     } else {
//       const allQuestions = [...questions, ...staticQuestions];
//       const results = allQuestions.filter((q) =>
//         q.questionText.toLowerCase().includes(keyword.toLowerCase())
//       );
//       setSearchResults(results);
//     }
//   };

//   const staticQuestionsForTable = staticQuestions.filter(
//     (q) =>
//       q.college === selectedCollege && q.subjectCode === selectedSubjectCode
//   );

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6 text-center">
//         Questions & Answers
//       </h1>

//       <SearchBar searchKeyword={searchKeyword} onSearch={handleSearch} />

//       <div className="mb-6 text-center">
//         <h2 className="font-bold text-lg mb-4">Universities</h2>
//         <div className="flex flex-wrap justify-center gap-4">
//           {colleges.length > 0 ? (
//             colleges.map((college) => (
//               <button
//                 key={college}
//                 className={`px-4 py-2 border rounded-lg text-center w-auto max-w-sm ${
//                   selectedCollege === college
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-100"
//                 } hover:bg-blue-100 transition-colors`}
//                 onClick={() => handleCollegeChange(college)}
//               >
//                 {college}
//               </button>
//             ))
//           ) : (
//             <p>No colleges available</p>
//           )}
//         </div>
//       </div>

//       <div className="flex gap-8">
//         {selectedCollege && (
//           <div className="w-1/4">
//             <h2 className="font-bold text-lg mb-4 text-center">
//               Subject Codes
//             </h2>
//             <div className="space-y-2">
//               {subjectCodes.length > 0 ? (
//                 subjectCodes.map((subjectCode) => (
//                   <button
//                     key={subjectCode}
//                     className={`block px-4 py-2 border rounded-lg text-center w-full ${
//                       selectedSubjectCode === subjectCode
//                         ? "bg-blue-500 text-white"
//                         : "bg-gray-100"
//                     } hover:bg-blue-100 transition-colors`}
//                     onClick={() => handleSubjectCodeChange(subjectCode)}
//                   >
//                     {subjectCode}
//                   </button>
//                 ))
//               ) : (
//                 <p className="text-center text-gray-500">
//                   No subject codes available
//                 </p>
//               )}
//             </div>
//           </div>
//         )}

//         <div className="w-3/4">
//           {loading ? (
//             <p className="text-center text-gray-500">Loading questions...</p>
//           ) : error ? (
//             <p className="text-center text-red-500">{error}</p>
//           ) : searchResults.length > 0 ? (
//             <div className="space-y-6">
//               {searchResults.map((question, index) => (
//                 <div
//                   key={index}
//                   className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
//                 >
//                   <p
//                     className="font-semibold text-lg mb-4"
//                     dangerouslySetInnerHTML={{
//                       __html: `Q${index + 1}: ${question.questionText}`,
//                     }}
//                   ></p>
//                   <ul className="space-y-2">
//                     {question.options.map((option, idx) => (
//                       <li
//                         key={idx}
//                         className={`px-4 py-2 border rounded-md bg-gray-100 border-gray-300 text-gray-700 ${
//                           option.isCorrect ? "bg-green-200" : ""
//                         }`}
//                         dangerouslySetInnerHTML={{ __html: option.optionText }}
//                       ></li>
//                     ))}
//                   </ul>
//                   <p className="text-sm text-gray-500 mt-4">
//                     College: {question.college} | Subject Code:{" "}
//                     {question.subjectCode}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           ) : searchKeyword ? (
//             <p className="text-center text-gray-500">
//               No questions found matching your search.
//             </p>
//           ) : !selectedSubjectCode ? (
//             <p className="text-center text-gray-500 mt-8">
//               Select a subject code to view questions.
//             </p>
//           ) : filteredQuestions.length > 0 ? (
//             <div className="space-y-6">
//               {filteredQuestions.map((question, index) => (
//                 <div
//                   key={index}
//                   className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
//                 >
//                   <p
//                     className="font-semibold text-lg mb-4"
//                     dangerouslySetInnerHTML={{
//                       __html: `Q${index + 1}: ${question.questionText}`,
//                     }}
//                   ></p>
//                   <ul className="space-y-2">
//                     {question.options.map((option, idx) => (
//                       <li
//                         key={idx}
//                         className={`px-4 py-2 border rounded-md bg-gray-100 border-gray-300 text-gray-700 ${
//                           option.isCorrect ? "bg-green-200" : ""
//                         }`}
//                         dangerouslySetInnerHTML={{ __html: option.optionText }}
//                       ></li>
//                     ))}
//                   </ul>
//                   <p className="text-sm text-gray-500 mt-4">
//                     College: {question.college} | Subject Code:{" "}
//                     {question.subjectCode}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-center text-gray-500"></p>
//           )}

// {/* Static Questions Table */}
// {selectedCollege &&
//   selectedSubjectCode &&
//   staticQuestionsForTable.length > 0 && (
//     <div className="mt-8 p-6 bg-white shadow-xl rounded-lg border border-gray-200">
//       <h3 className="font-bold text-2xl text-gray-900 mb-6 text-center">
//         Static Questions
//       </h3>
//       <div className="overflow-x-auto">
//         <table className="min-w-full table-auto border-collapse">
//           <thead>
//             <tr className="border-b bg-blue-100">
//               <th className="px-6 py-4 text-m font-bold text-blue-800">
//                 Question
//               </th>
//               <th className="px-6 py-4 text-m font-bold text-blue-800">
//                 Answer
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {staticQuestionsForTable.map((question, index) => (
//               <tr
//                 key={index}
//                 className="hover:bg-gray-50 transition-colors duration-200"
//               >
//                 <td
//                   className="px-6 py-4 text-sm text-gray-800 border-t"
//                   dangerouslySetInnerHTML={{
//                     __html: question.questionText,
//                   }}
//                 ></td>
//                 <td
//                   className="px-6 py-4 text-center text-sm text-gray-800 border-t"
//                   dangerouslySetInnerHTML={{
//                     __html: question.options[0].optionText,
//                   }}
//                 ></td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CombinedQuizPage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const SearchBar = ({ searchKeyword, onSearch }) => (
//   <div className="mb-6 text-center">
//     <input
//       type="text"
//       className="w-1/2 p-2 border border-gray-500 rounded-lg"
//       placeholder="Search questions..."
//       value={searchKeyword}
//       onChange={onSearch}
//     />
//   </div>
// );

// const CombinedQuizPage = () => {
//   const [questions, setQuestions] = useState([]);
//   const [staticQuestions, setStaticQuestions] = useState([]);
//   const [colleges, setColleges] = useState([]);
//   const [subjectCodes, setSubjectCodes] = useState([]);
//   const [categories, setCategories] = useState([]); // Categories for selected subject
//   const [selectedCollege, setSelectedCollege] = useState("");
//   const [selectedSubjectCode, setSelectedSubjectCode] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState(""); // Category filter
//   const [filteredQuestions, setFilteredQuestions] = useState([]);
//   const [searchKeyword, setSearchKeyword] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDynamicQuestions = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/quiz");
//         if (response.data.success) {
//           const allQuestions = response.data.data.flatMap((quiz) =>
//             quiz.questions.map((q) => ({
//               questionText: q.questionText,
//               options: q.options,
//               category: quiz.category,
//               college: quiz.University,
//               subjectCode: quiz.Subject_code,
//             }))
//           );

//           setQuestions(allQuestions);
//           const dynamicColleges = allQuestions.map((q) => q.college);
//           setColleges((prevColleges) => [
//             ...new Set([...prevColleges, ...dynamicColleges]),
//           ]);
//         } else {
//           console.error("No questions found.");
//         }
//       } catch (error) {
//         console.error("Error fetching dynamic questions:", error);
//       }
//     };

//     const fetchStaticQuestions = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/quiz/static"
//         );
//         if (response.status === 200 && response.data.data) {
//           const allStaticQuestions = response.data.data.flatMap((quiz) =>
//             quiz.questions.map((q) => ({
//               questionText: q.question,
//               options: [{ optionText: q.answer || "No answer provided" }],
//               college: quiz.university,
//               subjectCode: quiz.subjectCode,
//               category: quiz.category, // Assuming static questions have category field
//             }))
//           );

//           setStaticQuestions(allStaticQuestions);
//           const staticColleges = allStaticQuestions.map((q) => q.college);
//           setColleges((prevColleges) => [
//             ...new Set([...prevColleges, ...staticColleges]),
//           ]);
//         } else {
//           setError("No questions found in the database.");
//         }
//       } catch (error) {
//         console.error("Error fetching static questions:", error);
//         setError("Failed to fetch questions. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDynamicQuestions();
//     fetchStaticQuestions();
//   }, []);

//   // Update filteredQuestions when questions or staticQuestions change
//   useEffect(() => {
//     const allQuestions = [...questions, ...staticQuestions];
//     setFilteredQuestions(allQuestions);
//   }, [questions, staticQuestions]);

//   // Update categories when a subject code is selected
//   useEffect(() => {
//     if (selectedSubjectCode) {
//       const allQuestions = [...questions, ...staticQuestions];
//       const subjectQuestions = allQuestions.filter(
//         (q) => q.subjectCode === selectedSubjectCode
//       );
//       const availableCategories = [
//         ...new Set(subjectQuestions.map((q) => q.category)),
//       ];
//       setCategories(availableCategories);
//     }
//   }, [selectedSubjectCode, questions, staticQuestions]);

//   // Filter questions based on selected college, subject, and category
//   useEffect(() => {
//     let filtered = [...questions, ...staticQuestions];

//     if (selectedCollege) {
//       filtered = filtered.filter((q) => q.college === selectedCollege);
//     }

//     if (selectedSubjectCode) {
//       filtered = filtered.filter((q) => q.subjectCode === selectedSubjectCode);
//     }

//     if (selectedCategory) {
//       filtered = filtered.filter((q) => q.category === selectedCategory);
//     }

//     setFilteredQuestions(filtered);
//   }, [selectedCollege, selectedSubjectCode, selectedCategory, questions, staticQuestions]);

//   const handleCollegeChange = (college) => {
//     if (selectedCollege === college) {
//       setSelectedCollege("");
//       setSubjectCodes([]);
//       setSelectedSubjectCode("");
//       setSelectedCategory("");
//       setCategories([]);
//       setFilteredQuestions([]);
//     } else {
//       setSelectedCollege(college);
//       const filteredSubjectCodes = [
//         ...new Set(
//           [...questions, ...staticQuestions]
//             .filter((q) => q.college === college)
//             .map((q) => q.subjectCode)
//         ),
//       ];
//       setSubjectCodes(filteredSubjectCodes);
//       setSelectedSubjectCode("");
//       setSelectedCategory(""); // Reset category filter
//       setCategories([]); // Reset categories
//       setFilteredQuestions([]);
//     }
//   };

//   const handleSubjectCodeChange = (subjectCode) => {
//     if (selectedSubjectCode === subjectCode) {
//       setSelectedSubjectCode("");
//       setSelectedCategory(""); // Reset category filter
//       setCategories([]);
//       setFilteredQuestions([]);
//     } else {
//       setSelectedSubjectCode(subjectCode);
//       setSelectedCategory(""); // Reset category filter
//       setCategories([]);
//       setFilteredQuestions([]);
//     }
//   };

//   const handleCategoryChange = (category) => {
//     if (selectedCategory === category) {
//       setSelectedCategory(""); // Reset category filter
//     } else {
//       setSelectedCategory(category);
//     }
//   };

//   const handleSearch = (e) => {
//     const keyword = e.target.value.trim();
//     setSearchKeyword(keyword);

//     if (keyword === "") {
//       setSearchResults([]);
//     } else {
//       const allQuestions = [...questions, ...staticQuestions];
//       const results = allQuestions.filter((q) =>
//         q.questionText.toLowerCase().includes(keyword.toLowerCase())
//       );
//       setSearchResults(results);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6 text-center">Questions & Answers</h1>

//       <SearchBar searchKeyword={searchKeyword} onSearch={handleSearch} />

//       <div className="mb-6 text-center">
//         <h2 className="font-bold text-lg mb-4">Universities</h2>
//         <div className="flex flex-wrap justify-center gap-4">
//           {colleges.length > 0 ? (
//             colleges.map((college) => (
//               <button
//                 key={college}
//                 className={`px-4 py-2 border rounded-lg text-center w-auto max-w-sm ${
//                   selectedCollege === college
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-100"
//                 } hover:bg-blue-100 transition-colors`}
//                 onClick={() => handleCollegeChange(college)}
//               >
//                 {college}
//               </button>
//             ))
//           ) : (
//             <p>No colleges available</p>
//           )}
//         </div>
//       </div>

//       {selectedCollege && (
//         <div className="mb-6 text-center">
//           <h2 className="font-bold text-lg mb-4">Subject Codes</h2>
//           <div className="flex flex-wrap justify-center gap-4">
//             {subjectCodes.length > 0 ? (
//               subjectCodes.map((subjectCode) => (
//                 <button
//                   key={subjectCode}
//                   className={`px-4 py-2 border rounded-lg text-center w-auto max-w-sm ${
//                     selectedSubjectCode === subjectCode
//                       ? "bg-blue-500 text-white"
//                       : "bg-gray-100"
//                   } hover:bg-blue-100 transition-colors`}
//                   onClick={() => handleSubjectCodeChange(subjectCode)}
//                 >
//                   {subjectCode}
//                 </button>
//               ))
//             ) : (
//               <p>No subject codes available</p>
//             )}
//           </div>
//         </div>
//       )}

//       {selectedSubjectCode && (
//         <div className="mb-6 text-center">
//           <h2 className="font-bold text-lg mb-4">Categories</h2>
//           <div className="flex flex-wrap justify-center gap-4">
//             {categories.length > 0 ? (
//               categories.map((category) => (
//                 <button
//                   key={category}
//                   className={`px-4 py-2 border rounded-lg text-center w-auto max-w-sm ${
//                     selectedCategory === category
//                       ? "bg-blue-500 text-white"
//                       : "bg-gray-100"
//                   } hover:bg-blue-100 transition-colors`}
//                   onClick={() => handleCategoryChange(category)}
//                 >
//                   {category}
//                 </button>
//               ))
//             ) : (
//               <p>No categories available</p>
//             )}
//           </div>
//         </div>
//       )}

//       <div className="space-y-6">
//         {loading ? (
//           <p className="text-center text-gray-500">Loading questions...</p>
//         ) : error ? (
//           <p className="text-center text-red-500">{error}</p>
//         ) : searchResults.length > 0 ? (
//           <div className="space-y-6">
//             {searchResults.map((question, index) => (
//               <div
//                 key={index}
//                 className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
//               >
//                 <p className="font-semibold text-lg mb-4">{`Q${index + 1}: ${question.questionText}`}</p>
//                 <ul className="space-y-2">
//                   {question.options.map((option, idx) => (
//                     <li
//                       key={idx}
//                       className={`px-4 py-2 border rounded-md bg-gray-100 border-gray-300 text-gray-700 ${
//                         option.isCorrect ? "bg-green-200" : ""
//                       }`}
//                       dangerouslySetInnerHTML={{
//                         __html: option.optionText,
//                       }}
//                     ></li>
//                   ))}
//                 </ul>
//                 <p className="text-sm text-gray-500 mt-4">
//                   College: {question.college} | Subject Code:{" "}
//                   {question.subjectCode} | Category: {question.category}
//                 </p>
//               </div>
//             ))}
//           </div>
//         ) : filteredQuestions.length > 0 ? (
//           <div className="space-y-6">
//             {filteredQuestions.map((question, index) => (
//               <div
//                 key={index}
//                 className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
//               >
//                 <p className="font-semibold text-lg mb-4">{`Q${index + 1}: ${question.questionText}`}</p>
//                 <ul className="space-y-2">
//                   {question.options.map((option, idx) => (
//                     <li
//                       key={idx}
//                       className={`px-4 py-2 border rounded-md bg-gray-100 border-gray-300 text-gray-700 ${
//                         option.isCorrect ? "bg-green-200" : ""
//                       }`}
//                       dangerouslySetInnerHTML={{
//                         __html: option.optionText,
//                       }}
//                     ></li>
//                   ))}
//                 </ul>
//                 <p className="text-sm text-gray-500 mt-4">
//                   College: {question.college} | Subject Code:{" "}
//                   {question.subjectCode} | Category: {question.category}
//                 </p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-center text-gray-500">No questions found</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CombinedQuizPage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const SearchBar = ({ searchKeyword, onSearch }) => (
//   <div className="mb-6 text-center">
//     <input
//       type="text"
//       className="w-1/2 p-2 border border-gray-500 rounded-lg"
//       placeholder="Search questions..."
//       value={searchKeyword}
//       onChange={onSearch}
//     />
//   </div>
// );

// const CombinedQuizPage = () => {
//   const [questions, setQuestions] = useState([]);
//   const [staticQuestions, setStaticQuestions] = useState([]);
//   const [colleges, setColleges] = useState([]);
//   const [subjectCodes, setSubjectCodes] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCollege, setSelectedCollege] = useState("");
//   const [selectedSubjectCode, setSelectedSubjectCode] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [filteredQuestions, setFilteredQuestions] = useState([]);
//   const [searchKeyword, setSearchKeyword] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Existing fetch effects remain the same
//   useEffect(() => {
//     const fetchDynamicQuestions = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/quiz");
//         if (response.data.success) {
//           const allQuestions = response.data.data.flatMap((quiz) =>
//             quiz.questions.map((q) => ({
//               questionText: q.questionText,
//               options: q.options,
//               category: quiz.category,
//               college: quiz.University,
//               subjectCode: quiz.Subject_code,
//             }))
//           );

//           setQuestions(allQuestions);
//           const dynamicColleges = allQuestions.map((q) => q.college);
//           setColleges((prevColleges) => [
//             ...new Set([...prevColleges, ...dynamicColleges]),
//           ]);
//         }
//       } catch (error) {
//         console.error("Error fetching dynamic questions:", error);
//       }
//     };

//     const fetchStaticQuestions = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get("http://localhost:5000/api/quiz/static");
//         if (response.status === 200 && response.data.data) {
//           const allStaticQuestions = response.data.data.flatMap((quiz) =>
//             quiz.questions.map((q) => ({
//               questionText: q.question,
//               options: [{ optionText: q.answer || "No answer provided" }],
//               college: quiz.university,
//               subjectCode: quiz.subjectCode,
//               category: quiz.category,
//             }))
//           );

//           setStaticQuestions(allStaticQuestions);
//           const staticColleges = allStaticQuestions.map((q) => q.college);
//           setColleges((prevColleges) => [
//             ...new Set([...prevColleges, ...staticColleges]),
//           ]);
//         } else {
//           setError("No questions found in the database.");
//         }
//       } catch (error) {
//         setError("Failed to fetch questions. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDynamicQuestions();
//     fetchStaticQuestions();
//   }, []);

//   // Update filteredQuestions when any filter changes
//   useEffect(() => {
//     let filtered = [...questions, ...staticQuestions];

//     if (selectedCollege) {
//       filtered = filtered.filter((q) => q.college === selectedCollege);
//     }

//     if (selectedSubjectCode) {
//       filtered = filtered.filter((q) => q.subjectCode === selectedSubjectCode);
//     }

//     if (selectedCategory) {
//       filtered = filtered.filter((q) => q.category === selectedCategory);
//     }

//     setFilteredQuestions(filtered);
//   }, [selectedCollege, selectedSubjectCode, selectedCategory, questions, staticQuestions]);

//   // Update categories when subject code changes
//   useEffect(() => {
//     if (selectedSubjectCode) {
//       const allQuestions = [...questions, ...staticQuestions];
//       const subjectQuestions = allQuestions.filter(
//         (q) => q.college === selectedCollege && q.subjectCode === selectedSubjectCode
//       );
//       const availableCategories = [...new Set(subjectQuestions.map((q) => q.category))];
//       setCategories(availableCategories.filter(Boolean)); // Remove null/undefined categories
//     } else {
//       setCategories([]);
//     }
//   }, [selectedSubjectCode, selectedCollege, questions, staticQuestions]);

//   const handleCollegeChange = (college) => {
//     if (selectedCollege === college) {
//       setSelectedCollege("");
//       setSubjectCodes([]);
//       setSelectedSubjectCode("");
//       setSelectedCategory("");
//       setCategories([]);
//     } else {
//       setSelectedCollege(college);
//       const filteredSubjectCodes = [
//         ...new Set(
//           [...questions, ...staticQuestions]
//             .filter((q) => q.college === college)
//             .map((q) => q.subjectCode)
//         ),
//       ];
//       setSubjectCodes(filteredSubjectCodes);
//       setSelectedSubjectCode("");
//       setSelectedCategory("");
//       setCategories([]);
//     }
//   };

//   const handleSubjectCodeChange = (subjectCode) => {
//     if (selectedSubjectCode === subjectCode) {
//       setSelectedSubjectCode("");
//       setSelectedCategory("");
//       setCategories([]);
//     } else {
//       setSelectedSubjectCode(subjectCode);
//       setSelectedCategory("");
//     }
//   };

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(selectedCategory === category ? "" : category);
//   };

//   const handleSearch = (e) => {
//     const keyword = e.target.value.trim();
//     setSearchKeyword(keyword);

//     if (keyword === "") {
//       setSearchResults([]);
//     } else {
//       const allQuestions = [...questions, ...staticQuestions];
//       const results = allQuestions.filter((q) =>
//         q.questionText.toLowerCase().includes(keyword.toLowerCase())
//       );
//       setSearchResults(results);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6 text-center">Questions & Answers</h1>

//       <SearchBar searchKeyword={searchKeyword} onSearch={handleSearch} />

//       <div className="mb-6 text-center">
//         <h2 className="font-bold text-lg mb-4">Universities</h2>
//         <div className="flex flex-wrap justify-center gap-4">
//           {colleges.length > 0 ? (
//             colleges.map((college) => (
//               <button
//                 key={college}
//                 className={`px-4 py-2 border rounded-lg text-center w-auto max-w-sm ${
//                   selectedCollege === college
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-100"
//                 } hover:bg-blue-100 transition-colors`}
//                 onClick={() => handleCollegeChange(college)}
//               >
//                 {college}
//               </button>
//             ))
//           ) : (
//             <p>No colleges available</p>
//           )}
//         </div>
//       </div>

//       {selectedCollege && (
//         <div className="flex gap-8">
//           <div className="w-1/2">
//             <h2 className="font-bold text-lg mb-4 text-center">Subject Codes</h2>
//             <div className="space-y-2">
//               {subjectCodes.length > 0 ? (
//                 subjectCodes.map((subjectCode) => (
//                   <button
//                     key={subjectCode}
//                     className={`block w-full px-4 py-2 border rounded-lg text-center ${
//                       selectedSubjectCode === subjectCode
//                         ? "bg-blue-500 text-white"
//                         : "bg-gray-100"
//                     } hover:bg-blue-100 transition-colors`}
//                     onClick={() => handleSubjectCodeChange(subjectCode)}
//                   >
//                     {subjectCode}
//                   </button>
//                 ))
//               ) : (
//                 <p className="text-center text-gray-500">
//                   No subject codes available
//                 </p>
//               )}
//             </div>
//           </div>

//           {selectedSubjectCode && categories.length > 0 && (
//             <div className="w-1/2">
//               <h2 className="font-bold text-lg mb-4 text-center">Categories</h2>
//               <div className="space-y-2">
//                 {categories.map((category) => (
//                   <button
//                     key={category}
//                     className={`block w-full px-4 py-2 border rounded-lg text-center ${
//                       selectedCategory === category
//                         ? "bg-blue-500 text-white"
//                         : "bg-gray-100"
//                     } hover:bg-blue-100 transition-colors`}
//                     onClick={() => handleCategoryChange(category)}
//                   >
//                     {category}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       <div className="mt-8 space-y-6">
//         {loading ? (
//           <p className="text-center text-gray-500">Loading questions...</p>
//         ) : error ? (
//           <p className="text-center text-red-500">{error}</p>
//         ) : searchResults.length > 0 ? (
//           <div className="space-y-6">
//             {searchResults.map((question, index) => (
//               <div
//                 key={index}
//                 className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
//               >
//                 <p className="font-semibold text-lg mb-4">
//                   Q{index + 1}: {question.questionText}
//                 </p>
//                 <ul className="space-y-2">
//                   {question.options.map((option, idx) => (
//                     <li
//                       key={idx}
//                       className={`px-4 py-2 border rounded-md bg-gray-100 border-gray-300 text-gray-700 ${
//                         option.isCorrect ? "bg-green-200" : ""
//                       }`}
//                     >
//                       {option.optionText}
//                     </li>
//                   ))}
//                 </ul>
//                 <p className="text-sm text-gray-500 mt-4">
//                   College: {question.college} | Subject Code: {question.subjectCode}{" "}
//                   {question.category && `| Category: ${question.category}`}
//                 </p>
//               </div>
//             ))}
//           </div>
//         ) : filteredQuestions.length > 0 ? (
//           <div className="space-y-6">
//             {filteredQuestions.map((question, index) => (
//               <div
//                 key={index}
//                 className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
//               >
//                 <p className="font-semibold text-lg mb-4">
//                   Q{index + 1}: {question.questionText}
//                 </p>
//                 <ul className="space-y-2">
//                   {question.options.map((option, idx) => (
//                     <li
//                       key={idx}
//                       className={`px-4 py-2 border rounded-md bg-gray-100 border-gray-300 text-gray-700 ${
//                         option.isCorrect ? "bg-green-200" : ""
//                       }`}
//                     >
//                       {option.optionText}
//                     </li>
//                   ))}
//                 </ul>
//                 <p className="text-sm text-gray-500 mt-4">
//                   College: {question.college} | Subject Code: {question.subjectCode}{" "}
//                   {question.category && `| Category: ${question.category}`}
//                 </p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-center text-gray-500">No questions found</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CombinedQuizPage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const SearchBar = ({ searchKeyword, onSearch }) => (
//   <div className="mb-6 text-center">
//     <input
//       type="text"
//       className="w-1/2 p-2 border border-gray-500 rounded-lg"
//       placeholder="Search questions..."
//       value={searchKeyword}
//       onChange={onSearch}
//     />
//   </div>
// );

// const CombinedQuizPage = () => {
//   const [questions, setQuestions] = useState([]);
//   const [staticQuestions, setStaticQuestions] = useState([]);
//   const [colleges, setColleges] = useState([]);
//   const [subjectCodes, setSubjectCodes] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCollege, setSelectedCollege] = useState("");
//   const [selectedSubjectCode, setSelectedSubjectCode] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [filteredQuestions, setFilteredQuestions] = useState([]);
//   const [searchKeyword, setSearchKeyword] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDynamicQuestions = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/quiz");
//         if (response.data.success) {
//           const allQuestions = response.data.data.flatMap((quiz) =>
//             quiz.questions.map((q) => ({
//               questionText: q.questionText,
//               options: q.options,
//               category: quiz.category,
//               college: quiz.University,
//               subjectCode: quiz.Subject_code,
//             }))
//           );

//           setQuestions(allQuestions);
//           const dynamicColleges = allQuestions.map((q) => q.college);
//           setColleges((prevColleges) => [
//             ...new Set([...prevColleges, ...dynamicColleges]),
//           ]);
//         }
//       } catch (error) {
//         console.error("Error fetching dynamic questions:", error);
//       }
//     };

//     const fetchStaticQuestions = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get("http://localhost:5000/api/quiz/static");
//         if (response.status === 200 && response.data.data) {
//           const allStaticQuestions = response.data.data.flatMap((quiz) =>
//             quiz.questions.map((q) => ({
//               questionText: q.question,
//               options: [{ optionText: q.answer || "No answer provided" }],
//               college: quiz.university,
//               subjectCode: quiz.subjectCode,
//               category: quiz.category,
//             }))
//           );

//           setStaticQuestions(allStaticQuestions);
//           const staticColleges = allStaticQuestions.map((q) => q.college);
//           setColleges((prevColleges) => [
//             ...new Set([...prevColleges, ...staticColleges]),
//           ]);
//         } else {
//           setError("No questions found in the database.");
//         }
//       } catch (error) {
//         setError("Failed to fetch questions. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDynamicQuestions();
//     fetchStaticQuestions();
//   }, []);

//   useEffect(() => {
//     let filtered = [...questions, ...staticQuestions];

//     if (selectedCollege) {
//       filtered = filtered.filter((q) => q.college === selectedCollege);
//     }

//     if (selectedSubjectCode) {
//       filtered = filtered.filter((q) => q.subjectCode === selectedSubjectCode);
//     }

//     if (selectedCategory) {
//       filtered = filtered.filter((q) => q.category === selectedCategory);
//     }

//     setFilteredQuestions(filtered);
//   }, [selectedCollege, selectedSubjectCode, selectedCategory, questions, staticQuestions]);

//   useEffect(() => {
//     if (selectedSubjectCode) {
//       const allQuestions = [...questions, ...staticQuestions];
//       const subjectQuestions = allQuestions.filter(
//         (q) => q.college === selectedCollege && q.subjectCode === selectedSubjectCode
//       );
//       const availableCategories = [...new Set(subjectQuestions.map((q) => q.category))];
//       setCategories(availableCategories.filter(Boolean));
//     } else {
//       setCategories([]);
//     }
//   }, [selectedSubjectCode, selectedCollege, questions, staticQuestions]);

//   const handleCollegeChange = (college) => {
//     if (selectedCollege === college) {
//       setSelectedCollege("");
//       setSubjectCodes([]);
//       setSelectedSubjectCode("");
//       setSelectedCategory("");
//       setCategories([]);
//     } else {
//       setSelectedCollege(college);
//       const filteredSubjectCodes = [
//         ...new Set(
//           [...questions, ...staticQuestions]
//             .filter((q) => q.college === college)
//             .map((q) => q.subjectCode)
//         ),
//       ];
//       setSubjectCodes(filteredSubjectCodes);
//       setSelectedSubjectCode("");
//       setSelectedCategory("");
//       setCategories([]);
//     }
//   };

//   const handleSubjectCodeChange = (subjectCode) => {
//     if (selectedSubjectCode === subjectCode) {
//       setSelectedSubjectCode("");
//       setSelectedCategory("");
//       setCategories([]);
//     } else {
//       setSelectedSubjectCode(subjectCode);
//       setSelectedCategory("");
//     }
//   };

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(selectedCategory === category ? "" : category);
//   };

//   const handleSearch = (e) => {
//     const keyword = e.target.value.trim();
//     setSearchKeyword(keyword);

//     if (keyword === "") {
//       setSearchResults([]);
//     } else {
//       const allQuestions = [...questions, ...staticQuestions];
//       const results = allQuestions.filter((q) =>
//         q.questionText.toLowerCase().includes(keyword.toLowerCase())
//       );
//       setSearchResults(results);
//     }
//   };

//   const shouldShowQuestions = selectedCollege && selectedSubjectCode && !searchKeyword;
//   const showSearchResults = searchKeyword.length > 0;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6 text-center">Questions & Answers</h1>

//       <SearchBar searchKeyword={searchKeyword} onSearch={handleSearch} />

//       <div className="mb-6 text-center">
//         <h2 className="font-bold text-lg mb-4">Universities</h2>
//         <div className="flex flex-wrap justify-center gap-4">
//           {colleges.length > 0 ? (
//             colleges.map((college) => (
//               <button
//                 key={college}
//                 className={`px-4 py-2 border rounded-lg text-center w-auto max-w-sm ${
//                   selectedCollege === college
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-100"
//                 } hover:bg-blue-100 transition-colors`}
//                 onClick={() => handleCollegeChange(college)}
//               >
//                 {college}
//               </button>
//             ))
//           ) : (
//             <p>No colleges available</p>
//           )}
//         </div>
//       </div>

//       {selectedCollege && (
//         <div className="space-y-6">
//           <div>
//             <h2 className="font-bold text-lg mb-4 text-center">Subject Codes</h2>
//             <div className="space-y-2">
//               {subjectCodes.length > 0 ? (
//                 subjectCodes.map((subjectCode) => (
//                   <button
//                     key={subjectCode}
//                     className={`block w-full px-4 py-2 border rounded-lg text-center ${
//                       selectedSubjectCode === subjectCode
//                         ? "bg-blue-500 text-white"
//                         : "bg-gray-100"
//                     } hover:bg-blue-100 transition-colors`}
//                     onClick={() => handleSubjectCodeChange(subjectCode)}
//                   >
//                     {subjectCode}
//                   </button>
//                 ))
//               ) : (
//                 <p className="text-center text-gray-500">
//                   No subject codes available
//                 </p>
//               )}
//             </div>
//           </div>

//           {selectedSubjectCode && categories.length > 0 && (
//             <div>
//               <h2 className="font-bold text-lg mb-4 text-center">Categories</h2>
//               <div className="space-y-2">
//                 {categories.map((category) => (
//                   <button
//                     key={category}
//                     className={`block w-full px-4 py-2 border rounded-lg text-center ${
//                       selectedCategory === category
//                         ? "bg-blue-500 text-white"
//                         : "bg-gray-100"
//                     } hover:bg-blue-100 transition-colors`}
//                     onClick={() => handleCategoryChange(category)}
//                   >
//                     {category}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       <div className="mt-8 space-y-6">
//         {loading ? (
//           <p className="text-center text-gray-500">Loading questions...</p>
//         ) : error ? (
//           <p className="text-center text-red-500">{error}</p>
//         ) : showSearchResults ? (
//           searchResults.length > 0 ? (
//             <div className="space-y-6">
//               {searchResults.map((question, index) => (
//                 <div
//                   key={index}
//                   className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
//                 >
//                   <p className="font-semibold text-lg mb-4">
//                     Q{index + 1}: {question.questionText}
//                   </p>
//                   <ul className="space-y-2">
//                     {question.options.map((option, idx) => (
//                       <li
//                         key={idx}
//                         className={`px-4 py-2 border rounded-md bg-gray-100 border-gray-300 text-gray-700 ${
//                           option.isCorrect ? "bg-green-200" : ""
//                         }`}
//                       >
//                         {option.optionText}
//                       </li>
//                     ))}
//                   </ul>
//                   <p className="text-sm text-gray-500 mt-4">
//                     College: {question.college} | Subject Code: {question.subjectCode}{" "}
//                     {question.category && `| Category: ${question.category}`}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-center text-gray-500">No matching questions found</p>
//           )
//         ) : shouldShowQuestions ? (
//           filteredQuestions.length > 0 ? (
//             <div className="space-y-6">
//               {filteredQuestions.map((question, index) => (
//                 <div
//                   key={index}
//                   className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
//                 >
//                   <p className="font-semibold text-lg mb-4">
//                     Q{index + 1}: {question.questionText}
//                   </p>
//                   <ul className="space-y-2">
//                     {question.options.map((option, idx) => (
//                       <li
//                         key={idx}
//                         className={`px-4 py-2 border rounded-md bg-gray-100 border-gray-300 text-gray-700 ${
//                           option.isCorrect ? "bg-green-200" : ""
//                         }`}
//                       >
//                         {option.optionText}
//                       </li>
//                     ))}
//                   </ul>
//                   <p className="text-sm text-gray-500 mt-4">
//                     College: {question.college} | Subject Code: {question.subjectCode}{" "}
//                     {question.category && `| Category: ${question.category}`}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-center text-gray-500">No questions found</p>
//           )
//         ) : (
//           <p className="text-center text-gray-500">
//             Please select a university and subject code to view questions
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CombinedQuizPage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const SearchBar = ({ searchKeyword, onSearch }) => (
//   <div className="mb-6 text-center">
//     <input
//       type="text"
//       className="w-1/2 p-2 border border-gray-500 rounded-lg"
//       placeholder="Search questions..."
//       value={searchKeyword}
//       onChange={onSearch}
//     />
//   </div>
// );

// const CombinedQuizPage = () => {
//   const [questions, setQuestions] = useState([]);
//   const [staticQuestions, setStaticQuestions] = useState([]);
//   const [colleges, setColleges] = useState([]);
//   const [subjectCodes, setSubjectCodes] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCollege, setSelectedCollege] = useState("");
//   const [selectedSubjectCode, setSelectedSubjectCode] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [filteredQuestions, setFilteredQuestions] = useState([]);
//   const [searchKeyword, setSearchKeyword] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Keeping all the existing useEffect hooks and handlers the same
//   useEffect(() => {
//     const fetchDynamicQuestions = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/quiz");
//         if (response.data.success) {
//           const allQuestions = response.data.data.flatMap((quiz) =>
//             quiz.questions.map((q) => ({
//               questionText: q.questionText,
//               options: q.options,
//               category: quiz.category,
//               college: quiz.University,
//               subjectCode: quiz.Subject_code,
//             }))
//           );

//           setQuestions(allQuestions);
//           const dynamicColleges = allQuestions.map((q) => q.college);
//           setColleges((prevColleges) => [
//             ...new Set([...prevColleges, ...dynamicColleges]),
//           ]);
//         }
//       } catch (error) {
//         console.error("Error fetching dynamic questions:", error);
//       }
//     };

//     const fetchStaticQuestions = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get("http://localhost:5000/api/quiz/static");
//         if (response.status === 200 && response.data.data) {
//           const allStaticQuestions = response.data.data.flatMap((quiz) =>
//             quiz.questions.map((q) => ({
//               questionText: q.question,
//               options: [{ optionText: q.answer || "No answer provided" }],
//               college: quiz.university,
//               subjectCode: quiz.subjectCode,
//               category: quiz.category,
//             }))
//           );

//           setStaticQuestions(allStaticQuestions);
//           const staticColleges = allStaticQuestions.map((q) => q.college);
//           setColleges((prevColleges) => [
//             ...new Set([...prevColleges, ...staticColleges]),
//           ]);
//         } else {
//           setError("No questions found in the database.");
//         }
//       } catch (error) {
//         setError("Failed to fetch questions. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDynamicQuestions();
//     fetchStaticQuestions();
//   }, []);

//   useEffect(() => {
//     let filtered = [...questions, ...staticQuestions];

//     if (selectedCollege) {
//       filtered = filtered.filter((q) => q.college === selectedCollege);
//     }

//     if (selectedSubjectCode) {
//       filtered = filtered.filter((q) => q.subjectCode === selectedSubjectCode);
//     }

//     if (selectedCategory) {
//       filtered = filtered.filter((q) => q.category === selectedCategory);
//     }

//     setFilteredQuestions(filtered);
//   }, [selectedCollege, selectedSubjectCode, selectedCategory, questions, staticQuestions]);

//   useEffect(() => {
//     if (selectedSubjectCode) {
//       const allQuestions = [...questions, ...staticQuestions];
//       const subjectQuestions = allQuestions.filter(
//         (q) => q.college === selectedCollege && q.subjectCode === selectedSubjectCode
//       );
//       const availableCategories = [...new Set(subjectQuestions.map((q) => q.category))];
//       setCategories(availableCategories.filter(Boolean));
//     } else {
//       setCategories([]);
//     }
//   }, [selectedSubjectCode, selectedCollege, questions, staticQuestions]);

//   const handleCollegeChange = (college) => {
//     if (selectedCollege === college) {
//       setSelectedCollege("");
//       setSubjectCodes([]);
//       setSelectedSubjectCode("");
//       setSelectedCategory("");
//       setCategories([]);
//     } else {
//       setSelectedCollege(college);
//       const filteredSubjectCodes = [
//         ...new Set(
//           [...questions, ...staticQuestions]
//             .filter((q) => q.college === college)
//             .map((q) => q.subjectCode)
//         ),
//       ];
//       setSubjectCodes(filteredSubjectCodes);
//       setSelectedSubjectCode("");
//       setSelectedCategory("");
//       setCategories([]);
//     }
//   };

//   const handleSubjectCodeChange = (subjectCode) => {
//     if (selectedSubjectCode === subjectCode) {
//       setSelectedSubjectCode("");
//       setSelectedCategory("");
//       setCategories([]);
//     } else {
//       setSelectedSubjectCode(subjectCode);
//       setSelectedCategory("");
//     }
//   };

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(selectedCategory === category ? "" : category);
//   };

//   const handleSearch = (e) => {
//     const keyword = e.target.value.trim();
//     setSearchKeyword(keyword);

//     if (keyword === "") {
//       setSearchResults([]);
//     } else {
//       const allQuestions = [...questions, ...staticQuestions];
//       const results = allQuestions.filter((q) =>
//         q.questionText.toLowerCase().includes(keyword.toLowerCase())
//       );
//       setSearchResults(results);
//     }
//   };

//   const shouldShowQuestions = selectedCollege && selectedSubjectCode && !searchKeyword;
//   const showSearchResults = searchKeyword.length > 0;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6 text-center">Questions & Answers</h1>

//       <SearchBar searchKeyword={searchKeyword} onSearch={handleSearch} />

//       <div className="mb-6 text-center">
//         <h2 className="font-bold text-lg mb-4">Universities</h2>
//         <div className="flex flex-wrap justify-center gap-4">
//           {colleges.length > 0 ? (
//             colleges.map((college) => (
//               <button
//                 key={college}
//                 className={`px-4 py-2 border rounded-lg text-center w-auto max-w-sm ${
//                   selectedCollege === college
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-100"
//                 } hover:bg-blue-100 transition-colors`}
//                 onClick={() => handleCollegeChange(college)}
//               >
//                 {college}
//               </button>
//             ))
//           ) : (
//             <p>No colleges available</p>
//           )}
//         </div>
//       </div>

//       <div className="flex gap-8">
//         {/* Left Sidebar */}
//         {selectedCollege && (
//           <div className="w-1/4 space-y-6">
//             <div>
//               <h2 className="font-bold text-lg mb-4">Subject Codes</h2>
//               <div className="space-y-2">
//                 {subjectCodes.length > 0 ? (
//                   subjectCodes.map((subjectCode) => (
//                     <button
//                       key={subjectCode}
//                       className={`block w-full px-4 py-2 border rounded-lg text-center ${
//                         selectedSubjectCode === subjectCode
//                           ? "bg-blue-500 text-white"
//                           : "bg-gray-100"
//                       } hover:bg-blue-100 transition-colors`}
//                       onClick={() => handleSubjectCodeChange(subjectCode)}
//                     >
//                       {subjectCode}
//                     </button>
//                   ))
//                 ) : (
//                   <p className="text-center text-gray-500">
//                     No subject codes available
//                   </p>
//                 )}
//               </div>
//             </div>

//             {selectedSubjectCode && categories.length > 0 && (
//               <div>
//                 <h2 className="font-bold text-lg mb-4">Categories</h2>
//                 <div className="space-y-2">
//                   {categories.map((category) => (
//                     <button
//                       key={category}
//                       className={`block w-full px-4 py-2 border rounded-lg text-center ${
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
//           </div>
//         )}

//         {/* Right Content Area */}
//         <div className={`${selectedCollege ? 'w-3/4' : 'w-full'} space-y-6`}>
//           {loading ? (
//             <p className="text-center text-gray-500">Loading questions...</p>
//           ) : error ? (
//             <p className="text-center text-red-500">{error}</p>
//           ) : showSearchResults ? (
//             searchResults.length > 0 ? (
//               <div className="space-y-6">
//                 {searchResults.map((question, index) => (
//                   <div
//                     key={index}
//                     className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
//                   >
//                     <p className="font-semibold text-lg mb-4">
//                       Q{index + 1}: {question.questionText}
//                     </p>
//                     <ul className="space-y-2">
//                       {question.options.map((option, idx) => (
//                         <li
//                           key={idx}
//                           className={`px-4 py-2 border rounded-md bg-gray-100 border-gray-300 text-gray-700 ${
//                             option.isCorrect ? "bg-green-200" : ""
//                           }`}
//                         >
//                           {option.optionText}
//                         </li>
//                       ))}
//                     </ul>
//                     <p className="text-sm text-gray-500 mt-4">
//                       College: {question.college} | Subject Code: {question.subjectCode}{" "}
//                       {question.category && `| Category: ${question.category}`}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-center text-gray-500">No matching questions found</p>
//             )
//           ) : shouldShowQuestions ? (
//             filteredQuestions.length > 0 ? (
//               <div className="space-y-6">
//                 {filteredQuestions.map((question, index) => (
//                   <div
//                     key={index}
//                     className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
//                   >
//                     <p className="font-semibold text-lg mb-4">
//                       Q{index + 1}: {question.questionText}
//                     </p>
//                     <ul className="space-y-2">
//                       {question.options.map((option, idx) => (
//                         <li
//                           key={idx}
//                           className={`px-4 py-2 border rounded-md bg-gray-100 border-gray-300 text-gray-700 ${
//                             option.isCorrect ? "bg-green-200" : ""
//                           }`}
//                         >
//                           {option.optionText}
//                         </li>
//                       ))}
//                     </ul>
//                     <p className="text-sm text-gray-500 mt-4">
//                       College: {question.college} | Subject Code: {question.subjectCode}{" "}
//                       {question.category && `| Category: ${question.category}`}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-center text-gray-500">No questions found</p>
//             )
//           ) : (
//             <p className="text-center text-gray-500">
//               Please select a university and subject code to view questions
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CombinedQuizPage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const SearchBar = ({ searchKeyword, onSearch }) => (
//   <div className="mb-6 text-center">
//     <input
//       type="text"
//       className="w-1/2 p-2 border border-gray-500 rounded-lg"
//       placeholder="Search questions..."
//       value={searchKeyword}
//       onChange={onSearch}
//     />
//   </div>
// );

// const CombinedQuizPage = () => {
//   const [questions, setQuestions] = useState([]);
//   const [staticQuestions, setStaticQuestions] = useState([]);
//   const [colleges, setColleges] = useState([]);
//   const [subjectCodes, setSubjectCodes] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCollege, setSelectedCollege] = useState("");
//   const [selectedSubjectCode, setSelectedSubjectCode] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [filteredQuestions, setFilteredQuestions] = useState([]);
//   const [searchKeyword, setSearchKeyword] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDynamicQuestions = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/quiz");
//         if (response.data.success) {
//           const allQuestions = response.data.data.flatMap((quiz) =>
//             quiz.questions.map((q) => ({
//               questionText: q.questionText,
//               options: q.options,
//               category: quiz.category,
//               college: quiz.University,
//               subjectCode: quiz.Subject_code,
//             }))
//           );

//           setQuestions(allQuestions);
//           const dynamicColleges = allQuestions.map((q) => q.college);
//           setColleges((prevColleges) => [
//             ...new Set([...prevColleges, ...dynamicColleges]),
//           ]);
//         }
//       } catch (error) {
//         console.error("Error fetching dynamic questions:", error);
//       }
//     };

//     const fetchStaticQuestions = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get("http://localhost:5000/api/quiz/static");
//         if (response.status === 200 && response.data.data) {
//           const allStaticQuestions = response.data.data.flatMap((quiz) =>
//             quiz.questions.map((q) => ({
//               questionText: q.question,
//               options: [{ optionText: q.answer || "No answer provided" }],
//               college: quiz.university,
//               subjectCode: quiz.subjectCode,
//               category: quiz.category,
//             }))
//           );

//           setStaticQuestions(allStaticQuestions);
//           const staticColleges = allStaticQuestions.map((q) => q.college);
//           setColleges((prevColleges) => [
//             ...new Set([...prevColleges, ...staticColleges]),
//           ]);
//         } else {
//           setError("No questions found in the database.");
//         }
//       } catch (error) {
//         setError("Failed to fetch questions. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDynamicQuestions();
//     fetchStaticQuestions();
//   }, []);

//   useEffect(() => {
//     let filtered = [...questions, ...staticQuestions];

//     if (selectedCollege) {
//       filtered = filtered.filter((q) => q.college === selectedCollege);
//     }

//     if (selectedSubjectCode) {
//       filtered = filtered.filter((q) => q.subjectCode === selectedSubjectCode);
//     }

//     if (selectedCategory) {
//       filtered = filtered.filter((q) => q.category === selectedCategory);
//     }

//     setFilteredQuestions(filtered);
//   }, [selectedCollege, selectedSubjectCode, selectedCategory, questions, staticQuestions]);

//   useEffect(() => {
//     if (selectedSubjectCode) {
//       const allQuestions = [...questions, ...staticQuestions];
//       const subjectQuestions = allQuestions.filter(
//         (q) => q.college === selectedCollege && q.subjectCode === selectedSubjectCode
//       );
//       const availableCategories = [...new Set(subjectQuestions.map((q) => q.category))];
//       setCategories(availableCategories.filter(Boolean));
//     } else {
//       setCategories([]);
//     }
//   }, [selectedSubjectCode, selectedCollege, questions, staticQuestions]);

//   const handleCollegeChange = (college) => {
//     if (selectedCollege === college) {
//       setSelectedCollege("");
//       setSubjectCodes([]);
//       setSelectedSubjectCode("");
//       setSelectedCategory("");
//       setCategories([]);
//     } else {
//       setSelectedCollege(college);
//       const filteredSubjectCodes = [
//         ...new Set(
//           [...questions, ...staticQuestions]
//             .filter((q) => q.college === college)
//             .map((q) => q.subjectCode)
//         ),
//       ];
//       setSubjectCodes(filteredSubjectCodes);
//       setSelectedSubjectCode("");
//       setSelectedCategory("");
//       setCategories([]);
//     }
//   };

//   const handleSubjectCodeChange = (subjectCode) => {
//     if (selectedSubjectCode === subjectCode) {
//       setSelectedSubjectCode("");
//       setSelectedCategory("");
//       setCategories([]);
//     } else {
//       setSelectedSubjectCode(subjectCode);
//       setSelectedCategory("");
//     }
//   };

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(selectedCategory === category ? "" : category);
//   };

//   const handleSearch = (e) => {
//     const keyword = e.target.value.trim();
//     setSearchKeyword(keyword);

//     if (keyword === "") {
//       setSearchResults([]);
//     } else {
//       const allQuestions = [...questions, ...staticQuestions];
//       const results = allQuestions.filter((q) =>
//         q.questionText.toLowerCase().includes(keyword.toLowerCase())
//       );
//       setSearchResults(results);
//     }
//   };

//   const shouldShowQuestions = selectedCollege && selectedSubjectCode && !searchKeyword;
//   const showSearchResults = searchKeyword.length > 0;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6 text-center">Questions & Answers</h1>

//       <SearchBar searchKeyword={searchKeyword} onSearch={handleSearch} />

//       <div className="mb-6 text-center">
//         <h2 className="font-bold text-lg mb-4">Universities</h2>
//         <div className="flex flex-wrap justify-center gap-4">
//           {colleges.length > 0 ? (
//             colleges.map((college) => (
//               <button
//                 key={college}
//                 className={`px-4 py-2 border rounded-lg text-center w-auto max-w-sm ${
//                   selectedCollege === college
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-100"
//                 } hover:bg-blue-100 transition-colors`}
//                 onClick={() => handleCollegeChange(college)}
//               >
//                 {college}
//               </button>
//             ))
//           ) : (
//             <p>No colleges available</p>
//           )}
//         </div>
//       </div>

//       <div className="flex gap-8">
//         {/* Left Sidebar */}
//         {selectedCollege && (
//           <div className="w-1/4 space-y-6">
//             <div>
//               <h2 className="font-bold text-lg mb-4">Subject Codes</h2>
//               <div className="space-y-2">
//                 {subjectCodes.length > 0 ? (
//                   subjectCodes.map((subjectCode) => (
//                     <button
//                       key={subjectCode}
//                       className={`block w-full px-4 py-2 border rounded-lg text-center ${
//                         selectedSubjectCode === subjectCode
//                           ? "bg-blue-500 text-white"
//                           : "bg-gray-100"
//                       } hover:bg-blue-100 transition-colors`}
//                       onClick={() => handleSubjectCodeChange(subjectCode)}
//                     >
//                       {subjectCode}
//                     </button>
//                   ))
//                 ) : (
//                   <p className="text-center text-gray-500">
//                     No subject codes available
//                   </p>
//                 )}
//               </div>
//             </div>

//             {selectedSubjectCode && categories.length > 0 && (
//               <div>
//                 <h2 className="font-bold text-lg mb-4">Categories</h2>
//                 <div className="space-y-2">
//                   {categories.map((category) => (
//                     <button
//                       key={category}
//                       className={`block w-full px-4 py-2 border rounded-lg text-center ${
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
//           </div>
//         )}

//         {/* Right Content Area */}
//         <div className={`${selectedCollege ? 'w-3/4' : 'w-full'} space-y-6`}>
//           {loading ? (
//             <p className="text-center text-gray-500">Loading questions...</p>
//           ) : error ? (
//             <p className="text-center text-red-500">{error}</p>
//           ) : showSearchResults ? (
//             searchResults.length > 0 ? (
//               <div className="space-y-6">
//                 {searchResults.map((question, index) => (
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
//                     <ul className="space-y-2">
//                       {question.options.map((option, idx) => (
//                         <li
//                           key={idx}
//                           className={`px-4 py-2 border rounded-md bg-gray-100 border-gray-300 text-gray-700 ${
//                             option.isCorrect ? "bg-green-200" : ""
//                           }`}
//                           dangerouslySetInnerHTML={{
//                             __html: option.optionText,
//                           }}
//                         ></li>
//                       ))}
//                     </ul>
//                     <p className="text-sm text-gray-500 mt-4">
//                       College: {question.college} | Subject Code: {question.subjectCode}{" "}
//                       {question.category && `| Category: ${question.category}`}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-center text-gray-500">No matching questions found</p>
//             )
//           ) : shouldShowQuestions ? (
//             filteredQuestions.length > 0 ? (
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
//                     <ul className="space-y-2">
//                       {question.options.map((option, idx) => (
//                         <li
//                           key={idx}
//                           className={`px-4 py-2 border rounded-md bg-gray-100 border-gray-300 text-gray-700 ${
//                             option.isCorrect ? "bg-green-200" : ""
//                           }`}
//                           dangerouslySetInnerHTML={{
//                             __html: option.optionText,
//                           }}
//                         ></li>
//                       ))}
//                     </ul>
//                     <p className="text-sm text-gray-500 mt-4">
//                       College: {question.college} | Subject Code: {question.subjectCode}{" "}
//                       {question.category && `| Category: ${question.category}`}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-center text-gray-500">No questions found</p>
//             )
//           ) : (
//             <p className="text-center text-gray-500">
//               Please select a university and subject code to view questions
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CombinedQuizPage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const SearchBar = ({ searchKeyword, onSearch }) => (
//   <div className="mb-6 text-center">
//     <input
//       type="text"
//       className="w-1/2 p-2 border border-gray-500 rounded-lg"
//       placeholder="Search questions..."
//       value={searchKeyword}
//       onChange={onSearch}
//     />
//   </div>
// );

// const CombinedQuizPage = () => {
//   const [questions, setQuestions] = useState([]);
//   const [staticQuestions, setStaticQuestions] = useState([]);
//   const [colleges, setColleges] = useState([]);
//   const [subjectCodes, setSubjectCodes] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCollege, setSelectedCollege] = useState("");
//   const [selectedSubjectCode, setSelectedSubjectCode] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [filteredQuestions, setFilteredQuestions] = useState([]);
//   const [searchKeyword, setSearchKeyword] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDynamicQuestions = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/quiz");
//         if (response.data.success) {
//           const allQuestions = response.data.data.flatMap((quiz) =>
//             quiz.questions.map((q) => ({
//               questionText: q.questionText,
//               options: q.options,
//               category: quiz.category,
//               college: quiz.University,
//               subjectCode: quiz.Subject_code,
//             }))
//           );

//           setQuestions(allQuestions);
//           const dynamicColleges = allQuestions.map((q) => q.college);
//           setColleges((prevColleges) => [
//             ...new Set([...prevColleges, ...dynamicColleges]),
//           ]);
//         }
//       } catch (error) {
//         console.error("Error fetching dynamic questions:", error);
//       }
//     };

//     const fetchStaticQuestions = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get("http://localhost:5000/api/quiz/static");
//         if (response.status === 200 && response.data.data) {
//           const allStaticQuestions = response.data.data.flatMap((quiz) =>
//             quiz.questions.map((q) => ({
//               questionText: q.question,
//               options: [{ optionText: q.answer || "No answer provided" }],
//               college: quiz.university,
//               subjectCode: quiz.subjectCode,
//               category: quiz.category,
//             }))
//           );

//           setStaticQuestions(allStaticQuestions);
//           const staticColleges = allStaticQuestions.map((q) => q.college);
//           setColleges((prevColleges) => [
//             ...new Set([...prevColleges, ...staticColleges]),
//           ]);
//         } else {
//           setError("No questions found in the database.");
//         }
//       } catch (error) {
//         setError("Failed to fetch questions. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDynamicQuestions();
//     fetchStaticQuestions();
//   }, []);

//   useEffect(() => {
//     let filtered = [...questions, ...staticQuestions];

//     if (selectedCollege) {
//       filtered = filtered.filter((q) => q.college === selectedCollege);
//     }

//     if (selectedSubjectCode) {
//       filtered = filtered.filter((q) => q.subjectCode === selectedSubjectCode);
//     }

//     if (selectedCategory) {
//       filtered = filtered.filter((q) => q.category === selectedCategory);
//     }

//     setFilteredQuestions(filtered);
//   }, [selectedCollege, selectedSubjectCode, selectedCategory, questions, staticQuestions]);

//   useEffect(() => {
//     if (selectedSubjectCode) {
//       const allQuestions = [...questions, ...staticQuestions];
//       const subjectQuestions = allQuestions.filter(
//         (q) => q.college === selectedCollege && q.subjectCode === selectedSubjectCode
//       );
//       const availableCategories = [...new Set(subjectQuestions.map((q) => q.category))];
//       setCategories(availableCategories.filter(Boolean));
//     } else {
//       setCategories([]);
//     }
//   }, [selectedSubjectCode, selectedCollege, questions, staticQuestions]);

//   const handleCollegeChange = (college) => {
//     if (selectedCollege === college) {
//       setSelectedCollege("");
//       setSubjectCodes([]);
//       setSelectedSubjectCode("");
//       setSelectedCategory("");
//       setCategories([]);
//     } else {
//       setSelectedCollege(college);
//       const filteredSubjectCodes = [
//         ...new Set(
//           [...questions, ...staticQuestions]
//             .filter((q) => q.college === college)
//             .map((q) => q.subjectCode)
//         ),
//       ];
//       setSubjectCodes(filteredSubjectCodes);
//       setSelectedSubjectCode("");
//       setSelectedCategory("");
//       setCategories([]);
//     }
//   };

//   const handleSubjectCodeChange = (subjectCode) => {
//     if (selectedSubjectCode === subjectCode) {
//       setSelectedSubjectCode("");
//       setSelectedCategory("");
//       setCategories([]);
//     } else {
//       setSelectedSubjectCode(subjectCode);
//       setSelectedCategory("");
//     }
//   };

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(selectedCategory === category ? "" : category);
//   };

//   const handleSearch = (e) => {
//     const keyword = e.target.value.trim();
//     setSearchKeyword(keyword);

//     if (keyword === "") {
//       setSearchResults([]);
//     } else {
//       const allQuestions = [...questions, ...staticQuestions];
//       const results = allQuestions.filter((q) =>
//         q.questionText.toLowerCase().includes(keyword.toLowerCase())
//       );
//       setSearchResults(results);
//     }
//   };

//   const shouldShowQuestions = selectedCollege && selectedSubjectCode && !searchKeyword;
//   const showSearchResults = searchKeyword.length > 0;

//   const staticQuestionsForTable = staticQuestions.filter(
//     (q) => q.college === selectedCollege && q.subjectCode === selectedSubjectCode
//   );

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6 text-center">Questions & Answers</h1>

//       <SearchBar searchKeyword={searchKeyword} onSearch={handleSearch} />

//       <div className="mb-6 text-center">
//         <h2 className="font-bold text-lg mb-4">Universities</h2>
//         <div className="flex flex-wrap justify-center gap-4">
//           {colleges.length > 0 ? (
//             colleges.map((college) => (
//               <button
//                 key={college}
//                 className={`px-4 py-2 border rounded-lg text-center w-auto max-w-sm ${
//                   selectedCollege === college ? "bg-blue-500 text-white" : "bg-gray-100"
//                 } hover:bg-blue-100 transition-colors`}
//                 onClick={() => handleCollegeChange(college)}
//               >
//                 {college}
//               </button>
//             ))
//           ) : (
//             <p>No colleges available</p>
//           )}
//         </div>
//       </div>

//       <div className="flex gap-8">
//         {selectedCollege && (
//           <div className="w-1/4 space-y-6">
//             <div>
//               <h2 className="font-bold text-lg mb-4">Subject Codes</h2>
//               <div className="space-y-2">
//                 {subjectCodes.length > 0 ? (
//                   subjectCodes.map((subjectCode) => (
//                     <button
//                       key={subjectCode}
//                       className={`block w-full px-4 py-2 border rounded-lg text-center ${
//                         selectedSubjectCode === subjectCode ? "bg-blue-500 text-white" : "bg-gray-100"
//                       } hover:bg-blue-100 transition-colors`}
//                       onClick={() => handleSubjectCodeChange(subjectCode)}
//                     >
//                       {subjectCode}
//                     </button>
//                   ))
//                 ) : (
//                   <p className="text-center text-gray-500">No subject codes available</p>
//                 )}
//               </div>
//             </div>

//             {selectedSubjectCode && categories.length > 0 && (
//               <div>
//                 <h2 className="font-bold text-lg mb-4">Categories</h2>
//                 <div className="space-y-2">
//                   {categories.map((category) => (
//                     <button
//                       key={category}
//                       className={`block w-full px-4 py-2 border rounded-lg text-center ${
//                         selectedCategory === category ? "bg-blue-500 text-white" : "bg-gray-100"
//                       } hover:bg-blue-100 transition-colors`}
//                       onClick={() => handleCategoryChange(category)}
//                     >
//                       {category}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         <div className={`${selectedCollege ? "w-3/4" : "w-full"} space-y-6`}>
//           {loading ? (
//             <p className="text-center text-gray-500">Loading questions...</p>
//           ) : error ? (
//             <p className="text-center text-red-500">{error}</p>
//           ) : showSearchResults ? (
//             searchResults.length > 0 ? (
//               <div className="space-y-6">
//                 {searchResults.map((question, index) => (
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
//                     <ul className="space-y-2">
//                       {question.options.map((option, idx) => (
//                         <li
//                           key={idx}
//                           className={`px-4 py-2 border rounded-md bg-gray-100 border-gray-300 text-gray-700 ${
//                             option.isCorrect ? "bg-green-200" : ""
//                           }`}
//                           dangerouslySetInnerHTML={{
//                             __html: option.optionText,
//                           }}
//                         ></li>
//                       ))}
//                     </ul>
//                     <p className="text-sm text-gray-500 mt-4">
//                       College: {question.college} | Subject Code: {question.subjectCode}{" "}
//                       {question.category && `| Category: ${question.category}`}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-center text-gray-500">No matching questions found</p>
//             )
//           ) : shouldShowQuestions ? (
//             filteredQuestions.length > 0 ? (
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
//                     <ul className="space-y-2">
//                       {question.options.map((option, idx) => (
//                         <li
//                           key={idx}
//                           className={`px-4 py-2 border rounded-md bg-gray-100 border-gray-300 text-gray-700 ${
//                             option.isCorrect ? "bg-green-200" : ""
//                           }`}
//                           dangerouslySetInnerHTML={{
//                             __html: option.optionText,
//                           }}
//                         ></li>
//                       ))}
//                     </ul>
//                     <p className="text-sm text-gray-500 mt-4">
//                       College: {question.college} | Subject Code: {question.subjectCode}{" "}
//                       {question.category && `| Category: ${question.category}`}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-center text-gray-500">No questions found</p>
//             )
//           ) : selectedCollege && selectedSubjectCode && staticQuestionsForTable.length > 0 ? (
//             <div className="overflow-x-auto">
//               <table className="min-w-full table-auto">
//                 <thead>
//                   <tr className="bg-gray-100">
//                     <th className="px-4 py-2 border text-left">Question</th>
//                     <th className="px-4 py-2 border text-left">Options</th>
//                     <th className="px-4 py-2 border text-left">College</th>
//                     <th className="px-4 py-2 border text-left">Subject Code</th>
//                     <th className="px-4 py-2 border text-left">Category</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {staticQuestionsForTable.map((question, index) => (
//                     <tr key={index} className="border-b">
//                       <td className="px-4 py-2">{question.questionText}</td>
//                       <td className="px-4 py-2">
//                         {question.options.map((option, idx) => (
//                           <div key={idx}>{option.optionText}</div>
//                         ))}
//                       </td>
//                       <td className="px-4 py-2">{question.college}</td>
//                       <td className="px-4 py-2">{question.subjectCode}</td>
//                       <td className="px-4 py-2">{question.category}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <p className="text-center text-gray-500">
//               Please select a university and subject code to view questions
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CombinedQuizPage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const SearchBar = ({ searchKeyword, onSearch }) => (
//   <div className="mb-6 text-center">
//     <input
//       type="text"
//       className="w-1/2 p-2 border border-gray-500 rounded-lg"
//       placeholder="Search questions..."
//       value={searchKeyword}
//       onChange={onSearch}
//     />
//   </div>
// );

// const CombinedQuizPage = () => {
//   const [questions, setQuestions] = useState([]);
//   const [staticQuestions, setStaticQuestions] = useState([]);
//   const [colleges, setColleges] = useState([]);
//   const [subjectCodes, setSubjectCodes] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCollege, setSelectedCollege] = useState("");
//   const [selectedSubjectCode, setSelectedSubjectCode] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [filteredQuestions, setFilteredQuestions] = useState([]);
//   const [searchKeyword, setSearchKeyword] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDynamicQuestions = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/quiz");
//         if (response.data.success) {
//           const allQuestions = response.data.data.flatMap((quiz) =>
//             quiz.questions.map((q) => ({
//               questionText: q.questionText,
//               options: q.options,
//               category: quiz.category,
//               college: quiz.University,
//               subjectCode: quiz.Subject_code,
//               isDynamic: true
//             }))
//           );

//           setQuestions(allQuestions);
//           const dynamicColleges = allQuestions.map((q) => q.college);
//           setColleges((prevColleges) => [
//             ...new Set([...prevColleges, ...dynamicColleges]),
//           ]);
//         }
//       } catch (error) {
//         console.error("Error fetching dynamic questions:", error);
//       }
//     };

//     const fetchStaticQuestions = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get("http://localhost:5000/api/quiz/static");
//         if (response.status === 200 && response.data.data) {
//           const allStaticQuestions = response.data.data.flatMap((quiz) =>
//             quiz.questions.map((q) => ({
//               questionText: q.question,
//               answer: q.answer || "No answer provided",
//               college: quiz.university,
//               subjectCode: quiz.subjectCode,
//               category: quiz.category,
//               isDynamic: false
//             }))
//           );

//           setStaticQuestions(allStaticQuestions);
//           const staticColleges = allStaticQuestions.map((q) => q.college);
//           setColleges((prevColleges) => [
//             ...new Set([...prevColleges, ...staticColleges]),
//           ]);
//         } else {
//           setError("No questions found in the database.");
//         }
//       } catch (error) {
//         setError("Failed to fetch questions. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDynamicQuestions();
//     fetchStaticQuestions();
//   }, []);

//   useEffect(() => {
//     let filtered = questions;

//     if (selectedCollege) {
//       filtered = filtered.filter((q) => q.college === selectedCollege);
//     }

//     if (selectedSubjectCode) {
//       filtered = filtered.filter((q) => q.subjectCode === selectedSubjectCode);
//     }

//     if (selectedCategory) {
//       filtered = filtered.filter((q) => q.category === selectedCategory);
//     }

//     setFilteredQuestions(filtered);
//   }, [selectedCollege, selectedSubjectCode, selectedCategory, questions]);

//   useEffect(() => {
//     if (selectedSubjectCode) {
//       const allQuestions = [...questions, ...staticQuestions];
//       const subjectQuestions = allQuestions.filter(
//         (q) => q.college === selectedCollege && q.subjectCode === selectedSubjectCode
//       );
//       const availableCategories = [...new Set(subjectQuestions.map((q) => q.category))];
//       setCategories(availableCategories.filter(Boolean));
//     } else {
//       setCategories([]);
//     }
//   }, [selectedSubjectCode, selectedCollege, questions, staticQuestions]);

//   const handleCollegeChange = (college) => {
//     if (selectedCollege === college) {
//       setSelectedCollege("");
//       setSubjectCodes([]);
//       setSelectedSubjectCode("");
//       setSelectedCategory("");
//       setCategories([]);
//     } else {
//       setSelectedCollege(college);
//       const filteredSubjectCodes = [
//         ...new Set(
//           [...questions, ...staticQuestions]
//             .filter((q) => q.college === college)
//             .map((q) => q.subjectCode)
//         ),
//       ];
//       setSubjectCodes(filteredSubjectCodes);
//       setSelectedSubjectCode("");
//       setSelectedCategory("");
//       setCategories([]);
//     }
//   };

//   const handleSubjectCodeChange = (subjectCode) => {
//     if (selectedSubjectCode === subjectCode) {
//       setSelectedSubjectCode("");
//       setSelectedCategory("");
//       setCategories([]);
//     } else {
//       setSelectedSubjectCode(subjectCode);
//       setSelectedCategory("");
//     }
//   };

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(selectedCategory === category ? "" : category);
//   };

//   const handleSearch = (e) => {
//     const keyword = e.target.value.trim();
//     setSearchKeyword(keyword);

//     if (keyword === "") {
//       setSearchResults([]);
//     } else {
//       const allQuestions = [...questions, ...staticQuestions];
//       const results = allQuestions.filter((q) =>
//         q.questionText.toLowerCase().includes(keyword.toLowerCase())
//       );
//       setSearchResults(results);
//     }
//   };

//   const shouldShowQuestions = selectedCollege && selectedSubjectCode && !searchKeyword;
//   const showSearchResults = searchKeyword.length > 0;

//   const filteredStaticQuestions = staticQuestions.filter(
//     (q) => q.college === selectedCollege && q.subjectCode === selectedSubjectCode
//   );

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6 text-center">Questions & Answers</h1>

//       <SearchBar searchKeyword={searchKeyword} onSearch={handleSearch} />

//       <div className="mb-6 text-center">
//         <h2 className="font-bold text-lg mb-4">Universities</h2>
//         <div className="flex flex-wrap justify-center gap-4">
//           {colleges.length > 0 ? (
//             colleges.map((college) => (
//               <button
//                 key={college}
//                 className={`px-4 py-2 border rounded-lg text-center w-auto max-w-sm ${
//                   selectedCollege === college ? "bg-blue-500 text-white" : "bg-gray-100"
//                 } hover:bg-blue-100 transition-colors`}
//                 onClick={() => handleCollegeChange(college)}
//               >
//                 {college}
//               </button>
//             ))
//           ) : (
//             <p>No colleges available</p>
//           )}
//         </div>
//       </div>

//       <div className="flex gap-8">
//         {selectedCollege && (
//           <div className="w-1/4 space-y-6">
//             <div>
//               <h2 className="font-bold text-lg mb-4">Subject Codes</h2>
//               <div className="space-y-2">
//                 {subjectCodes.length > 0 ? (
//                   subjectCodes.map((subjectCode) => (
//                     <button
//                       key={subjectCode}
//                       className={`block w-full px-4 py-2 border rounded-lg text-center ${
//                         selectedSubjectCode === subjectCode ? "bg-blue-500 text-white" : "bg-gray-100"
//                       } hover:bg-blue-100 transition-colors`}
//                       onClick={() => handleSubjectCodeChange(subjectCode)}
//                     >
//                       {subjectCode}
//                     </button>
//                   ))
//                 ) : (
//                   <p className="text-center text-gray-500">No subject codes available</p>
//                 )}
//               </div>
//             </div>

//             {selectedSubjectCode && categories.length > 0 && (
//               <div>
//                 <h2 className="font-bold text-lg mb-4">Categories</h2>
//                 <div className="space-y-2">
//                   {categories.map((category) => (
//                     <button
//                       key={category}
//                       className={`block w-full px-4 py-2 border rounded-lg text-center ${
//                         selectedCategory === category ? "bg-blue-500 text-white" : "bg-gray-100"
//                       } hover:bg-blue-100 transition-colors`}
//                       onClick={() => handleCategoryChange(category)}
//                     >
//                       {category}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         <div className={`${selectedCollege ? "w-3/4" : "w-full"} space-y-6`}>
//           {loading ? (
//             <p className="text-center text-gray-500">Loading questions...</p>
//           ) : error ? (
//             <p className="text-center text-red-500">{error}</p>
//           ) : showSearchResults ? (
//             searchResults.length > 0 ? (
//               <div className="space-y-6">
//                 {searchResults.map((question, index) => (
//                   question.isDynamic ? (
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
//                       <ul className="space-y-2">
//                         {question.options.map((option, idx) => (
//                           <li
//                             key={idx}
//                             className={`px-4 py-2 border rounded-md bg-gray-100 border-gray-300 text-gray-700 ${
//                               option.isCorrect ? "bg-green-200" : ""
//                             }`}
//                             dangerouslySetInnerHTML={{
//                               __html: option.optionText,
//                             }}
//                           ></li>
//                         ))}
//                       </ul>
//                       <p className="text-sm text-gray-500 mt-4">
//                         College: {question.college} | Subject Code: {question.subjectCode}{" "}
//                         {question.category && `| Category: ${question.category}`}
//                       </p>
//                     </div>
//                   ) : null
//                 ))}
//               </div>
//             ) : (
//               <p className="text-center text-gray-500">No matching questions found</p>
//             )
//           ) : shouldShowQuestions ? (
//             <div className="space-y-8">
//               {/* Dynamic Questions Section */}
//               {filteredQuestions.length > 0 && (
//                 <div className="space-y-6">
//                   <h2 className="text-2xl font-bold">Dynamic Questions</h2>
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
//                       <ul className="space-y-2">
//                         {question.options.map((option, idx) => (
//                           <li
//                             key={idx}
//                             className={`px-4 py-2 border rounded-md bg-gray-100 border-gray-300 text-gray-700 ${
//                               option.isCorrect ? "bg-green-200" : ""
//                             }`}
//                             dangerouslySetInnerHTML={{
//                               __html: option.optionText,
//                             }}
//                           ></li>
//                         ))}
//                       </ul>
//                       <p className="text-sm text-gray-500 mt-4">
//                         College: {question.college} | Subject Code: {question.subjectCode}{" "}
//                         {question.category && `| Category: ${question.category}`}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Static Questions Section */}
//               {filteredStaticQuestions.length > 0 && (
//                 <div className="mt-8">
//                   <h2 className="text-2xl font-bold mb-4">Static Questions</h2>
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full table-auto border-collapse border border-gray-300">
//                       <thead>
//                         <tr className="bg-gray-100">
//                           <th className="px-4 py-2 border border-gray-300 text-left">Question</th>
//                           <th className="px-4 py-2 border border-gray-300 text-left">Answer</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {filteredStaticQuestions.map((question, index) => (
//                           <tr key={index} className="border-b border-gray-300">
//                             <td className="px-4 py-2 border border-gray-300">{question.questionText}</td>
//                             <td className="px-4 py-2 border border-gray-300">{question.answer}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <p className="text-center text-gray-500">
//               Please select a university and subject code to view questions
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CombinedQuizPage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const SearchBar = ({ searchKeyword, onSearch }) => (
//   <div className="mb-6 text-center">
//     <input
//       type="text"
//       className="w-1/2 p-2 border border-gray-500 rounded-lg"
//       placeholder="Search questions..."
//       value={searchKeyword}
//       onChange={onSearch}
//     />
//   </div>
// );

// const processHTML = (content) => {
//   // Create a temporary div to parse HTML content
//   const tempDiv = document.createElement('div');
//   tempDiv.innerHTML = content;

//   // Convert br tags to newlines
//   const brTags = tempDiv.getElementsByTagName('br');
//   for (let br of brTags) {
//     br.replaceWith('\n');
//   }

//   // Get the processed content
//   return tempDiv.innerHTML;
// };

// const CombinedQuizPage = () => {
//   const [questions, setQuestions] = useState([]);
//   const [staticQuestions, setStaticQuestions] = useState([]);
//   const [colleges, setColleges] = useState([]);
//   const [subjectCodes, setSubjectCodes] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCollege, setSelectedCollege] = useState("");
//   const [selectedSubjectCode, setSelectedSubjectCode] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [filteredQuestions, setFilteredQuestions] = useState([]);
//   const [searchKeyword, setSearchKeyword] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDynamicQuestions = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/quiz");
//         if (response.data.success) {
//           const allQuestions = response.data.data.flatMap((quiz) =>
//             quiz.questions.map((q) => ({
//               questionText: processHTML(q.questionText),
//               options: q.options.map(opt => ({
//                 ...opt,
//                 optionText: processHTML(opt.optionText)
//               })),
//               category: quiz.category,
//               college: quiz.University,
//               subjectCode: quiz.Subject_code,
//               isDynamic: true
//             }))
//           );

//           setQuestions(allQuestions);
//           const dynamicColleges = allQuestions.map((q) => q.college);
//           setColleges((prevColleges) => [
//             ...new Set([...prevColleges, ...dynamicColleges]),
//           ]);
//         }
//       } catch (error) {
//         console.error("Error fetching dynamic questions:", error);
//       }
//     };

//     const fetchStaticQuestions = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get("http://localhost:5000/api/quiz/static");
//         if (response.status === 200 && response.data.data) {
//           const allStaticQuestions = response.data.data.flatMap((quiz) =>
//             quiz.questions.map((q) => ({
//               questionText: processHTML(q.question),
//               answer: processHTML(q.answer || "No answer provided"),
//               college: quiz.university,
//               subjectCode: quiz.subjectCode,
//               category: quiz.category,
//               isDynamic: false
//             }))
//           );

//           setStaticQuestions(allStaticQuestions);
//           const staticColleges = allStaticQuestions.map((q) => q.college);
//           setColleges((prevColleges) => [
//             ...new Set([...prevColleges, ...staticColleges]),
//           ]);
//         } else {
//           setError("No questions found in the database.");
//         }
//       } catch (error) {
//         setError("Failed to fetch questions. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDynamicQuestions();
//     fetchStaticQuestions();
//   }, []);

//   useEffect(() => {
//     let filtered = questions;

//     if (selectedCollege) {
//       filtered = filtered.filter((q) => q.college === selectedCollege);
//     }

//     if (selectedSubjectCode) {
//       filtered = filtered.filter((q) => q.subjectCode === selectedSubjectCode);
//     }

//     if (selectedCategory) {
//       filtered = filtered.filter((q) => q.category === selectedCategory);
//     }

//     setFilteredQuestions(filtered);
//   }, [selectedCollege, selectedSubjectCode, selectedCategory, questions]);

//   useEffect(() => {
//     if (selectedSubjectCode) {
//       const allQuestions = [...questions, ...staticQuestions];
//       const subjectQuestions = allQuestions.filter(
//         (q) => q.college === selectedCollege && q.subjectCode === selectedSubjectCode
//       );
//       const availableCategories = [...new Set(subjectQuestions.map((q) => q.category))];
//       setCategories(availableCategories.filter(Boolean));
//     } else {
//       setCategories([]);
//     }
//   }, [selectedSubjectCode, selectedCollege, questions, staticQuestions]);

//   const handleCollegeChange = (college) => {
//     if (selectedCollege === college) {
//       setSelectedCollege("");
//       setSubjectCodes([]);
//       setSelectedSubjectCode("");
//       setSelectedCategory("");
//       setCategories([]);
//     } else {
//       setSelectedCollege(college);
//       const filteredSubjectCodes = [
//         ...new Set(
//           [...questions, ...staticQuestions]
//             .filter((q) => q.college === college)
//             .map((q) => q.subjectCode)
//         ),
//       ];
//       setSubjectCodes(filteredSubjectCodes);
//       setSelectedSubjectCode("");
//       setSelectedCategory("");
//       setCategories([]);
//     }
//   };

//   const handleSubjectCodeChange = (subjectCode) => {
//     if (selectedSubjectCode === subjectCode) {
//       setSelectedSubjectCode("");
//       setSelectedCategory("");
//       setCategories([]);
//     } else {
//       setSelectedSubjectCode(subjectCode);
//       setSelectedCategory("");
//     }
//   };

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(selectedCategory === category ? "" : category);
//   };

//   const handleSearch = (e) => {
//     const keyword = e.target.value.trim();
//     setSearchKeyword(keyword);

//     if (keyword === "") {
//       setSearchResults([]);
//     } else {
//       const allQuestions = [...questions, ...staticQuestions];
//       const results = allQuestions.filter((q) =>
//         q.questionText.toLowerCase().includes(keyword.toLowerCase())
//       );
//       setSearchResults(results);
//     }
//   };

//   const shouldShowQuestions = selectedCollege && selectedSubjectCode && !searchKeyword;
//   const showSearchResults = searchKeyword.length > 0;

//   const filteredStaticQuestions = staticQuestions.filter(
//     (q) => q.college === selectedCollege && q.subjectCode === selectedSubjectCode
//   );

//   const QuestionContent = ({ content }) => (
//     <div
//       className="whitespace-pre-wrap"
//       dangerouslySetInnerHTML={{ __html: content }}
//     />
//   );

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6 text-center">Questions & Answers</h1>

//       <SearchBar searchKeyword={searchKeyword} onSearch={handleSearch} />

//       <div className="mb-6 text-center">
//         <h2 className="font-bold text-lg mb-4">Universities</h2>
//         <div className="flex flex-wrap justify-center gap-4">
//           {colleges.length > 0 ? (
//             colleges.map((college) => (
//               <button
//                 key={college}
//                 className={`px-4 py-2 border rounded-lg text-center w-auto max-w-sm ${
//                   selectedCollege === college ? "bg-blue-500 text-white" : "bg-gray-100"
//                 } hover:bg-blue-100 transition-colors`}
//                 onClick={() => handleCollegeChange(college)}
//               >
//                 {college}
//               </button>
//             ))
//           ) : (
//             <p>No colleges available</p>
//           )}
//         </div>
//       </div>

//       <div className="flex gap-8">
//         {selectedCollege && (
//           <div className="w-1/4 space-y-6">
//             <div>
//               <h2 className="font-bold text-lg mb-4">Subject Codes</h2>
//               <div className="space-y-2">
//                 {subjectCodes.length > 0 ? (
//                   subjectCodes.map((subjectCode) => (
//                     <button
//                       key={subjectCode}
//                       className={`block w-full px-4 py-2 border rounded-lg text-center ${
//                         selectedSubjectCode === subjectCode ? "bg-blue-500 text-white" : "bg-gray-100"
//                       } hover:bg-blue-100 transition-colors`}
//                       onClick={() => handleSubjectCodeChange(subjectCode)}
//                     >
//                       {subjectCode}
//                     </button>
//                   ))
//                 ) : (
//                   <p className="text-center text-gray-500">No subject codes available</p>
//                 )}
//               </div>
//             </div>

//             {selectedSubjectCode && categories.length > 0 && (
//               <div>
//                 <h2 className="font-bold text-lg mb-4">Categories</h2>
//                 <div className="space-y-2">
//                   {categories.map((category) => (
//                     <button
//                       key={category}
//                       className={`block w-full px-4 py-2 border rounded-lg text-center ${
//                         selectedCategory === category ? "bg-blue-500 text-white" : "bg-gray-100"
//                       } hover:bg-blue-100 transition-colors`}
//                       onClick={() => handleCategoryChange(category)}
//                     >
//                       {category}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         <div className={`${selectedCollege ? "w-3/4" : "w-full"} space-y-6`}>
//           {loading ? (
//             <p className="text-center text-gray-500">Loading questions...</p>
//           ) : error ? (
//             <p className="text-center text-red-500">{error}</p>
//           ) : showSearchResults ? (
//             searchResults.length > 0 ? (
//               <div className="space-y-6">
//                 {searchResults.map((question, index) => (
//                   question.isDynamic ? (
//                     <div
//                       key={index}
//                       className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
//                     >
//                       <div className="font-semibold text-lg mb-4">
//                         <QuestionContent content={`Q${index + 1}: ${question.questionText}`} />
//                       </div>
//                       <ul className="space-y-2">
//                         {question.options.map((option, idx) => (
//                           <li
//                             key={idx}
//                             className={`px-4 py-2 border rounded-md bg-gray-100 border-gray-300 text-gray-700 ${
//                               option.isCorrect ? "bg-green-200" : ""
//                             }`}
//                           >
//                             <QuestionContent content={option.optionText} />
//                           </li>
//                         ))}
//                       </ul>
//                       <p className="text-sm text-gray-500 mt-4">
//                         College: {question.college} | Subject Code: {question.subjectCode}{" "}
//                         {question.category && `| Category: ${question.category}`}
//                       </p>
//                     </div>
//                   ) : null
//                 ))}
//               </div>
//             ) : (
//               <p className="text-center text-gray-500">No matching questions found</p>
//             )
//           ) : shouldShowQuestions ? (
//             <div className="space-y-8">
//               {/* Dynamic Questions Section */}
//               {filteredQuestions.length > 0 && (
//                 <div className="space-y-6">
//                   <h2 className="text-2xl font-bold">Dynamic Questions</h2>
//                   {filteredQuestions.map((question, index) => (
//                     <div
//                       key={index}
//                       className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
//                     >
//                       <div className="font-semibold text-lg mb-4">
//                         <QuestionContent content={`Q${index + 1}: ${question.questionText}`} />
//                       </div>
//                       <ul className="space-y-2">
//                         {question.options.map((option, idx) => (
//                           <li
//                             key={idx}
//                             className={`px-4 py-2 border rounded-md bg-gray-100 border-gray-300 text-gray-700 ${
//                               option.isCorrect ? "bg-green-200" : ""
//                             }`}
//                           >
//                             <QuestionContent content={option.optionText} />
//                           </li>
//                         ))}
//                       </ul>
//                       <p className="text-sm text-gray-500 mt-4">
//                         College: {question.college} | Subject Code: {question.subjectCode}{" "}
//                         {question.category && `| Category: ${question.category}`}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Static Questions Section */}
//               {filteredStaticQuestions.length > 0 && (
//                 <div className="mt-8">
//                   <h2 className="text-2xl font-bold mb-4">Static Questions</h2>
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full table-auto border-collapse border border-gray-300">
//                       <thead>
//                         <tr className="bg-gray-100">
//                           <th className="px-4 py-2 border border-gray-300 text-left">Question</th>
//                           <th className="px-4 py-2 border border-gray-300 text-left">Answer</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {filteredStaticQuestions.map((question, index) => (
//                           <tr key={index} className="border-b border-gray-300">
//                             <td className="px-4 py-2 border border-gray-300">
//                               <QuestionContent content={question.questionText} />
//                             </td>
//                             <td className="px-4 py-2 border border-gray-300">
//                               <QuestionContent content={question.answer} />
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <p className="text-center text-gray-500">
//               Please select a university and subject code to view questions
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CombinedQuizPage;


//Perfect one!!

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const SearchBar = ({ searchKeyword, onSearch }) => (
//   <div className="mb-6 text-center">
//     <input
//       type="text"
//       className="w-1/2 p-2 border border-gray-500 rounded-lg"
//       placeholder="Search questions..."
//       value={searchKeyword}
//       onChange={onSearch}
//     />
//   </div>
// );

// const processHTML = (content) => {
//   // Create a temporary div to parse HTML content
//   const tempDiv = document.createElement("div");
//   tempDiv.innerHTML = content;

//   // Convert br tags to newlines
//   const brTags = tempDiv.getElementsByTagName("br");
//   for (let br of brTags) {
//     br.replaceWith("\n");
//   }

//   // Get the processed content
//   return tempDiv.innerHTML;
// };

// const CombinedQuizPage = () => {
//   const [questions, setQuestions] = useState([]);
//   const [staticQuestions, setStaticQuestions] = useState([]);
//   const [colleges, setColleges] = useState([]);
//   const [subjectCodes, setSubjectCodes] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCollege, setSelectedCollege] = useState("");
//   const [selectedSubjectCode, setSelectedSubjectCode] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [filteredQuestions, setFilteredQuestions] = useState([]);
//   const [searchKeyword, setSearchKeyword] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDynamicQuestions = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/quiz");
//         if (response.data.success) {
//           const allQuestions = response.data.data.flatMap((quiz) =>
//             quiz.questions.map((q) => ({
//               questionText: processHTML(q.questionText),
//               options: q.options.map((opt) => ({
//                 ...opt,
//                 optionText: processHTML(opt.optionText),
//               })),
//               category: quiz.category,
//               college: quiz.University,
//               subjectCode: quiz.Subject_code,
//               isDynamic: true,
//             }))
//           );

//           setQuestions(allQuestions);
//           const dynamicColleges = allQuestions.map((q) => q.college);
//           setColleges((prevColleges) => [
//             ...new Set([...prevColleges, ...dynamicColleges]),
//           ]);
//         }
//       } catch (error) {
//         console.error("Error fetching dynamic questions:", error);
//       }
//     };

//     const fetchStaticQuestions = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/quiz/static"
//         );
//         if (response.status === 200 && response.data.data) {
//           const allStaticQuestions = response.data.data.flatMap((quiz) =>
//             quiz.questions.map((q) => ({
//               questionText: processHTML(q.question),
//               answer: processHTML(q.answer || "No answer provided"),
//               college: quiz.university,
//               subjectCode: quiz.subjectCode,
//               category: quiz.category,
//               isDynamic: false,
//             }))
//           );

//           setStaticQuestions(allStaticQuestions);
//           const staticColleges = allStaticQuestions.map((q) => q.college);
//           setColleges((prevColleges) => [
//             ...new Set([...prevColleges, ...staticColleges]),
//           ]);
//         } else {
//           setError("No questions found in the database.");
//         }
//       } catch (error) {
//         setError("Failed to fetch questions. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDynamicQuestions();
//     fetchStaticQuestions();
//   }, []);

//   useEffect(() => {
//     let filtered = questions;

//     if (selectedCollege) {
//       filtered = filtered.filter((q) => q.college === selectedCollege);
//     }

//     if (selectedSubjectCode) {
//       filtered = filtered.filter((q) => q.subjectCode === selectedSubjectCode);
//     }

//     if (selectedCategory) {
//       filtered = filtered.filter((q) => q.category === selectedCategory);
//     }

//     setFilteredQuestions(filtered);
//   }, [selectedCollege, selectedSubjectCode, selectedCategory, questions]);

//   useEffect(() => {
//     if (selectedSubjectCode) {
//       const allQuestions = [...questions, ...staticQuestions];
//       const subjectQuestions = allQuestions.filter(
//         (q) =>
//           q.college === selectedCollege && q.subjectCode === selectedSubjectCode
//       );
//       const availableCategories = [
//         ...new Set(subjectQuestions.map((q) => q.category)),
//       ];
//       setCategories(availableCategories.filter(Boolean));
//     } else {
//       setCategories([]);
//     }
//   }, [selectedSubjectCode, selectedCollege, questions, staticQuestions]);

//   const handleCollegeChange = (college) => {
//     if (selectedCollege === college) {
//       setSelectedCollege("");
//       setSubjectCodes([]);
//       setSelectedSubjectCode("");
//       setSelectedCategory("");
//       setCategories([]);
//     } else {
//       setSelectedCollege(college);
//       const filteredSubjectCodes = [
//         ...new Set(
//           [...questions, ...staticQuestions]
//             .filter((q) => q.college === college)
//             .map((q) => q.subjectCode)
//         ),
//       ];
//       setSubjectCodes(filteredSubjectCodes);
//       setSelectedSubjectCode("");
//       setSelectedCategory("");
//       setCategories([]);
//     }
//   };

//   const handleSubjectCodeChange = (subjectCode) => {
//     if (selectedSubjectCode === subjectCode) {
//       setSelectedSubjectCode("");
//       setSelectedCategory("");
//       setCategories([]);
//     } else {
//       setSelectedSubjectCode(subjectCode);
//       setSelectedCategory("");
//     }
//   };

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(selectedCategory === category ? "" : category);
//   };

//   const handleSearch = (e) => {
//     const keyword = e.target.value.trim();
//     setSearchKeyword(keyword);

//     if (keyword === "") {
//       setSearchResults([]);
//     } else {
//       const allQuestions = [...questions, ...staticQuestions];
//       const results = allQuestions.filter((q) =>
//         q.questionText.toLowerCase().includes(keyword.toLowerCase())
//       );
//       setSearchResults(results);
//     }
//   };

//   const shouldShowQuestions =
//     selectedCollege && selectedSubjectCode && !searchKeyword;
//   const showSearchResults = searchKeyword.length > 0;

//   const filteredStaticQuestions = staticQuestions.filter(
//     (q) =>
//       q.college === selectedCollege && q.subjectCode === selectedSubjectCode
//   );

//   const QuestionContent = ({ content }) => (
//     <div
//       className="whitespace-pre-wrap"
//       dangerouslySetInnerHTML={{ __html: content }}
//     />
//   );

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6 text-center">
//         Questions & Answers
//       </h1>

//       <SearchBar searchKeyword={searchKeyword} onSearch={handleSearch} />

//       <div className="mb-6 text-center">
//         <h2 className="font-bold text-lg mb-4">Universities</h2>
//         <div className="flex flex-wrap justify-center gap-4">
//           {colleges.length > 0 ? (
//             colleges.map((college) => (
//               <button
//                 key={college}
//                 className={`px-4 py-2 border rounded-lg text-center w-auto max-w-sm ${
//                   selectedCollege === college
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-100"
//                 } hover:bg-blue-100 transition-colors`}
//                 onClick={() => handleCollegeChange(college)}
//               >
//                 {college}
//               </button>
//             ))
//           ) : (
//             <p>No colleges available</p>
//           )}
//         </div>
//       </div>

//       <div className="flex gap-8">
//         {selectedCollege && (
//           <div className="w-1/4 space-y-6">
//             <div>
//               <h2 className="font-bold text-lg mb-4">Subject Codes</h2>
//               <div className="space-y-2">
//                 {subjectCodes.length > 0 ? (
//                   subjectCodes.map((subjectCode) => (
//                     <button
//                       key={subjectCode}
//                       className={`block w-full px-4 py-2 border rounded-lg text-center ${
//                         selectedSubjectCode === subjectCode
//                           ? "bg-blue-500 text-white"
//                           : "bg-gray-100"
//                       } hover:bg-blue-100 transition-colors`}
//                       onClick={() => handleSubjectCodeChange(subjectCode)}
//                     >
//                       {subjectCode}
//                     </button>
//                   ))
//                 ) : (
//                   <p className="text-center text-gray-500">
//                     No subject codes available
//                   </p>
//                 )}
//               </div>
//             </div>

//             {selectedSubjectCode && categories.length > 0 && (
//               <div>
//                 <h2 className="font-bold text-lg mb-4">Categories</h2>
//                 <div className="space-y-2">
//                   {categories.map((category) => (
//                     <button
//                       key={category}
//                       className={`block w-full px-4 py-2 border rounded-lg text-center ${
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
//           </div>
//         )}

//         <div className={`${selectedCollege ? "w-3/4" : "w-full"} space-y-6`}>
//           {loading ? (
//             <p className="text-center text-gray-500">Loading questions...</p>
//           ) : error ? (
//             <p className="text-center text-red-500">{error}</p>
//           ) : showSearchResults ? (
//             searchResults.length > 0 ? (
//               <div className="space-y-6">
//                 {searchResults.map((question, index) =>
//                   question.isDynamic ? (
//                     <div
//                       key={index}
//                       className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
//                     >
//                       <div className="font-semibold text-lg mb-4">
//                         <QuestionContent
//                           content={`Q${index + 1}: ${question.questionText}`}
//                         />
//                       </div>
//                       <ul className="space-y-2">
//                         {question.options.map((option, idx) => (
//                           <li
//                             key={idx}
//                             className={`px-4 py-2 border rounded-md bg-gray-100 border-gray-300 text-gray-700 ${
//                               option.isCorrect ? "bg-green-200" : ""
//                             }`}
//                           >
//                             <QuestionContent content={option.optionText} />
//                           </li>
//                         ))}
//                       </ul>
//                       <p className="text-sm text-gray-500 mt-4">
//                         College: {question.college} | Subject Code:{" "}
//                         {question.subjectCode}{" "}
//                         {question.category &&
//                           `| Category: ${question.category}`}
//                       </p>
//                     </div>
//                   ) : (
//                     <div
//                       key={index}
//                       className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
//                     >
//                       <div className="font-semibold text-lg mb-4">
//                         <QuestionContent
//                           content={`Q${index + 1}: ${question.questionText}`}
//                         />
//                       </div>
//                       <div className="mt-4 p-4 bg-gray-100 rounded-md">
//                         <div className="font-medium mb-2">Answer:</div>
//                         <QuestionContent content={question.answer} />
//                       </div>
//                       <p className="text-sm text-gray-500 mt-4">
//                         College: {question.college} | Subject Code:{" "}
//                         {question.subjectCode}{" "}
//                         {question.category &&
//                           `| Category: ${question.category}`}
//                       </p>
//                     </div>
//                   )
//                 )}
//               </div>
//             ) : (
//               <p className="text-center text-gray-500">
//                 No matching questions found
//               </p>
//             )
//           ) : shouldShowQuestions ? (
//             <div className="space-y-8">
//               {/* Dynamic Questions Section */}
//               {filteredQuestions.length > 0 && (
//                 <div className="space-y-6">
//                   <h2 className="text-2xl font-bold">Dynamic Questions</h2>
//                   {filteredQuestions.map((question, index) => (
//                     <div
//                       key={index}
//                       className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
//                     >
//                       <div className="font-semibold text-lg mb-4">
//                         <QuestionContent
//                           content={`Q${index + 1}: ${question.questionText}`}
//                         />
//                       </div>
//                       <ul className="space-y-2">
//                         {question.options.map((option, idx) => (
//                           <li
//                             key={idx}
//                             className={`px-4 py-2 border rounded-md bg-gray-100 border-gray-300 text-gray-700 ${
//                               option.isCorrect ? "bg-green-200" : ""
//                             }`}
//                           >
//                             <QuestionContent content={option.optionText} />
//                           </li>
//                         ))}
//                       </ul>
//                       <p className="text-sm text-gray-500 mt-4">
//                         College: {question.college} | Subject Code:{" "}
//                         {question.subjectCode}{" "}
//                         {question.category &&
//                           `| Category: ${question.category}`}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Static Questions Section */}
//               {filteredStaticQuestions.length > 0 && (
//                 <div className="mt-8">
//                   <h2 className="text-2xl font-bold mb-4">Static Questions</h2>
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full table-auto border-collapse border border-gray-300">
//                       <thead>
//                         <tr className="bg-gray-100">
//                           <th className="px-4 py-2 border border-gray-300 text-left">
//                             Question
//                           </th>
//                           <th className="px-4 py-2 border border-gray-300 text-left">
//                             Answer
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {filteredStaticQuestions.map((question, index) => (
//                           <tr key={index} className="border-b border-gray-300">
//                             <td className="px-4 py-2 border border-gray-300">
//                               <QuestionContent
//                                 content={question.questionText}
//                               />
//                             </td>
//                             <td className="px-4 py-2 border border-gray-300">
//                               <QuestionContent content={question.answer} />
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <p className="text-center text-gray-500">
//               Please select a university and subject code to view questions
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CombinedQuizPage;

import React, { useEffect, useState } from "react";
import axios from "axios";

const SearchBar = ({ searchKeyword, onSearch }) => (
  <div className="mb-6 text-center">
    <input
      type="text"
      className="w-1/2 p-2 border border-gray-500 rounded-lg"
      placeholder="Search questions..."
      value={searchKeyword}
      onChange={onSearch}
    />
  </div>
);

const processHTML = (content) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = content;
  const brTags = tempDiv.getElementsByTagName("br");
  for (let br of brTags) {
    br.replaceWith("\n");
  }
  return tempDiv.innerHTML;
};

const CombinedQuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [staticQuestions, setStaticQuestions] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [subjectCodes, setSubjectCodes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState("");
  const [selectedSubjectCode, setSelectedSubjectCode] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDynamicQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/quiz");
        if (response.data.success) {
          const allQuestions = response.data.data.flatMap((quiz) =>
            quiz.questions.map((q) => ({
              questionText: processHTML(q.questionText),
              options: q.options.map((opt) => ({
                ...opt,
                optionText: processHTML(opt.optionText),
              })),
              category: quiz.category,
              college: quiz.University,
              subjectCode: quiz.Subject_code,
              isDynamic: true,
            }))
          );

          setQuestions(allQuestions);
          const dynamicColleges = allQuestions.map((q) => q.college);
          setColleges((prevColleges) => [
            ...new Set([...prevColleges, ...dynamicColleges]),
          ]);
        }
      } catch (error) {
        console.error("Error fetching dynamic questions:", error);
      }
    };

    const fetchStaticQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          "http://localhost:5000/api/quiz/static"
        );
        if (response.status === 200 && response.data.data) {
          const allStaticQuestions = response.data.data.flatMap((quiz) =>
            quiz.questions.map((q) => ({
              questionText: processHTML(q.question),
              answer: processHTML(q.answer || "No answer provided"),
              college: quiz.university,
              subjectCode: quiz.subjectCode,
              category: quiz.category,
              isDynamic: false,
            }))
          );

          setStaticQuestions(allStaticQuestions);
          const staticColleges = allStaticQuestions.map((q) => q.college);
          setColleges((prevColleges) => [
            ...new Set([...prevColleges, ...staticColleges]),
          ]);
        } else {
          setError("No questions found in the database.");
        }
      } catch (error) {
        setError("Failed to fetch questions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDynamicQuestions();
    fetchStaticQuestions();
  }, []);

  useEffect(() => {
    let filtered = questions;

    if (selectedCollege) {
      filtered = filtered.filter((q) => q.college === selectedCollege);
    }

    if (selectedSubjectCode) {
      filtered = filtered.filter((q) => q.subjectCode === selectedSubjectCode);
    }

    if (selectedCategory) {
      filtered = filtered.filter((q) => q.category === selectedCategory);
    }

    setFilteredQuestions(filtered);
  }, [selectedCollege, selectedSubjectCode, selectedCategory, questions]);

  useEffect(() => {
    if (selectedSubjectCode) {
      const allQuestions = [...questions, ...staticQuestions];
      const subjectQuestions = allQuestions.filter(
        (q) =>
          q.college === selectedCollege && q.subjectCode === selectedSubjectCode
      );
      const availableCategories = [
        ...new Set(subjectQuestions.map((q) => q.category)),
      ];
      setCategories(availableCategories.filter(Boolean));
    } else {
      setCategories([]);
    }
  }, [selectedSubjectCode, selectedCollege, questions, staticQuestions]);

  const handleCollegeChange = (college) => {
    if (selectedCollege === college) {
      setSelectedCollege("");
      setSubjectCodes([]);
      setSelectedSubjectCode("");
      setSelectedCategory("");
      setCategories([]);
    } else {
      setSelectedCollege(college);
      const filteredSubjectCodes = [
        ...new Set(
          [...questions, ...staticQuestions]
            .filter((q) => q.college === college)
            .map((q) => q.subjectCode)
        ),
      ];
      setSubjectCodes(filteredSubjectCodes);
      setSelectedSubjectCode("");
      setSelectedCategory("");
      setCategories([]);
    }
  };

  const handleSubjectCodeChange = (subjectCode) => {
    if (selectedSubjectCode === subjectCode) {
      setSelectedSubjectCode("");
      setSelectedCategory("");
      setCategories([]);
    } else {
      setSelectedSubjectCode(subjectCode);
      setSelectedCategory("");
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(selectedCategory === category ? "" : category);
  };

  const handleSearch = (e) => {
    const keyword = e.target.value.trim();
    setSearchKeyword(keyword);

    if (keyword === "") {
      setSearchResults([]);
    } else {
      const allQuestions = [...questions, ...staticQuestions];
      const results = allQuestions.filter((q) =>
        q.questionText.toLowerCase().includes(keyword.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  const shouldShowQuestions =
    selectedCollege && selectedSubjectCode && !searchKeyword;
  const showSearchResults = searchKeyword.length > 0;

  const filteredStaticQuestions = staticQuestions.filter(
    (q) =>
      q.college === selectedCollege && q.subjectCode === selectedSubjectCode
  );

  const QuestionContent = ({ content }) => (
    <div
      className="whitespace-pre-wrap"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );

  return (
    <div className="mx-auto" style={{ width: "80%" }}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Questions & Answers
        </h1>

        <SearchBar searchKeyword={searchKeyword} onSearch={handleSearch} />

        <div className="mb-6 text-center">
          <h2 className="font-bold text-base mb-4">Universities</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {colleges.length > 0 ? (
              colleges.map((college) => (
                <button
                  key={college}
                  className={`px-3 py-1.5 border rounded-lg text-center w-auto max-w-sm text-sm ${
                    selectedCollege === college
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100"
                  } hover:bg-blue-100 transition-colors`}
                  onClick={() => handleCollegeChange(college)}
                >
                  {college}
                </button>
              ))
            ) : (
              <p>No colleges available</p>
            )}
          </div>
        </div>

        <div className="flex gap-6">
          {selectedCollege && (
            <div className="w-1/4 space-y-4">
              <div>
                <h2 className="font-bold text-base mb-3">Subject Codes</h2>
                <div className="space-y-2">
                  {subjectCodes.length > 0 ? (
                    subjectCodes.map((subjectCode) => (
                      <button
                        key={subjectCode}
                        className={`block w-full px-3 py-1.5 border rounded-lg text-center text-sm ${
                          selectedSubjectCode === subjectCode
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100"
                        } hover:bg-blue-100 transition-colors`}
                        onClick={() => handleSubjectCodeChange(subjectCode)}
                      >
                        {subjectCode}
                      </button>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 text-sm">
                      No subject codes available
                    </p>
                  )}
                </div>
              </div>

              {selectedSubjectCode && categories.length > 0 && (
                <div>
                  <h2 className="font-bold text-base mb-3">Categories</h2>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        className={`block w-full px-3 py-1.5 border rounded-lg text-center text-sm ${
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
            </div>
          )}

          <div className={`${selectedCollege ? "w-3/4" : "w-full"} space-y-4`}>
            {loading ? (
              <p className="text-center text-gray-500">Loading questions...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : showSearchResults ? (
              searchResults.length > 0 ? (
                <div className="space-y-4">
                  {searchResults.map((question, index) =>
                    question.isDynamic ? (
                      <div
                        key={index}
                        className="p-4 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
                      >
                        <div className="font-semibold text-base mb-3">
                          <QuestionContent
                            content={`Q${index + 1}: ${question.questionText}`}
                          />
                        </div>
                        <ul className="space-y-2">
                          {question.options.map((option, idx) => (
                            <li
                              key={idx}
                              className={`px-3 py-1.5 border rounded-md bg-gray-100 border-gray-300 text-gray-700 text-sm ${
                                option.isCorrect ? "bg-green-200" : ""
                              }`}
                            >
                              <QuestionContent content={option.optionText} />
                            </li>
                          ))}
                        </ul>
                        <p className="text-xs text-gray-500 mt-3">
                          College: {question.college} | Subject Code:{" "}
                          {question.subjectCode}{" "}
                          {question.category &&
                            `| Category: ${question.category}`}
                        </p>
                      </div>
                    ) : (
                      <div
                        key={index}
                        className="p-4 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
                      >
                        <div className="font-semibold text-base mb-3">
                          <QuestionContent
                            content={`Q${index + 1}: ${question.questionText}`}
                          />
                        </div>
                        <div className="mt-3 p-3 bg-gray-100 rounded-md">
                          <div className="font-medium mb-2 text-sm">
                            Answer:
                          </div>
                          <QuestionContent content={question.answer} />
                        </div>
                        <p className="text-xs text-gray-500 mt-3">
                          College: {question.college} | Subject Code:{" "}
                          {question.subjectCode}{" "}
                          {question.category &&
                            `| Category: ${question.category}`}
                        </p>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <p className="text-center text-gray-500">
                  No matching questions found
                </p>
              )
            ) : shouldShowQuestions ? (
              <div className="space-y-6">
                {/* Dynamic Questions Section */}
                {filteredQuestions.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold">Dynamic Questions</h2>
                    {filteredQuestions.map((question, index) => (
                      <div
                        key={index}
                        className="p-4 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
                      >
                        <div className="font-semibold text-base mb-3">
                          <QuestionContent
                            content={`Q${index + 1}: ${question.questionText}`}
                          />
                        </div>
                        <ul className="space-y-2">
                          {question.options.map((option, idx) => (
                            <li
                              key={idx}
                              className={`px-3 py-1.5 border rounded-md bg-gray-100 border-gray-300 text-gray-700 text-sm ${
                                option.isCorrect ? "bg-green-200" : ""
                              }`}
                            >
                              <QuestionContent content={option.optionText} />
                            </li>
                          ))}
                        </ul>
                        <p className="text-xs text-gray-500 mt-3">
                          College: {question.college} | Subject Code:{" "}
                          {question.subjectCode}{" "}
                          {question.category &&
                            `| Category: ${question.category}`}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Static Questions Section - Updated Styling */}
                {filteredStaticQuestions.length > 0 && (
                  <div className="mt-6">
                    {/* <h2 className="text-xl font-bold mb-4">Static Questions</h2> */}
                    <div className="overflow-x-auto rounded-lg shadow-lg border-2 border-gray-200">
                      <table className="min-w-full table-auto">
                        <thead>
                          <tr className="bg-gray-800 text-white">
                            <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider border-b-2 border-gray-700 w-1/2">
                              Question
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider border-b-2 border-gray-700 w-1/2">
                              Answer
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {filteredStaticQuestions.map((question, index) => (
                            <tr
                              key={index}
                              className="hover:bg-gray-50 transition-colors duration-200"
                            >
                              <td className="px-6 py-4 text-sm text-gray-800 border-r border-gray-200">
                                <div className="font-medium">
                                  <QuestionContent
                                    content={question.questionText}
                                  />
                                </div>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-800">
                                <div className="whitespace-pre-wrap">
                                  <QuestionContent content={question.answer} />
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-center text-gray-500 text-sm">
                Please select a university and subject code to view questions
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombinedQuizPage;