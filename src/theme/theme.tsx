// src/theme/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#fff", // Example primary color
            light: "#7886C7", // Lighter shade
            dark: "#2D336B", // Darker shade
            contrastText: "#FFF2F2", // Text color on primary
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
            secondary: "#7886C7",
        },
    },
});

export default theme;
