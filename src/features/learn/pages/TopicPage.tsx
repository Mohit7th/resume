import {
    Box,
    Chip,
    Container,
    List,
    ListItemButton,
    ListItemText,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import { Link as RouterLink, useParams } from "react-router-dom";
import { getTopic, lessonKey } from "../content";
import { getCompleted } from "../storage";
import { Crumbs, LearnNotFound } from "./parts";

export default function TopicPage() {
    const { trackId = "", topicId = "" } = useParams();
    const found = getTopic(trackId, topicId);
    const completed = getCompleted();

    if (!found) {
        return <LearnNotFound message="That topic doesn't exist." />;
    }

    const { track, topic } = found;

    return (
        <Container maxWidth="md" sx={{ py: { xs: 5, md: 7 } }}>
            <Crumbs
                items={[
                    { label: "Learn", to: "/learn" },
                    { label: track.title, to: `/learn/${track.id}` },
                    { label: topic.title },
                ]}
            />
            <Typography variant="h3" sx={{ fontSize: { xs: "1.8rem", md: "2.4rem" }, mb: 1 }}>
                {topic.title}
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
                {topic.summary}
            </Typography>
            <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1, mb: 4 }}>
                <Chip
                    size="small"
                    label={topic.difficulty}
                    sx={{ textTransform: "capitalize" }}
                />
                {topic.tags.map((tag) => (
                    <Chip
                        key={tag}
                        size="small"
                        variant="outlined"
                        label={tag}
                    />
                ))}
            </Stack>

            <Paper variant="outlined" sx={{ borderColor: "divider" }}>
                <List disablePadding>
                    {topic.lessons.map((lesson) => {
                        const done = completed.has(
                            lessonKey(track.id, topic.id, lesson.id)
                        );
                        return (
                            <ListItemButton
                                key={lesson.id}
                                component={RouterLink}
                                to={`/learn/${track.id}/${topic.id}/${lesson.id}`}
                            >
                                <Box
                                    sx={{
                                        mr: 1.5,
                                        display: "flex",
                                        color: done
                                            ? "success.main"
                                            : "text.disabled",
                                    }}
                                >
                                    {done ? (
                                        <CheckCircleRoundedIcon />
                                    ) : (
                                        <RadioButtonUncheckedRoundedIcon />
                                    )}
                                </Box>
                                <ListItemText
                                    primary={lesson.title}
                                    secondary={
                                        lesson.estMinutes
                                            ? `${lesson.estMinutes} min`
                                            : undefined
                                    }
                                    slotProps={{
                                        primary: { sx: { fontWeight: 600 } },
                                    }}
                                />
                            </ListItemButton>
                        );
                    })}
                </List>
            </Paper>
        </Container>
    );
}
