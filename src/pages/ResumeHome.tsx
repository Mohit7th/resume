import { Chip, Container, Divider } from "@mui/material";

import Skills from "../components/home/Skills";
import TitleHeader from "../components/home/TitleHeader";
import Summary from "../components/home/Summary";
import WorkHistory from "../components/home/WorkHistory";
import { UserDataProvider } from "../context/UserContext";

export default function ResumeHome() {
    return (
        <Container fixed>
            <UserDataProvider>
                <TitleHeader />
                <Divider>
                    {" "}
                    <Chip label="Summary" />
                </Divider>
                <Summary />
                <Divider />
                <WorkHistory />
                <Skills />
            </UserDataProvider>
        </Container>
    );
}
