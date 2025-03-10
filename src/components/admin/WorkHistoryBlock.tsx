import React, { SyntheticEvent, useEffect, useState } from "react";
import { useUserData, useUserDataDispatch } from "../../context/UserContext";
import { WorkHistory } from "../../types"; // Import the correct type
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
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

export default function WorkHistoryBlock() {
    const userdata = useUserData();
    const dispatch = useUserDataDispatch();
    const theme = useTheme();

    // Ensure workHistory is properly initialized
    const [workHistory, setWorkHistory] = useState<WorkHistory[]>(
        userdata?.workHistory || []
    );

    // Sync workHistory state when userdata changes
    useEffect(() => {
        if (userdata?.workHistory) {
            setWorkHistory(userdata.workHistory);
        }
    }, [userdata]);

    function updateWorkHistory() {
        if (!dispatch) {
            console.error("Dispatch function is not available");
            return;
        }

        dispatch({
            type: "UPDATE_WORK_HISTORY",
            payload: workHistory,
        });
    }

    function handleWorkHistoryChange(
        index: number,
        field: keyof WorkHistory,
        newValue: string
    ) {
        setWorkHistory((prevWorkHistory) =>
            prevWorkHistory.map((detail, i) =>
                i === index ? { ...detail, [field]: newValue } : detail
            )
        );
    }

    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    function handleDelete(e: SyntheticEvent) {
        e.stopPropagation();
    }

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    mt: 4, mb:2
                }}
            >
                <Typography component="span" sx={{ flexGrow: 1 }}>
                    <b>Work History</b>
                </Typography>
                <Button
                    variant="contained"
                    size="small"
                    onClick={updateWorkHistory}
                    sx={{
                        backgroundColor: theme.palette.primary.dark,
                    }}
                >
                    Add
                </Button>
            </Box>
            <Grid container spacing={1}>
                {workHistory.map((detail, index) => (
                    <Grid size={6}>
                        <Accordion
                            key={detail._id}
                            sx={{
                                backgroundColor: theme.palette.primary.light,
                                color: theme.palette.primary.contrastText,
                            }}
                            expanded={expanded === detail._id}
                            onChange={handleChange(detail._id)}
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
                                        <b>{detail.company}</b>
                                    </Typography>
                                    {/* Delete Button (Aligned to the Right) */}
                                    <IconButton
                                        onClick={handleDelete}
                                        size="small"
                                    >
                                        <DeleteIcon
                                            aria-label="delete"
                                            color="error"
                                        />
                                    </IconButton>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails
                                sx={{
                                    backgroundColor:
                                        theme.palette.primary.contrastText,
                                    color: theme.palette.primary.light,
                                }}
                            >
                                <Stack spacing={2}>
                                    <TextField
                                        id="outlined-basic"
                                        label="Company:"
                                        variant="outlined"
                                        size="small"
                                        value={detail.company}
                                        onChange={(e) =>
                                            handleWorkHistoryChange(
                                                index,
                                                "company",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <TextField
                                        id="outlined-basic"
                                        label="Position:"
                                        variant="outlined"
                                        size="small"
                                        value={detail.position}
                                        onChange={(e) =>
                                            handleWorkHistoryChange(
                                                index,
                                                "position",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <TextField
                                        id="outlined-basic"
                                        label="Website:"
                                        variant="outlined"
                                        size="small"
                                        value={detail.website}
                                        onChange={(e) =>
                                            handleWorkHistoryChange(
                                                index,
                                                "website",
                                                e.target.value
                                            )
                                        }
                                    />
                                </Stack>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}
