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
                    estMinutes: 8,
                    blocks: [
                        {
                            type: "text",
                            md: "A URL shortener maps a short code to a long URL. The write path *creates* a mapping; the read path (far more frequent) *resolves* a code and redirects. Reads dominating writes is the key insight that drives caching.",
                        },
                        {
                            type: "diagram",
                            alt: "Client → API → cache/DB → redirect",
                            mermaid: "flowchart LR\n  U[Client] --> A[API]\n  A -->|miss| DB[(Key-Value Store)]\n  A -->|hit| C[(Cache)]\n  A --> R[301 Redirect]",
                        },
                        {
                            type: "callout",
                            variant: "tip",
                            md: "Short codes are just a base-62 encoding of an ID (or a hash). 7 characters of base-62 already give ~3.5 trillion combinations.",
                        },
                        {
                            type: "quiz",
                            question: "Why cache the code → URL mapping aggressively?",
                            options: [
                                "Writes are expensive",
                                "Reads vastly outnumber writes and the mapping rarely changes",
                                "To save storage",
                            ],
                            answer: 1,
                            explain: "The read/write ratio is extreme and mappings are effectively immutable, so a cache absorbs almost all traffic with a very high hit rate.",
                        },
                        {
                            type: "exercise",
                            prompt: "What breaks if two writers generate the same short code at once, and how would you prevent it?",
                            solution:
                                "A collision would overwrite an existing mapping. Prevent it with a unique constraint + retry, or by deriving codes from a globally unique ID source (e.g. an ID generator / DB sequence).",
                        },
                    ],
                },
            ],
        },
    ],
};
