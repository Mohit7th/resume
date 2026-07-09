import { GlobalStyles } from "@mui/material";

const globalStyles = (
    <GlobalStyles
        styles={{
            html: {
                scrollBehavior: "smooth",
                scrollPaddingTop: "88px",
            },
            body: {
                backgroundColor: "#FCFBFA",
                color: "#252A3A",
            },
            "::selection": {
                backgroundColor: "#D9DFF5",
                color: "#17204A",
            },
            "::-webkit-scrollbar": {
                width: "8px",
            },
            "::-webkit-scrollbar-thumb": {
                background: "#7886C7",
                borderRadius: "5px",
            },
            "@media (prefers-reduced-motion: reduce)": {
                html: {
                    scrollBehavior: "auto",
                },
                "*, *::before, *::after": {
                    animationDuration: "0.01ms !important",
                    animationIterationCount: "1 !important",
                    transitionDuration: "0.01ms !important",
                },
            },
        }}
    />
);

export default globalStyles;
