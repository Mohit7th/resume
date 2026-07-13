import {
    Alert,
    Box,
    Button,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { Check } from "../types";
import { Answer, isCorrect } from "./eval";
import Markdown from "../blocks/Markdown";

interface CheckViewProps {
    check: Check;
    answer: Answer;
    submitted: boolean;
    onChange: (answer: Answer) => void;
}

/** Border/icon state for a selectable option after submission. */
function optionState(
    isSelected: boolean,
    isRight: boolean,
    submitted: boolean
): { borderColor: string; icon: React.ReactNode } {
    if (!submitted) {
        return {
            borderColor: isSelected ? "primary.main" : "divider",
            icon: null,
        };
    }
    if (isRight) {
        return {
            borderColor: "success.main",
            icon: <CheckCircleRoundedIcon fontSize="small" color="success" />,
        };
    }
    if (isSelected) {
        return {
            borderColor: "error.main",
            icon: <CancelRoundedIcon fontSize="small" color="error" />,
        };
    }
    return { borderColor: "divider", icon: null };
}

function OptionButton({
    label,
    selected,
    right,
    submitted,
    onClick,
}: {
    label: string;
    selected: boolean;
    right: boolean;
    submitted: boolean;
    onClick: () => void;
}) {
    const { borderColor, icon } = optionState(selected, right, submitted);
    return (
        <Button
            variant={selected && !submitted ? "contained" : "outlined"}
            disableElevation
            disabled={submitted}
            onClick={onClick}
            endIcon={icon}
            sx={{
                justifyContent: "space-between",
                textAlign: "left",
                py: 1.25,
                color: selected && !submitted ? undefined : "text.primary",
                borderColor,
                "&.Mui-disabled": { borderColor, color: "text.primary" },
            }}
        >
            {label}
        </Button>
    );
}

export default function CheckView({
    check,
    answer,
    submitted,
    onChange,
}: CheckViewProps) {
    const correct = submitted && isCorrect(check, answer);

    return (
        <Box>
            <Typography sx={{ fontWeight: 700, mb: 2, fontSize: "1.05rem" }}>
                {check.prompt}
            </Typography>

            {check.kind === "choice" && (
                <Stack spacing={1}>
                    {check.options.map((option, index) => (
                        <OptionButton
                            key={index}
                            label={option}
                            selected={answer === index}
                            right={index === check.answer}
                            submitted={submitted}
                            onClick={() => onChange(index)}
                        />
                    ))}
                </Stack>
            )}

            {check.kind === "truefalse" && (
                <Stack direction="row" spacing={1}>
                    {[true, false].map((value) => (
                        <OptionButton
                            key={String(value)}
                            label={value ? "True" : "False"}
                            selected={answer === value}
                            right={value === check.answer}
                            submitted={submitted}
                            onClick={() => onChange(value)}
                        />
                    ))}
                </Stack>
            )}

            {check.kind === "multi" && (
                <Stack spacing={1}>
                    {check.options.map((option, index) => {
                        const list = Array.isArray(answer) ? answer : [];
                        const selected = list.includes(index);
                        return (
                            <OptionButton
                                key={index}
                                label={option}
                                selected={selected}
                                right={check.answers.includes(index)}
                                submitted={submitted}
                                onClick={() =>
                                    onChange(
                                        selected
                                            ? list.filter((i) => i !== index)
                                            : [...list, index]
                                    )
                                }
                            />
                        );
                    })}
                </Stack>
            )}

            {check.kind === "input" && (
                <TextField
                    fullWidth
                    size="small"
                    value={typeof answer === "string" ? answer : ""}
                    placeholder={check.placeholder}
                    disabled={submitted}
                    onChange={(e) => onChange(e.target.value)}
                />
            )}

            {submitted && (
                <Alert
                    severity={correct ? "success" : "error"}
                    icon={
                        correct ? (
                            <CheckCircleRoundedIcon />
                        ) : (
                            <CancelRoundedIcon />
                        )
                    }
                    sx={{ mt: 2, "& p": { m: 0 } }}
                >
                    <Typography sx={{ fontWeight: 700, mb: check.explain ? 0.5 : 0 }}>
                        {correct ? "Correct!" : "Not quite."}
                    </Typography>
                    {check.explain && <Markdown>{check.explain}</Markdown>}
                </Alert>
            )}
        </Box>
    );
}
