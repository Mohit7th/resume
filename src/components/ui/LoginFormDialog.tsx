import {
    AppBar,
    Button,
    Container,
    Dialog,
    IconButton,
    Stack,
    TextField,
    Toolbar,
    Typography,
    useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid2";
interface FormDialogProps {
    open: boolean;
    onCloseDialog: () => void;
}

export default function LoginFormDialog({
    open,
    onCloseDialog
}: FormDialogProps) {
    const theme = useTheme();
    const palette = theme.palette.primary;
    function handleEmailChange(e: string) {}

    function handlePasswordChange(e: string) {}

    function handleLogin() {}

    return (
        <Dialog fullScreen open={open} onClose={onCloseDialog}>
            <AppBar
                sx={{ position: "relative", backgroundColor: palette.dark }}
            >
                <Toolbar>
                    <Typography
                        sx={{ ml: 2, flex: 1 }}
                        variant="h6"
                        component="div"
                    >
                        Admin Login
                    </Typography>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={onCloseDialog}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Container
                fixed
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh", // Centers content vertically within the full viewport height
                }}
            >
                <Grid container spacing={2}>
                    <Grid
                        size={{ xs: 12, md: 6 }}
                        sx={{
                            display: { xs: "flex", md: "flex", lg: "flex" },
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <img src="assets/login.svg" alt="login"></img>
                    </Grid>
                    <Grid
                        size={{ xs: 12, md: 6 }}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Stack spacing={2}>
                            <TextField
                                id="outlined-basic"
                                label="Name"
                                variant="outlined"
                                size="small"
                                onChange={(e) =>
                                    handleEmailChange(e.target.value)
                                }
                            />
                            <TextField
                                id="outlined-paasword"
                                label="Password"
                                variant="outlined"
                                size="small"
                                onChange={(e) =>
                                    handlePasswordChange(e.target.value)
                                }
                                type="password"
                            />
                            <Button
                                variant="contained"
                                size="small"
                                onClick={handleLogin}
                                sx={{ backgroundColor: palette.dark }}
                            >
                                Login
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Dialog>
    );
}
