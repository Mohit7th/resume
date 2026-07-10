import {
    Box,
    Button,
    IconButton,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { Skills } from "../../../types";
import { ResumeUpdater, newId } from "./shared";

const CATEGORY_LABELS: Record<keyof Skills, string> = {
    webTechnologies: "Web technologies",
    browserExtension: "Browser extension",
    businessIntelligence: "Business intelligence",
};

export default function SkillsEditor({
    data,
    update,
}: {
    data: Skills;
    update: ResumeUpdater;
}) {
    const categories = Object.keys(data) as Array<keyof Skills>;

    return (
        <Stack spacing={4}>
            {categories.map((category) => (
                <Box key={category}>
                    <Stack
                        direction="row"
                        sx={{
                            mb: 1.5,
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 700 }}
                        >
                            {CATEGORY_LABELS[category]}
                        </Typography>
                        <Button
                            size="small"
                            startIcon={<AddRoundedIcon />}
                            onClick={() =>
                                update((d) => {
                                    d.skills[category].push({
                                        name: "",
                                        experience: "",
                                        type: "",
                                        image: "",
                                        _id: newId(),
                                    });
                                })
                            }
                        >
                            Add skill
                        </Button>
                    </Stack>
                    <Stack spacing={1.5}>
                        {data[category].map((skill, index) => (
                            <Stack
                                key={skill._id}
                                direction={{ xs: "column", sm: "row" }}
                                spacing={1}
                                sx={{ alignItems: { sm: "center" } }}
                            >
                                <TextField
                                    label="Name"
                                    value={skill.name}
                                    size="small"
                                    fullWidth
                                    onChange={(e) =>
                                        update((d) => {
                                            d.skills[category][index].name =
                                                e.target.value;
                                        })
                                    }
                                />
                                <TextField
                                    label="Experience"
                                    value={skill.experience}
                                    size="small"
                                    sx={{ minWidth: 140 }}
                                    onChange={(e) =>
                                        update((d) => {
                                            d.skills[category][
                                                index
                                            ].experience = e.target.value;
                                        })
                                    }
                                />
                                <TextField
                                    label="Type"
                                    value={skill.type}
                                    size="small"
                                    sx={{ minWidth: 120 }}
                                    onChange={(e) =>
                                        update((d) => {
                                            d.skills[category][index].type =
                                                e.target.value;
                                        })
                                    }
                                />
                                <IconButton
                                    aria-label="Remove skill"
                                    color="error"
                                    onClick={() =>
                                        update((d) => {
                                            d.skills[category].splice(index, 1);
                                        })
                                    }
                                >
                                    <DeleteOutlineRoundedIcon />
                                </IconButton>
                            </Stack>
                        ))}
                    </Stack>
                </Box>
            ))}
        </Stack>
    );
}
