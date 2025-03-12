import {
    AppBar,
    Avatar,
    Box,
    Button,
    Toolbar,
    Typography,
} from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Footer from "./Footer";
import { useTheme } from "@mui/material/styles";
import LoginFormDialog from "../ui/LoginFormDialog";
import { useState } from "react";

export default function MainLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const auth = useAuth();

    const hideAppBarRoutes = ["/login"];
    const shouldHideAppBar = hideAppBarRoutes.includes(location.pathname);

    const hideFooterRoutes = ["/admin"];
    const shouldHideFooter = hideFooterRoutes.includes(location.pathname);
    const theme = useTheme();

    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    function handleAdminLogin() {
        setOpenDialog(true);
        // navigate("/admin");
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            {!shouldHideAppBar && (
                <AppBar
                    position="fixed"
                    sx={{
                        backgroundColor: theme.palette.primary.dark,
                        mb: 4,
                    }}
                >
                    <Toolbar>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                            onClick={() => navigate("/")}
                        >
                            <Avatar
                                sx={{ bgcolor: theme.palette.primary.light }}
                            >
                                MU
                            </Avatar>
                        </Typography>
                        <Button color="inherit" onClick={handleAdminLogin}>
                            Admin
                        </Button>
                        {auth?.isAuthenticated && (
                            <Button color="inherit" onClick={auth?.logout}>
                                Logout
                            </Button>
                        )}
                    </Toolbar>
                </AppBar>
            )}

            {/* Page Content */}
            <Box
                sx={{
                    flexGrow: 1,
                    padding: 2,
                    backgroundImage: "url('assets/liquid-cheese.svg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    minHeight: "100vh",
                }}
            >
                <Outlet /> {/* 👈 Renders the page content dynamically */}
            </Box>

            {!shouldHideFooter && <Footer />}
            <LoginFormDialog
                open={openDialog}
                onCloseDialog={handleCloseDialog}
            />
        </Box>
    );
}
