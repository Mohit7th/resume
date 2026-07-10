import { ResumeData } from "../types";
import { resumeData as seedData } from "../components/data";

// Bump the version suffix if the stored shape changes incompatibly.
const STORAGE_KEY = "mohit-resume-data:v2";

// Cheap, stable string hash (djb2) used to detect when the committed seed has
// changed since a local draft was saved.
function hashString(value: string): string {
    let hash = 5381;
    for (let i = 0; i < value.length; i += 1) {
        hash = ((hash << 5) + hash) ^ value.charCodeAt(i);
    }
    return (hash >>> 0).toString(36);
}

function seedHash(): string {
    return hashString(JSON.stringify(seedData));
}

interface StoredDraft {
    seedHash: string;
    data: ResumeData;
}

/**
 * The built-in résumé content shipped in the bundle. This is the source of
 * truth — a locally-saved draft only wins while it was based on this exact seed.
 */
export function getSeedData(): ResumeData {
    return seedData;
}

/**
 * Load the working résumé data. Prefers a locally-saved draft (from the admin
 * editor) ONLY when it was saved against the current committed seed. If the seed
 * has since changed (e.g. a new deploy), the stale draft is discarded so the
 * committed content always wins. Any error also falls back to the seed.
 */
export function loadResumeData(): ResumeData {
    if (typeof window === "undefined") {
        return seedData;
    }

    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            return seedData;
        }

        const parsed = JSON.parse(raw) as Partial<StoredDraft>;
        if (!parsed || parsed.seedHash !== seedHash() || !parsed.data) {
            // Draft predates the current seed (or is malformed) — drop it.
            window.localStorage.removeItem(STORAGE_KEY);
            return seedData;
        }

        return { ...seedData, ...parsed.data } as ResumeData;
    } catch {
        return seedData;
    }
}

/** Persist the current résumé data, tagged with the seed it was based on. */
export function saveResumeData(data: ResumeData): void {
    if (typeof window === "undefined") {
        return;
    }

    try {
        const payload: StoredDraft = { seedHash: seedHash(), data };
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
        // Ignore quota / private-mode failures — persistence is best-effort.
    }
}

/** Remove any locally-saved draft, returning the site to the bundled seed. */
export function clearResumeData(): void {
    if (typeof window === "undefined") {
        return;
    }

    window.localStorage.removeItem(STORAGE_KEY);
}

/** Serialize résumé data as a pretty-printed JSON string for export. */
export function serializeResumeData(data: ResumeData): string {
    return JSON.stringify(data, null, 4);
}

/**
 * Parse and lightly validate an imported JSON string. Throws a helpful error
 * when the payload is not a recognizable résumé document.
 */
export function parseResumeData(json: string): ResumeData {
    const parsed = JSON.parse(json) as Partial<ResumeData>;

    const requiredKeys: Array<keyof ResumeData> = [
        "titleHeader",
        "summary",
        "skills",
        "projects",
        "workHistory",
    ];

    const missing = requiredKeys.filter((key) => parsed[key] === undefined);
    if (missing.length > 0) {
        throw new Error(
            `Imported file is missing required sections: ${missing.join(", ")}`
        );
    }

    return { ...seedData, ...parsed } as ResumeData;
}
