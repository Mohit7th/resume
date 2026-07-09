import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Chip,
    Stack,
    Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import { useUserData } from "../../context/UserContext";
import { Projects as Project } from "../../types/projects";
import { getPublicAssetPath } from "../../utils/publicPath";

const categoryLabels: Record<string, string> = {
    webTechnologies: "Web application",
    browserExtension: "Browser extension",
    businessIntelligence: "Data & BI",
};

function pickFeaturedProjects(projects: Project[]) {
    const categories = [
        "webTechnologies",
        "browserExtension",
        "businessIntelligence",
    ];

    return categories
        .map((category) => projects.find((project) => project.type === category))
        .filter((project): project is Project => Boolean(project));
}

export default function Projects() {
    const { projects } = useUserData();
    const featuredProjects = pickFeaturedProjects(projects);

    return (
        <Grid container spacing={3}>
            {featuredProjects.map((project) => {
                const hasPublicUrl = /^https?:\/\//.test(project.url);
                const technologies =
                    project.technologies.length > 0
                        ? project.technologies.slice(0, 3)
                        : [project.techStack];

                return (
                    <Grid size={{ xs: 12, md: 4 }} key={project._id}>
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
                                component={hasPublicUrl ? "a" : "div"}
                                href={hasPublicUrl ? project.url : undefined}
                                target={hasPublicUrl ? "_blank" : undefined}
                                rel={
                                    hasPublicUrl
                                        ? "noopener noreferrer"
                                        : undefined
                                }
                                aria-label={
                                    hasPublicUrl
                                        ? `${project.name}, open project in a new tab`
                                        : undefined
                                }
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "stretch",
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={getPublicAssetPath(project.image)}
                                    alt=""
                                    loading="lazy"
                                    sx={{
                                        height: 190,
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
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        spacing={2}
                                        sx={{ mb: 1.5 }}
                                    >
                                        <Typography
                                            variant="overline"
                                            sx={{
                                                color: "secondary.dark",
                                                fontWeight: 700,
                                                letterSpacing: "0.08em",
                                            }}
                                        >
                                            {categoryLabels[project.type] ??
                                                "Project"}
                                        </Typography>
                                        {hasPublicUrl && (
                                            <ArrowOutwardRoundedIcon
                                                aria-hidden="true"
                                                fontSize="small"
                                                sx={{ color: "primary.main" }}
                                            />
                                        )}
                                    </Stack>
                                    <Typography
                                        component="h3"
                                        variant="h5"
                                        sx={{ fontWeight: 700, mb: 1.5 }}
                                    >
                                        {project.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ mb: 3, flexGrow: 1 }}
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
                    </Grid>
                );
            })}
        </Grid>
    );
}
