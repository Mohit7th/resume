import {
    AppBar,
    Avatar,
    Box,
    Button,
    IconButton,
    Toolbar,
    Typography,
} from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../../context/AuthContext";
import { deepOrange } from "@mui/material/colors";
import Footer from "./Footer";

export default function MainLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const auth = useAuth();

    const hideAppBarRoutes = ["/login"];
    const shouldHideAppBar = hideAppBarRoutes.includes(location.pathname);

    const hideFooterRoutes = ["/admin"];
    const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            {!shouldHideAppBar && (
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            <Avatar sx={{ bgcolor: deepOrange[500] }}>
                                MU
                            </Avatar>
                        </Typography>
                        <Button color="inherit" onClick={() => navigate("/")}>
                            Home
                        </Button>
                        <Button
                            color="inherit"
                            onClick={() => navigate("/admin")}
                        >
                            Admin
                        </Button>
                        {!auth?.isAuthenticated && (
                            <Button color="inherit">Login</Button>
                        )}
                        {auth?.isAuthenticated && (
                            <Button color="inherit" onClick={auth?.logout}>
                                Logout
                            </Button>
                        )}
                    </Toolbar>
                </AppBar>
            )}

            {/* Page Content */}
            <Box sx={{ flexGrow: 1, padding: 2 }}>
                <Outlet /> {/* 👈 Renders the page content dynamically */}
            </Box>

            {!shouldHideFooter && <Footer />}
        </Box>
    );
}
