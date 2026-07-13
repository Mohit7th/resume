// Lightweight, client-only progress tracking (no backend, no accounts).

const STORAGE_KEY = "learn-progress:v1";

type Progress = {
    completed: string[]; // lessonKey values
};

function read(): Progress {
    if (typeof window === "undefined") return { completed: [] };
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return { completed: [] };
        const parsed = JSON.parse(raw) as Partial<Progress>;
        return { completed: parsed.completed ?? [] };
    } catch {
        return { completed: [] };
    }
}

function write(progress: Progress): void {
    if (typeof window === "undefined") return;
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
        // best-effort
    }
}

export function getCompleted(): Set<string> {
    return new Set(read().completed);
}

export function isCompleted(lessonKey: string): boolean {
    return getCompleted().has(lessonKey);
}

export function setCompleted(lessonKey: string, done: boolean): void {
    const completed = getCompleted();
    if (done) completed.add(lessonKey);
    else completed.delete(lessonKey);
    write({ completed: Array.from(completed) });
}
