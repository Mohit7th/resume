import { useState, useEffect } from "react";
import { useUserData, useUserDataDispatch } from "../../components/UserContext";
import { TitleHeader } from "../../types"; 

export function TitleHeaderBlock() {
    const userdata = useUserData();
    const dispatch = useUserDataDispatch();

    // Ensure titleHeader is initialized correctly
    const [titleHeader, setTitleHeader] = useState<TitleHeader>(
        userdata?.titleHeader || {
            name: "",
            title: "",
            contact: { email: "", phone: "", address: "" },
            image: "",
            socials: [],
            _id: "",
        }
    );

    // Sync local state when context data changes
    useEffect(() => {
        if (userdata?.titleHeader) {
            setTitleHeader(userdata.titleHeader);
        }
    }, [userdata]);

    function updateTitleHeader() {
        if (!dispatch) {
            console.error("Dispatch function is not available");
            return;
        }

        dispatch({
            type: "UPDATE_TITLE_HEADER",
            payload: titleHeader,
        });
    }

    function handleTitleHeaderChange(field: keyof TitleHeader, newValue: string) {
        setTitleHeader((prev) => ({
            ...prev,
            [field]: newValue,
        }));
    }

    return (
        <div className="update-block">
            <h2>Title Header</h2>

            <label>Name:</label>
            <input
                type="text"
                value={titleHeader.name}
                onChange={(e) => handleTitleHeaderChange("name", e.target.value)}
            />

            <label>Title:</label>
            <input
                type="text"
                value={titleHeader.title}
                onChange={(e) => handleTitleHeaderChange("title", e.target.value)}
            />

            <button onClick={updateTitleHeader}>Update</button>
        </div>
    );
}
