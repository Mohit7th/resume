import { useState, useEffect } from "react";
import { useUserData, useUserDataDispatch } from "../../context/UserContext";
import { TitleHeader } from "../../types";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";

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

    function handleTitleHeaderChange(
        field: keyof TitleHeader,
        newValue: string
    ) {
        setTitleHeader((prev) => ({
            ...prev,
            [field]: newValue,
        }));
    }

    return (
        <Box component="section" sx={{ m:5, p: 2, border: "1px dashed grey" }}>
            <h2>Title Header</h2>

            <TextField
                id="outlined-basic"
                label="Name:"
                variant="outlined"
                size="small"
                value={titleHeader.name}
                onChange={(e) =>
                    handleTitleHeaderChange("name", e.target.value)
                }
            />

            <TextField
                id="outlined-basic"
                label="Title:"
                variant="outlined"
                size="small"
                value={titleHeader.title}
                onChange={(e) =>
                    handleTitleHeaderChange("title", e.target.value)
                }
            />

            <Button
                variant="contained"
                size="small"
                endIcon={<SendIcon />}
                onClick={updateTitleHeader}
            >
                Update
            </Button>
        </Box>
    );
}
