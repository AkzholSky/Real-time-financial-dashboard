import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure bootstrap is loaded globally
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Create a root for React and render the App component
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
