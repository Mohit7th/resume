import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    FormControlLabel,
    Grid,
    IconButton,
    MenuItem,
    Stack,
    Switch,
    TextField,
    Typography,
} from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { Projects } from "../../../types";
import { ResumeUpdater, newId } from "./shared";
import StringListEditor from "../fields/StringListEditor";

const PROJECT_TYPES = [
    { value: "webTechnologies", label: "Web application" },
    { value: "browserExtension", label: "Browser extension" },
    { value: "businessIntelligence", label: "Data & BI" },
];

export default function ProjectsEditor({
    data,
    update,
}: {
    data: Projects[];
    update: ResumeUpdater;
}) {
    function addProject() {
        update((d) => {
            d.projects.push({
                name: "New project",
                description: "",
                technologies: [],
                url: "",
                type: "webTechnologies",
                image: "",
                techStack: "",
                responsibilities: [],
                _id: newId(),
            });
        });
    }

    return (
        <Stack spacing={2}>
            <Box>
                <Button
                    variant="outlined"
                    size="small"
                    startIcon={<AddRoundedIcon />}
                    onClick={addProject}
                >
                    Add project
                </Button>
            </Box>

            {data.map((project, index) => (
                <Accordion key={project._id} disableGutters>
                    <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
                        <Typography sx={{ fontWeight: 600, flexGrow: 1 }}>
                            {project.name || "Untitled project"}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Stack spacing={2}>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        label="Name"
                                        value={project.name}
                                        fullWidth
                                        size="small"
                                        onChange={(e) =>
                                            update((d) => {
                                                d.projects[index].name =
                                                    e.target.value;
                                            })
                                        }
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        select
                                        label="Category"
                                        value={project.type}
                                        fullWidth
                                        size="small"
                                        onChange={(e) =>
                                            update((d) => {
                                                d.projects[index].type =
                                                    e.target.value;
                                            })
                                        }
                                    >
                                        {PROJECT_TYPES.map((option) => (
                                            <MenuItem
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        label="URL"
                                        value={project.url}
                                        fullWidth
                                        size="small"
                                        onChange={(e) =>
                                            update((d) => {
                                                d.projects[index].url =
                                                    e.target.value;
                                            })
                                        }
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        label="Tech stack (short label)"
                                        value={project.techStack}
                                        fullWidth
                                        size="small"
                                        onChange={(e) =>
                                            update((d) => {
                                                d.projects[index].techStack =
                                                    e.target.value;
                                            })
                                        }
                                    />
                                </Grid>
                                <Grid size={12}>
                                    <TextField
                                        label="Image URL or /assets path"
                                        value={project.image}
                                        fullWidth
                                        size="small"
                                        onChange={(e) =>
                                            update((d) => {
                                                d.projects[index].image =
                                                    e.target.value;
                                            })
                                        }
                                    />
                                </Grid>
                                <Grid size={12}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={Boolean(project.ai)}
                                                onChange={(e) =>
                                                    update((d) => {
                                                        d.projects[index].ai =
                                                            e.target.checked;
                                                    })
                                                }
                                            />
                                        }
                                        label="Uses AI (shows in the highlighted AI filter)"
                                    />
                                </Grid>
                                <Grid size={12}>
                                    <TextField
                                        label="Description"
                                        value={project.description}
                                        fullWidth
                                        multiline
                                        minRows={3}
                                        onChange={(e) =>
                                            update((d) => {
                                                d.projects[index].description =
                                                    e.target.value;
                                            })
                                        }
                                    />
                                </Grid>
                            </Grid>

                            <StringListEditor
                                label="Technologies"
                                items={project.technologies}
                                addLabel="Add technology"
                                onChange={(next) =>
                                    update((d) => {
                                        d.projects[index].technologies = next;
                                    })
                                }
                            />

                            <StringListEditor
                                label="Responsibilities / highlights"
                                items={project.responsibilities}
                                multiline
                                addLabel="Add highlight"
                                onChange={(next) =>
                                    update((d) => {
                                        d.projects[index].responsibilities =
                                            next;
                                    })
                                }
                            />

                            <Box>
                                <Button
                                    color="error"
                                    size="small"
                                    startIcon={<DeleteOutlineRoundedIcon />}
                                    onClick={() =>
                                        update((d) => {
                                            d.projects.splice(index, 1);
                                        })
                                    }
                                >
                                    Delete project
                                </Button>
                            </Box>
                        </Stack>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Stack>
    );
}
