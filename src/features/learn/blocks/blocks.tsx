import { Box, Paper, Typography } from "@mui/material";
import LightbulbRoundedIcon from "@mui/icons-material/LightbulbRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
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
