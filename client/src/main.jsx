import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import UserContext from "./context/userContext.jsx";
import { AuthProvider } from "./context/auth.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <UserContext>
        <App />
      </UserContext>
    </AuthProvider>
  </React.StrictMode>
);
