import React, { useEffect, useState } from "react";
import { useUserData, useUserDataDispatch } from "../../context/UserContext";
import { WorkHistory } from "../../types"; // Import the correct type
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/material";

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
        <Box component="section" sx={{ m:5, p: 2, border: "1px dashed grey" }}>
            <h2>Work History</h2>

            {workHistory.map((detail, index) => (
                <div key={detail._id} className="work-item">
                    <label>Company:</label>
                    <input
                        type="text"
                        value={detail.company}
                        onChange={(e) =>
                            handleWorkHistoryChange(
                                index,
                                "company",
                                e.target.value
                            )
                        }
                    />

                    <label>Position:</label>
                    <input
                        type="text"
                        value={detail.position}
                        onChange={(e) =>
                            handleWorkHistoryChange(
                                index,
                                "position",
                                e.target.value
                            )
                        }
                    />

                    <label>Website:</label>
                    <input
                        type="text"
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
                </div>
            ))}

            <Button
                variant="contained"
                size="small"
                onClick={updateWorkHistory}
            >
                Update
            </Button>
        </Box>
    );
}
