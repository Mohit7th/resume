import { useState, useEffect } from "react";
import { useUserData, useUserDataDispatch } from "../../context/UserContext";
import { TitleHeader } from "../../types";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTheme } from "@mui/material/styles";

export function TitleHeaderBlock() {
    const userdata = useUserData();
    const dispatch = useUserDataDispatch();
        const theme = useTheme();

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
        <Box component="section" sx={{ mt: 8, p: 2, border: "1px dashed grey" }}>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <h2>Title Header</h2>
                </Grid>
                <Grid size={12}>
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
                </Grid>
                <Grid size={12}>
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
                </Grid>
                <Grid size={12}>
                    <Button
                        variant="contained"
                        size="small"
                        endIcon={<SendIcon />}
                        onClick={updateTitleHeader}
                        sx={{
                            backgroundColor: theme.palette.primary.dark
                        }}
                    >
                        Update
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
