import { useMemo, useState } from "react";
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Chip,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from "@mui/material";
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
    { value: "all", label: "All" },
    { value: "webTechnologies", label: "Web apps" },
    { value: "browserExtension", label: "Extensions" },
    { value: "businessIntelligence", label: "Data & BI" },
];

export default function Projects() {
    const { projects } = useUserData();
    const [filter, setFilter] = useState("all");
    const [selected, setSelected] = useState<Project | null>(null);

    const visibleProjects = useMemo(
        () =>
            filter === "all"
                ? projects
                : projects.filter((project) => project.type === filter),
        [projects, filter]
    );

    return (
        <>
            <ToggleButtonGroup
                value={filter}
                exclusive
                size="small"
                onChange={(_event, next) => {
                    if (next !== null) setFilter(next);
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
                    },
                }}
            >
                {FILTERS.map((option) => (
                    <ToggleButton key={option.value} value={option.value}>
                        {option.label}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>

            <Grid container spacing={3}>
                {visibleProjects.map((project) => {
                    const technologies =
                        project.technologies.length > 0
                            ? project.technologies.slice(0, 3)
                            : [project.techStack];

                    return (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={project._id}>
                            <Card
                                sx={{
                                    height: "100%",
                                    overflow: "hidden",
                                    bgcolor: "background.paper",
                                    transition:
                                        "transform 180ms ease, box-shadow 180ms ease",
                                    "&:hover": {
                                        transform: "translateY(-4px)",
                                        boxShadow:
                                            "0 20px 50px rgba(23, 32, 74, 0.13)",
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
                                    <CardMedia
                                        component="img"
                                        image={getPublicAssetPath(
                                            project.image
                                        )}
                                        alt=""
                                        loading="lazy"
                                        sx={{
                                            height: 180,
                                            objectFit: "cover",
                                            bgcolor: "secondary.light",
                                        }}
                                    />
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
                                            {categoryLabels[project.type] ??
                                                "Project"}
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
                                                        bgcolor:
                                                            "secondary.light",
                                                        color: "primary.dark",
                                                        fontWeight: 600,
                                                    }}
                                                />
                                            ))}
                                        </Box>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>

            {visibleProjects.length === 0 && (
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
