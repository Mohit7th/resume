import { Track } from "../types";

// Sample starter content — replace/extend with your own curriculum.
export const dsa: Track = {
    id: "dsa",
    title: "Data Structures & Algorithms",
    description:
        "Patterns and problem-solving techniques, learned by working through them step by step.",
    icon: "🧩",
    topics: [
        {
            id: "two-pointers",
            title: "Two Pointers",
            summary:
                "Shrink a search space with two indices instead of nesting loops.",
            difficulty: "core",
            tags: ["arrays", "patterns"],
            lessons: [
                {
                    id: "intro",
                    title: "The idea",
                    estMinutes: 5,
                    steps: [
                        {
                            blocks: [
                                {
                                    type: "text",
                                    md: "Imagine a **sorted** array and you want two numbers that add up to a target. The brute-force way checks every pair — that's O(n²).",
                                },
                            ],
                        },
                        {
                            blocks: [
                                {
                                    type: "text",
                                    md: "Instead, put one finger on the **left** end and one on the **right**. Look at their sum, then move *one* finger inward.",
                                },
                                {
                                    type: "code",
                                    lang: "ts",
                                    caption: "Pair that sums to target",
                                    code: "let l = 0, r = a.length - 1;\nwhile (l < r) {\n  const sum = a[l] + a[r];\n  if (sum === target) return true;\n  if (sum < target) l++; // need more\n  else r--;              // need less\n}",
                                },
                            ],
                            check: {
                                kind: "choice",
                                prompt:
                                    "The sum is too small. Which finger should move?",
                                options: [
                                    "Move the right finger left",
                                    "Move the left finger right",
                                    "Move both inward",
                                ],
                                answer: 1,
                                explain:
                                    "Moving the left finger right lands on a larger value (array is sorted), which increases the sum toward the target.",
                            },
                        },
                        {
                            check: {
                                kind: "truefalse",
                                prompt:
                                    "This two-pointer scan turns the O(n²) brute force into a single O(n) pass.",
                                answer: true,
                                explain:
                                    "Each step moves a pointer inward, so the two indices meet after at most n steps — linear time.",
                            },
                        },
                        {
                            blocks: [
                                {
                                    type: "callout",
                                    variant: "tip",
                                    md: "The **array must be sorted** — that's what makes moving a pointer predictably raise or lower the sum.",
                                },
                            ],
                            check: {
                                kind: "choice",
                                prompt:
                                    "In [1, 3, 4, 6] with target 9, which pair works?",
                                options: ["1 and 6", "3 and 6", "4 and 6"],
                                answer: 1,
                                explain: "3 + 6 = 9. ✔",
                            },
                        },
                    ],
                },
            ],
        },
    ],
};
