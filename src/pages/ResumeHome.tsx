import { Container } from "@mui/material";

import Skills from "../components/home/Skills";
import TitleHeader from "../components/home/TitleHeader";
import Summary from "../components/home/Summary";
import WorkHistory from "../components/home/WorkHistory";

export default function ResumeHome() {
    return (
        <Container fixed>
            <TitleHeader />
            <Summary />
            <WorkHistory />
            <Skills />
        </Container>
    );
}
