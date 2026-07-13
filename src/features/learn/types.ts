// Content model for the Learn module. Everything is data — see
// docs/learning-module-approach.md for the rationale.

export type Difficulty = "intro" | "core" | "advanced";

/** A block is one unit of lesson content. Add a variant + a renderer to extend. */
export type Block =
    | { type: "text"; md: string }
    | { type: "code"; lang: string; code: string; caption?: string }
    | { type: "callout"; variant: "tip" | "note" | "warn"; md: string }
    | {
          type: "quiz";
          question: string;
          options: string[];
          answer: number;
          explain?: string;
      }
    | { type: "exercise"; prompt: string; solution: string }
    | { type: "diagram"; alt: string; src?: string; mermaid?: string };

export type Lesson = {
    id: string;
    title: string;
    estMinutes?: number;
    blocks: Block[];
};

export type Topic = {
    id: string;
    title: string;
    summary: string;
    difficulty: Difficulty;
    tags: string[];
    lessons: Lesson[];
};

export type Track = {
    id: string;
    title: string;
    description: string;
    /** One or two emoji used as a lightweight icon on cards. */
    icon?: string;
    topics: Topic[];
};
