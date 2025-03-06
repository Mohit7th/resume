import React, { useEffect, useState } from "react";
import { useUserData, useUserDataDispatch } from "../../context/UserContext";
import { Skills, Skill } from "../../types"; // Import correct types
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Stack, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";

export default function SkillsBlock() {
    const userdata = useUserData();
    const dispatch = useUserDataDispatch();

    // Ensure skills are properly initialized
    const [skills, setSkills] = useState<Skills>(
        userdata?.skills || {
            programmingLanguages: [],
            webTechnologies: [],
            frontendFrameworks: [],
            backendFrameworks: [],
            databases: [],
            tools: [],
            businessIntelligence: [],
        }
    );

    type SkillCategory = keyof Skills; // Ensures only valid categories

    // Sync skills state when userdata changes
    useEffect(() => {
        if (userdata?.skills) {
            setSkills(userdata.skills);
        }
    }, [userdata]);

    function updateSkills() {
        if (!dispatch) {
            console.error("Dispatch function is not available");
            return;
        }

        dispatch({
            type: "UPDATE_SKILLS",
            payload: skills, // ✅ Correctly structured payload
        });
    }

    function handleSkillsChange(
        index: number,
        domain: SkillCategory,
        field: keyof Skill, // ✅ Ensures only valid skill fields
        newValue: string
    ) {
        setSkills((prevSkills) => ({
            ...prevSkills,
            [domain]: prevSkills[domain].map((skill, i) =>
                i === index ? { ...skill, [field]: newValue } : skill
            ),
        }));
    }

    return (
        <Box component="section" sx={{ m: 5, p: 2, border: "1px dashed grey" }}>
            <Grid container justifyContent="space-between">
                <Grid size={6}>
                    <h2>Skills</h2>
                </Grid>
                <Grid size={6}>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={updateSkills}
                    >
                        Update
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                {Object.keys(skills).map((skillKey) => (
                    <Grid size={{ xs: 12, md: 6 }} key={skillKey}>
                        <h3>{skillKey.replace("-", " ")}</h3>
                        {skills[skillKey as SkillCategory].map(
                            (tech, index) => (
                                <Stack
                                    direction="row"
                                    spacing={2}
                                    key={tech._id}
                                >
                                    <TextField
                                        id="outlined-basic"
                                        label="Name:"
                                        variant="outlined"
                                        margin="dense"
                                        value={tech.name}
                                        onChange={(e) =>
                                            handleSkillsChange(
                                                index,
                                                skillKey as SkillCategory,
                                                "name",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <TextField
                                        id="outlined-number"
                                        label="Experience"
                                        type="number"
                                        margin="dense"
                                        slotProps={{
                                            inputLabel: {
                                                shrink: true,
                                            },
                                        }}
                                    />
                                    <IconButton
                                        aria-label="delete"
                                        color="error"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Stack>
                            )
                        )}
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
