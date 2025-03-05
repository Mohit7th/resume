import { useState, useEffect } from "react";
import { useUserData, useUserDataDispatch } from "../../components/UserContext";

export function TitleHeaderBlock() {
    const [text, setText] = useState("");
    const userdata = useUserData();
    const dispatch = useUserDataDispatch();

    useEffect(() => {
        if (userdata) setText(userdata.titleHeader.title);
    }, [userdata]);

    function updateTitleHeader() {
        dispatch({
            type: "UPDATE_TITLE_HEADER",
            payload: {
                title: text,
            },
        });
    }

    return (
        <div className="update-block">
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
