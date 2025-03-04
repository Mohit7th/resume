import React from "react";
import { useUserData, useUserDataDispatch } from "../../components/UserContext";

export default function SkillsBlock() {
    const [text, setText] = React.useState("");
    const userdata = useUserData();
    const dispatch = useUserDataDispatch();

    function updateSkills() {
        if (dispatch) {
            dispatch({
                type: "UPDATE_SKILLS",
                payload: {
                    summary: text,
                },
            });
        }
    }

    return (
        <div>
            <label>Skills:</label>
            <input
                type="text"
                value={userdata?.summary.detailed ?? ""}
                onChange={(e) => setText(e.target.value)}
            />
            <button onClick={updateSkills}>Update</button>
        </div>
    );
}
