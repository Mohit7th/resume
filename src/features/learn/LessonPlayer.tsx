import { useState } from "react";
import {
    Box,
    Button,
    Container,
    IconButton,
    LinearProgress,
    Stack,
    Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Lesson } from "./types";
import BlocksView from "./blocks/BlocksView";
import CheckView from "./checks/CheckView";
import { Answer, emptyAnswer, isAnswerable } from "./checks/eval";

interface LessonPlayerProps {
    lesson: Lesson;
    topicPath: string;
    nextHref: string | null;
    onComplete: () => void;
}

export default function LessonPlayer({
    lesson,
    topicPath,
    nextHref,
    onComplete,
}: LessonPlayerProps) {
    const navigate = useNavigate();
    const steps = lesson.steps;

    const [stepIndex, setStepIndex] = useState(0);
    const [answer, setAnswer] = useState<Answer>(() =>
        steps[0]?.check ? emptyAnswer(steps[0].check) : null
    );
    const [submitted, setSubmitted] = useState(false);
    const [finished, setFinished] = useState(false);

    const step = steps[stepIndex];
    const hasCheck = Boolean(step?.check);
    const isLast = stepIndex === steps.length - 1;
    const progress = finished
        ? 100
        : ((stepIndex + (submitted ? 1 : 0)) / steps.length) * 100;

    function goToStep(index: number) {
        const target = steps[index];
        setStepIndex(index);
        setAnswer(target?.check ? emptyAnswer(target.check) : null);
        setSubmitted(false);
        window.scrollTo(0, 0);
    }

    function handlePrimary() {
        if (hasCheck && !submitted) {
            setSubmitted(true); // reveal feedback; you can still continue after
            return;
        }
        if (isLast) {
            onComplete();
            setFinished(true);
            window.scrollTo(0, 0);
            return;
        }
        goToStep(stepIndex + 1);
    }

    const primaryLabel =
        hasCheck && !submitted ? "Check" : isLast ? "Finish" : "Continue";
    const primaryDisabled =
        hasCheck && !submitted && step.check
            ? !isAnswerable(step.check, answer)
            : false;

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                bgcolor: "background.default",
            }}
        >
            {/* Top bar: exit + progress */}
            <Box
                sx={{
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                    bgcolor: "background.paper",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    py: 1,
                }}
            >
                <Container maxWidth="sm">
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{ alignItems: "center" }}
                    >
                        <IconButton
                            aria-label="Exit lesson"
                            size="small"
                            onClick={() => navigate(topicPath)}
                        >
                            <CloseRoundedIcon />
                        </IconButton>
                        <LinearProgress
                            variant="determinate"
                            value={progress}
                            sx={{
                                flexGrow: 1,
                                height: 8,
                                borderRadius: 4,
                            }}
                        />
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ minWidth: 34, textAlign: "right" }}
                        >
                            {Math.min(stepIndex + 1, steps.length)}/
                            {steps.length}
                        </Typography>
                    </Stack>
                </Container>
            </Box>

            {/* Content */}
            <Box sx={{ flexGrow: 1 }}>
                <Container maxWidth="sm" sx={{ py: { xs: 4, md: 6 } }}>
                    {finished ? (
                        <Stack
                            spacing={2}
                            sx={{ alignItems: "center", textAlign: "center", py: 6 }}
                        >
                            <CheckCircleRoundedIcon
                                color="success"
                                sx={{ fontSize: 64 }}
                            />
                            <Typography variant="h4" sx={{ fontWeight: 700 }}>
                                Lesson complete
                            </Typography>
                            <Typography color="text.secondary">
                                Nice work — “{lesson.title}” is done.
                            </Typography>
                            <Stack
                                direction={{ xs: "column", sm: "row" }}
                                spacing={1.5}
                                sx={{ pt: 2 }}
                            >
                                <Button
                                    component={RouterLink}
                                    to={topicPath}
                                    variant="outlined"
                                >
                                    Back to topic
                                </Button>
                                {nextHref && (
                                    <Button
                                        component={RouterLink}
                                        to={nextHref}
                                        variant="contained"
                                        endIcon={<ArrowForwardRoundedIcon />}
                                    >
                                        Next lesson
                                    </Button>
                                )}
                            </Stack>
                        </Stack>
                    ) : (
                        <>
                            {step.blocks && step.blocks.length > 0 && (
                                <BlocksView blocks={step.blocks} />
                            )}
                            {step.check && (
                                <Box
                                    sx={{
                                        mt: step.blocks?.length ? 3 : 0,
                                    }}
                                >
                                    <CheckView
                                        check={step.check}
                                        answer={answer}
                                        submitted={submitted}
                                        onChange={setAnswer}
                                    />
                                </Box>
                            )}
                        </>
                    )}
                </Container>
            </Box>

            {/* Bottom action bar */}
            {!finished && (
                <Box
                    sx={{
                        position: "sticky",
                        bottom: 0,
                        bgcolor: "background.paper",
                        borderTop: "1px solid",
                        borderColor: "divider",
                        py: 1.5,
                    }}
                >
                    <Container maxWidth="sm">
                        <Stack
                            direction="row"
                            sx={{
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Button
                                color="inherit"
                                disabled={stepIndex === 0}
                                onClick={() => goToStep(stepIndex - 1)}
                            >
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                size="large"
                                disabled={primaryDisabled}
                                onClick={handlePrimary}
                            >
                                {primaryLabel}
                            </Button>
                        </Stack>
                    </Container>
                </Box>
            )}
        </Box>
    );
}
