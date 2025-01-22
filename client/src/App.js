import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import RequinAbout from "./pages/RequinAbout";
import RequinContacts from "./pages/RequinContactPage";
import Dashboard from "./pages/Dashboard.js";
import Login from "./pages/Login.js";
import AddDynamicQuiz from "./pages/DynamicAddQuiz.js";
import AddStaticQuiz from "./pages/StaticAddQuiz.js";
import CombinedQuizPage from "./components/StaticQuiz.js";
import UniversitySubjectPage from "./pages/UpdateDynamic.js";
import UpdateStatic from "./pages/UpdateStatic.js";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />, 
      children: [
        {
          path: "/aboutus",
          element: <RequinAbout />,
        },
        {
          path: "/contact",
          element: <RequinContacts />,
        },
        {
          path: "/",
          element: <CombinedQuizPage />,
        },
        {
          path: "/admin-login",
          element: <Login />,
        },
        {
          path: "/admin-dashboard",
          element: <Dashboard />,
        },
        {
          path: "/admin-add/dynamic",
          element: <AddDynamicQuiz />,
        },
        {
          path: "/admin-add/static",
          element: <AddStaticQuiz />,
        },

        {
          path: "/admin-update/Dynamic",
          element: <UniversitySubjectPage />,
        },
        {
          path: "/admin-update/Static",
          element: <UpdateStatic />,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
