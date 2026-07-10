import {
    Box,
    Button,
    Grid,
    IconButton,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { TitleHeader } from "../../../types";
import { ResumeUpdater, newId } from "./shared";

export default function HeaderEditor({
    data,
    update,
}: {
    data: TitleHeader;
    update: ResumeUpdater;
}) {
    return (
        <Stack spacing={3}>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        label="Full name"
                        value={data.name}
                        fullWidth
                        size="small"
                        onChange={(e) =>
                            update((d) => {
                                d.titleHeader.name = e.target.value;
                            })
                        }
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        label="Title / role"
                        value={data.title}
                        fullWidth
                        size="small"
                        onChange={(e) =>
                            update((d) => {
                                d.titleHeader.title = e.target.value;
                            })
                        }
                    />
                </Grid>
                <Grid size={12}>
                    <TextField
                        label="Avatar image URL"
                        value={data.image}
                        fullWidth
                        size="small"
                        onChange={(e) =>
                            update((d) => {
                                d.titleHeader.image = e.target.value;
                            })
                        }
                    />
                </Grid>
            </Grid>

            <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
                    Contact
                </Typography>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                            label="Email"
                            value={data.contact.email}
                            fullWidth
                            size="small"
                            onChange={(e) =>
                                update((d) => {
                                    d.titleHeader.contact.email = e.target.value;
                                })
                            }
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                            label="Phone"
                            value={data.contact.phone}
                            fullWidth
                            size="small"
                            onChange={(e) =>
                                update((d) => {
                                    d.titleHeader.contact.phone = e.target.value;
                                })
                            }
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                            label="Location"
                            value={data.contact.address}
                            fullWidth
                            size="small"
                            onChange={(e) =>
                                update((d) => {
                                    d.titleHeader.contact.address =
                                        e.target.value;
                                })
                            }
                        />
                    </Grid>
                </Grid>
            </Box>

            <Box>
                <Stack
                    direction="row"
                    sx={{
                        mb: 1.5,
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography variant="subtitle2">Social links</Typography>
                    <Button
                        size="small"
                        startIcon={<AddRoundedIcon />}
                        onClick={() =>
                            update((d) => {
                                d.titleHeader.socials.push({
                                    name: "",
                                    url: "",
                                    _id: newId(),
                                });
                            })
                        }
                    >
                        Add link
                    </Button>
                </Stack>
                <Stack spacing={1.5}>
                    {data.socials.map((social, index) => (
                        <Stack
                            key={social._id}
                            direction={{ xs: "column", sm: "row" }}
                            spacing={1}
                            sx={{ alignItems: { sm: "center" } }}
                        >
                            <TextField
                                label="Label"
                                value={social.name}
                                size="small"
                                sx={{ minWidth: 140 }}
                                onChange={(e) =>
                                    update((d) => {
                                        d.titleHeader.socials[index].name =
                                            e.target.value;
                                    })
                                }
                            />
                            <TextField
                                label="URL"
                                value={social.url}
                                size="small"
                                fullWidth
                                onChange={(e) =>
                                    update((d) => {
                                        d.titleHeader.socials[index].url =
                                            e.target.value;
                                    })
                                }
                            />
                            <IconButton
                                aria-label="Remove link"
                                color="error"
                                onClick={() =>
                                    update((d) => {
                                        d.titleHeader.socials.splice(index, 1);
                                    })
                                }
                            >
                                <DeleteOutlineRoundedIcon />
                            </IconButton>
                        </Stack>
                    ))}
                </Stack>
            </Box>
        </Stack>
    );
}
