import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import RootApp from "./RootApp";
import { MaterialUIControllerProvider } from "./context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <MaterialUIControllerProvider>
        <RootApp />
      </MaterialUIControllerProvider>
    </BrowserRouter>
  </React.StrictMode>
);
