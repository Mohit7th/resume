import React, { useEffect, useState } from "react";
import { Projects, Project } from "../../types"; // Import correct types
import { useUserData, useUserDataDispatch } from "../../context/UserContext";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/material";

export default function ProjectsBlock() {
    const userdata = useUserData();
    const dispatch = useUserDataDispatch();

    // Ensure projects are properly initialized
    const [projects, setProjects] = useState<Projects>(
        userdata?.projects || { professional: [], personalProjects: [] }
    );

    type ProjectCategory = keyof Projects; // Ensures only valid categories

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
        category: ProjectCategory,
        field: keyof Project, // ✅ Ensures only valid project fields
        newValue: string
    ) {
        setProjects((prevProjects) => ({
            ...prevProjects,
            [category]: prevProjects[category].map((project, i) =>
                i === index ? { ...project, [field]: newValue } : project
            ),
        }));
    }

    return (
        <Box component="section" sx={{ m: 5, p: 2, border: "1px dashed grey" }}>
            <h2>Projects</h2>

            {Object.keys(projects).map((categoryKey) => (
                <div key={categoryKey}>
                    <h3>{categoryKey.replace("-", " ")}</h3>
                    {projects[categoryKey as ProjectCategory].map(
                        (project, index) => (
                            <div key={project._id} className="project-item">
                                <label>Project Name:</label>
                                <input
                                    type="text"
                                    value={project.name}
                                    onChange={(e) =>
                                        handleProjectChange(
                                            index,
                                            categoryKey as ProjectCategory,
                                            "name",
                                            e.target.value
                                        )
                                    }
                                />

                                <label>Description:</label>
                                <textarea
                                    value={project.description}
                                    onChange={(e) =>
                                        handleProjectChange(
                                            index,
                                            categoryKey as ProjectCategory,
                                            "description",
                                            e.target.value
                                        )
                                    }
                                />

                                <label>URL:</label>
                                <input
                                    type="text"
                                    value={project.url}
                                    onChange={(e) =>
                                        handleProjectChange(
                                            index,
                                            categoryKey as ProjectCategory,
                                            "url",
                                            e.target.value
                                        )
                                    }
                                />

                                <IconButton aria-label="delete" color="error">
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        )
                    )}
                </div>
            ))}

            <Button variant="contained" size="small" onClick={updateProjects}>
                Update
            </Button>
        </Box>
    );
}
