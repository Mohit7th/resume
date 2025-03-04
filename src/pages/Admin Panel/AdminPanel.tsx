import React from "react";
import { UserDataProvider } from "../../components/UserContext";
import { TitleHeaderBlock } from "./AddHeaderBlock";
import SummaryBlock from "./AddSummaryBlock";
import SkillsBlock from "./AddSkillsBlock";
import ProjectsBlock from "./AddProjectBlock";
import WorkHistoryBlock from "./AddWorkHistoryBlock";

const AdminPanel: React.FC = () => {
    return (
        <UserDataProvider>
            <h1>Admin Panel</h1>
            <TitleHeaderBlock />
            <SummaryBlock />
            <SkillsBlock />
            <ProjectsBlock />
            <WorkHistoryBlock />
        </UserDataProvider>
    );
};

export default AdminPanel;
