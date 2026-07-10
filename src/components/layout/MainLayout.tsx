import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    Stack,
    Toolbar,
    Typography,
} from "@mui/material";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { siteConfig } from "../../config/siteConfig";
import Footer from "./Footer";
import { getPublicAssetPath } from "../../utils/publicPath";

export default function MainLayout() {
    const location = useLocation();
    const isAdmin = location.pathname === "/admin";
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 8);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    const resumePdfUrl = getPublicAssetPath(siteConfig.resumePdfPath);
    const navItems = [
        { label: "Work", href: "#work" },
        { label: "Experience", href: "#experience" },
        { label: "Skills", href: "#skills" },
        { label: "About", href: "#about" },
        { label: "Contact", href: "#contact" },
    ];

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            <a className="skip-link" href="#main-content">
                Skip to content
            </a>

            {!isAdmin && (
                <AppBar
                    component="header"
                    position="sticky"
                    elevation={0}
                    sx={{
                        bgcolor: "rgba(252, 251, 250, 0.9)",
                        color: "text.primary",
                        borderBottom: "1px solid",
                        borderColor: "divider",
                        backdropFilter: "blur(14px)",
                        boxShadow: scrolled
                            ? "0 8px 24px rgba(23, 32, 74, 0.08)"
                            : "none",
                        transition:
                            "box-shadow 220ms ease, background-color 220ms ease",
                    }}
                >
                    <Container maxWidth="lg">
                        <Toolbar
                            disableGutters
                            sx={{
                                minHeight: scrolled ? 60 : 72,
                                transition: "min-height 220ms ease",
                            }}
                        >
                            <Button
                                href="#top"
                                color="inherit"
                                aria-label="Mohit Uniyal, back to top"
                                sx={{ minWidth: 0, p: 0, mr: "auto" }}
                            >
                                <Avatar
                                    sx={{
                                        width: 42,
                                        height: 42,
                                        bgcolor: "primary.main",
                                        fontSize: "0.95rem",
                                        fontWeight: 700,
                                    }}
                                >
                                    MU
                                </Avatar>
                                <Typography
                                    component="span"
                                    sx={{
                                        display: { xs: "none", sm: "block" },
                                        ml: 1.5,
                                        fontWeight: 700,
                                    }}
                                >
                                    Mohit Uniyal
                                </Typography>
                            </Button>

                            <Stack
                                component="nav"
                                aria-label="Primary navigation"
                                direction="row"
                                spacing={0.5}
                                sx={{ display: { xs: "none", md: "flex" } }}
                            >
                                {navItems.map((item) => (
                                    <Button
                                        key={item.href}
                                        href={item.href}
                                        color="inherit"
                                        size="small"
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </Stack>

                            <Button
                                href={resumePdfUrl}
                                download="Mohit_Uniyal_Resume.pdf"
                                variant="contained"
                                startIcon={
                                    <DownloadRoundedIcon
                                        sx={{
                                            display: {
                                                xs: "none",
                                                sm: "block",
                                            },
                                        }}
                                    />
                                }
                                sx={{ ml: { xs: 1, md: 2 } }}
                            >
                                Résumé
                            </Button>
                        </Toolbar>
                    </Container>
                </AppBar>
            )}

            <Box
                component="main"
                id="main-content"
                sx={{ flexGrow: 1, bgcolor: "background.default" }}
            >
                <Outlet />
            </Box>

            {!isAdmin && <Footer />}
        </Box>
    );
}
