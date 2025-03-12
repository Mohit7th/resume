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
    typography: {
        fontSize: 14, // Default base font size
        h6: {
            fontSize: "1rem", // Default for h6
            "@media (max-width:600px)": {
                fontSize: "0.875rem", // Adjust for small screens
            },
            "@media (min-width:900px)": {
                fontSize: "1.125rem", // Adjust for large screens
            },
        },
        body1: {
            fontSize: "0.875rem",
            "@media (max-width:600px)": {
                fontSize: "0.75rem",
            },
            "@media (min-width:900px)": {
                fontSize: "1rem",
            },
        },
    },
    components: {
        MuiListItem: {
            styleOverrides: {
                root: {
                    padding: "2px", // Default padding
                    "@media (max-width:600px)": {
                        padding: "1px", // Smaller padding on small screens
                    },
                },
            },
        },
        MuiListItemText: {
            styleOverrides: {
                primary: {
                    fontSize: "0.8rem", // Default font size
                    "@media (max-width:600px)": {
                        fontSize: "0.8rem", // Smaller font for small screens
                    },
                    "@media (min-width:900px)": {
                        fontSize: "0.9rem", // Larger font for big screens
                    },
                },
            },
        },
    },
});

export default theme;
