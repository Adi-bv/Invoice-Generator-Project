import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx"; 
import Print from "./components/Print.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Invoicelist from "./components/Invoicelist.jsx";
import Printedited from "./components/Printedited.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/create-invoice", element: <Print/> },
  { path: "/signup", element: <Signup />},
  { path: "/login", element: <Login />},
  { path: "/invoice-list", element: <Invoicelist/>},
  { path: "/edit-invoice/:invoiceId", element: <Printedited/>},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
