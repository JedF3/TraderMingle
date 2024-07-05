import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import MyProvider from "./MyProvider.jsx";
import { UserProfileContextProvider } from "./context/UserProfileContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <MyProvider>
    <UserProfileContextProvider>
      <App />
    </UserProfileContextProvider>
  </MyProvider>
);
