import { SyntheticEvent, useState } from "react";
import { useUserData } from "../../context/UserContext";
import { Box, Paper, styled, Tab, Tabs, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Projects from "./Projects";
import { useTheme } from "@mui/material/styles";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel({ children, value, index }: TabPanelProps) {
    return (
        <Box sx={{ pt: 3, minHeight: "200px" }}>
            {value === index && children}
        </Box>
    );
}

function a11yProps(index: number, col: string) {
    return {
        id: `simple-tab-${col}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.primary,
    ...theme.applyStyles("dark", {
        backgroundColor: "#1A2027",
    }),
}));

export default function Skills() {
    const theme = useTheme();
    const userdata = useUserData();
    const header = Object.keys(userdata.skills) as Array<
        keyof typeof userdata.skills
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
                    centered
                    sx={{ fontWeight: 700 }}
                >
                    {header.map((tabName, index) => {
                        const displayName =
                            tabName === "browserExtension"
                                ? "Browser Extension"
                                : tabName === "businessIntelligence"
                                ? "Business Intelligence"
                                : "Web Applications";
                        return (
                            <Tab
                                key={index}
                                label={displayName}
                                {...a11yProps(index, tabName)}
                                sx={{
                                    color: theme.palette.primary.dark,
                                }}
                            />
                        );
                    })}
                </Tabs>
            </Box>

            <CustomTabPanel value={tabIndex} index={tabIndex}>
                <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                    {userdata.skills[header[tabIndex]].map((data, idx) => (
                        <Grid size={{ xs: 4, sm: 6, md: 2 }} key={idx}>
                            <Item
                                sx={{
                                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                                    color: theme.palette.primary.contrastText,
                                }}
                            >
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
        </Box>
    );
}
