// src/types/workHistory.ts
export type WorkHistory = {
    company: string;
    position: string;
    startDate: string;
    endDate: string | null;
    website: string;
    responsibilities: string[];
    _id: string;
    image: string;
    /** Optional highlight, e.g. "Co-founder", shown as a small chip. */
    badge?: string;
};
