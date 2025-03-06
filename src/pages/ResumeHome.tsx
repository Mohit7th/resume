import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    Chip,
    Container,
    Skeleton,
    Stack,
    Tab,
    Tabs,
    Tooltip,
    Typography,
} from "@mui/material";
import { resumeData } from "../components/data";
import Grid from "@mui/material/Grid2";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useUserData } from "../context/UserContext";
import { SyntheticEvent, useState } from "react";
import FormDialog from "../components/ui/RatingFormDialog";

export default function ResumeHome() {
    return (
        <Container fixed>
            <TitleHeader />
            <Summary />
            <WorkHistory />
            <Skills />
            <Projects />
        </Container>
    );
}

function TitleHeader() {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const userdata = useUserData();
    function handleDownloadCV() {}

    function handleContactMe() {}

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <>
            <Grid container spacing={2} sx={{ mb: 5 }}>
                <Grid size={{ xs: 12, md: 6 }}>
                    {/* <img src="../../public/assets/logo192.png"></img> */}
                    <Skeleton variant="circular" width={200} height={200} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} sx={{ alignItems: "center" }}>
                    <h1>{userdata.titleHeader.name}</h1>
                    <h2>{userdata.titleHeader.title}</h2>
                    <h3>{userdata.titleHeader.contact.email}</h3>
                    <p>{userdata.summary.short}</p>
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
                                onClick={handleOpenDialog}
                            />
                        </Tooltip>
                    </Stack>
                </Grid>
            </Grid>
            <FormDialog open={openDialog} handleClose={handleCloseDialog} />
        </>
    );
}

function Summary() {
    const userdata = useUserData();
    return (
        <Box
            component="section"
            sx={{ p: 2, border: "1px dashed grey", mb: 5 }}
        >
            {userdata.summary.detailed}
        </Box>
    );
}

function Projects() {
    const userdata = useUserData();
    const projects = userdata.projects.professional.map((project: any) => (
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
        <Grid container spacing={5} sx={{ mb: 5, justifyContent: "center" }}>
            {projects}
        </Grid>
    );
}

function WorkHistory() {
    const userdata = useUserData();
    const accordianData = userdata.workHistory.map((work: any) => (
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
        <Grid container spacing={2} sx={{ mb: 5 }}>
            <Grid size={12}>{accordianData}</Grid>
        </Grid>
    );
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

function Skills() {
    const userdata = useUserData();
    const header = Object.keys(userdata.skills) as Array<
        keyof typeof resumeData.skills
    >;

    const [value, setValue] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="skills-tabs"
                >
                    {header.map((col, index) => (
                        <Tab label={col} {...a11yProps(index)} />
                    ))}
                </Tabs>
            </Box>

            {header.map((col, index) => (
                <CustomTabPanel value={value} index={index}>
                    <Box
                        sx={{
                            width: "100%",
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fill, minmax(min(180px, 100%), 1fr))",
                            gap: 2,
                        }}
                    >
                        {userdata.skills[col].map((data) => (
                            <Card>
                                <CardActionArea
                                    onClick={() => {}}
                                    sx={{
                                        height: "100%",
                                    }}
                                >
                                    <CardContent sx={{ height: "100%" }}>
                                        <Typography
                                            variant="h6"
                                            component="div"
                                        >
                                            {data.name}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {data.experience}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        ))}
                    </Box>
                </CustomTabPanel>
            ))}
        </Box>
    );
}
