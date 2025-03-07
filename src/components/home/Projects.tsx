import React from "react";
import {
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
    Skeleton,
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
            spacing={{ lg: 7, sm: 5 }}
            sx={{ mt: 3, mb: 5, justifyContent: "center" }}
        >
            {filteredProjects.map((project: any) => (
                <Grid size={{ lg: 4 }}>
                    <Card
                        sx={{
                            maxWidth: 345,
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                            backgroundColor: theme.palette.primary.contrastText,
                        }}
                        key={project._id}
                    >
                        <Skeleton variant="rounded" height={140} />
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
                                sx={{ color: theme.palette.primary.light }}
                            >
                                {project.description}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ mt: "auto" }}>
                            {project.technologies.map(
                                (skill: string, index: number) => (
                                    <Button key={index} size="small">
                                        {skill}
                                    </Button>
                                )
                            )}
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default Projects;
