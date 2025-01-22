// import React from "react";
// import { Link, useLocation } from "react-router-dom";

// const Sidebar = () => {
//   const location = useLocation();

//   const isActive = (path) => location.pathname === path;

//   return (
//     <div className="min-h-screen w-64 bg-gradient-to-br from-gray-800 to-gray-900 text-gray-200 shadow-lg">
//       {/* Sidebar Title */}
//       <h2 className="text-3xl font-bold text-center text-white py-6 border-b border-gray-700">
//         Admin Panel
//       </h2>
//       {/* Links */}
//       <ul className="mt-6">
//         <li>
//           <Link
//             to="/admin-dashboard"
//             className={`block px-6 py-3 text-lg font-medium rounded-r-full transition-all duration-300 ${
//               isActive("/dashboard")
//                 ? "bg-blue-500 text-white font-semibold"
//                 : "hover:bg-gray-700 text-gray-300"
//             }`}
//           >
//             Dashboard
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/admin-add"
//             className={`block px-6 py-3 text-lg font-medium rounded-r-full transition-all duration-300 ${
//               isActive("/add-quiz")
//                 ? "bg-blue-500 text-white font-semibold"
//                 : "hover:bg-gray-700 text-gray-300"
//             }`}
//           >
//             Add Quiz
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/admin-all"
//             className={`block px-6 py-3 text-lg font-medium rounded-r-full transition-all duration-300 ${
//               isActive("/get-all-quizzes")
//                 ? "bg-blue-500 text-white font-semibold"
//                 : "hover:bg-gray-700 text-gray-300"
//             }`}
//           >
//             All Quiz
//           </Link>
//         </li>
//         {/* <li>
//           <Link
//             to="/admin-delete"
//             className={`block px-6 py-3 text-lg font-medium rounded-r-full transition-all duration-300 ${
//               isActive("/delete")
//                 ? "bg-blue-500 text-white font-semibold"
//                 : "hover:bg-gray-700 text-gray-300"
//             }`}
//           >
//             Delete Quiz
//           </Link>
//         </li> */}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;

// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";

// const Sidebar = () => {
//   const location = useLocation();
//   const [isAddQuizOpen, setIsAddQuizOpen] = useState(false);

//   const isActive = (path) => location.pathname === path;

//   const toggleAddQuizMenu = () => {
//     setIsAddQuizOpen((prevState) => !prevState);
//   };

//   return (
//     <div className="min-h-screen w-64 bg-gradient-to-br from-gray-800 to-gray-900 text-gray-200 shadow-lg">
//       {/* Sidebar Title */}
//       <h2 className="text-3xl font-bold text-center text-white py-6 border-b border-gray-700">
//         Admin Panel
//       </h2>
//       {/* Links */}
//       <ul className="mt-6">
//         <li>
//           <Link
//             to="/admin-dashboard"
//             className={`block px-6 py-3 text-lg font-medium rounded-r-full transition-all duration-300 ${
//               isActive("/admin-dashboard")
//                 ? "bg-blue-500 text-white font-semibold"
//                 : "hover:bg-gray-700 text-gray-300"
//             }`}
//           >
//             Update
//           </Link>
//         </li>
//         <li>
//           <button
//             onClick={toggleAddQuizMenu}
//             className={`block w-full text-left px-6 py-3 text-lg font-medium rounded-r-full transition-all duration-300 ${
//               isActive("/admin-add")
//                 ? "bg-blue-500 text-white font-semibold"
//                 : "hover:bg-gray-700 text-gray-300"
//             }`}
//           >
//             Add Quiz
//           </button>

//           {/* Dropdown for Add Quiz */}
//           {isAddQuizOpen && (
//             <ul className="pl-8 mt-2">
//               <li>
//                 <Link
//                   to="/admin-add/dynamic"
//                   className={`block px-6 py-3 text-lg font-medium rounded-r-full transition-all duration-300 ${
//                     isActive("/admin-add/dynamic")
//                       ? "bg-blue-500 text-white font-semibold"
//                       : "hover:bg-gray-700 text-gray-300"
//                   }`}
//                 >
//                   Dynamic
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/admin-add/static"
//                   className={`block px-6 py-3 text-lg font-medium rounded-r-full transition-all duration-300 ${
//                     isActive("/admin-add/static")
//                       ? "bg-blue-500 text-white font-semibold"
//                       : "hover:bg-gray-700 text-gray-300"
//                   }`}
//                 >
//                   Static
//                 </Link>
//               </li>
//             </ul>
//           )}
//         </li>
//         <li>
//           <Link
//             to="/admin-all"
//             className={`block px-6 py-3 text-lg font-medium rounded-r-full transition-all duration-300 ${
//               isActive("/admin-all")
//                 ? "bg-blue-500 text-white font-semibold"
//                 : "hover:bg-gray-700 text-gray-300"
//             }`}
//           >
//             All Quiz
//           </Link>
//         </li>
//         {/* <li>
//           <Link
//             to="/admin-delete"
//             className={`block px-6 py-3 text-lg font-medium rounded-r-full transition-all duration-300 ${
//               isActive("/admin-delete")
//                 ? "bg-blue-500 text-white font-semibold"
//                 : "hover:bg-gray-700 text-gray-300"
//             }`}
//           >
//             Delete Quiz
//           </Link>
//         </li> */}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [isAddQuizOpen, setIsAddQuizOpen] = useState(false);
  const [isUpdateQuizOpen, setIsUpdateQuizOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  // Toggle functions
  const toggleAddQuizMenu = () => {
    setIsAddQuizOpen((prevState) => !prevState);
  };

  const toggleUpdateQuizMenu = () => {
    setIsUpdateQuizOpen((prevState) => !prevState);
  };

  return (
    <div className="min-h-screen w-64 bg-gradient-to-br from-gray-800 to-gray-900 text-gray-200 shadow-lg">
      {/* Sidebar Title */}
      <h2 className="text-3xl font-bold text-center text-white py-6 border-b border-gray-700">
        Admin Panel
      </h2>
      {/* Links */}
      <ul className="mt-6">
        {/* <li>
          <Link
            to="/admin-dashboard"
            className={`block px-6 py-3 text-lg font-medium rounded-r-full transition-all duration-300 ${
              isActive("/admin-dashboard")
                ? "bg-blue-500 text-white font-semibold"
                : "hover:bg-gray-700 text-gray-300"
            }`}
          >
            Dashboard
          </Link>
        </li> */}

        {/* Add Quiz Button and Dropdown */}
        <li>
          <button
            onClick={toggleAddQuizMenu}
            className={`block w-full text-left px-6 py-3 text-lg font-medium rounded-r-full transition-all duration-300 ${
              isActive("/admin-add")
                ? "bg-blue-500 text-white font-semibold"
                : "hover:bg-gray-700 text-gray-300"
            }`}
          >
            Add Quiz
          </button>

          {/* Dropdown for Add Quiz */}
          {isAddQuizOpen && (
            <ul className="pl-8 mt-2">
              <li>
                <Link
                  to="/admin-add/dynamic"
                  className={`block px-6 py-3 text-lg font-medium rounded-r-full transition-all duration-300 ${
                    isActive("/admin-add/dynamic")
                      ? "bg-blue-500 text-white font-semibold"
                      : "hover:bg-gray-700 text-gray-300"
                  }`}
                >
                  Dynamic
                </Link>
              </li>
              <li>
                <Link
                  to="/admin-add/static"
                  className={`block px-6 py-3 text-lg font-medium rounded-r-full transition-all duration-300 ${
                    isActive("/admin-add/static")
                      ? "bg-blue-500 text-white font-semibold"
                      : "hover:bg-gray-700 text-gray-300"
                  }`}
                >
                  Static
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Update Quiz Button and Dropdown */}
        <li>
          <button
            onClick={toggleUpdateQuizMenu}
            className={`block w-full text-left px-6 py-3 text-lg font-medium rounded-r-full transition-all duration-300 ${
              isActive("/admin-update")
                ? "bg-blue-500 text-white font-semibold"
                : "hover:bg-gray-700 text-gray-300"
            }`}
          >
            Update/Delete Quiz
          </button>

          {/* Dropdown for Update Quiz */}
          {isUpdateQuizOpen && (
            <ul className="pl-8 mt-2">
              <li>
                <Link
                  to="/admin-update/dynamic"
                  className={`block px-6 py-3 text-lg font-medium rounded-r-full transition-all duration-300 ${
                    isActive("/admin-update/dynamic")
                      ? "bg-blue-500 text-white font-semibold"
                      : "hover:bg-gray-700 text-gray-300"
                  }`}
                >
                  Dynamic
                </Link>
              </li>
              <li>
                <Link
                  to="/admin-update/static"
                  className={`block px-6 py-3 text-lg font-medium rounded-r-full transition-all duration-300 ${
                    isActive("/admin-update/static")
                      ? "bg-blue-500 text-white font-semibold"
                      : "hover:bg-gray-700 text-gray-300"
                  }`}
                >
                  Static
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* All Quiz */}
        {/* <li>
          <Link
            to="/admin-all"
            className={`block px-6 py-3 text-lg font-medium rounded-r-full transition-all duration-300 ${
              isActive("/admin-all")
                ? "bg-blue-500 text-white font-semibold"
                : "hover:bg-gray-700 text-gray-300"
            }`}
          >
            All Quiz
          </Link>
        </li> */}
      </ul> 
    </div>
  );
};

export default Sidebar;
