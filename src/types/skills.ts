// src/types/skills.ts
export type Skill = {
    name: string;
    experience: string;
    _id: string;
    image: string;
};

export type Skills = {
    programmingLanguages: Skill[];
    webTechnologies: Skill[];
    frontendFrameworks: Skill[];
    backendFrameworks: Skill[];
    databases: Skill[];
    tools: Skill[];
    businessIntelligence: Skill[];
};
