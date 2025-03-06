import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    Container,
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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function ResumeHome() {
    return (
        <Container fixed>
            <TitleHeader />
            <Summary />
            <WorkHistory />
            <Projects />
            <Skills />
        </Container>
    );
}

function TitleHeader() {
    function handleDownloadCV() {}

    function handleContactMe() {}

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
                        <Chip
                            label="Download CV"
                            variant="outlined"
                            onClick={handleDownloadCV}
                        />
                        {/* <Button variant="outlined">Download CV</Button> */}
                    </Tooltip>
                    <Tooltip title="Email" placement="top" arrow>
                        <Chip
                            label="Contact"
                            variant="outlined"
                            onClick={handleContactMe}
                        />
                        {/* <Button variant="outlined">Contact</Button> */}
                    </Tooltip>
                    <Tooltip title="Rate Website" placement="top" arrow>
                        <Chip
                            icon={<FavoriteIcon />}
                            label="Rate"
                            variant="outlined"
                            onClick={handleContactMe}
                        />
                    </Tooltip>
                </Stack>
            </Grid>
        </Grid>
    );
}

function Summary() {
    return (
        <Box component="section" sx={{ p: 2, border: "1px dashed grey", mt:5, mb:5}}>
            {resumeData.summary.detailed}
        </Box>
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
        <Card
            sx={{ maxWidth: 345, display: "flex", flexDirection: "column" }}
            key={project._id}
        >
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
    const accordianData = resumeData.workHistory.map((work: any) => (
        <Accordion key={work._id}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <Typography component="span">
                    <b>{work.company}</b> {work.position}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                {work.reponsibilities.map((resp: any, index: number) => (
                    <p key={index}>{resp}</p>
                ))}
            </AccordionDetails>
        </Accordion>
    ));

    return (
        <Grid container spacing={2} sx={{ mt: 5, mb: 5 }}>
            <Grid size={12}>{accordianData}</Grid>
        </Grid>
    );
}
