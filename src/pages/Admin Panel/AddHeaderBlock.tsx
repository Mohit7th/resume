import { useState } from "react";
import { useUserData, useUserDataDispatch } from "../../components/UserContext";

export function TitleHeaderBlock() {
    const [text, setText] = useState("");
    const userdata = useUserData();
    const dispatch = useUserDataDispatch();

    function updateTitleHeader() {
        if (dispatch) {
            dispatch({
                type: "UPDATE_TITLE_HEADER",
                payload: {
                    title: text,
                },
            });
        }
    }

    return (
        <div>
            <label>Title:</label>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button onClick={updateTitleHeader}>Update</button>
        </div>
    );
}
