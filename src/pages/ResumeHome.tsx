import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    IconButton,
    ListItem,
    ListItemText,
    Skeleton,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import { resumeData } from "../components/data";
import Grid from "@mui/material/Grid2";
import FavoriteIcon from "@mui/icons-material/Favorite";
import List from "@mui/material/List";

export default function ResumeHome() {
    return (
        <Container fixed>
            <TitleHeader />
            <Summary />
            <Projects />
            <WorkHistory />
            <Skills />
        </Container>
    );
}

function TitleHeader() {
    return (
        <Grid container spacing={2}>
            <Grid size={6}>
                {/* <img src="../../public/assets/logo192.png"></img> */}
                <Skeleton variant="circular" width={200} height={200} />
            </Grid>
            <Grid size={6}>
                <h1>{resumeData.titleHeader.name}</h1>
                <h2>{resumeData.titleHeader.title}</h2>
                <h3>{resumeData.titleHeader.contact.email}</h3>
                <p>{resumeData.summary.short}</p>
                <Stack direction="row" spacing={2}>
                    <Tooltip title="PDF" placement="top" arrow>
                        <Button variant="outlined">Download CV</Button>
                    </Tooltip>
                    <Tooltip title="Email" placement="top" arrow>
                        <Button variant="outlined">Contact</Button>
                    </Tooltip>
                    <Tooltip title="Rate Website" placement="top" arrow>
                        <IconButton>
                            <FavoriteIcon />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Grid>
        </Grid>
    );
}

function Summary() {
    return (
        <div>
            <p>{resumeData.summary.detailed}</p>
        </div>
    );
}

function Skills() {
    const header = Object.keys(resumeData.skills) as Array<
        keyof typeof resumeData.skills
    >;

    const tableBody = header.map((col) => (
        <Grid size={3} key={col}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                {col}
            </Typography>
            {resumeData.skills[col].map((data) => (
                <List key={data._id} dense={true}>
                    <ListItem>
                        <ListItemText
                            primary={data.name}
                            secondary={data.experience}
                        />
                    </ListItem>
                </List>
            ))}
        </Grid>
    ));

    return (
        <Grid container spacing={2}>
            {tableBody}
        </Grid>
    );
}

function Projects() {
    const projects = resumeData.projects.professional.map((project: any) => (
        <Card sx={{ maxWidth: 345, display: "flex", flexDirection: "column" } } key={project._id}>
            {/* <CardMedia
                sx={{ height: 140 }}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
            /> */}
            <Skeleton variant="rounded" height={140} />

            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {project.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {project.description}
                </Typography>
            </CardContent>
            <CardActions sx={{ mt: "auto" }}>
                {project.technologies.map((skill: string, index: number) => (
                    <Button size="small">{skill}</Button>
                ))}
            </CardActions>
        </Card>
    ));

    return (
        <Grid container spacing={2}>
            {projects}
        </Grid>
    );
}

function WorkHistory() {
    const workHistory = resumeData.workHistory.map((work: any) => {
        return (
            <div key={work._id}>
                <h2>{work.company}</h2>
                <p>
                    <b>{work.position}</b>
                </p>
                {work.reponsibilities.map((resp: any, index: number) => (
                    <p key={index}>{resp}</p>
                ))}
            </div>
        );
    });
    return <div>{workHistory}</div>;
}
