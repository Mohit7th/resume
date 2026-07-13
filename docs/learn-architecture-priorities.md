# Learn Module — Architecture Priorities

_Scope: the `/learn` feature (`src/features/learn/`) as it grows from a working
scaffold into a Brilliant-style learning platform._

_Context that shapes these priorities: solo author, static hosting (GitHub
Pages, no backend), content-heavy trajectory, interactive learn-by-doing._

The guiding idea: **content is the product and will grow 10–100×.** Optimise the
architecture so content and interaction types can multiply *without* app
rewrites — and defer anything multi-user until the content and engine are solid.

---

## Priorities (ranked)

### P1 — Get content out of the code bundle _(highest leverage)_

**Today:** every lesson is a `.ts` file eagerly imported into `tracks[]`
(`content/index.ts`). So **all content is compiled into the JS bundle, and every
lesson edit requires a full rebuild + redeploy.** The lazy chunk already sits at
~42 KB gzip with only three tiny sample topics — this grows linearly with the
curriculum.

**Move:** content-as-data, loaded on demand.

- Short term (still static): make the registry `id → () => import('./content/dsa')`
  so each **track/topic loads only when opened**. Split large tracks per topic.
- Medium term: author content as **JSON** under `public/content/…` (or a gist /
  headless source) fetched at runtime, so adding a lesson is a data change, not a
  code change + redeploy.

**Unblocks:** small initial load, authoring without touching app code, a future
admin/CMS editor, and (later) a backend — all without reworking the player.

### P2 — Treat the content schema as a versioned, validated contract

**Why:** `types.ts` (`Step` / `Block` / `Check`) is effectively the platform's
public API. As interaction types and authors multiply, a bad lesson (answer
index out of range, empty `options`, duplicate ids) should **fail loudly, not
render silently wrong.**

**Move:**

- Add **runtime validation** (e.g. `zod` schemas mirroring the types) at content
  load — reject/flag malformed lessons.
- Add a **`schemaVersion`** so cached content and stored progress can be migrated
  as the model evolves.
- Pair with a build/test-time content lint (see P5).

**Unblocks:** safe authoring, safe caching and migration.

### P3 — Put progress behind an interface, not `localStorage` directly

**Today:** `storage.ts` hard-codes `localStorage`.

**Why:** "learning platform" implies progress that follows the learner across
devices (and streaks / XP later), which eventually wants a service. Don't build
that now — just don't cement `localStorage` into the engine.

**Move:** define a `ProgressStore` interface; `localStorage` is the default
implementation. The player and pages depend on the interface.

```ts
interface ProgressStore {
  isCompleted(key: string): boolean;
  setCompleted(key: string, done: boolean): void;
  // room to grow: attempts, lastStep, streak…
}
```

**Unblocks:** swap to a remote store later with zero player changes; attempts &
analytics.

### P4 — Formalize the interaction contract so the player stays "dumb"

**Why:** the richness you want (sliders / "explore" steps, drag-order, runnable
code) comes from interaction types. The `LessonPlayer` must only **sequence and
gate** — it should never know about a specific interaction's internals.

**Move:** a small, uniform contract per interaction, resolved from a registry
keyed by `kind`:

```ts
interface Interaction<TState> {
  init(): TState;
  isAnswerable(state: TState): boolean;
  evaluate(state: TState): { correct: boolean; feedback?: string };
  render(props: { state: TState; onChange: (s: TState) => void; submitted: boolean }): JSX.Element;
}
```

You're ~80% there already (`checks/eval.ts` + `CheckView`); making it a formal
registry is what lets a Web Worker code-runner or an interactive widget slot in
without destabilising the engine.

**Unblocks:** hard interactions (code execution, simulations) added in isolation.

### P5 — Keep the four layers clean + add content-validation tests

Maintain clear boundaries — **content · rendering · engine · persistence** — and
add one test that imports every track and asserts schema validity (unique ids,
answer indices in range, non-empty prompts/options). Cheap insurance that scales
with the curriculum.

---

## Explicitly defer (do NOT build yet)

Backend, auth, cross-device sync, gamification systems (streaks/XP infra), live
code sandbox. Building multi-user infrastructure for a solo learner is premature.
The purpose of P1–P4 is to make these **addable later without rework**, not to
add them now.

---

## Already solid (keep doing)

- Data-driven content model.
- Discriminated unions with exhaustiveness guards (`never` checks in the render
  switches).
- Lazy-loaded feature chunk; feature-folder isolation.
- Controlled / stateless interaction rendering (state owned by the engine).

---

## Recommended sequence

1. **P1 + P2 together** — the foundation everything else leans on, and cheap now
   with only three tracks. Retrofitting content-loading + validation after 50
   lessons is painful.
2. **P3** — small interface refactor of `storage.ts`.
3. **P4** — promote the check logic into a formal interaction registry when you
   add the first non-trivial interaction type (e.g. an "explore" slider or a
   code runner).
4. **P5** — add the content-lint test alongside P2.

| Priority | Effort now | Cost of delay | Do when |
|----------|-----------|---------------|---------|
| P1 content out of bundle | Medium | High (grows with content) | Next |
| P2 validated schema | Low–Med | High (silent bad content) | Next (with P1) |
| P3 progress interface | Low | Low–Med | Anytime |
| P4 interaction registry | Medium | Med (player churn) | Before first complex interaction |
| P5 layering + content tests | Low | Low | With P2 |
