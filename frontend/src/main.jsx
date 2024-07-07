import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import MyProvider from "./MyProvider";
import { UserProfileContextProvider } from "./context/UserProfileContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <MyProvider>
    <UserProfileContextProvider>
      <App />
    </UserProfileContextProvider>
  </MyProvider>
);
