import { Box, Button, Container, Stack, Typography } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { Link as RouterLink } from "react-router-dom";

export default function NotFound() {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                minHeight: { xs: "60vh", md: "70vh" },
                bgcolor: "secondary.light",
            }}
        >
            <Container maxWidth="sm" sx={{ textAlign: "center", py: 8 }}>
                <Typography
                    component="p"
                    sx={{
                        color: "secondary.dark",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        fontSize: "0.78rem",
                        mb: 1,
                    }}
                >
                    Error 404
                </Typography>
                <Typography
                    variant="h1"
                    sx={{
                        color: "primary.dark",
                        fontSize: { xs: "4.5rem", md: "6rem" },
                        mb: 1,
                    }}
                >
                    404
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5 }}>
                    This page doesn’t exist
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 4 }}>
                    The page you’re looking for may have moved or never existed.
                    Let’s get you back to the resume.
                </Typography>
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1.5}
                    sx={{ justifyContent: "center" }}
                >
                    <Button
                        component={RouterLink}
                        to="/"
                        variant="contained"
                        startIcon={<HomeRoundedIcon />}
                    >
                        Back to home
                    </Button>
                </Stack>
            </Container>
        </Box>
    );
}
