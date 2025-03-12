import React from "react";
import {
    Card,
    CardContent,
    Typography,
    Skeleton,
    CardActionArea,
    CardMedia,
    Chip,
    Box,
} from "@mui/material";
import { useUserData } from "../../context/UserContext";
import { resumeData } from "../data";
import Grid from "@mui/material/Grid2";
import { useTheme } from "@mui/material/styles";
// Define props interface for type safety
interface ProjectsProps {
    tabIndex: number;
    header: Array<keyof typeof resumeData.skills>;
}

const Projects: React.FC<ProjectsProps> = ({ tabIndex, header }) => {
    const theme = useTheme();
    const selectedTab = header.find((_, index) => index === tabIndex) || {
        type: "webTechnologies",
    };

    const userdata = useUserData();
    const filteredProjects = userdata.projects.filter(
        (obj) => obj.type === selectedTab
    );

    return (
        <Grid
            container
            spacing={{ xs: 2, sm: 2, md: 2 }}
            sx={{ mt: 3, mb: 5, justifyContent: "space-between" }}
        >
            {filteredProjects.map((project: any, idx: number) => (
                <Grid
                    size={{ xs: 12, sm: 6, md: 3 }}
                    key={idx}
                    sx={{
                        display: "flex",
                        justifyContent: { xs: "center", md: "flex-start" }, // Center on small screens, left-align on medium+
                        alignItems: "center",
                        textAlign: { xs: "center", md: "left" }, // Center text on small screens
                    }}
                >
                    <Card
                        sx={{
                            width: { xs: "100%", md: 300 },
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                            // backgroundColor: theme.palette.primary.light,
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                            transition: "0.3s",
                            boxShadow: 3,
                            position: "relative", // Required for absolute positioning
                            "&:hover": {
                                boxShadow: 10,
                                transform: "translateY(-5px)",
                            },
                        }}
                        key={project._id}
                    >
                        {/* Tech Stack Chip - Positioned at top-right */}
                        <Box
                            sx={{
                                position: "absolute",
                                top: 8,
                                right: 8,
                                zIndex: 2, // Ensures it stays on top
                            }}
                        >
                            <Chip
                                label={project.techStack || "MEAN"}
                                sx={{backgroundColor: theme.palette.primary.light, color: theme.palette.primary.contrastText}}
                                size="small"
                            />
                        </Box>

                        <CardActionArea onClick={() => window.open(project.url)}>
                            {!project.image ? (
                                <Skeleton variant="rounded" height={140} />
                            ) : (
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={project.image}
                                    alt={project.name}
                                />
                            )}
                            <CardContent>
                                <Typography gutterBottom variant="h5">
                                    {project.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: theme.palette.primary.contrastText,
                                    }}
                                >
                                    {project.description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default Projects;
