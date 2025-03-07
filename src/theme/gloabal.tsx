import { GlobalStyles } from "@mui/material";

const globalStyles = (
    <GlobalStyles
        styles={{
            body: {
                backgroundColor: "#7886C7",
                color: "#FFF2F2",
            },
            "::-webkit-scrollbar": {
                width: "5px",
            },
            "::-webkit-scrollbar-thumb": {
                background: "#A9B5DF",
                borderRadius: "5px",
            },
        }}
    />
);

export default globalStyles;
