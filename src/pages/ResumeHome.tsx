import { Box, Button, Container, Typography } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import Skills from "../components/home/Skills";
import TitleHeader from "../components/home/TitleHeader";
import Summary from "../components/home/Summary";
import WorkHistory from "../components/home/WorkHistory";
import Projects from "../components/home/Projects";
import Reveal from "../components/ui/Reveal";
import { useUserData } from "../context/UserContext";

function SectionHeading({
    eyebrow,
    title,
    description,
}: {
    eyebrow: string;
    title: string;
    description: string;
}) {
    return (
        <Box sx={{ mb: { xs: 4, md: 6 }, maxWidth: 720 }}>
            <Typography
                component="p"
                sx={{
                    color: "secondary.dark",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontSize: "0.78rem",
                    mb: 1,
                }}
            >
                {eyebrow}
            </Typography>
            <Typography
                variant="h2"
                sx={{ fontSize: { xs: "2rem", md: "2.75rem" }, mb: 1.5 }}
            >
                {title}
            </Typography>
            <Typography color="text.secondary">{description}</Typography>
        </Box>
    );
}

function ResumeContent() {
    const userData = useUserData();

    return (
        <>
            <TitleHeader />
            <Container maxWidth="lg">
                <Box
                    component="section"
                    id="work"
                    sx={{
                        pt: { xs: 7, md: 12 },
                        pb: { xs: 4, md: 6 },
                    }}
                >
                    <Reveal>
                        <SectionHeading
                            eyebrow="Selected work"
                            title="Products built for real users"
                            description="Web platforms, browser extensions, and data systems I have helped deliver. Filter by category, or open a project for details."
                        />
                    </Reveal>
                    <Reveal delay={80}>
                        <Projects />
                    </Reveal>
                </Box>

                <Box
                    component="section"
                    id="experience"
                    sx={{ py: { xs: 4, md: 6 } }}
                >
                    <Reveal>
                        <SectionHeading
                            eyebrow="Experience"
                            title="A track record of end-to-end delivery"
                            description="Roles spanning full-stack engineering, browser products, data platforms, client collaboration, and team mentoring."
                        />
                    </Reveal>
                    <WorkHistory />
                </Box>

                <Box
                    component="section"
                    id="skills"
                    sx={{ py: { xs: 4, md: 6 } }}
                >
                    <Reveal>
                        <SectionHeading
                            eyebrow="Capabilities"
                            title="Tools organized around outcomes"
                            description="The technologies I use to ship maintainable products across the frontend, backend, browser, and data stack."
                        />
                    </Reveal>
                    <Reveal delay={80}>
                        <Skills />
                    </Reveal>
                </Box>

                <Box
                    component="section"
                    id="about"
                    sx={{
                        pt: { xs: 4, md: 6 },
                        pb: { xs: 7, md: 10 },
                    }}
                >
                    <Reveal>
                        <SectionHeading
                            eyebrow="About"
                            title="Engineering with context"
                            description="I work across implementation, technical decisions, communication, and mentoring—not just isolated tickets."
                        />
                    </Reveal>
                    <Reveal delay={80}>
                        <Summary />
                    </Reveal>
                </Box>
            </Container>

            <Box
                component="section"
                id="contact"
                sx={{
                    bgcolor: "primary.dark",
                    color: "primary.contrastText",
                    py: { xs: 8, md: 11 },
                }}
            >
                <Container maxWidth="md" sx={{ textAlign: "center" }}>
                    <Reveal>
                    <Typography
                        component="p"
                        sx={{
                            color: "secondary.light",
                            fontWeight: 700,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            fontSize: "0.78rem",
                            mb: 2,
                        }}
                    >
                        Get in touch
                    </Typography>
                    <Typography
                        variant="h2"
                        sx={{ fontSize: { xs: "2rem", md: "3rem" }, mb: 2 }}
                    >
                        Have a relevant role or project?
                    </Typography>
                    <Typography
                        sx={{
                            color: "rgba(255,255,255,0.76)",
                            maxWidth: 620,
                            mx: "auto",
                            mb: 4,
                        }}
                    >
                        I’m open to conversations about full-stack engineering,
                        browser extensions, data products, and technical
                        leadership.
                    </Typography>
                    <Button
                        href={`mailto:${userData.titleHeader.contact.email}`}
                        variant="contained"
                        endIcon={<ArrowForwardRoundedIcon />}
                        sx={{
                            bgcolor: "white",
                            color: "primary.dark",
                            "&:hover": { bgcolor: "secondary.light" },
                        }}
                    >
                        Email me
                    </Button>
                    </Reveal>
                </Container>
            </Box>
        </>
    );
}

export default function ResumeHome() {
    return <ResumeContent />;
}
