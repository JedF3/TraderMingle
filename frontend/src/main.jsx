import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ProfilesContextProvider } from "./context/ProfilesContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <ProfilesContextProvider>
      <App />
    </ProfilesContextProvider>
  </AuthContextProvider>
);
