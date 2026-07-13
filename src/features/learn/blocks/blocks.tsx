import { useState } from "react";
import {
    Box,
    Button,
    Collapse,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import LightbulbRoundedIcon from "@mui/icons-material/LightbulbRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { Block } from "../types";
import Markdown from "./Markdown";

type Of<T extends Block["type"]> = Extract<Block, { type: T }>;

export function TextBlock({ block }: { block: Of<"text"> }) {
    return <Markdown>{block.md}</Markdown>;
}

export function CodeBlock({ block }: { block: Of<"code"> }) {
    return (
        <Box sx={{ my: 2 }}>
            {block.caption && (
                <Typography
                    variant="caption"
                    sx={{
                        display: "block",
                        mb: 0.5,
                        color: "text.secondary",
                        fontWeight: 600,
                    }}
                >
                    {block.caption}
                </Typography>
            )}
            <Box
                component="pre"
                sx={{
                    m: 0,
                    p: 2,
                    bgcolor: "#1b2140",
                    color: "#e8ecf8",
                    borderRadius: 2,
                    overflowX: "auto",
                    fontFamily: "monospace",
                    fontSize: "0.82rem",
                    lineHeight: 1.6,
                }}
            >
                <code>{block.code}</code>
            </Box>
        </Box>
    );
}

const CALLOUT_META = {
    tip: { icon: <LightbulbRoundedIcon />, color: "#2c7a5b", bg: "#e6f5ee" },
    note: { icon: <InfoRoundedIcon />, color: "#2d336b", bg: "#eef1fa" },
    warn: { icon: <WarningRoundedIcon />, color: "#9a5b00", bg: "#fdf1df" },
} as const;

export function CalloutBlock({ block }: { block: Of<"callout"> }) {
    const meta = CALLOUT_META[block.variant];
    return (
        <Paper
            variant="outlined"
            sx={{
                my: 2,
                p: 2,
                display: "flex",
                gap: 1.5,
                bgcolor: meta.bg,
                borderColor: "transparent",
                borderLeft: "4px solid",
                borderLeftColor: meta.color,
            }}
        >
            <Box sx={{ color: meta.color, mt: 0.25 }}>{meta.icon}</Box>
            <Box sx={{ "& p": { m: 0 } }}>
                <Markdown>{block.md}</Markdown>
            </Box>
        </Paper>
    );
}

export function QuizBlock({ block }: { block: Of<"quiz"> }) {
    const [selected, setSelected] = useState<number | null>(null);
    const answered = selected !== null;

    return (
        <Paper variant="outlined" sx={{ my: 2, p: 2.5, borderColor: "divider" }}>
            <Typography sx={{ fontWeight: 700, mb: 1.5 }}>
                {block.question}
            </Typography>
            <Stack spacing={1}>
                {block.options.map((option, index) => {
                    const isCorrect = index === block.answer;
                    const isChosen = index === selected;
                    let borderColor = "divider";
                    let icon = null;
                    if (answered && isCorrect) {
                        borderColor = "success.main";
                        icon = (
                            <CheckCircleRoundedIcon
                                fontSize="small"
                                color="success"
                            />
                        );
                    } else if (answered && isChosen && !isCorrect) {
                        borderColor = "error.main";
                        icon = (
                            <CancelRoundedIcon fontSize="small" color="error" />
                        );
                    }
                    return (
                        <Button
                            key={index}
                            variant="outlined"
                            disabled={answered}
                            onClick={() => setSelected(index)}
                            endIcon={icon}
                            sx={{
                                justifyContent: "space-between",
                                textAlign: "left",
                                color: "text.primary",
                                borderColor,
                                "&.Mui-disabled": { borderColor },
                            }}
                        >
                            {option}
                        </Button>
                    );
                })}
            </Stack>
            {answered && block.explain && (
                <Box
                    sx={{
                        mt: 1.5,
                        "& p": { m: 0, fontSize: "0.9rem" },
                    }}
                >
                    <Markdown>{block.explain}</Markdown>
                </Box>
            )}
        </Paper>
    );
}

export function ExerciseBlock({ block }: { block: Of<"exercise"> }) {
    const [show, setShow] = useState(false);
    return (
        <Paper variant="outlined" sx={{ my: 2, p: 2.5, borderColor: "divider" }}>
            <Typography
                variant="overline"
                sx={{ color: "secondary.dark", fontWeight: 700 }}
            >
                Exercise
            </Typography>
            <Typography sx={{ mb: 1.5 }}>{block.prompt}</Typography>
            <Button size="small" onClick={() => setShow((s) => !s)}>
                {show ? "Hide solution" : "Show solution"}
            </Button>
            <Collapse in={show}>
                <Box
                    sx={{
                        mt: 1.5,
                        p: 1.5,
                        borderRadius: 1,
                        bgcolor: "secondary.light",
                        "& p": { m: 0 },
                    }}
                >
                    <Markdown>{block.solution}</Markdown>
                </Box>
            </Collapse>
        </Paper>
    );
}

export function DiagramBlock({ block }: { block: Of<"diagram"> }) {
    return (
        <Box sx={{ my: 2 }}>
            {block.src ? (
                <Box
                    component="img"
                    src={block.src}
                    alt={block.alt}
                    sx={{ maxWidth: "100%", borderRadius: 2 }}
                />
            ) : (
                <Box
                    component="pre"
                    aria-label={block.alt}
                    sx={{
                        m: 0,
                        p: 2,
                        bgcolor: "secondary.light",
                        borderRadius: 2,
                        overflowX: "auto",
                        fontFamily: "monospace",
                        fontSize: "0.8rem",
                        color: "primary.dark",
                    }}
                >
                    <code>{block.mermaid ?? block.alt}</code>
                </Box>
            )}
            <Typography
                variant="caption"
                sx={{ display: "block", mt: 0.5, color: "text.secondary" }}
            >
                {block.alt}
            </Typography>
        </Box>
    );
}
