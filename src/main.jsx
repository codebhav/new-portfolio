import { Buffer } from "buffer"; // Ensure buffer is available globally

// Polyfill Buffer globally
window.Buffer = window.Buffer || Buffer;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        {/* Wrap App inside BrowserRouter */}
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>
);
