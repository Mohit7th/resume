import React, { useEffect, useState } from "react";
import { useUserData, useUserDataDispatch } from "../../context/UserContext";
import { WorkHistory } from "../../types"; // Import the correct type
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Stack, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";

export default function WorkHistoryBlock() {
    const userdata = useUserData();
    const dispatch = useUserDataDispatch();

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

    return (
        <Box component="section" sx={{ m: 5, p: 2, border: "1px dashed grey" }}>
            <Grid container spacing={2}>
                <Grid size={6}>
                    <h2>Work History</h2>
                </Grid>
                <Grid size={6}>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={updateWorkHistory}
                    >
                        Update
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                {workHistory.map((detail, index) => (
                    <Grid size={4} key={detail._id}>
                        <Stack spacing={2} >
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
                            <IconButton aria-label="delete" color="error">
                                <DeleteIcon />
                            </IconButton>
                        </Stack>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
