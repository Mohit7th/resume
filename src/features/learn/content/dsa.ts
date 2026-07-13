import { Track } from "../types";

// Sample starter content — replace/extend with your own curriculum.
export const dsa: Track = {
    id: "dsa",
    title: "Data Structures & Algorithms",
    description:
        "Patterns and problem-solving techniques, explained through small hands-on examples.",
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
                    estMinutes: 6,
                    blocks: [
                        {
                            type: "text",
                            md: "When an array is **sorted**, two indices walking inward can replace an O(n²) scan with a single O(n) pass. One pointer starts at the left, the other at the right, and each step moves one of them based on what you observe.",
                        },
                        {
                            type: "code",
                            lang: "ts",
                            caption: "Does a sorted array contain a pair summing to `target`?",
                            code: "function hasPair(a: number[], target: number) {\n  let l = 0;\n  let r = a.length - 1;\n  while (l < r) {\n    const sum = a[l] + a[r];\n    if (sum === target) return true;\n    if (sum < target) l++; // need a bigger sum\n    else r--;              // need a smaller sum\n  }\n  return false;\n}",
                        },
                        {
                            type: "callout",
                            variant: "tip",
                            md: "The pattern generalizes: reversing in place, merging sorted arrays, and removing duplicates are all two-pointer problems.",
                        },
                        {
                            type: "quiz",
                            question: "Why must the array be sorted for this to work?",
                            options: [
                                "So we can use binary search",
                                "So moving a pointer predictably raises or lowers the sum",
                                "It doesn't need to be sorted",
                            ],
                            answer: 1,
                            explain: "Sorted order is exactly what makes `l++` increase the sum and `r--` decrease it — that determinism is what lets us discard half the space each step.",
                        },
                        {
                            type: "exercise",
                            prompt: "Adapt `hasPair` to return the pair's indices instead of a boolean.",
                            solution:
                                "Return `[l, r]` when `sum === target`, and `[-1, -1]` if the loop finishes without a match.",
                        },
                    ],
                },
            ],
        },
    ],
};
