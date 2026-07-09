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
import Grid from "@mui/material/Grid";
import { ChangeEvent, useState } from "react";
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
    const [loginData, setLoginData] = useState({userEmail: "", userPassword: ""})

    function handleLogin() {}

    function handlechange(e: ChangeEvent<HTMLInputElement>){
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        })
    }

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
                                name="userEmail"
                                variant="outlined"
                                size="small"
                                onChange={handlechange
                                }
                            />
                            <TextField
                                id="outlined-paasword"
                                label="Password"
                                name="userPassword"
                                variant="outlined"
                                size="small"
                                onChange={handlechange}
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
