import { useMemo, useState } from "react";
import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Chip,
    Collapse,
    Fade,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import Grid from "@mui/material/Grid";
import { useUserData } from "../../context/UserContext";
import { Projects as Project } from "../../types/projects";
import { getPublicAssetPath } from "../../utils/publicPath";
import ProjectModal from "../ui/ProjectModal";

const categoryLabels: Record<string, string> = {
    webTechnologies: "Web application",
    browserExtension: "Browser extension",
    businessIntelligence: "Data & BI",
};

const FILTERS = [
    { value: "ai", label: "AI", highlight: true },
    { value: "webTechnologies", label: "Web apps" },
    { value: "browserExtension", label: "Extensions" },
    { value: "businessIntelligence", label: "Data & BI" },
    { value: "all", label: "All" },
];

const AI_GRADIENT = "linear-gradient(135deg, #7886C7 0%, #2D336B 100%)";

const PREVIEW_COUNT = 3;

export default function Projects() {
    const { projects } = useUserData();
    const [filter, setFilter] = useState("all");
    const [showAll, setShowAll] = useState(false);
    const [selected, setSelected] = useState<Project | null>(null);

    const matchingProjects = useMemo(() => {
        if (filter === "all") return projects;
        if (filter === "ai") return projects.filter((project) => project.ai);
        return projects.filter((project) => project.type === filter);
    }, [projects, filter]);

    const previewProjects = matchingProjects.slice(0, PREVIEW_COUNT);
    const extraProjects = matchingProjects.slice(PREVIEW_COUNT);
    const hasMore = extraProjects.length > 0;

    // `staggerIndex` drives a small transition-delay so cards fade in one after
    // another. Keying the grids by `filter` remounts them, so the fade replays
    // whenever the category changes.
    function renderCard(project: Project, staggerIndex: number) {
        const technologies =
            project.technologies.length > 0
                ? project.technologies.slice(0, 3)
                : [project.techStack];

        return (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={project._id}>
                <Fade
                    in
                    appear
                    timeout={450}
                    style={{ transitionDelay: `${staggerIndex * 70}ms` }}
                >
                    <Card
                        sx={{
                            height: "100%",
                            overflow: "hidden",
                            bgcolor: "background.paper",
                            transition:
                                "transform 180ms ease, box-shadow 180ms ease",
                            "&:hover": {
                                transform: "translateY(-4px)",
                                boxShadow: "0 20px 50px rgba(23, 32, 74, 0.13)",
                            },
                        }}
                    >
                        <CardActionArea
                            onClick={() => setSelected(project)}
                            aria-label={`${project.name}, view details`}
                            sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "stretch",
                            }}
                        >
                            <Box sx={{ position: "relative", width: "100%" }}>
                                <CardMedia
                                    component="img"
                                    image={getPublicAssetPath(project.image)}
                                    alt=""
                                    loading="lazy"
                                    sx={{
                                        height: 180,
                                        objectFit: "cover",
                                        bgcolor: "secondary.light",
                                    }}
                                />
                                {project.ai && (
                                    <Chip
                                        icon={<AutoAwesomeRoundedIcon />}
                                        label="AI"
                                        size="small"
                                        sx={{
                                            position: "absolute",
                                            top: 12,
                                            right: 12,
                                            fontWeight: 700,
                                            color: "#fff",
                                            background: AI_GRADIENT,
                                            boxShadow:
                                                "0 6px 16px rgba(23,32,74,0.35)",
                                            "& .MuiChip-icon": {
                                                color: "#fff",
                                            },
                                        }}
                                    />
                                )}
                            </Box>
                            <CardContent
                                sx={{
                                    p: 3,
                                    display: "flex",
                                    flexDirection: "column",
                                    flexGrow: 1,
                                }}
                            >
                                <Typography
                                    variant="overline"
                                    sx={{
                                        color: "secondary.dark",
                                        fontWeight: 700,
                                        letterSpacing: "0.08em",
                                        mb: 1,
                                    }}
                                >
                                    {categoryLabels[project.type] ?? "Project"}
                                </Typography>
                                <Typography
                                    component="h3"
                                    variant="h6"
                                    sx={{ fontWeight: 700, mb: 1 }}
                                >
                                    {project.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        mb: 2,
                                        flexGrow: 1,
                                        display: "-webkit-box",
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                    }}
                                >
                                    {project.description}
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 1,
                                    }}
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
                                </Box>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Fade>
            </Grid>
        );
    }

    return (
        <>
            <ToggleButtonGroup
                value={filter}
                exclusive
                size="small"
                onChange={(_event, next) => {
                    if (next !== null) {
                        setFilter(next);
                        setShowAll(false);
                    }
                }}
                aria-label="Filter projects by category"
                sx={{
                    mb: 4,
                    flexWrap: "wrap",
                    "& .MuiToggleButton-root": {
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: "999px !important",
                        px: 2,
                        mr: 1,
                        mb: 1,
                        textTransform: "none",
                        transition:
                            "background-color 160ms ease, color 160ms ease",
                    },
                }}
            >
                {FILTERS.map((option) => (
                    <ToggleButton
                        key={option.value}
                        value={option.value}
                        sx={
                            option.highlight
                                ? {
                                      gap: 0.5,
                                      color: "primary.main",
                                      fontWeight: 700,
                                      borderColor: "primary.main !important",
                                      bgcolor: "secondary.light",
                                      "&.Mui-selected": {
                                          color: "#fff",
                                          background: AI_GRADIENT,
                                          borderColor: "transparent !important",
                                          "&:hover": { background: AI_GRADIENT },
                                      },
                                  }
                                : undefined
                        }
                    >
                        {option.highlight && (
                            <AutoAwesomeRoundedIcon fontSize="small" />
                        )}
                        {option.label}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>

            {/* Always-visible preview row. `key={filter}` replays the fade on
                category switch. */}
            <Grid container spacing={3} key={filter}>
                {previewProjects.map((project, index) =>
                    renderCard(project, index)
                )}
            </Grid>

            {/* Extra cards expand/collapse with a smooth height animation. */}
            {hasMore && (
                <Collapse in={showAll} timeout={400} unmountOnExit>
                    <Box sx={{ pt: 3 }}>
                        <Grid container spacing={3}>
                            {extraProjects.map((project, index) =>
                                renderCard(project, index)
                            )}
                        </Grid>
                    </Box>
                </Collapse>
            )}

            {hasMore && (
                <Stack sx={{ alignItems: "center", mt: 4 }}>
                    <Button
                        variant="outlined"
                        onClick={() => setShowAll((prev) => !prev)}
                        endIcon={
                            showAll ? (
                                <ExpandLessRoundedIcon />
                            ) : (
                                <ExpandMoreRoundedIcon />
                            )
                        }
                    >
                        {showAll
                            ? "Show less"
                            : `Show ${extraProjects.length} more`}
                    </Button>
                </Stack>
            )}

            {matchingProjects.length === 0 && (
                <Stack sx={{ alignItems: "center", py: 6 }}>
                    <Typography color="text.secondary">
                        No projects in this category yet.
                    </Typography>
                </Stack>
            )}

            <ProjectModal
                project={selected}
                onClose={() => setSelected(null)}
            />
        </>
    );
}
