import React, { useEffect, useState } from "react";
import { useUserData, useUserDataDispatch } from "../../context/UserContext";
import { Skills, Skill } from "../../types"; // Import correct types
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { InputAdornment, TextField } from "@mui/material";

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
        <div className="update-block">
            <h2>Skills</h2>

            {Object.keys(skills).map((skillKey) => (
                <div key={skillKey}>
                    <h3>{skillKey.replace("-", " ")}</h3>
                    {skills[skillKey as SkillCategory].map((tech, index) => (
                        <div key={tech._id} className="skill-item">
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
                                label="Experience"
                                id="outlined-start-adornment"
                                type="number"
                                margin="dense"
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="start">
                                                Years
                                            </InputAdornment>
                                        ),
                                    },
                                }}
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
                            <IconButton aria-label="delete" color="error">
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    ))}
                </div>
            ))}

            <Button variant="contained" size="small" onClick={updateSkills}>
                Update
            </Button>
        </div>
    );
}
