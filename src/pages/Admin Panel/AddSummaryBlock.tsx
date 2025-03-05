import React from "react";
import { useUserData, useUserDataDispatch } from "../../components/UserContext";

export default function SummaryBlock() {
    const userdata = useUserData();
    const dispatch = useUserDataDispatch();

    const [summary, setSummary] = React.useState(userdata.summary);

    function updateSummary() {
        if (dispatch) {
            dispatch({
                type: "UPDATE_SUMMARY",
                payload: summary,
            });
        }
    }

    function handleSummaryChange(
        _index: number,
        field: string,
        newValue: string
    ) {
        const updatedSummary = {
            ...summary,
            [field]: newValue,
        };

        setSummary(updatedSummary);
    }

    return (
        <div className="update-block">
            <h2>Summary</h2>
            <label>Short:</label>
            <input
                type="text"
                value={summary.short}
                onChange={(e) =>
                    handleSummaryChange(-1, "short", e.target.value)
                }
            />
            <label>Detailed:</label>
            <textarea
                value={summary.detailed}
                onChange={(e) =>
                    handleSummaryChange(-1, "detailed", e.target.value)
                }
            ></textarea>
            <button onClick={updateSummary}>Update</button>
        </div>
    );
}
