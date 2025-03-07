import { Box, Typography } from "@mui/material";
import { useUserData } from "../../context/UserContext";
import { useTheme } from "@mui/material/styles";

export default function Summary() {
    const userdata = useUserData();
        const theme = useTheme();
    return (
        <Box
            component="section"
            sx={{ p: 5, border: "1px dashed grey", mb: 5, color: theme.palette.primary.dark }}
        >
            <Typography variant="subtitle1" gutterBottom>
                {userdata.summary.detailed}
            </Typography>
        </Box>
    );
}
