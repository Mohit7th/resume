# Learning Module — Implementation Approach

_Status: Draft (core approach only). The concrete topics/concepts (LLD, HLD,
DSA, …) are intentionally **not** decided here — this document defines the
flexible framework they will plug into later._

## 1. Goal

A small, self-contained **"Learn" module** inside this site where you can teach
yourself (and showcase) concepts through **short, hands-on examples and
activities** — organised by area (Low-Level Design, High-Level Design, DSA,
"anything else") and written from your own experience.

The framework must make **adding a new concept feel like adding data**, not
building a new page. Content grows; the code doesn't.

## 2. Principles

1. **Data-driven** — content is structured data, rendered by generic
   components. Same philosophy as `src/components/data.tsx` today.
2. **Flexible taxonomy** — "tracks" are just data, so LLD / HLD / DSA / System
   Design / Behavioural / anything are all the same shape. No hard-coded list.
3. **Block-based lessons** — a lesson is an ordered list of typed blocks
   (text, code, quiz, …). New activity types = new block type + one renderer.
4. **Incremental** — ships useful in a weekend (text + code + quiz), then grows
   (runnable code, diagrams, progress) without rework.
5. **No backend** — fits GitHub Pages. Progress/notes live in `localStorage`
   (same pattern the résumé already uses).
6. **Simple first** — start with Markdown-string content in TS files; only add
   MDX / live code execution once the shape is proven.

## 3. Scope

**In (v1 core):** tracks → topics → lessons; block renderer with a few block
types; routing + navigation; local progress. Concept-agnostic sample content
(one throwaway topic per track just to prove the shape).

**Out (later):** real curriculum, live code execution, diagrams, search, admin
authoring UI, auth-gating. All designed for, none required for v1.

## 4. Content model

A three-level hierarchy, plus a flexible block list at the leaf. Types (drop in
`src/features/learn/types.ts`):

```ts
export type Track = {
  id: string;              // "dsa", "lld", "hld", ...
  title: string;           // "Data Structures & Algorithms"
  description: string;
  icon?: string;           // reuse the placeholder-icon idea, optional
  topics: Topic[];
};

export type Difficulty = "intro" | "core" | "advanced";

export type Topic = {
  id: string;              // "two-pointers"
  title: string;
  summary: string;
  difficulty: Difficulty;
  tags: string[];          // cross-cutting: "arrays", "caching", "solid"...
  lessons: Lesson[];
};

export type Lesson = {
  id: string;              // "intro"
  title: string;
  estMinutes?: number;
  blocks: Block[];         // the actual content, in order
};
```

`Block` is a discriminated union — **this is the extension point**:

```ts
export type Block =
  | { type: "text"; md: string }                                   // Markdown explanation
  | { type: "code"; lang: string; code: string; caption?: string } // worked example
  | { type: "callout"; variant: "tip" | "note" | "warn"; md: string }
  | { type: "quiz"; question: string; options: string[]; answer: number; explain?: string }
  | { type: "exercise"; prompt: string; solution: string }         // reveal-on-click
  | { type: "diagram"; alt: string; src?: string; mermaid?: string }; // HLD/LLD
```

Everything (an LLD walkthrough, a DSA pattern, an HLD case study) is expressed
as a sequence of these blocks. To add "flashcards" or a "live playground" later,
you add one variant and one renderer — nothing else changes.

## 5. Activity / block renderers (registry pattern)

A single map from `block.type` → React component. The lesson renderer just
iterates:

```tsx
const REGISTRY: Record<Block["type"], React.FC<{ block: any }>> = {
  text: TextBlock,
  code: CodeBlock,
  callout: CalloutBlock,
  quiz: QuizBlock,
  exercise: ExerciseBlock,
  diagram: DiagramBlock,
};

function LessonView({ lesson }: { lesson: Lesson }) {
  return (
    <>
      {lesson.blocks.map((block, i) => {
        const Renderer = REGISTRY[block.type];
        return <Renderer key={i} block={block} />;
      })}
    </>
  );
}
```

Interactivity lives **inside** the block component (a quiz tracks its own
selected answer; an exercise toggles its solution). The framework stays dumb.

## 6. Rendering & routing

Add routes under `/learn` (public by default; can be gated later like `/admin`):

```
/learn                              → Track index (cards)
/learn/:trackId                     → Topic list for a track
/learn/:trackId/:topicId            → Topic overview + lesson list
/learn/:trackId/:topicId/:lessonId  → Lesson (block renderer) + prev/next
```

Reuse existing building blocks: MUI for layout, `react-router` for routes, the
`Reveal` animation, and the card/pill visual language already in the résumé.

## 7. Progress & persistence

Optional but cheap, and mirrors the résumé's storage helper:

- `learn-progress:v1` in `localStorage`: `{ completedLessonIds: string[], bookmarks: string[], notes: Record<lessonId, string> }`.
- Derive "% of track complete", "continue where you left off", and a checkmark
  per lesson. Purely client-side, no accounts.

## 8. Authoring workflow (how you add content)

1. Create/extend a track file, e.g. `src/features/learn/content/dsa.ts`, adding
   a `Topic` with its `lessons[]` of blocks.
2. Register the track in `content/index.ts` (one line).
3. It appears in `/learn` automatically.

Writing a lesson = writing Markdown strings + code strings in the block list.
No component work for normal content. (A future admin editor could edit these
the same way the résumé admin edits `data.tsx`, and Export/Import JSON.)

## 9. Suggested folder structure

```
src/features/learn/
  types.ts                 # Track / Topic / Lesson / Block
  content/
    index.ts               # registers all tracks -> Track[]
    dsa.ts                 # one file per track (data only)
    lld.ts
    hld.ts
  blocks/                  # one renderer per block type
    TextBlock.tsx
    CodeBlock.tsx
    QuizBlock.tsx
    ...
  components/              # TrackCard, LessonNav, ProgressBar, LessonView
  pages/                   # LearnHome, TrackPage, TopicPage, LessonPage
  storage.ts               # progress in localStorage
```

Feature-folder keeps the whole module isolated and removable.

## 10. Tech decisions (and what to decide later)

Fits the current stack — no new runtime infra:

| Concern | v1 choice | Later option |
|---|---|---|
| Content format | Typed TS data + Markdown strings | MDX (Markdown + JSX) for rich lessons |
| Markdown render | `react-markdown` (small dep) | + `remark`/`rehype` plugins |
| Code display | `<pre>` + a light highlighter | Runnable playground (see below) |
| Live code (DSA/JS) | none (static code + expected output) | in-browser eval in a **Web Worker** sandbox |
| Diagrams (HLD/LLD) | image or ASCII | `mermaid` rendered client-side |
| Access | public | gate behind the existing enable-flag pattern |

**Decisions to make later (not blocking):** which tracks/concepts to build
first; public vs private; whether live code execution is worth it; MDX vs TS
data. The model above supports either side of each.

## 11. Phased roadmap

- **Phase 0 — Scaffold:** types, routes, registry, `content/index.ts`, one
  throwaway topic per track. Proves the shape end-to-end.
- **Phase 1 — Core blocks:** `text`, `code`, `callout`, `quiz`, `exercise`.
  Now real lessons are authorable.
- **Phase 2 — Navigation & progress:** prev/next, completion checkmarks,
  "continue learning", track progress bar.
- **Phase 3 — Interactive:** runnable code playground (Web Worker), `mermaid`
  diagrams for HLD/LLD.
- **Phase 4 — Discovery & authoring:** tag/difficulty filters, search, optional
  admin editor + JSON export, MDX if needed.

Each phase is independently shippable and useful.

## 12. Tiny illustrative example (shape only — not real curriculum)

```ts
// content/dsa.ts  (concept-agnostic sample to show the block shape)
export const dsa: Track = {
  id: "dsa",
  title: "Data Structures & Algorithms",
  description: "Patterns explained through small, hands-on examples.",
  topics: [
    {
      id: "two-pointers",
      title: "Two Pointers",
      summary: "Shrink a search space with two indices instead of nesting loops.",
      difficulty: "core",
      tags: ["arrays", "patterns"],
      lessons: [
        {
          id: "intro",
          title: "The idea",
          estMinutes: 6,
          blocks: [
            { type: "text", md: "When an array is **sorted**, two indices walking inward can replace an O(n²) scan." },
            { type: "code", lang: "ts", caption: "Pair that sums to target",
              code: "function hasPair(a: number[], t: number) {\n  let l = 0, r = a.length - 1;\n  while (l < r) {\n    const s = a[l] + a[r];\n    if (s === t) return true;\n    s < t ? l++ : r--;\n  }\n  return false;\n}" },
            { type: "quiz", question: "Why must the array be sorted?",
              options: ["To use binary search", "So moving a pointer predictably raises/lowers the sum", "It doesn't"],
              answer: 1,
              explain: "Sorted order is what makes `l++` increase and `r--` decrease the sum deterministically." },
            { type: "exercise", prompt: "Adapt it to return the pair's indices instead of a boolean.",
              solution: "Track and return `[l, r]` on match; return `[-1, -1]` otherwise." },
          ],
        },
      ],
    },
  ],
};
```

The same three-level + blocks shape expresses an LLD class-design walkthrough, an
HLD "design a URL shortener" case study, or a behavioural STAR story — only the
block content differs.

---

### Next step

Confirm two things and I can scaffold **Phase 0** (empty but working end to end):
1. Live **inside this résumé site** at `/learn` (recommended), or a separate app?
2. **Public** (doubles as a portfolio signal) or **private/gated**?

Then we pick the first track and start filling in real content.
