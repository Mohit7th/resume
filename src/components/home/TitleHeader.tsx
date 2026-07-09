import Grid from "@mui/material/Grid2";
import {
    Box,
    Button,
    Container,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { siteConfig } from "../../config/siteConfig";
import { useUserData } from "../../context/UserContext";
import { calculateYearsAndMonths } from "../../utils/dateUtils";
import { getPublicAssetPath } from "../../utils/publicPath";

export default function TitleHeader() {
    const { titleHeader, summary, workHistory } = useUserData();
    const resumePdfUrl = getPublicAssetPath(siteConfig.resumePdfPath);
    const heroPatternUrl = getPublicAssetPath("/assets/subtle-prism.svg");
    const illustrationUrl = getPublicAssetPath("/assets/programming.svg");
    const earliestStartDate = workHistory.reduce(
        (earliest, work) =>
            new Date(work.startDate) < new Date(earliest)
                ? work.startDate
                : earliest,
        workHistory[0]?.startDate ?? new Date().toISOString()
    );
    const { years: totalExperienceYears } =
        calculateYearsAndMonths(earliestStartDate);
    const github = titleHeader.socials.find((social) => social.name === "GitHub");
    const linkedIn = titleHeader.socials.find(
        (social) => social.name === "LinkedIn"
    );

    return (
        <Box
            component="section"
            id="top"
            sx={{
                position: "relative",
                overflow: "hidden",
                bgcolor: "secondary.light",
                borderBottom: "1px solid",
                borderColor: "divider",
                "&::after": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url('${heroPatternUrl}')`,
                    backgroundSize: "cover",
                    opacity: 0.22,
                    pointerEvents: "none",
                },
            }}
        >
            <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
                <Grid
                    container
                    spacing={{ xs: 5, md: 8 }}
                    alignItems="center"
                    sx={{ minHeight: { md: 640 }, py: { xs: 8, md: 10 } }}
                >
                    <Grid size={{ xs: 12, md: 7 }}>
                        <Typography
                            component="p"
                            sx={{
                                color: "secondary.dark",
                                fontWeight: 700,
                                mb: 2,
                            }}
                        >
                            {titleHeader.title} · {titleHeader.contact.address}
                        </Typography>
                        <Typography
                            component="h1"
                            variant="h1"
                            sx={{
                                color: "primary.dark",
                                fontSize: {
                                    xs: "3rem",
                                    sm: "4rem",
                                    md: "5rem",
                                },
                                mb: 3,
                            }}
                        >
                            {titleHeader.name}
                        </Typography>
                        <Typography
                            sx={{
                                maxWidth: 680,
                                color: "text.secondary",
                                fontSize: { xs: "1.1rem", md: "1.3rem" },
                                lineHeight: 1.65,
                                mb: 2,
                            }}
                        >
                            I build scalable web applications, browser
                            extensions, and data products from idea to delivery.
                        </Typography>
                        <Typography
                            sx={{
                                color: "primary.main",
                                fontWeight: 600,
                                mb: 4,
                            }}
                        >
                            {totalExperienceYears}+ years in software delivery ·{" "}
                            {summary.short}
                        </Typography>
                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={1.5}
                            sx={{ alignItems: { xs: "stretch", sm: "center" } }}
                        >
                            <Button
                                href={resumePdfUrl}
                                download="Mohit_Uniyal_Resume.pdf"
                                variant="contained"
                                startIcon={<DownloadRoundedIcon />}
                            >
                                Download résumé
                            </Button>
                            <Button
                                href={`mailto:${titleHeader.contact.email}`}
                                variant="outlined"
                                startIcon={<EmailRoundedIcon />}
                            >
                                Contact me
                            </Button>
                            <Stack direction="row" spacing={0.5}>
                                {github && (
                                    <IconButton
                                        href={github.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="View Mohit Uniyal on GitHub"
                                        sx={{ color: "primary.main" }}
                                    >
                                        <GitHubIcon />
                                    </IconButton>
                                )}
                                {linkedIn && (
                                    <IconButton
                                        href={linkedIn.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="View Mohit Uniyal on LinkedIn"
                                        sx={{ color: "primary.main" }}
                                    >
                                        <LinkedInIcon />
                                    </IconButton>
                                )}
                            </Stack>
                        </Stack>
                    </Grid>
                    <Grid
                        size={{ xs: 12, md: 5 }}
                        sx={{ display: "flex", justifyContent: "center" }}
                    >
                        <Box
                            component="img"
                            src={illustrationUrl}
                            alt="Developer working at a computer"
                            sx={{
                                width: "100%",
                                maxWidth: 430,
                                height: "auto",
                                filter: "drop-shadow(0 24px 36px rgba(23,32,74,.15))",
                            }}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
