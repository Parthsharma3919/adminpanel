import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import RootApp from "./RootApp";
import { MaterialUIControllerProvider } from "./app/context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "font-awesome/css/font-awesome.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <MaterialUIControllerProvider>
          <RootApp />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </MaterialUIControllerProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
