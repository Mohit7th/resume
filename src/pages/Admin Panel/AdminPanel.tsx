import React from "react";
import { UserDataProvider } from "../../components/UserContext";
import { TitleHeaderBlock } from "./TitleHeaderBlock";
import SummaryBlock from "./SummaryBlock";
import SkillsBlock from "./SkillsBlock";
import ProjectsBlock from "./ProjectBlock";
import WorkHistoryBlock from "./WorkHistoryBlock";

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
