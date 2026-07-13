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
            title: "Single Responsibility",
            summary:
                "A class should have one reason to change. Split concerns that vary independently.",
            difficulty: "core",
            tags: ["solid", "oop"],
            lessons: [
                {
                    id: "intro",
                    title: "One reason to change",
                    estMinutes: 5,
                    steps: [
                        {
                            blocks: [
                                {
                                    type: "text",
                                    md: "Here's an `Invoice` class. Read what it does — then we'll ask a question.",
                                },
                                {
                                    type: "code",
                                    lang: "ts",
                                    caption: "One class, several jobs",
                                    code: "class Invoice {\n  total() { /* pricing & tax rules */ }\n  toPdf() { /* presentation */ }\n  save() { /* database access */ }\n}",
                                },
                            ],
                            check: {
                                kind: "choice",
                                prompt:
                                    "How many independent reasons does this class have to change?",
                                options: ["One", "Two", "Three"],
                                answer: 2,
                                explain:
                                    "Pricing rules (total), presentation format (toPdf), and storage/schema (save) each change for different reasons — three axes.",
                            },
                        },
                        {
                            blocks: [
                                {
                                    type: "text",
                                    md: "The **Single Responsibility Principle** says: split those out so each class has *one* reason to change.",
                                },
                                {
                                    type: "code",
                                    lang: "ts",
                                    caption: "Split by reason-to-change",
                                    code: "class Invoice { total() {} }\nclass InvoicePdfRenderer { render(i: Invoice) {} }\nclass InvoiceRepository { save(i: Invoice) {} }",
                                },
                            ],
                            check: {
                                kind: "truefalse",
                                prompt:
                                    "SRP is really about the number of methods a class has.",
                                answer: false,
                                explain:
                                    "It's about reasons to change, not method count. Many cohesive methods that always change together are fine.",
                            },
                        },
                        {
                            check: {
                                kind: "multi",
                                prompt:
                                    "Which of these are separate responsibilities worth splitting out? (Select all)",
                                options: [
                                    "Business calculation",
                                    "Rendering / formatting",
                                    "Persistence",
                                    "Being an Invoice",
                                ],
                                answers: [0, 1, 2],
                                explain:
                                    "Calculation, formatting, and persistence each vary independently. 'Being an Invoice' is the class's core identity, not a separable job.",
                            },
                        },
                    ],
                },
            ],
        },
    ],
};
