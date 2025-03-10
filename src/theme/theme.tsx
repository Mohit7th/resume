// src/theme/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#FFF2F2", // Example primary color
            light: "#7886C7", // Lighter shade
            dark: "#2D336B", // Darker shade
            contrastText: "#FFF2F2", // Text color on primary
        },
        text: {
            primary: "#2D336B",
            secondary: "#7886C7",
        },
    },
});

export default theme;
