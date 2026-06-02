// main.jsx
// The entry point for the React application.
// Mounts the App component into the <div id="root"> in index.html
// and loads the global CSS stylesheet.

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "../styles/global.css";

// React 18 syntax: createRoot replaces the older ReactDOM.render
ReactDOM.createRoot(document.getElementById("root")).render(
  // StrictMode helps catch bugs by running some checks in development only
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
