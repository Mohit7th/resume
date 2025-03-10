import {
    AppBar,
    Button,
    Dialog,
    IconButton,
    Slide,
    TextField,
    Toolbar,
    Typography,
} from "@mui/material";
import { forwardRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";
import Grid from "@mui/material/Grid2";

interface FormDialogProps {
    open: boolean;
    handleClose: () => void;
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function LoginFormDialog({
    open,
    handleClose,
}: FormDialogProps) {
    function handleEmailChange(e: string) {}

    function handlePasswordChange(e: string) {}

    function handleLogin() {}

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: "relative" }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography
                        sx={{ ml: 2, flex: 1 }}
                        variant="h6"
                        component="div"
                    >
                        Sound
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleClose}>
                        save
                    </Button>
                </Toolbar>
            </AppBar>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 12 }}>
                    <TextField
                        id="outlined-basic"
                        label="Name:"
                        variant="outlined"
                        size="small"
                        onChange={(e) => handleEmailChange(e.target.value)}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 12 }}>
                    <TextField
                        id="outlined-paasword"
                        label="Password:"
                        variant="outlined"
                        size="small"
                        onChange={(e) => handlePasswordChange(e.target.value)}
                        type="password"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 12 }}>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                </Grid>
            </Grid>
        </Dialog>
    );
}
