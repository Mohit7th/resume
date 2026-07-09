import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";
import { Box, Paper, Typography } from "@mui/material";
import { useUserData } from "../../context/UserContext";

export default function Summary() {
    const { summary } = useUserData();
    const paragraphs = summary.detailed.split("\n\n");

    return (
        <Paper
            variant="outlined"
            sx={{
                width: "100%",
                p: { xs: 3, md: 5 },
                borderRadius: 4,
                borderColor: "divider",
                borderLeft: "5px solid",
                borderLeftColor: "primary.main",
                boxShadow: "none",
                bgcolor: "secondary.light",
            }}
        >
            <Box
                sx={{
                    maxWidth: "72ch",
                    mx: "auto",
                }}
            >
                <Box
                    aria-hidden="true"
                    sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        display: "grid",
                        placeItems: "center",
                        mb: 3,
                        mx: "auto",
                        bgcolor: "background.paper",
                        color: "primary.main",
                    }}
                >
                    <FormatQuoteRoundedIcon />
                </Box>

                {paragraphs.map((paragraph) => (
                    <Typography
                        key={paragraph}
                        sx={{
                            color: "text.primary",
                            fontSize: { xs: "1rem", md: "1.075rem" },
                            lineHeight: 1.75,
                            textAlign: "center",
                            mb: 2,
                            "&:last-of-type": {
                                mb: 0,
                            },
                        }}
                    >
                        {paragraph}
                    </Typography>
                ))}
            </Box>
        </Paper>
    );
}
