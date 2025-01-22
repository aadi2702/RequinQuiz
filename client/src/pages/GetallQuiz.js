// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";

// const GetAllQuiz = () => {
//   const [quizzes, setQuizzes] = useState([]);

//   // Fetch quizzes from the API
//   useEffect(() => {
//     const fetchQuizzes = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/quiz");
//         if (response.data.success && Array.isArray(response.data.data)) {
//           setQuizzes(response.data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching quizzes:", error);
//       }
//     };

//     fetchQuizzes();
//   }, []);

//   // Function to delete a quiz
//   const deleteQuiz = async (quizId) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this quiz?"
//     );
//     if (!confirmDelete) return;

//     try {
//       const token = localStorage.getItem("token"); // Retrieve token
//       if (!token) {
//         alert("User not authenticated. Please log in.");
//         return;
//       }

//       const response = await axios.delete(
//         `http://localhost:5000/api/quiz/${quizId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.data.success) {
//         alert("Quiz deleted successfully");
//         setQuizzes((prevQuizzes) =>
//           prevQuizzes.filter((quiz) => quiz._id !== quizId)
//         );
//       } else {
//         alert(response.data.message || "Failed to delete the quiz");
//       }
//     } catch (error) {
//       console.error("Error deleting quiz:", error);
//       alert("An error occurred while trying to delete the quiz");
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content Area */}
//       <div className="flex-1 bg-gradient-to-br from-gray-800 to-gray-900 p-8">
//         {/* Dashboard Button
//         <Link to="/admin-dashboard">
//           <button className="absolute top-8 left-8 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all">
//             Dashboard
//           </button>
//         </Link> */}

//         <h1 className="text-4xl font-bold text-white text-center mb-10">
//           All Quizzes
//         </h1>

//         {quizzes.length > 0 ? (
//           <div className="space-y-8">
//             {quizzes.map((quiz) => (
//               <div
//                 key={quiz._id}
//                 className="p-6 bg-gray-100 rounded-lg shadow-lg border-l-4 border-blue-500"
//               >
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//                   Category: {quiz.category}
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {quiz.questions.map((question, index) => (
//                     <div
//                       key={index}
//                       className="p-4 bg-white rounded-lg shadow-md border border-gray-200"
//                     >
//                       <h3 className="text-lg font-semibold text-gray-700 mb-2">
//                         Q{index + 1}: {question.questionText}
//                       </h3>
//                       <div className="space-y-2">
//                         {question.options.map((option, idx) => (
//                           <p
//                             key={idx}
//                             className={`p-2 rounded ${
//                               option.isCorrect
//                                 ? "bg-green-100 text-green-600 font-semibold"
//                                 : "bg-gray-100 text-gray-700"
//                             }`}
//                           >
//                             {option.optionText}
//                           </p>
//                         ))}
//                       </div>
//                       <p className="mt-3 text-sm text-gray-500">
//                         <span className="font-bold text-blue-500">
//                           Correct Answer:{" "}
//                         </span>
//                         {
//                           question.options.find((option) => option.isCorrect)
//                             ?.optionText
//                         }
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//                 {/* Delete Button */}
//                 <button
//                   className="mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition duration-300"
//                   onClick={() => deleteQuiz(quiz._id)}
//                 >
//                   Delete Quiz
//                 </button>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-lg text-gray-300 text-center">
//             No quizzes available at the moment.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default GetAllQuiz;  


import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const GetAllQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);

  // Fetch quizzes from the API
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/quiz");
        console.log(response);
        
        if (response.data.success && Array.isArray(response.data.data)) {
          setQuizzes(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);

  // Function to delete a quiz
  const deleteQuiz = async (quizId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this quiz?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token"); // Retrieve token
      console.log(token);
      
      if (!token) {
        alert("User not authenticated. Please log in.");
        return;
      }

      const response = await axios.delete(
        `http://localhost:5000/api/quiz/${quizId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert("Quiz deleted successfully");
        setQuizzes((prevQuizzes) =>
          prevQuizzes.filter((quiz) => quiz._id !== quizId)
        );
      } else {
        alert(response.data.message || "Failed to delete the quiz");
      }
    } catch (error) {
      console.error("Error deleting quiz:", error);
      alert("An error occurred while trying to delete the quiz");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 bg-gradient-to-br from-gray-800 to-gray-900 p-8 overflow-y-auto">
        {/* Title */}
        <h1 className="text-4xl font-bold text-white text-center mb-10">
          All Quizzes
        </h1>

        {/* Content */}
        {quizzes.length > 0 ? (
          <div className="space-y-8">
            {quizzes.map((quiz) => (
              <div
                key={quiz._id}
                className="p-6 bg-gray-100 rounded-lg shadow-lg border-l-4 border-blue-500"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Category: {quiz.category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {quiz.questions.map((question, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white rounded-lg shadow-md border border-gray-200"
                    >
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        Q{index + 1}: {question.questionText}
                      </h3>
                      <div className="space-y-2">
                        {question.options.map((option, idx) => (
                          <p
                            key={idx}
                            className={`p-2 rounded ${
                              option.isCorrect
                                ? "bg-green-100 text-green-600 font-semibold"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {option.optionText}
                          </p>
                        ))}
                      </div>
                      <p className="mt-3 text-sm text-gray-500">
                        <span className="font-bold text-blue-500">
                          Correct Answer:{" "}
                        </span>
                        {
                          question.options.find((option) => option.isCorrect)
                            ?.optionText
                        }
                      </p>
                    </div>
                  ))}
                </div>
                {/* Delete Button */}
                <button
                  className="mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition duration-300"
                  onClick={() => deleteQuiz(quiz._id)}
                >
                  Delete Quiz
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg text-gray-300 text-center">
            No quizzes available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default GetAllQuiz;
