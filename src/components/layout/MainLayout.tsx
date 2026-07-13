import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Stack,
    Toolbar,
    Typography,
} from "@mui/material";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Outlet, useLocation, Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "./Footer";

const navItems = [
    { label: "Work", href: "#work" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
];

export default function MainLayout() {
    const location = useLocation();
    const segments = location.pathname.split("/").filter(Boolean);
    // Lesson player (/learn/:track/:topic/:lesson) runs full-screen.
    const isLessonPlayer = segments[0] === "learn" && segments.length === 4;
    const hideChrome =
        location.pathname === "/admin" ||
        location.pathname === "/resume" ||
        isLessonPlayer;
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 8);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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

            {!hideChrome && (
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
                                gap: 1,
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
                                <Button
                                    component={RouterLink}
                                    to="/learn"
                                    color="inherit"
                                    size="small"
                                >
                                    Learn
                                </Button>
                            </Stack>

                            <Button
                                component={RouterLink}
                                to="/resume"
                                variant="contained"
                                startIcon={
                                    <DescriptionRoundedIcon
                                        sx={{
                                            display: {
                                                xs: "none",
                                                sm: "block",
                                            },
                                        }}
                                    />
                                }
                                sx={{ ml: { md: 2 } }}
                            >
                                Resume
                            </Button>

                            <IconButton
                                color="inherit"
                                aria-label="Open navigation menu"
                                edge="end"
                                onClick={() => setMobileOpen(true)}
                                sx={{ display: { xs: "inline-flex", md: "none" } }}
                            >
                                <MenuRoundedIcon />
                            </IconButton>
                        </Toolbar>
                    </Container>
                </AppBar>
            )}

            <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                slotProps={{
                    paper: { sx: { width: { xs: "78vw", sm: 320 } } },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        px: 2,
                        py: 1.5,
                    }}
                >
                    <Typography sx={{ fontWeight: 700 }}>Mohit Uniyal</Typography>
                    <IconButton
                        aria-label="Close navigation menu"
                        onClick={() => setMobileOpen(false)}
                    >
                        <CloseRoundedIcon />
                    </IconButton>
                </Box>
                <Divider />
                <List component="nav" aria-label="Primary navigation">
                    {navItems.map((item) => (
                        <ListItem key={item.href} disablePadding>
                            <ListItemButton
                                component="a"
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                            >
                                <ListItemText
                                    primary={item.label}
                                    slotProps={{
                                        primary: { sx: { fontWeight: 600 } },
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                    <ListItem disablePadding>
                        <ListItemButton
                            component={RouterLink}
                            to="/learn"
                            onClick={() => setMobileOpen(false)}
                        >
                            <ListItemText
                                primary="Learn"
                                slotProps={{
                                    primary: { sx: { fontWeight: 600 } },
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Box sx={{ p: 2, mt: "auto" }}>
                    <Button
                        fullWidth
                        component={RouterLink}
                        to="/resume"
                        variant="contained"
                        startIcon={<DescriptionRoundedIcon />}
                        onClick={() => setMobileOpen(false)}
                    >
                        View Resume
                    </Button>
                </Box>
            </Drawer>

            <Box
                component="main"
                id="main-content"
                sx={{ flexGrow: 1, bgcolor: "background.default" }}
            >
                <Outlet />
            </Box>

            {!hideChrome && <Footer />}
        </Box>
    );
}
