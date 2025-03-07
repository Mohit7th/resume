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
// Define props interface for type safety
interface ProjectsProps {
    tabIndex: number;
    header: Array<keyof typeof resumeData.skills>;
}

const Projects: React.FC<ProjectsProps> = ({ tabIndex, header }) => {
    const selectedTab = header.find((_, index) => index === tabIndex) || {
        type: "webTechnologies",
    };

    const userdata = useUserData();
    const filteredProjects = userdata.projects.filter(
        (obj) => obj.type === selectedTab
    );

    return (
        <Grid container spacing={2} sx={{ mb: 5, justifyContent: "center" }}>
            {filteredProjects.map((project: any) => (
                <Grid size={4}>
                    <Card
                        sx={{
                            maxWidth: 345,
                            display: "flex",
                            flexDirection: "column",
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
                                sx={{ color: "text.secondary" }}
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
