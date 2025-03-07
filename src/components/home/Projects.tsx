import React from "react";
import {
    Card,
    CardContent,
    Typography,
    Skeleton,
    CardActionArea,
    CardMedia,
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
            spacing={{ lg: 7, sm: 2 }}
            sx={{ mt: 3, mb: 5, justifyContent: "space-between" }}
        >
            {filteredProjects.map((project: any) => (
                <Grid size={{ lg: 4 }}>
                    <Card
                        sx={{
                            maxWidth: 345,
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                            backgroundColor: theme.palette.primary.light,
                        }}
                        key={project._id}
                    >
                        <CardActionArea
                            onClick={() => window.open(project.url)}
                        >
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
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                >
                                    {project.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: theme.palette.primary
                                            .contrastText,
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
