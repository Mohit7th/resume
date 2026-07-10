import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    FormControlLabel,
    Grid,
    Stack,
    Switch,
    TextField,
    Typography,
} from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { WorkHistory } from "../../../types";
import { ResumeUpdater, newId } from "./shared";
import StringListEditor from "../fields/StringListEditor";

/** Normalise a stored date string to the yyyy-MM-dd a date input expects. */
function toDateInput(value: string | null): string {
    if (!value) return "";
    return value.slice(0, 10);
}

export default function WorkHistoryEditor({
    data,
    update,
}: {
    data: WorkHistory[];
    update: ResumeUpdater;
}) {
    function addRole() {
        update((d) => {
            d.workHistory.push({
                company: "New company",
                position: "",
                startDate: "",
                endDate: null,
                website: "",
                responsibilities: [],
                image: "",
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
                    onClick={addRole}
                >
                    Add role
                </Button>
            </Box>

            {data.map((role, index) => {
                const isPresent = role.endDate === null;

                return (
                    <Accordion key={role._id} disableGutters>
                        <AccordionSummary
                            expandIcon={<ExpandMoreRoundedIcon />}
                        >
                            <Typography sx={{ fontWeight: 600, flexGrow: 1 }}>
                                {role.company || "Untitled role"}
                                {role.position ? ` — ${role.position}` : ""}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack spacing={2}>
                                <Grid container spacing={2}>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            label="Company"
                                            value={role.company}
                                            fullWidth
                                            size="small"
                                            onChange={(e) =>
                                                update((d) => {
                                                    d.workHistory[
                                                        index
                                                    ].company = e.target.value;
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            label="Position"
                                            value={role.position}
                                            fullWidth
                                            size="small"
                                            onChange={(e) =>
                                                update((d) => {
                                                    d.workHistory[
                                                        index
                                                    ].position = e.target.value;
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid size={12}>
                                        <TextField
                                            label="Company website"
                                            value={role.website}
                                            fullWidth
                                            size="small"
                                            onChange={(e) =>
                                                update((d) => {
                                                    d.workHistory[
                                                        index
                                                    ].website = e.target.value;
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 4 }}>
                                        <TextField
                                            label="Start date"
                                            type="date"
                                            value={toDateInput(role.startDate)}
                                            fullWidth
                                            size="small"
                                            slotProps={{
                                                inputLabel: { shrink: true },
                                            }}
                                            onChange={(e) =>
                                                update((d) => {
                                                    d.workHistory[
                                                        index
                                                    ].startDate =
                                                        e.target.value;
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 4 }}>
                                        <TextField
                                            label="End date"
                                            type="date"
                                            value={toDateInput(role.endDate)}
                                            fullWidth
                                            size="small"
                                            disabled={isPresent}
                                            slotProps={{
                                                inputLabel: { shrink: true },
                                            }}
                                            onChange={(e) =>
                                                update((d) => {
                                                    d.workHistory[
                                                        index
                                                    ].endDate =
                                                        e.target.value || null;
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid
                                        size={{ xs: 12, sm: 4 }}
                                        sx={{ display: "flex", alignItems: "center" }}
                                    >
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={isPresent}
                                                    onChange={(e) =>
                                                        update((d) => {
                                                            d.workHistory[
                                                                index
                                                            ].endDate = e.target
                                                                .checked
                                                                ? null
                                                                : new Date()
                                                                      .toISOString()
                                                                      .slice(
                                                                          0,
                                                                          10
                                                                      );
                                                        })
                                                    }
                                                />
                                            }
                                            label="Current role"
                                        />
                                    </Grid>
                                </Grid>

                                <StringListEditor
                                    label="Responsibilities"
                                    items={role.responsibilities}
                                    multiline
                                    addLabel="Add responsibility"
                                    onChange={(next) =>
                                        update((d) => {
                                            d.workHistory[
                                                index
                                            ].responsibilities = next;
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
                                                d.workHistory.splice(index, 1);
                                            })
                                        }
                                    >
                                        Delete role
                                    </Button>
                                </Box>
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                );
            })}
        </Stack>
    );
}
