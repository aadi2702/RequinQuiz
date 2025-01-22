// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const SearchQuiz = () => {
//   const [questions, setQuestions] = useState([]);
//   const [colleges, setColleges] = useState([]);
//   const [subjectCodes, setSubjectCodes] = useState([]);
//   const [selectedCollege, setSelectedCollege] = useState("");
//   const [selectedSubjectCode, setSelectedSubjectCode] = useState("");
//   const [filteredQuestions, setFilteredQuestions] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("https://requin-quiz-backend.vercel.app/api/quiz");

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

//           const allColleges = [...new Set(allQuestions.map((q) => q.college))];
//           setColleges(allColleges);
//         } else {
//           console.error("No questions found.");
//         }
//       } catch (error) {
//         console.error("Error fetching questions:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleCollegeChange = (college) => {
//     if (selectedCollege === college) {
//       setSelectedCollege("");
//       setSubjectCodes([]);
//       setSelectedSubjectCode("");
//       setFilteredQuestions([]);
//     } else {
//       setSelectedCollege(college);

//       const filteredSubjectCodes = [
//         ...new Set(questions.filter((q) => q.college === college).map((q) => q.subjectCode)),
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

//       const filtered = questions.filter(
//         (q) => q.college === selectedCollege && q.subjectCode === subjectCode
//       );
//       setFilteredQuestions(filtered);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6 text-center">Questions and Answers</h1>

//       <div className="mb-6 text-center">
//         <h2 className="font-bold text-lg mb-4">Universities</h2>
//         <div className="flex flex-wrap justify-center gap-4">
//           {colleges.length > 0 ? (
//             colleges.map((college) => (
//               <button
//                 key={college}
//                 className={`px-4 py-2 border rounded-lg text-center ${
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
//           <div className="w-1/4">
//             <h2 className="font-bold text-lg mb-4">Subject Codes</h2>
//             <div className="space-y-2">
//               {subjectCodes.length > 0 ? (
//                 subjectCodes.map((subjectCode) => (
//                   <button
//                     key={subjectCode}
//                     className={`block px-4 py-2 border rounded-lg text-center ${
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
//                 <p>No subject codes available</p>
//               )}
//             </div>
//           </div>
//         )}

//         <div className="w-3/4">
//           {filteredQuestions.length > 0 ? (
//             <div className="space-y-6">
//               {filteredQuestions.map((question, index) => (
//                 <div
//                   key={index}
//                   className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
//                 >
//                   <p className="font-semibold text-lg mb-4">{`Q${index + 1}: ${question.questionText}`}</p>
//                   <ul className="space-y-2">
//                     {question.options.map((option, idx) => (
//                       <li
//                         key={idx}
//                         className={`px-4 py-2 border rounded-md cursor-pointer transition-colors duration-200 ${
//                           option.isCorrect
//                             ? "bg-green-100 border-green-500 text-green-700 font-semibold"
//                             : "bg-gray-100 border-gray-300 text-gray-700"
//                         } hover:bg-blue-100`}
//                       >
//                         {option.optionText}
//                       </li>
//                     ))}
//                   </ul>
//                   <p className="text-sm text-gray-500 mt-4">
//                     College: {question.college} | Subject Code: {question.subjectCode}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           ) : selectedSubjectCode ? (
//             <p className="text-center text-gray-500">No questions found for this subject code.</p>
//           ) : (
//             <p className="text-center text-gray-500">Select a subject code to view questions.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchQuiz;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const SearchQuiz = () => {
//   const [questions, setQuestions] = useState([]);
//   const [colleges, setColleges] = useState([]);
//   const [subjectCodes, setSubjectCodes] = useState([]);
//   const [selectedCollege, setSelectedCollege] = useState("");
//   const [selectedSubjectCode, setSelectedSubjectCode] = useState("");
//   const [filteredQuestions, setFilteredQuestions] = useState([]);
//   const [searchKeyword, setSearchKeyword] = useState("");
//   const [searchResults, setSearchResults] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("https://requin-quiz-backend.vercel.app/api/quiz");

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

//           const allColleges = [...new Set(allQuestions.map((q) => q.college))];
//           setColleges(allColleges);
//         } else {
//           console.error("No questions found.");
//         }
//       } catch (error) {
//         console.error("Error fetching questions:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleCollegeChange = (college) => {
//     if (selectedCollege === college) {
//       setSelectedCollege("");
//       setSubjectCodes([]);
//       setSelectedSubjectCode("");
//       setFilteredQuestions([]);
//     } else {
//       setSelectedCollege(college);

//       const filteredSubjectCodes = [
//         ...new Set(questions.filter((q) => q.college === college).map((q) => q.subjectCode)),
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

//       const filtered = questions.filter(
//         (q) => q.college === selectedCollege && q.subjectCode === subjectCode
//       );
//       setFilteredQuestions(filtered);
//     }
//   };

//   const handleSearch = (e) => {
//     const keyword = e.target.value;
//     setSearchKeyword(keyword);

//     if (keyword.trim() === "") {
//       setSearchResults([]);
//     } else {
//       const results = questions.filter((q) =>
//         q.questionText.toLowerCase().includes(keyword.toLowerCase())
//       );
//       setSearchResults(results);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6 text-center">Questions and Answers</h1>

//       <div className="mb-6 text-center">
//         <h2 className="font-bold text-lg mb-4">Colleges (Universities)</h2>
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
//           <div className="w-1/4">
//             <h2 className="font-bold text-lg mb-4 text-center">Subject Codes</h2>
//             <div className="space-y-2">
//               {subjectCodes.length > 0 ? (
//                 subjectCodes.map((subjectCode) => (
//                   <button
//                     key={subjectCode}
//                     className={`block px-4 py-2 border rounded-lg text-center w-auto max-w-sm ${
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
//                 <p className="text-center text-gray-500">No subject codes available</p>
//               )}
//             </div>
//           </div>
//         )}

//         <div className="w-3/4">
//           <input
//             type="text"
//             className="w-full p-2 border border-gray-300 rounded-md mb-4"
//             placeholder="Search questions..."
//             value={searchKeyword}
//             onChange={handleSearch}
//           />

//           {searchResults.length > 0 ? (
//             <div className="space-y-6">
//               {searchResults.map((question, index) => (
//                 <div
//                   key={index}
//                   className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
//                 >
//                   <p className="font-semibold text-lg mb-4">{`Q${index + 1}: ${question.questionText}`}</p>
//                   <ul className="space-y-2">
//                     {question.options.map((option, idx) => (
//                       <li
//                         key={idx}
//                         className={`px-4 py-2 border rounded-md cursor-pointer transition-colors duration-200 ${
//                           option.isCorrect
//                             ? "bg-green-100 border-green-500 text-green-700 font-semibold"
//                             : "bg-gray-100 border-gray-300 text-gray-700"
//                         } hover:bg-blue-100`}
//                       >
//                         {option.optionText}
//                       </li>
//                     ))}
//                   </ul>
//                   <p className="text-sm text-gray-500 mt-4">
//                     College: {question.college} | Subject Code: {question.subjectCode}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           ) : searchKeyword ? (
//             <p className="text-center text-gray-500">No questions found matching your search.</p>
//           ) : !selectedSubjectCode ? (
//             <p className="text-center text-gray-500 mt-8">Select a subject code to view questions.</p>
//           ) : filteredQuestions.length > 0 ? (
//             <div className="space-y-6">
//               {filteredQuestions.map((question, index) => (
//                 <div
//                   key={index}
//                   className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
//                 >
//                   <p className="font-semibold text-lg mb-4">{`Q${index + 1}: ${question.questionText}`}</p>
//                   <ul className="space-y-2">
//                     {question.options.map((option, idx) => (
//                       <li
//                         key={idx}
//                         className={`px-4 py-2 border rounded-md cursor-pointer transition-colors duration-200 ${
//                           option.isCorrect
//                             ? "bg-green-100 border-green-500 text-green-700 font-semibold"
//                             : "bg-gray-100 border-gray-300 text-gray-700"
//                         } hover:bg-blue-100`}
//                       >
//                         {option.optionText}
//                       </li>
//                     ))}
//                   </ul>
//                   <p className="text-sm text-gray-500 mt-4">
//                     College: {question.college} | Subject Code: {question.subjectCode}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-center text-gray-500">No questions found for this subject code.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchQuiz;

import React, { useEffect, useState } from "react";
import axios from "axios";

const CombinedQuizPage = () => {
  const [questions, setQuestions] = useState([]); // Dynamic questions
  const [staticQuestions, setStaticQuestions] = useState([]); // Static questions
  const [colleges, setColleges] = useState([]); // Unique colleges
  const [subjectCodes, setSubjectCodes] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState("");
  const [selectedSubjectCode, setSelectedSubjectCode] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState(""); // For search functionality
  const [searchResults, setSearchResults] = useState([]); // For search results
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDynamicQuestions = async () => {
      try {
        const response = await axios.get(
          "https://requin-quiz-backend.vercel.app/api/quiz"
        );

        if (response.data.success) {
          const allQuestions = response.data.data.flatMap((quiz) =>
            quiz.questions.map((q) => ({
              questionText: q.questionText,
              options: q.options,
              category: quiz.category,
              college: quiz.University,
              subjectCode: quiz.Subject_code,
            }))
          );

          setQuestions(allQuestions);
        } else {
          console.error("No dynamic questions found.");
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
          "https://requin-quiz-backend.vercel.app/api/quiz/static"
        );

        if (response.status === 200 && response.data.data) {
          const allStaticQuestions = response.data.data.flatMap((quiz) =>
            quiz.questions.map((q) => ({
              questionText: q.question,
              options: [{ optionText: q.answer || "No answer provided" }],
              college: quiz.university,
              subjectCode: quiz.subjectCode,
            }))
          );

          setStaticQuestions(allStaticQuestions);
        } else {
          setError("No static questions found in the database.");
        }
      } catch (error) {
        console.error("Error fetching static questions:", error);
        setError("Failed to fetch static questions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDynamicQuestions();
    fetchStaticQuestions();
  }, []);

  useEffect(() => {
    // Merge and deduplicate colleges from both dynamic and static questions
    const allColleges = [
      ...new Set([...questions, ...staticQuestions].map((q) => q.college)),
    ];
    setColleges(allColleges);
  }, [questions, staticQuestions]);

  const handleCollegeChange = (college) => {
    setSelectedCollege(college);

    // Filter subject codes by selected college
    const filteredSubjectCodes = [
      ...new Set(
        [...questions, ...staticQuestions]
          .filter((q) => q.college === college)
          .map((q) => q.subjectCode)
      ),
    ];
    setSubjectCodes(filteredSubjectCodes);
    setSelectedSubjectCode("");
    setFilteredQuestions([]);
  };

  const handleSubjectCodeChange = (subjectCode) => {
    setSelectedSubjectCode(subjectCode);

    // Filter both dynamic and static questions based on selected college and subject code
    const dynamicFiltered = questions.filter(
      (q) => q.college === selectedCollege && q.subjectCode === subjectCode
    );
    const staticFiltered = staticQuestions.filter(
      (q) => q.college === selectedCollege && q.subjectCode === subjectCode
    );

    setFilteredQuestions([...dynamicFiltered, ...staticFiltered]);
  };

  const handleSearch = (e) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);

    if (keyword.trim() === "") {
      setSearchResults([]);
    } else {
      const results = [...questions, ...staticQuestions].filter((q) =>
        q.questionText.toLowerCase().includes(keyword.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Questions & Answers
      </h1>

      <div className="mb-6 text-center">
        <h2 className="font-bold text-lg mb-4">Select College</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {colleges.length > 0 ? (
            colleges.map((college) => (
              <button
                key={college}
                className={`px-4 py-2 border rounded-lg ${
                  selectedCollege === college
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
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

      {selectedCollege && (
        <div className="mb-6 text-center">
          <h2 className="font-bold text-lg mb-4">Select Subject Code</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {subjectCodes.length > 0 ? (
              subjectCodes.map((subjectCode) => (
                <button
                  key={subjectCode}
                  className={`px-4 py-2 border rounded-lg ${
                    selectedSubjectCode === subjectCode
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => handleSubjectCodeChange(subjectCode)}
                >
                  {subjectCode}
                </button>
              ))
            ) : (
              <p>No subject codes available</p>
            )}
          </div>
        </div>
      )}

      {/* Search */}
      <div className="mb-6 text-center">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Search questions..."
          value={searchKeyword}
          onChange={handleSearch}
        />
      </div>

      <div>
        {/* Display search results or filtered questions */}
        {searchResults.length > 0 || filteredQuestions.length > 0 ? (
          <div>
            <h2 className="font-bold text-lg mb-4">Questions</h2>
            {(searchResults.length > 0 ? searchResults : filteredQuestions).map(
              (q, index) => (
                <div key={index} className="border p-4 mb-4 rounded-lg">
                  <p className="font-bold">{q.questionText}</p>
                  <ul className="mt-2">
                    {q.options.map((option, idx) => (
                      <li key={idx} className="list-disc list-inside">
                        {option.optionText}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>
        ) : (
          <p>No questions available for this selection or search term.</p>
        )}
      </div>
    </div>
  );
};

export default CombinedQuizPage;
