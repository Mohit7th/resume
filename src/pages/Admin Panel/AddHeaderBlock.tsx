import { useState, useEffect } from "react";
import { useUserData, useUserDataDispatch } from "../../components/UserContext";

export function TitleHeaderBlock() {
    const userdata = useUserData();
    const dispatch = useUserDataDispatch();

    const [titleHeader, setTitleHeader] = useState(userdata.titleHeader);

    function updateTitleHeader() {
        dispatch({
            type: "UPDATE_TITLE_HEADER",
            payload: titleHeader,
        });
    }

    function handleTitleHeaderChange(
        _index: number,
        field: string,
        newValue: string
    ) {
        const updatedTitleHeader = {
            ...titleHeader,
            [field]: newValue,
        };

        setTitleHeader(updatedTitleHeader);
    }

    return (
        <div className="update-block">
            <h2>Title Header</h2>
            <label>Name:</label>
            <input
                type="text"
                value={titleHeader.name}
                onChange={(e) => handleTitleHeaderChange(-1, "name",e.target.value)}
            />

            <label>Title:</label>
            <input
                type="text"
                value={titleHeader.title}
                onChange={(e) => handleTitleHeaderChange(-1, "title", e.target.value)}
            />
            <button onClick={updateTitleHeader}>Update</button>
        </div>
    );
}
