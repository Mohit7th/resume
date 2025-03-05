import { useState, useEffect } from "react";
import { useUserData, useUserDataDispatch } from "../../context/UserContext";
import { Summary } from "../../types"; // Import the correct type
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

export default function SummaryBlock() {
    const userdata = useUserData();
    const dispatch = useUserDataDispatch();

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
        <div className="update-block">
            <h2>Summary</h2>

            <TextField fullWidth 
                label="Short Summary: "
                multiline
                rows={4}
                value={summary.short}
                margin="dense"
                defaultValue="Default Value"
                onChange={(e) => handleSummaryChange("short", e.target.value)}
            />

            <TextField fullWidth 
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
            <Button variant="contained" size="small" onClick={updateSummary}>
                Update
            </Button>
        </div>
    );
}
