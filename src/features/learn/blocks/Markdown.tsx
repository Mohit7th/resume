import { Box } from "@mui/material";
import ReactMarkdown from "react-markdown";

/** Renders a Markdown string with theme-aware typography. */
export default function Markdown({ children }: { children: string }) {
    return (
        <Box
            sx={{
                "& p": {
                    my: 1,
                    lineHeight: 1.75,
                    color: "text.secondary",
                },
                "& p:first-of-type": { mt: 0 },
                "& strong": { color: "text.primary", fontWeight: 700 },
                "& code": {
                    bgcolor: "secondary.light",
                    px: 0.7,
                    py: 0.2,
                    borderRadius: 1,
                    fontFamily: "monospace",
                    fontSize: "0.88em",
                    color: "primary.dark",
                },
                "& ul, & ol": { pl: 3, my: 1 },
                "& li": { mb: 0.5, color: "text.secondary", lineHeight: 1.7 },
                "& a": { color: "primary.main" },
                "& h1, & h2, & h3": {
                    mt: 2,
                    mb: 1,
                    color: "text.primary",
                    fontWeight: 700,
                },
            }}
        >
            <ReactMarkdown>{children}</ReactMarkdown>
        </Box>
    );
}
