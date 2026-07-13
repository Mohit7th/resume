// Content model for the Learn module — a Brilliant-style, step-by-step,
// learn-by-doing flow. See docs/learning-module-approach.md.

export type Difficulty = "intro" | "core" | "advanced";

/** Teaching content (non-interactive) shown within a step. */
export type Block =
    | { type: "text"; md: string }
    | { type: "code"; lang: string; code: string; caption?: string }
    | { type: "callout"; variant: "tip" | "note" | "warn"; md: string }
    | { type: "diagram"; alt: string; src?: string; mermaid?: string };

/** An interactive checkpoint that gates progression to the next step. */
export type Check =
    | {
          kind: "choice";
          prompt: string;
          options: string[];
          answer: number; // index of the correct option
          explain?: string;
      }
    | {
          kind: "multi";
          prompt: string;
          options: string[];
          answers: number[]; // indices of all correct options
          explain?: string;
      }
    | {
          kind: "truefalse";
          prompt: string;
          answer: boolean;
          explain?: string;
      }
    | {
          kind: "input";
          prompt: string;
          accept: string[]; // accepted answers (case-insensitive)
          placeholder?: string;
          explain?: string;
      };

/** One screen of a lesson: some teaching, an optional interaction, or both. */
export type Step = {
    blocks?: Block[];
    check?: Check;
};

export type Lesson = {
    id: string;
    title: string;
    estMinutes?: number;
    steps: Step[];
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
