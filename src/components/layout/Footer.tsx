import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link as RouterLink } from "react-router-dom";
import { useUserData } from "../../context/UserContext";

export default function Footer() {
    const userData = useUserData();
    const github = userData.titleHeader.socials.find(
        (social) => social.name === "GitHub"
    );
    const linkedIn = userData.titleHeader.socials.find(
        (social) => social.name === "LinkedIn"
    );

    return (
        <Box
            component="footer"
            sx={{
                bgcolor: "#111735",
                color: "rgba(255,255,255,0.72)",
                py: 3,
            }}
        >
            <Container
                maxWidth="lg"
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2,
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="body2">
                    © {new Date().getFullYear()} {userData.titleHeader.name}.{" "}
                    {/* Hidden entry point to /learn — styled to read as plain
                        text (no underline, no pointer cursor). */}
                    <Box
                        component={RouterLink}
                        to="/learn"
                        sx={{
                            color: "inherit",
                            textDecoration: "none",
                            cursor: "inherit",
                            "&:hover, &:focus": { textDecoration: "none" },
                        }}
                    >
                        Built with React.
                    </Box>
                </Typography>
                <Stack direction="row" spacing={0.5}>
                    {github && (
                        <IconButton
                            href={github.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="View Mohit Uniyal on GitHub"
                            sx={{ color: "white" }}
                        >
                            <GitHubIcon />
                        </IconButton>
                    )}
                    {linkedIn && (
                        <IconButton
                            href={linkedIn.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="View Mohit Uniyal on LinkedIn"
                            sx={{ color: "white" }}
                        >
                            <LinkedInIcon />
                        </IconButton>
                    )}
                </Stack>
            </Container>
        </Box>
    );
}
