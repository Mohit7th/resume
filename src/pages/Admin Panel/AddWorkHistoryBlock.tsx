import React from "react";
import { useUserData, useUserDataDispatch } from "../../components/UserContext";

export default function WorkHistoryBlock() {
    const [text, setText] = React.useState("");
    const userdata = useUserData();
    const dispatch = useUserDataDispatch();

    function updateWorkHistory() {
        if (dispatch) {
            dispatch({
                type: "UPDATE_WORK_HISTORY",
                payload: {
                    summary: text,
                },
            });
        }
    }
    return (
        <div className="update-block">
            <label>Work History:</label>
            <input
                type="text"
                value={userdata?.summary.detailed ?? ""}
                onChange={(e) => setText(e.target.value)}
            />
            <button onClick={updateWorkHistory}>Update</button>
        </div>
    );
}
