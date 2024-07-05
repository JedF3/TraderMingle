import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { UserProfileContextProvider } from "./context/UserProfileContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <UserProfileContextProvider>
      <App />
    </UserProfileContextProvider>
  </AuthContextProvider>
);
