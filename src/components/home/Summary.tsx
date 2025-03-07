import { Box } from "@mui/material";
import { useUserData } from "../../context/UserContext";

export default function Summary() {
    const userdata = useUserData();
    return (
        <Box
            component="section"
            sx={{ p: 2, border: "1px dashed grey", mb: 5 }}
        >
            {userdata.summary.detailed}
        </Box>
    );
}
