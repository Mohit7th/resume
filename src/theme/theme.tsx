// src/theme/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#2D336B", // Example primary color
            light: "#FFF2F2", // Lighter shade
            dark: "#2D336B", // Darker shade
            contrastText: "#A9B5DF", // Text color on primary
        },
        secondary: {
            main: "#222831", // Example secondary color
            light: "#31363F",
            dark: "#76ABAE",
            contrastText: "#EEEEEE",
        },
        error: {
            main: "#D02631",
        },
        warning: {
            main: "#FFAB00",
        },
        info: {
            main: "#4285F4",
        },
        success: {
            main: "#1F865A",
        },
        background: {
            default: "#FFF2F2",
            paper: "#ffffff",
        },
        text: {
            primary: "#2D336B",
            secondary: "#A9B5DF",
        },
    },
});

export default theme;
