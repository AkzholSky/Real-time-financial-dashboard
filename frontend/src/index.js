import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css"; // Optional: Ensure the path is correct

// Get the root DOM element
const rootElement = document.getElementById("root");

// Create the React root and render the App component
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<App />);
} else {
    console.error("Root element not found!");
}
