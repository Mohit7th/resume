import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Chip,
    Container,
    Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link as RouterLink } from "react-router-dom";
import { tracks } from "../content";

export default function LearnHome() {
    return (
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>
            <Typography
                component="p"
                sx={{
                    color: "secondary.dark",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontSize: "0.78rem",
                    mb: 1,
                }}
            >
                Learn
            </Typography>
            <Typography
                variant="h2"
                sx={{ fontSize: { xs: "2rem", md: "2.75rem" }, mb: 1.5 }}
            >
                Notes &amp; practice
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 680, mb: 5 }}>
                Concepts I&rsquo;m learning and revisiting — low-level &amp;
                high-level design, algorithms, and more — as short, hands-on
                lessons with examples and quick exercises.
            </Typography>

            <Grid container spacing={3}>
                {tracks.map((track) => (
                    <Grid size={{ xs: 12, md: 4 }} key={track.id}>
                        <Card
                            sx={{
                                height: "100%",
                                transition:
                                    "transform 180ms ease, box-shadow 180ms ease",
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: "0 20px 50px rgba(23,32,74,0.13)",
                                },
                            }}
                        >
                            <CardActionArea
                                component={RouterLink}
                                to={`/learn/${track.id}`}
                                sx={{ height: "100%" }}
                            >
                                <CardContent sx={{ p: 3 }}>
                                    <Box sx={{ fontSize: 34, mb: 1 }}>
                                        {track.icon}
                                    </Box>
                                    <Typography
                                        variant="h6"
                                        sx={{ fontWeight: 700, mb: 1 }}
                                    >
                                        {track.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ mb: 2 }}
                                    >
                                        {track.description}
                                    </Typography>
                                    <Chip
                                        size="small"
                                        label={`${track.topics.length} topic${
                                            track.topics.length === 1 ? "" : "s"
                                        }`}
                                        sx={{
                                            bgcolor: "secondary.light",
                                            color: "primary.dark",
                                            fontWeight: 600,
                                        }}
                                    />
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
