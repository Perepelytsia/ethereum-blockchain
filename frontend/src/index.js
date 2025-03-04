import React from "react";
import ReactDOM from "react-dom/client";
//import AppContract from "./AppContract";
//import AppProvider from "./AppProvider";
import AppSigned from "./AppSigned";

const root = ReactDOM.createRoot(document.getElementById("root"));
//root.render(<AppProvider />);
//root.render(<AppContract />);
root.render(<AppSigned />);
