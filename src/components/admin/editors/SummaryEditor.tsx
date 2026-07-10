import { Stack, TextField, Typography } from "@mui/material";
import { Summary } from "../../../types";
import { ResumeUpdater } from "./shared";

export default function SummaryEditor({
    data,
    update,
}: {
    data: Summary;
    update: ResumeUpdater;
}) {
    return (
        <Stack spacing={2}>
            <TextField
                label="Short summary"
                helperText="Shown next to your years of experience in the hero."
                value={data.short}
                fullWidth
                size="small"
                onChange={(e) =>
                    update((d) => {
                        d.summary.short = e.target.value;
                    })
                }
            />
            <TextField
                label="Detailed summary"
                helperText="Separate paragraphs with a blank line."
                value={data.detailed}
                fullWidth
                multiline
                minRows={6}
                onChange={(e) =>
                    update((d) => {
                        d.summary.detailed = e.target.value;
                    })
                }
            />
            <Typography variant="caption" color="text.secondary">
                {data.detailed.length} characters
            </Typography>
        </Stack>
    );
}
