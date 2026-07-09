import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import ExtensionRoundedIcon from "@mui/icons-material/ExtensionRounded";
import QueryStatsRoundedIcon from "@mui/icons-material/QueryStatsRounded";
import { useUserData } from "../../context/UserContext";

const capabilityMeta = {
    webTechnologies: {
        title: "Web application delivery",
        description:
            "Frontend architecture, REST APIs, databases, integrations, and maintainable product delivery.",
        icon: <CodeRoundedIcon />,
    },
    browserExtension: {
        title: "Browser products",
        description:
            "Cross-browser extensions, content scripts, store releases, and web-page integrations.",
        icon: <ExtensionRoundedIcon />,
    },
    businessIntelligence: {
        title: "Data & business intelligence",
        description:
            "ETL pipelines, reporting, data visualization, SQL optimization, and operational automation.",
        icon: <QueryStatsRoundedIcon />,
    },
};

export default function Skills() {
    const { skills } = useUserData();
    const categories = Object.keys(skills) as Array<keyof typeof skills>;

    return (
        <Grid container spacing={3}>
            {categories.map((category) => {
                const meta = capabilityMeta[category];

                return (
                    <Grid size={{ xs: 12, md: 4 }} key={category}>
                        <Paper
                            variant="outlined"
                            sx={{
                                height: "100%",
                                p: { xs: 3, md: 4 },
                                borderRadius: 3,
                                borderColor: "divider",
                                boxShadow: "none",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "grid",
                                    placeItems: "center",
                                    width: 48,
                                    height: 48,
                                    borderRadius: 2,
                                    bgcolor: "secondary.light",
                                    color: "primary.main",
                                    mb: 3,
                                }}
                            >
                                {meta.icon}
                            </Box>
                            <Typography
                                component="h3"
                                variant="h5"
                                sx={{ fontWeight: 700, mb: 1.5 }}
                            >
                                {meta.title}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mb: 3 }}
                            >
                                {meta.description}
                            </Typography>
                            <Stack
                                direction="row"
                                useFlexGap
                                sx={{ flexWrap: "wrap", gap: 1 }}
                            >
                                {skills[category].map((skill) => (
                                    <Chip
                                        key={skill._id}
                                        label={skill.name}
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                            borderColor: "divider",
                                            color: "text.primary",
                                            fontWeight: 500,
                                        }}
                                    />
                                ))}
                            </Stack>
                        </Paper>
                    </Grid>
                );
            })}
        </Grid>
    );
}
