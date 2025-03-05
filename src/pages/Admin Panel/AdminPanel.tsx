import React from "react";

import { TitleHeaderBlock } from "../../components/admin/TitleHeaderBlock";
import SummaryBlock from "../../components/admin/SummaryBlock";
import SkillsBlock from "../../components/admin/SkillsBlock";
import ProjectsBlock from "../../components/admin/ProjectBlock";
import WorkHistoryBlock from "../../components/admin/WorkHistoryBlock";
import { UserDataProvider } from "../../context/UserContext";

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
