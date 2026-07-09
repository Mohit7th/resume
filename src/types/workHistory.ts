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
};
