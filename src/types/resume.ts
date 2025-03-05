import { Projects } from "./projects";
import { Skills } from "./skills";
import { Summary } from "./summary";
import { TitleHeader } from "./titleHeader";
import { WorkHistory } from "./workHistory";

export type ResumeData = {
    titleHeader: TitleHeader;
    summary: Summary;
    skills: Skills;
    projects: Projects;
    workHistory: WorkHistory[];
};