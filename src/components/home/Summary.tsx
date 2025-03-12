import { Box, Typography } from "@mui/material";
import { useUserData } from "../../context/UserContext";
import { useTheme } from "@mui/material/styles";

export default function Summary() {
    const userdata = useUserData();
    const theme = useTheme();
    return (
        <Box
            component="section"
            sx={{ p: { sx: 1, md: 2}, color: theme.palette.primary.contrastText }}
        >
            <Typography
                variant="h6"
                gutterBottom
                sx={{
                    fontSize: { xs: '0.78rem', sm: '0.875rem', md: '1rem', lg: '1.125rem' },
                }}
            >
                {userdata.summary.detailed}
            </Typography>
        </Box>
    );
}
