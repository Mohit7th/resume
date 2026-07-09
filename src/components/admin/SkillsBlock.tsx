import React, { SyntheticEvent, useEffect, useState } from "react";
import { useUserData, useUserDataDispatch } from "../../context/UserContext";
import { Skills, Skill } from "../../types"; // Import correct types
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
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function SkillsBlock() {
    const userdata = useUserData();
    const dispatch = useUserDataDispatch();
    const theme = useTheme();
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

    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    function handleAdd(e: SyntheticEvent) {
        e.stopPropagation();
    }

    return (
        <
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    mt: 4,
                    mb: 2,
                }}
            >
                <Typography component="span" sx={{ flexGrow: 1 }}>
                    <b>Skills</b>
                </Typography>
                <Button
                    variant="contained"
                    size="small"
                    onClick={updateSkills}
                    sx={{
                        backgroundColor: theme.palette.primary.dark,
                    }}
                >
                    Add
                </Button>
            </Box>

            <Grid container spacing={1}>
                {Object.keys(skills).map((skillKey, idx) => (
                    <Grid size={{ xs: 12, md: 6 }} key={skillKey + idx}>
                        <Accordion
                            key={idx}
                            sx={{
                                backgroundColor: theme.palette.primary.light,
                                color: theme.palette.primary.contrastText,
                            }}
                            expanded={expanded === idx.toString()}
                            onChange={handleChange(idx.toString())}
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
                                        <b>{skillKey}</b>
                                    </Typography>
                                    {/* Delete Button (Aligned to the Right) */}
                                    <AddCircleIcon
                                            aria-label="add" onClick={handleAdd}
                                            color="success"
                                        />
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails
                                sx={{
                                    backgroundColor:
                                        theme.palette.primary.contrastText,
                                    color: theme.palette.primary.light,
                                }}
                            >
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
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}
