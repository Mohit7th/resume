import React from "react";
import ReactDOM from "react-dom/client";
// Self-hosted Poppins (latin subset, weights used across the theme). Replaces
// the render-blocking Google Fonts <link> and keeps the site self-contained.
import "@fontsource/poppins/latin-400.css";
import "@fontsource/poppins/latin-500.css";
import "@fontsource/poppins/latin-600.css";
import "@fontsource/poppins/latin-700.css";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "@mui/material";
import theme from "./theme/theme";
import globalStyles from "./theme/gloabal";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            {globalStyles}
            <App />
        </ThemeProvider>
    </React.StrictMode>
);
