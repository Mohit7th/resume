import { ResumeData } from "../types";
import { resumeData as seedData } from "../components/data";

// Bump the version suffix if the shape of ResumeData changes in a
// backwards-incompatible way so stale drafts are ignored.
const STORAGE_KEY = "mohit-resume-data:v1";

/**
 * The built-in résumé content shipped in the bundle. Used as the default when
 * nothing has been saved locally and as the target of "Reset to defaults".
 */
export function getSeedData(): ResumeData {
    return seedData;
}

/**
 * Load the working résumé data. Prefers a locally-saved draft (from the admin
 * editor) and falls back to the bundled seed. Any parse/quota error falls back
 * to the seed so the public site can never be broken by bad local storage.
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

        const parsed = JSON.parse(raw) as Partial<ResumeData>;
        // Shallow-merge over the seed so a partial/old draft still renders.
        return { ...seedData, ...parsed } as ResumeData;
    } catch {
        return seedData;
    }
}

/** Persist the current résumé data to local storage. */
export function saveResumeData(data: ResumeData): void {
    if (typeof window === "undefined") {
        return;
    }

    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
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
