import {
    Chip,
    Link,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { useUserData } from "../../context/UserContext";
import { calculateYearsAndMonths } from "../../utils/dateUtils";

function formatDate(value: string | null) {
    if (!value) {
        return "Present";
    }

    return new Intl.DateTimeFormat("en", {
        month: "short",
        year: "numeric",
    }).format(new Date(value));
}

export default function WorkHistory() {
    const { workHistory } = useUserData();

    return (
        <Stack spacing={3}>
            {workHistory.map((work, index) => {
                const { years, months } = calculateYearsAndMonths(
                    work.startDate,
                    work.endDate
                );
                const duration = [
                    years > 0 ? `${years} ${years === 1 ? "year" : "years"}` : "",
                    months > 0
                        ? `${months} ${months === 1 ? "month" : "months"}`
                        : "",
                ]
                    .filter(Boolean)
                    .join(" ");

                return (
                    <Paper
                        key={work._id}
                        component="article"
                        variant="outlined"
                        sx={{
                            position: "relative",
                            p: { xs: 3, md: 5 },
                            borderRadius: 3,
                            borderColor: "divider",
                            boxShadow: "none",
                            overflow: "hidden",
                            "&::before": {
                                content: '""',
                                position: "absolute",
                                top: 0,
                                bottom: 0,
                                left: 0,
                                width: 5,
                                bgcolor:
                                    index === 0
                                        ? "primary.main"
                                        : "secondary.main",
                            },
                        }}
                    >
                        <Grid container spacing={{ xs: 3, md: 5 }}>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <Chip
                                    label={index === 0 ? "Current role" : duration}
                                    size="small"
                                    sx={{
                                        bgcolor: "secondary.light",
                                        color: "primary.dark",
                                        fontWeight: 700,
                                        mb: 2,
                                    }}
                                />
                                <Typography
                                    component="h3"
                                    variant="h5"
                                    sx={{ fontWeight: 700, mb: 0.5 }}
                                >
                                    {work.position}
                                </Typography>
                                <Link
                                    href={work.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    underline="hover"
                                    sx={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 0.5,
                                        color: "primary.main",
                                        fontWeight: 600,
                                        mb: 1.5,
                                    }}
                                >
                                    {work.company}
                                    <ArrowOutwardRoundedIcon fontSize="inherit" />
                                </Link>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {formatDate(work.startDate)} —{" "}
                                    {formatDate(work.endDate)}
                                    {index === 0 && duration
                                        ? ` · ${duration}`
                                        : ""}
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 12, md: 8 }}>
                                <List disablePadding aria-label="Key achievements">
                                    {work.responsibilities.map(
                                        (responsibility) => (
                                            <ListItem
                                                key={responsibility}
                                                disableGutters
                                                alignItems="flex-start"
                                                sx={{ py: 0.65 }}
                                            >
                                                <ListItemIcon
                                                    sx={{
                                                        minWidth: 32,
                                                        mt: 0.4,
                                                        color: "secondary.dark",
                                                    }}
                                                >
                                                    <CheckRoundedIcon fontSize="small" />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={responsibility}
                                                    slotProps={{
                                                        primary: {
                                                            color: "text.secondary",
                                                            sx: {
                                                                lineHeight: 1.65,
                                                            },
                                                        },
                                                    }}
                                                />
                                            </ListItem>
                                        ))}
                                </List>
                            </Grid>
                        </Grid>
                    </Paper>
                );
            })}
        </Stack>
    );
}
