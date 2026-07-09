import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        background: {
            default: "#FCFBFA",
            paper: "#FFFFFF",
        },
        primary: {
            main: "#2D336B",
            light: "#7886C7",
            dark: "#17204A",
            contrastText: "#FFFFFF",
        },
        secondary: {
            main: "#7886C7",
            light: "#EEF1FA",
            dark: "#4F5C9F",
        },
        text: {
            primary: "#252A3A",
            secondary: "#62697A",
        },
        divider: "#DCE1EE",
        action: {
            hover: "rgba(45, 51, 107, 0.06)",
        },
    },
    typography: {
        fontFamily: "'Poppins', sans-serif",
        h1: {
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-0.04em",
        },
        h2: {
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.025em",
        },
        h3: {
            fontWeight: 700,
            lineHeight: 1.2,
        },
        h6: {
            fontWeight: 600,
        },
        body1: {
            fontWeight: 400,
            fontSize: "1rem",
            lineHeight: 1.7,
        },
        body2: {
            lineHeight: 1.65,
        },
        button: {
            fontWeight: 600,
            textTransform: "none",
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    minHeight: 44,
                    borderRadius: 12,
                    paddingInline: 20,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    border: "1px solid #DCE1EE",
                    boxShadow: "0 14px 40px rgba(23, 32, 74, 0.08)",
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    textUnderlineOffset: "4px",
                },
            },
        },
    },
});

export default theme;
