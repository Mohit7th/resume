import { FormEvent, useState } from "react";
import {
    Alert,
    Box,
    Button,
    Container,
    InputAdornment,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminLogin() {
    const { login } = useAuth();
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const ok = login(password);
        setError(!ok);
        if (!ok) {
            setPassword("");
        }
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                bgcolor: "secondary.light",
            }}
        >
            <Container maxWidth="xs">
                <Paper
                    variant="outlined"
                    sx={{
                        p: { xs: 3, sm: 5 },
                        borderColor: "divider",
                        borderRadius: 4,
                    }}
                >
                    <Stack spacing={1.5} sx={{ textAlign: "center", mb: 3 }}>
                        <Box
                            sx={{
                                width: 56,
                                height: 56,
                                mx: "auto",
                                borderRadius: "50%",
                                display: "grid",
                                placeItems: "center",
                                bgcolor: "primary.main",
                                color: "primary.contrastText",
                            }}
                        >
                            <LockRoundedIcon />
                        </Box>
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                            Admin access
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Enter the admin password to edit résumé content.
                        </Typography>
                    </Stack>

                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            {error && (
                                <Alert severity="error">
                                    Incorrect password. Please try again.
                                </Alert>
                            )}
                            <TextField
                                label="Password"
                                type="password"
                                value={password}
                                autoFocus
                                fullWidth
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    if (error) setError(false);
                                }}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockRoundedIcon fontSize="small" />
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                disabled={password.length === 0}
                            >
                                Sign in
                            </Button>
                            <Button
                                component={RouterLink}
                                to="/"
                                color="inherit"
                                startIcon={<ArrowBackRoundedIcon />}
                            >
                                Back to site
                            </Button>
                        </Stack>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
}
