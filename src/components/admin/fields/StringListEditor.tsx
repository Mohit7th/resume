import { Box, Button, IconButton, Stack, TextField, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

interface StringListEditorProps {
    label: string;
    items: string[];
    onChange: (next: string[]) => void;
    placeholder?: string;
    multiline?: boolean;
    addLabel?: string;
}

/** Edits an array of strings with add / edit / remove controls. */
export default function StringListEditor({
    label,
    items,
    onChange,
    placeholder,
    multiline = false,
    addLabel = "Add item",
}: StringListEditorProps) {
    function updateItem(index: number, value: string) {
        onChange(items.map((item, i) => (i === index ? value : item)));
    }

    function removeItem(index: number) {
        onChange(items.filter((_, i) => i !== index));
    }

    function addItem() {
        onChange([...items, ""]);
    }

    return (
        <Box>
            <Typography
                variant="subtitle2"
                sx={{ mb: 1, color: "text.secondary" }}
            >
                {label}
            </Typography>
            <Stack spacing={1}>
                {items.map((item, index) => (
                    <Stack
                        key={index}
                        direction="row"
                        spacing={1}
                        sx={{ alignItems: "flex-start" }}
                    >
                        <TextField
                            value={item}
                            onChange={(e) => updateItem(index, e.target.value)}
                            placeholder={placeholder}
                            size="small"
                            fullWidth
                            multiline={multiline}
                            minRows={multiline ? 2 : undefined}
                        />
                        <IconButton
                            aria-label="Remove"
                            color="error"
                            onClick={() => removeItem(index)}
                            sx={{ mt: 0.25 }}
                        >
                            <DeleteOutlineRoundedIcon />
                        </IconButton>
                    </Stack>
                ))}
                <Box>
                    <Button
                        size="small"
                        startIcon={<AddRoundedIcon />}
                        onClick={addItem}
                    >
                        {addLabel}
                    </Button>
                </Box>
            </Stack>
        </Box>
    );
}
