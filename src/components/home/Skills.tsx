import { SyntheticEvent, useState } from "react";
import { useUserData } from "../../context/UserContext";
import { resumeData } from "../data";
import { Box, Paper, styled, Tab, Tabs, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Projects from "./Projects";
import { useTheme } from "@mui/material/styles";

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
            {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number, col: string) {
    return {
        id: `simple-tab-${col}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
        backgroundColor: "#1A2027",
    }),
}));

export default function Skills() {
    const theme = useTheme();
    const userdata = useUserData();
    const header = Object.keys(userdata.skills) as Array<
        keyof typeof resumeData.skills
    >;

    const [tabIndex, setTabIndex] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    return (
        <Box sx={{ width: "100%", mb: 5 }}>
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
                            <Grid size={{ md: 2, sm: 4 }}>
                                <Item color="primary" >
                                    <Typography variant="h6" component="div">
                                        {data.name}
                                    </Typography>
                                    {data.experience}
                                </Item>
                            </Grid>
                        ))}
                    </Grid>

                    <Projects tabIndex={tabIndex} header={header} />
                </CustomTabPanel>
            ))}
        </Box>
    );
}
