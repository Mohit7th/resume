import { Box, Typography } from "@mui/material";
import { useUserData } from "../../context/UserContext";
import { useTheme } from "@mui/material/styles";

export default function Summary() {
    const userdata = useUserData();
        const theme = useTheme();
    return (
        <Box
            component="section"
            sx={{ p: 5, color: theme.palette.primary.dark }}
        >
            <Typography variant="h6" gutterBottom>
                {userdata.summary.detailed}
            </Typography>
        </Box>
    );
}
