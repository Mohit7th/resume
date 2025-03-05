import React from "react";
import { useUserData, useUserDataDispatch } from "../../components/UserContext";

export default function SummaryBlock() {
    const [text, setText] = React.useState("");
    const userdata = useUserData();
    const dispatch = useUserDataDispatch();

    function updateSummary() {
        if (dispatch) {
            dispatch({
                type: "UPDATE_SUMMARY",
                payload: {
                    summary: text,
                },
            });
        }
    }

    return (
        <div className="update-block">
            <label>Summary:</label>
            <input
                type="text"
                value={userdata?.summary.detailed ?? ""}
                onChange={(e) => setText(e.target.value)}
            />
            <button onClick={updateSummary}>Update</button>
        </div>
    );
}
