import { useState, useEffect } from "react";
import { useUserData, useUserDataDispatch } from "../../context/UserContext";
import { Summary } from "../../types"; // Import the correct type
import Button from "@mui/material/Button";
import { Box, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTheme } from "@mui/material/styles";

export default function SummaryBlock() {
    const userdata = useUserData();
    const dispatch = useUserDataDispatch();
    const theme = useTheme();

    // Ensure summary is properly initialized
    const [summary, setSummary] = useState<Summary>(
        userdata?.summary || {
            detailed: "",
            short: "",
            _id: "",
        }
    );

    // Sync summary state when userdata changes
    useEffect(() => {
        if (userdata?.summary) {
            setSummary(userdata.summary);
        }
    }, [userdata]);

    function updateSummary() {
        if (!dispatch) {
            console.error("Dispatch function is not available");
            return;
        }

        dispatch({
            type: "UPDATE_SUMMARY",
            payload: summary,
        });
    }

    function handleSummaryChange(field: keyof Summary, newValue: string) {
        setSummary((prevSummary) => ({
            ...prevSummary,
            [field]: newValue,
        }));
    }

    return (
        <Box
            component="section"
            sx={{ mt: 5, p: 2, border: "1px dashed grey" }}
        >
            <Grid container spacing={2}>
                <Grid size={6}>
                    <h2>Summary</h2>
                </Grid>
                <Grid size={6}>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={updateSummary}
                        sx={{
                            backgroundColor: theme.palette.primary.dark,
                        }}
                    >
                        Update
                    </Button>
                </Grid>

                <Grid size={12}>
                    <TextField
                        fullWidth
                        label="Short Summary: "
                        multiline
                        rows={4}
                        value={summary.short}
                        margin="dense"
                        defaultValue="Default Value"
                        onChange={(e) =>
                            handleSummaryChange("short", e.target.value)
                        }
                    />
                </Grid>
                <Grid size={12}>
                    <TextField
                        fullWidth
                        label="Detailed Summary: "
                        multiline
                        rows={4}
                        value={summary.detailed}
                        margin="dense"
                        defaultValue="Default Value"
                        onChange={(e) =>
                            handleSummaryChange("detailed", e.target.value)
                        }
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
