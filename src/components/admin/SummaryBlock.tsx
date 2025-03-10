import { useState, useEffect, SyntheticEvent } from "react";
import { useUserData, useUserDataDispatch } from "../../context/UserContext";
import { Summary } from "../../types"; // Import the correct type
import Button from "@mui/material/Button";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTheme } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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

    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    mt: 4,
                    mb: 2,
                }}
            >
                <Typography component="span" sx={{ flexGrow: 1 }}>
                    <b>Summary</b>
                </Typography>
                <Button
                    variant="contained"
                    size="small"
                    onClick={updateSummary}
                    sx={{
                        backgroundColor: theme.palette.primary.dark,
                    }}
                >
                    Add
                </Button>
            </Box>

            <Grid container spacing={1}>
                <Grid size={12}>
                    <Accordion
                        key={summary._id}
                        sx={{
                            backgroundColor: theme.palette.primary.light,
                            color: theme.palette.primary.contrastText,
                        }}
                        expanded={expanded === summary._id}
                        onChange={handleChange(summary._id)}
                    >
                        <AccordionSummary
                            expandIcon={
                                <ExpandMoreIcon
                                    sx={{
                                        color: theme.palette.primary
                                            .contrastText,
                                    }}
                                />
                            }
                            aria-controls="panel1-content"
                            sx={{
                                color: theme.palette.primary.contrastText,
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    width: "100%",
                                }}
                            >
                                <Typography
                                    component="span"
                                    sx={{ flexGrow: 1 }}
                                >
                                    <b>Short/Long Summary</b>
                                </Typography>
                                {/* Delete Button (Aligned to the Right) */}
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails
                            sx={{
                                backgroundColor: theme.palette.primary.contrastText,
                                color: theme.palette.primary.light,
                            }}
                        >
                            <Stack spacing={2}>
                                <TextField
                                    fullWidth
                                    label="Short Summary: "
                                    rows={4}
                                    value={summary.short}
                                    margin="dense"
                                    onChange={(e) =>
                                        handleSummaryChange(
                                            "short",
                                            e.target.value
                                        )
                                    }
                                />
                                <TextField
                                    fullWidth
                                    label="Detailed Summary: "
                                    multiline
                                    rows={4}
                                    value={summary.detailed}
                                    margin="dense"
                                    onChange={(e) =>
                                        handleSummaryChange(
                                            "detailed",
                                            e.target.value
                                        )
                                    }
                                />
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
        </>
    );
}
