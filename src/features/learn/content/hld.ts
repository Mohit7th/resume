import { Track } from "../types";

// Sample starter content — replace/extend with your own curriculum.
export const hld: Track = {
    id: "hld",
    title: "High-Level Design",
    description:
        "System design fundamentals — components, trade-offs, and how they fit together at scale.",
    icon: "🏗️",
    topics: [
        {
            id: "url-shortener",
            title: "Design a URL Shortener",
            summary:
                "A classic warm-up: generate short codes, store mappings, and redirect at scale.",
            difficulty: "core",
            tags: ["system-design", "caching"],
            lessons: [
                {
                    id: "overview",
                    title: "The core flow",
                    estMinutes: 6,
                    steps: [
                        {
                            blocks: [
                                {
                                    type: "text",
                                    md: "A URL shortener maps a short **code** to a long URL. Creating a mapping is the *write* path; resolving a code to redirect is the *read* path.",
                                },
                                {
                                    type: "diagram",
                                    alt: "Client → API → cache/DB → redirect",
                                    mermaid: "flowchart LR\n  U[Client] --> A[API]\n  A -->|hit| C[(Cache)]\n  A -->|miss| DB[(Key-Value Store)]\n  A --> R[301 Redirect]",
                                },
                            ],
                            check: {
                                kind: "choice",
                                prompt:
                                    "Which path do you expect to happen far more often?",
                                options: [
                                    "Writes (creating short links)",
                                    "Reads (resolving & redirecting)",
                                ],
                                answer: 1,
                                explain:
                                    "A link is created once but visited many times — reads vastly outnumber writes. That ratio drives the whole design.",
                            },
                        },
                        {
                            blocks: [
                                {
                                    type: "callout",
                                    variant: "tip",
                                    md: "Because reads dominate and mappings rarely change, a **cache** absorbs almost all traffic with a very high hit rate.",
                                },
                            ],
                            check: {
                                kind: "truefalse",
                                prompt:
                                    "7 characters of base-62 give only a few thousand possible codes.",
                                answer: false,
                                explain:
                                    "62⁷ ≈ 3.5 trillion combinations — plenty of room for unique short codes.",
                            },
                        },
                        {
                            check: {
                                kind: "choice",
                                prompt:
                                    "Two writers generate the same code at the same instant. What's the risk?",
                                options: [
                                    "Nothing — codes are random",
                                    "One mapping overwrites the other",
                                    "The cache slows down",
                                ],
                                answer: 1,
                                explain:
                                    "A collision would clobber an existing mapping. Prevent it with a unique constraint + retry, or derive codes from a globally unique ID source.",
                            },
                        },
                    ],
                },
            ],
        },
    ],
};
