import { useReducer } from "react";
import {
    Box,
    Button,
    Container,
    Divider,
    Stack,
    Typography,
} from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { Link as RouterLink, useParams } from "react-router-dom";
import { getLesson, lessonKey } from "../content";
import { isCompleted, setCompleted } from "../storage";
import LessonView from "../blocks/LessonView";
import { Crumbs, LearnNotFound } from "./parts";

export default function LessonPage() {
    const { trackId = "", topicId = "", lessonId = "" } = useParams();
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const found = getLesson(trackId, topicId, lessonId);

    if (!found) {
        return <LearnNotFound message="That lesson doesn't exist." />;
    }

    const { track, topic, lesson, prev, next } = found;
    const key = lessonKey(track.id, topic.id, lesson.id);
    const done = isCompleted(key); // read fresh each render (also on nav)
    const base = `/learn/${track.id}/${topic.id}`;

    function toggleComplete() {
        setCompleted(key, !done);
        forceUpdate();
    }

    return (
        <Container maxWidth="md" sx={{ py: { xs: 5, md: 7 } }}>
            <Crumbs
                items={[
                    { label: "Learn", to: "/learn" },
                    { label: track.title, to: `/learn/${track.id}` },
                    { label: topic.title, to: base },
                    { label: lesson.title },
                ]}
            />
            <Typography
                variant="h3"
                sx={{ fontSize: { xs: "1.8rem", md: "2.3rem" }, mb: 0.5 }}
            >
                {lesson.title}
            </Typography>
            {lesson.estMinutes && (
                <Typography variant="caption" color="text.secondary">
                    {lesson.estMinutes} min read
                </Typography>
            )}

            <Box sx={{ mt: 3 }}>
                <LessonView lesson={lesson} />
            </Box>

            <Divider sx={{ my: 4 }} />

            <Button
                onClick={toggleComplete}
                variant={done ? "outlined" : "contained"}
                color={done ? "success" : "primary"}
                startIcon={done ? <CheckRoundedIcon /> : undefined}
            >
                {done ? "Completed — mark incomplete" : "Mark as complete"}
            </Button>

            <Stack
                direction="row"
                sx={{ justifyContent: "space-between", mt: 4, gap: 1 }}
            >
                <Box>
                    {prev && (
                        <Button
                            component={RouterLink}
                            to={`${base}/${prev.id}`}
                            color="inherit"
                            startIcon={<ChevronLeftRoundedIcon />}
                        >
                            {prev.title}
                        </Button>
                    )}
                </Box>
                <Box>
                    {next && (
                        <Button
                            component={RouterLink}
                            to={`${base}/${next.id}`}
                            color="inherit"
                            endIcon={<ChevronRightRoundedIcon />}
                        >
                            {next.title}
                        </Button>
                    )}
                </Box>
            </Stack>
        </Container>
    );
}
