import React, { SyntheticEvent, useEffect, useState } from "react";
import { Projects } from "../../types"; // Import correct types
import { useUserData, useUserDataDispatch } from "../../context/UserContext";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTheme } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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

    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    function handleDelete(e: SyntheticEvent) {
        e.stopPropagation();
    }

    return (
        <>
            <Grid
                container
                spacing={2}
                sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
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
                        Add
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid size={12}>
                    {userdata.projects.map((project: any, index: number) => (
                        <Accordion
                            key={project._id}
                            sx={{
                                backgroundColor: theme.palette.primary.dark,
                                color: theme.palette.primary.contrastText,
                            }}
                            expanded={expanded === project._id}
                            onChange={handleChange(project._id)}
                        >
                            <AccordionSummary
                                expandIcon={
                                    <ExpandMoreIcon
                                        sx={{
                                            color: theme.palette.primary
                                                .contrastText,
                                        }}
                                    />
                                }
                                aria-controls="panel1-content"
                                sx={{
                                    color: theme.palette.primary.contrastText,
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        width: "100%",
                                    }}
                                >
                                    <Typography
                                        component="span"
                                        sx={{ flexGrow: 1 }}
                                    >
                                        <b>{project.name}</b>
                                    </Typography>
                                    {/* Delete Button (Aligned to the Right) */}
                                    <IconButton
                                        onClick={handleDelete}
                                        size="small"
                                    >
                                        <DeleteIcon
                                            sx={{
                                                color: theme.palette.primary
                                                    .light,
                                            }}
                                        />
                                    </IconButton>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails
                                sx={{
                                    backgroundColor:
                                        theme.palette.primary.light,
                                    color: theme.palette.primary.light,
                                }}
                            >
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
                                </Stack>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Grid>
            </Grid>
        </>
    );
}
