// src/types/skills.ts
export type Skill = {
    name: string;
    experience: string;
    _id: string;
    image: string;
    type: string;
};

export type Skills = {
    webTechnologies: Skill[];
    browserExtension: Skill[];
    businessIntelligence: Skill[];
};
