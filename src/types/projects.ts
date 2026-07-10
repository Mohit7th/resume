// src/types/projects.ts
export type Projects = {
    name: string;
    description: string;
    technologies: string[];
    url: string;
    _id: string;
    type: string;
    image: string;
    techStack: string;
    responsibilities: string[];
    /** Marks projects that use AI — surfaced via the highlighted "AI" filter. */
    ai?: boolean;
};
