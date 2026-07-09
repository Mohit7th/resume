import { Box, Paper, Typography } from "@mui/material";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";
import { useUserData } from "../../context/UserContext";

export default function Summary() {
    const { summary } = useUserData();

    return (
        <Paper
            variant="outlined"
            sx={{
                position: "relative",
                maxWidth: 900,
                p: { xs: 3, md: 5 },
                borderRadius: 3,
                borderColor: "divider",
                boxShadow: "none",
                bgcolor: "secondary.light",
            }}
        >
            <Box
                sx={{
                    display: "grid",
                    placeItems: "center",
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: "background.paper",
                    color: "primary.main",
                    mb: 3,
                }}
            >
                <FormatQuoteRoundedIcon />
            </Box>
            <Typography
                sx={{
                    color: "text.primary",
                    fontSize: { xs: "1rem", md: "1.125rem" },
                    lineHeight: 1.8,
                }}
            >
                {summary.detailed}
            </Typography>
        </Paper>
    );
}
