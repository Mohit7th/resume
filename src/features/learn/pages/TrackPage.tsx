import {
    Card,
    CardActionArea,
    CardContent,
    Chip,
    Container,
    Stack,
    Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link as RouterLink, useParams } from "react-router-dom";
import { getTrack } from "../content";
import { Crumbs, LearnNotFound } from "./parts";

export default function TrackPage() {
    const { trackId = "" } = useParams();
    const track = getTrack(trackId);

    if (!track) {
        return <LearnNotFound message="That track doesn't exist." />;
    }

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 5, md: 7 } }}>
            <Crumbs
                items={[{ label: "Learn", to: "/learn" }, { label: track.title }]}
            />
            <Typography variant="h3" sx={{ fontSize: { xs: "1.8rem", md: "2.4rem" }, mb: 1 }}>
                {track.title}
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 680, mb: 4 }}>
                {track.description}
            </Typography>

            <Grid container spacing={3}>
                {track.topics.map((topic) => (
                    <Grid size={{ xs: 12, md: 6 }} key={topic.id}>
                        <Card sx={{ height: "100%" }}>
                            <CardActionArea
                                component={RouterLink}
                                to={`/learn/${track.id}/${topic.id}`}
                                sx={{ height: "100%" }}
                            >
                                <CardContent sx={{ p: 3 }}>
                                    <Stack
                                        direction="row"
                                        sx={{
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            mb: 1,
                                        }}
                                    >
                                        <Chip
                                            size="small"
                                            label={topic.difficulty}
                                            sx={{
                                                textTransform: "capitalize",
                                                bgcolor: "secondary.light",
                                                color: "primary.dark",
                                                fontWeight: 600,
                                            }}
                                        />
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            {topic.lessons.length} lesson
                                            {topic.lessons.length === 1
                                                ? ""
                                                : "s"}
                                        </Typography>
                                    </Stack>
                                    <Typography
                                        variant="h6"
                                        sx={{ fontWeight: 700, mb: 1 }}
                                    >
                                        {topic.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {topic.summary}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
