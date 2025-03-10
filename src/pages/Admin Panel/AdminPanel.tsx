import React from "react";

import { TitleHeaderBlock } from "../../components/admin/TitleHeaderBlock";
import SummaryBlock from "../../components/admin/SummaryBlock";
import SkillsBlock from "../../components/admin/SkillsBlock";
import ProjectsBlock from "../../components/admin/ProjectBlock";
import WorkHistoryBlock from "../../components/admin/WorkHistoryBlock";
import { UserDataProvider } from "../../context/UserContext";
import { Container } from "@mui/material";

const AdminPanel: React.FC = () => {
    return (
        <Container fixed>
            <UserDataProvider>
                <TitleHeaderBlock />
                <SummaryBlock />
                <SkillsBlock />
                <ProjectsBlock />
                <WorkHistoryBlock />
            </UserDataProvider>
        </Container>
    );
};

export default AdminPanel;
