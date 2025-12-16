import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "./context/userContext.jsx";
import { AuthProvider } from "./context/auth.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
    <AuthProvider>
      <UserContext>
        <App />
      </UserContext>
    </AuthProvider>
  </React.StrictMode>
);
