import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grow,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
    Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import { Projects as Project } from "../../types/projects";
import { getPublicAssetPath } from "../../utils/publicPath";

const categoryLabels: Record<string, string> = {
    webTechnologies: "Web application",
    browserExtension: "Browser extension",
    businessIntelligence: "Data & BI",
};

interface ProjectModalProps {
    project: Project | null;
    onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
    const hasPublicUrl = project ? /^https?:\/\//.test(project.url) : false;
    const technologies =
        project && project.technologies.length > 0
            ? project.technologies
            : project
            ? [project.techStack]
            : [];

    return (
        <Dialog
            open={Boolean(project)}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            scroll="paper"
            slots={{ transition: Grow }}
            transitionDuration={280}
        >
            {project && (
                <>
                    <Box sx={{ position: "relative" }}>
                        <Box
                            component="img"
                            src={getPublicAssetPath(project.image)}
                            alt=""
                            sx={{
                                width: "100%",
                                height: 220,
                                objectFit: "cover",
                                bgcolor: "secondary.light",
                                display: "block",
                            }}
                        />
                        <IconButton
                            aria-label="Close"
                            onClick={onClose}
                            sx={{
                                position: "absolute",
                                top: 8,
                                right: 8,
                                bgcolor: "rgba(255,255,255,0.9)",
                                "&:hover": { bgcolor: "white" },
                            }}
                        >
                            <CloseRoundedIcon />
                        </IconButton>
                    </Box>

                    <DialogTitle sx={{ pb: 1 }}>
                        <Typography
                            variant="overline"
                            sx={{ color: "secondary.dark", fontWeight: 700 }}
                        >
                            {categoryLabels[project.type] ?? "Project"}
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                            {project.name}
                        </Typography>
                    </DialogTitle>

                    <DialogContent dividers>
                        <Typography color="text.secondary" sx={{ mb: 2 }}>
                            {project.description}
                        </Typography>

                        <Stack
                            direction="row"
                            sx={{ flexWrap: "wrap", gap: 1, mb: 2 }}
                        >
                            {technologies.map((technology) => (
                                <Chip
                                    key={technology}
                                    label={technology}
                                    size="small"
                                    sx={{
                                        bgcolor: "secondary.light",
                                        color: "primary.dark",
                                        fontWeight: 600,
                                    }}
                                />
                            ))}
                        </Stack>

                        {project.responsibilities.length > 0 && (
                            <>
                                <Typography
                                    variant="subtitle2"
                                    sx={{ fontWeight: 700, mb: 0.5 }}
                                >
                                    Highlights
                                </Typography>
                                <List disablePadding>
                                    {project.responsibilities.map((item) => (
                                        <ListItem
                                            key={item}
                                            disableGutters
                                            alignItems="flex-start"
                                            sx={{ py: 0.4 }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 30,
                                                    mt: 0.4,
                                                    color: "secondary.dark",
                                                }}
                                            >
                                                <CheckRoundedIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={item}
                                                slotProps={{
                                                    primary: {
                                                        color: "text.secondary",
                                                    },
                                                }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </>
                        )}
                    </DialogContent>

                    <DialogActions sx={{ px: 3, py: 2 }}>
                        <Button onClick={onClose} color="inherit">
                            Close
                        </Button>
                        {hasPublicUrl && (
                            <Button
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="contained"
                                endIcon={<ArrowOutwardRoundedIcon />}
                            >
                                Visit project
                            </Button>
                        )}
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
}
