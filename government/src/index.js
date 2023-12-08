import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import { LoadingOverlay } from "@mantine/core";
import { notifications } from "@mantine/notifications";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
