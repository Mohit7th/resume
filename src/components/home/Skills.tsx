import { SyntheticEvent, useState } from "react";
import { useUserData } from "../../context/UserContext";
import { resumeData } from "../data";
import { Box, Card, CardActionArea, CardContent, Tab, Tabs, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Projects from "./Projects";

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

function a11yProps(index: number, col: string) {
    return {
        id: `simple-tab-${col}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

export default function Skills() {
    const userdata = useUserData();
    const header = Object.keys(userdata.skills) as Array<
        keyof typeof resumeData.skills
    >;

    const [tabIndex, setTabIndex] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={tabIndex}
                    onChange={handleChange}
                    aria-label="skills-tabs"
                >
                    {header.map((col, index) => (
                        <Tab label={col} {...a11yProps(index, col)} />
                    ))}
                </Tabs>
            </Box>

            {header.map((col, index) => (
                <CustomTabPanel value={tabIndex} index={index}>
                    <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                        {userdata.skills[col].map((data) => (
                            <Grid size={2}>
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
                            </Grid>
                        ))}
                    </Grid>

                    <Projects tabIndex={tabIndex} header={header} />
                </CustomTabPanel>
            ))}
        </Box>
    );
}
