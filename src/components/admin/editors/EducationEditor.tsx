import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { Education } from "../../../types";
import { ResumeUpdater, newId } from "./shared";

export default function EducationEditor({
    data,
    update,
}: {
    data: Education[];
    update: ResumeUpdater;
}) {
    return (
        <Stack spacing={2.5}>
            <Box>
                <Button
                    variant="outlined"
                    size="small"
                    startIcon={<AddRoundedIcon />}
                    onClick={() =>
                        update((d) => {
                            d.education.push({
                                degree: "",
                                institution: "",
                                startYear: "",
                                endYear: "",
                                _id: newId(),
                            });
                        })
                    }
                >
                    Add education
                </Button>
            </Box>

            {data.map((edu, index) => (
                <Stack key={edu._id} spacing={1}>
                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={1}
                        sx={{ alignItems: { sm: "center" } }}
                    >
                        <TextField
                            label="Degree"
                            value={edu.degree}
                            size="small"
                            fullWidth
                            onChange={(e) =>
                                update((d) => {
                                    d.education[index].degree = e.target.value;
                                })
                            }
                        />
                        <IconButton
                            aria-label="Remove education"
                            color="error"
                            onClick={() =>
                                update((d) => {
                                    d.education.splice(index, 1);
                                })
                            }
                        >
                            <DeleteOutlineRoundedIcon />
                        </IconButton>
                    </Stack>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                        <TextField
                            label="Institution"
                            value={edu.institution}
                            size="small"
                            fullWidth
                            onChange={(e) =>
                                update((d) => {
                                    d.education[index].institution =
                                        e.target.value;
                                })
                            }
                        />
                        <TextField
                            label="Start year"
                            value={edu.startYear}
                            size="small"
                            sx={{ minWidth: 120 }}
                            onChange={(e) =>
                                update((d) => {
                                    d.education[index].startYear =
                                        e.target.value;
                                })
                            }
                        />
                        <TextField
                            label="End year"
                            value={edu.endYear}
                            size="small"
                            sx={{ minWidth: 120 }}
                            onChange={(e) =>
                                update((d) => {
                                    d.education[index].endYear = e.target.value;
                                })
                            }
                        />
                    </Stack>
                </Stack>
            ))}
        </Stack>
    );
}
