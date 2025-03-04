import React from "react";
import { useUserData, useUserDataDispatch } from "../../components/UserContext";

export default function ProjectsBlock() {
    const [text, setText] = React.useState("");
    const userdata = useUserData();
    const dispatch = useUserDataDispatch();

    function updateProjects() {
        if (dispatch) {
            dispatch({
                type: "UPDATE_PROJECTS",
                payload: {
                    summary: text,
                },
            });
        }
    }

    return (
        <div>
            <label>Projects:</label>
            <input
                type="text"
                value={userdata?.summary.detailed ?? ""}
                onChange={(e) => setText(e.target.value)}
            />
            <button onClick={updateProjects}>Update</button>
        </div>
    );
}
