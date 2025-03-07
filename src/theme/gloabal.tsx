import { GlobalStyles } from "@mui/material";

const globalStyles = (
    <GlobalStyles
        styles={{
            body: {
                backgroundColor: "#A9B5DF",
                color: "#FFF2F2",
            },
            "::-webkit-scrollbar": {
                width: "5px",
            },
            "::-webkit-scrollbar-thumb": {
                background: "#7886C7",
                borderRadius: "5px",
            },
        }}
    />
);

export default globalStyles;
