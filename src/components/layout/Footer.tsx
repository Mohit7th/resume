import { Box, Typography, IconButton, Container } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useUserData } from "../../context/UserContext";

export default function Footer() {
    const userData = useUserData();
    return (
        <Box
            component="footer"
            sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                width: "100%",
                backgroundColor: "#333",
                color: "#fff",
                py: 1,
                zIndex: 1000,
            }}
        >
            <Container
                maxWidth="lg"
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                {/* Left Side: "Developed by" */}
                <Typography variant="body2">Developed by {userData.titleHeader.name}</Typography>

                {/* Right Side: Social Media Icons */}
                <Box>
                    <IconButton href={userData.titleHeader.socials[1].url} target="_blank" sx={{ color: "white" }}>
                        <GitHubIcon />
                    </IconButton>
                    <IconButton href={userData.titleHeader.socials[0].url} target="_blank" sx={{ color: "white" }}>
                        <LinkedInIcon />
                    </IconButton>
                </Box>
            </Container>
        </Box>
    );
}
