import { useState, useEffect } from "react";
import { useUserData, useUserDataDispatch } from "../../components/UserContext";
import { Summary } from "../../types";

export default function SummaryBlock() {
    const userdata = useUserData();
    const dispatch = useUserDataDispatch();

    const [summary, setSummary] = useState<Summary>(
        userdata?.summary || {
            detailed: "",
            short: "",
            _id: "",
        }
    );

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
            <label>Short:</label>
            <input
                type="text"
                value={summary.short}
                onChange={(e) => handleSummaryChange("short", e.target.value)}
            />
            <label>Detailed:</label>
            <textarea
                value={summary.detailed}
                onChange={(e) =>
                    handleSummaryChange("detailed", e.target.value)
                }
            ></textarea>
            <button onClick={updateSummary}>Update</button>
        </div>
    );
}
