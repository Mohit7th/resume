// src/types/projects.ts
export type Project = {
    name: string;
    description: string;
    technologies: string[];
    url: string;
    _id: string;
};

export type Projects = {
    professional: Project[];
    personalProjects: Project[];
};
