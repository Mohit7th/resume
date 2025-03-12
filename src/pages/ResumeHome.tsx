import { Chip, Container, Divider, useTheme } from "@mui/material";

import Skills from "../components/home/Skills";
import TitleHeader from "../components/home/TitleHeader";
import Summary from "../components/home/Summary";
import WorkHistory from "../components/home/WorkHistory";
import { UserDataProvider } from "../context/UserContext";

export default function ResumeHome() {
    const theme = useTheme();
    return (
        <Container fixed>
            <UserDataProvider>
                <TitleHeader />
                <Divider>
                    {" "}
                    <Chip label="Summary" sx={{backgroundColor: theme.palette.primary.contrastText, color: theme.palette.primary.dark, fontSize: 15}}/>
                </Divider>
                <Summary />
                <Divider />
                <WorkHistory />
                <Skills />
            </UserDataProvider>
        </Container>
    );
}
