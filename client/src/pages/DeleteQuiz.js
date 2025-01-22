import React, { useEffect, useState } from "react";
import axios from "axios";

const DeleteQuiz = () => {
  const [quizzes, setQuizzes] = useState([]); // State to store all quizzes

  // Fetch quizzes from the API
  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get(
        "https://requin-quiz-backend.vercel.app/api/quiz"
      );
      if (response.data.success && Array.isArray(response.data.data)) {
        setQuizzes(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  // Function to delete a quiz
  const deleteQuiz = async (quizId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this quiz?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token"); // Retrieve token
      if (!token) {
        alert("User not authenticated. Please log in.");
        return;
      }

      const response = await axios.delete(
        `https://requin-quiz-backend.vercel.app/api/quiz/${quizId}`,
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
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Manage Quizzes
        </h1>

        {/* Quiz List */}
        {quizzes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <div
                key={quiz._id}
                className="bg-gray-100 rounded-lg p-6 shadow-lg hover:shadow-2xl transition duration-300"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                  {quiz.title}
                </h2>
                <p className="text-gray-600 mb-2">{quiz.description}</p>
                <p className="text-gray-700">
                  <strong>Category:</strong> {quiz.category}
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Total Questions:</strong> {quiz.questions.length}
                </p>

                {/* Delete Button */}
                <button
                  className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition duration-300"
                  onClick={() => deleteQuiz(quiz._id)}
                >
                  Delete Quiz
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg text-gray-300 text-center">
            No quizzes available to display.
          </p>
        )}
      </div>
    </div>
  );
};

export default DeleteQuiz;
