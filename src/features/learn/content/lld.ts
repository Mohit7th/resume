import { Track } from "../types";

// Sample starter content — replace/extend with your own curriculum.
export const lld: Track = {
    id: "lld",
    title: "Low-Level Design",
    description:
        "Designing classes and small systems that stay flexible as requirements change.",
    icon: "🧱",
    topics: [
        {
            id: "srp",
            title: "Single Responsibility Principle",
            summary:
                "A class should have one reason to change. Split concerns that vary independently.",
            difficulty: "core",
            tags: ["solid", "oop"],
            lessons: [
                {
                    id: "intro",
                    title: "One reason to change",
                    estMinutes: 7,
                    blocks: [
                        {
                            type: "text",
                            md: "The **Single Responsibility Principle** says a class should do one thing. When a class both *computes* something and *decides how to present or persist* it, a change to either concern forces you to touch — and risk breaking — the other.",
                        },
                        {
                            type: "code",
                            lang: "ts",
                            caption: "Too many responsibilities",
                            code: "class Invoice {\n  constructor(private items: Item[]) {}\n  total() { /* business logic */ }\n  toPdf() { /* formatting */ }\n  save() { /* database access */ }\n}",
                        },
                        {
                            type: "code",
                            lang: "ts",
                            caption: "Split by reason-to-change",
                            code: "class Invoice {\n  constructor(private items: Item[]) {}\n  total() { /* business logic only */ }\n}\n\nclass InvoicePdfRenderer { render(inv: Invoice) { /* ... */ } }\nclass InvoiceRepository { save(inv: Invoice) { /* ... */ } }",
                        },
                        {
                            type: "callout",
                            variant: "note",
                            md: "SRP is about **reasons to change**, not method count. A class with many cohesive methods that all change together is fine.",
                        },
                        {
                            type: "exercise",
                            prompt: "Name the three reasons the first `Invoice` could change.",
                            solution:
                                "Pricing/tax rules (total), presentation format (toPdf), and storage/schema (save) — three independent axes of change.",
                        },
                    ],
                },
            ],
        },
    ],
};
