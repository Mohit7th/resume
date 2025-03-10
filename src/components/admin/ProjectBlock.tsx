import React, { useEffect, useState } from "react";
import { Projects } from "../../types"; // Import correct types
import { useUserData, useUserDataDispatch } from "../../context/UserContext";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Stack, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTheme } from "@mui/material/styles";

export default function ProjectsBlock() {
    const userdata = useUserData();
    const dispatch = useUserDataDispatch();
    const theme = useTheme();

    // Ensure projects are properly initialized
    const [projects, setProjects] = useState<Projects[]>(
        userdata?.projects || []
    );

    // Sync projects state when userdata changes
    useEffect(() => {
        if (userdata?.projects) {
            setProjects(userdata.projects);
        }
    }, [userdata]);

    function updateProjects() {
        if (!dispatch) {
            console.error("Dispatch function is not available");
            return;
        }

        dispatch({
            type: "UPDATE_PROJECTS",
            payload: projects, // ✅ Correctly structured payload
        });
    }

    function handleProjectChange(
        index: number,
        field: keyof Projects, // ✅ Ensures only valid project fields
        newValue: string
    ) {
        setProjects((prevProjects) =>
            prevProjects.map((project: any, i: number) =>
                i === index ? { ...project, [field]: newValue } : project
            )
        );
    }

    return (
        <Box
            component="section"
            sx={{ mt: 5, p: 2, border: "1px dashed grey" }}
        >
            <Grid container spacing={2}>
                <Grid size={6}>
                    <h2>Projects</h2>
                </Grid>
                <Grid size={6}>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={updateProjects}
                        sx={{
                            backgroundColor: theme.palette.primary.dark,
                        }}
                    >
                        Update
                    </Button>
                </Grid>
                {userdata.projects.map((project: any, index: number) => (
                    <Grid size={{ xs: 12, md: 6 }} key={index}>
                        {
                            <Stack spacing={2} key={project._id}>
                                <TextField
                                    id="outlined-basic"
                                    label="Project Name:"
                                    variant="outlined"
                                    size="small"
                                    value={project.name}
                                    onChange={(e) =>
                                        handleProjectChange(
                                            index,
                                            "name",
                                            e.target.value
                                        )
                                    }
                                />

                                <TextField
                                    id="outlined-basic"
                                    label="URL:"
                                    variant="outlined"
                                    size="small"
                                    value={project.url}
                                    onChange={(e) =>
                                        handleProjectChange(
                                            index,
                                            "url",
                                            e.target.value
                                        )
                                    }
                                />

                                <TextField
                                    fullWidth
                                    label="Description: "
                                    multiline
                                    rows={4}
                                    value={project.description}
                                    margin="dense"
                                    defaultValue="Default Value"
                                    onChange={(e) =>
                                        handleProjectChange(
                                            index,
                                            "description",
                                            e.target.value
                                        )
                                    }
                                />
                                <IconButton aria-label="delete" color="error">
                                    <DeleteIcon />
                                </IconButton>
                            </Stack>
                        }
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
