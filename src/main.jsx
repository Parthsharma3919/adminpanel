
import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import RootApp from "./RootApp";
import { MaterialUIControllerProvider } from "./app/context";
// import "font-awesome/css/font-awesome.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
        <HelmetProvider>
    <BrowserRouter>
      <MaterialUIControllerProvider>
        <RootApp />
      </MaterialUIControllerProvider>
    </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
