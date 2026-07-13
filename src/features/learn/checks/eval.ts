import { Check } from "../types";

export type Answer = number | number[] | string | boolean | null;

/** Whether the current answer is complete enough to submit. */
export function isAnswerable(check: Check, answer: Answer): boolean {
    switch (check.kind) {
        case "choice":
            return typeof answer === "number";
        case "truefalse":
            return typeof answer === "boolean";
        case "multi":
            return Array.isArray(answer) && answer.length > 0;
        case "input":
            return typeof answer === "string" && answer.trim().length > 0;
    }
}

/** Whether the submitted answer is correct. */
export function isCorrect(check: Check, answer: Answer): boolean {
    switch (check.kind) {
        case "choice":
        case "truefalse":
            return answer === check.answer;
        case "multi": {
            if (!Array.isArray(answer)) return false;
            const a = [...answer].sort().join(",");
            const b = [...check.answers].sort().join(",");
            return a === b;
        }
        case "input": {
            if (typeof answer !== "string") return false;
            const norm = answer.trim().toLowerCase();
            return check.accept.some(
                (accepted) => accepted.trim().toLowerCase() === norm
            );
        }
    }
}

/** The starting (empty) answer for a check kind. */
export function emptyAnswer(check: Check): Answer {
    switch (check.kind) {
        case "multi":
            return [];
        case "input":
            return "";
        default:
            return null;
    }
}
