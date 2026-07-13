import "./resume.css";
import { useEffect, useState } from "react";
import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Link as RouterLink } from "react-router-dom";
import { useUserData } from "../context/UserContext";
import { getPublicAssetPath } from "../utils/publicPath";

function formatMonthYear(value: string | null) {
    if (!value) return "Present";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat("en", {
        month: "short",
        year: "numeric",
    }).format(date);
}

// Keep the resume scannable: one line per project.
function firstSentence(text: string) {
    const match = text.match(/^[^.]*\./);
    return match ? match[0].trim() : text;
}

const PROJECT_LIMIT = 4;
const BULLETS_PER_ROLE = 3;

export default function ResumePage() {
    const { titleHeader, summary, skills, projects, workHistory, education } =
        useUserData();
    const [atsView, setAtsView] = useState(false);

    useEffect(() => {
        const previousTitle = document.title;
        document.title = `${titleHeader.name} — Resume`;
        return () => {
            document.title = previousTitle;
        };
    }, [titleHeader.name]);

    const currentRole = workHistory.find((role) => role.badge);
    const roleLine = currentRole?.badge
        ? `${titleHeader.title} · ${currentRole.badge}`
        : titleHeader.title;

    const summaryText = summary.detailed.split("\n\n")[0];
    const featuredProjects = projects.slice(0, PROJECT_LIMIT);

    return (
        <div className="resume-page">
            <div className="resume-toolbar no-print">
                <Button
                    component={RouterLink}
                    to="/"
                    color="inherit"
                    startIcon={<ArrowBackRoundedIcon />}
                >
                    Back to site
                </Button>
                <div className="resume-toolbar-actions">
                    <ToggleButtonGroup
                        size="small"
                        exclusive
                        value={atsView ? "ats" : "web"}
                        onChange={(_event, next) => {
                            if (next) setAtsView(next === "ats");
                        }}
                        aria-label="Resume view"
                    >
                        <ToggleButton value="web">Web view</ToggleButton>
                        <ToggleButton value="ats">ATS view</ToggleButton>
                    </ToggleButtonGroup>
                    <Button
                        variant="contained"
                        startIcon={<DownloadRoundedIcon />}
                        onClick={() => window.print()}
                    >
                        Download PDF
                    </Button>
                </div>
            </div>

            <p className="resume-note no-print">
                The PDF always downloads as an{" "}
                <strong>ATS-optimized single-column layout</strong> (no columns
                or graphics) — best for recruiter screening systems. Use{" "}
                <strong>ATS view</strong> to preview it.
            </p>

            <article className={`resume${atsView ? " ats" : ""}`}>
                {/* ---------- Sidebar ---------- */}
                <aside className="resume-sidebar">
                    {titleHeader.image && (
                        <img
                            className="resume-photo"
                            src={getPublicAssetPath(titleHeader.image)}
                            alt={titleHeader.name}
                        />
                    )}
                    <h1 className="resume-name">{titleHeader.name}</h1>
                    <p className="resume-role">{roleLine}</p>

                    <h2 className="resume-side-h">Contact</h2>
                    <div className="resume-contact-item">
                        <span className="label">Location</span>
                        {titleHeader.contact.address}
                    </div>
                    <div className="resume-contact-item">
                        <span className="label">Email</span>
                        <a href={`mailto:${titleHeader.contact.email}`}>
                            {titleHeader.contact.email}
                        </a>
                    </div>
                    <div className="resume-contact-item">
                        <span className="label">Phone</span>
                        {titleHeader.contact.phone}
                    </div>

                    <h2 className="resume-side-h">Skills</h2>
                    <div className="resume-pills">
                        {skills.webTechnologies.slice(0, 10).map((skill) => (
                            <span className="resume-pill" key={skill._id}>
                                {skill.name}
                            </span>
                        ))}
                    </div>

                    <h2 className="resume-side-h">Data &amp; BI</h2>
                    <div className="resume-pills">
                        {skills.businessIntelligence
                            .slice(0, 6)
                            .map((skill) => (
                                <span className="resume-pill" key={skill._id}>
                                    {skill.name}
                                </span>
                            ))}
                    </div>

                    {education.length > 0 && (
                        <>
                            <h2 className="resume-side-h">Education</h2>
                            {education.map((edu) => (
                                <div className="resume-side-item" key={edu._id}>
                                    <div className="resume-side-item-title">
                                        {edu.degree}
                                    </div>
                                    <div className="resume-side-item-sub">
                                        {edu.institution}
                                    </div>
                                    <div className="resume-side-item-meta">
                                        {edu.startYear} — {edu.endYear}
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </aside>

                {/* ---------- Main ---------- */}
                <div className="resume-main">
                    <section className="resume-section">
                        <h2>Summary</h2>
                        <p className="resume-summary">{summaryText}</p>
                    </section>

                    <section className="resume-section">
                        <h2>Experience</h2>
                        {workHistory.map((role) => (
                            <div className="resume-entry" key={role._id}>
                                <div className="resume-entry-date">
                                    {formatMonthYear(role.startDate)} —{" "}
                                    {formatMonthYear(role.endDate)}
                                </div>
                                <div>
                                    <h3>
                                        {role.position}
                                        {role.badge ? ` · ${role.badge}` : ""}
                                    </h3>
                                    <p className="resume-entry-company">
                                        {role.company}
                                    </p>
                                    {role.responsibilities.length > 0 && (
                                        <ul>
                                            {role.responsibilities
                                                .slice(0, BULLETS_PER_ROLE)
                                                .map((item, index) => (
                                                    <li key={index}>{item}</li>
                                                ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        ))}
                    </section>

                    <section className="resume-section">
                        <h2>Selected Projects</h2>
                        {featuredProjects.map((project) => {
                            const tech =
                                project.technologies.length > 0
                                    ? project.technologies
                                    : [project.techStack];
                            return (
                                <div className="resume-entry" key={project._id}>
                                    <div className="resume-entry-date">
                                        {project.type === "browserExtension"
                                            ? "Extension"
                                            : project.type ===
                                              "businessIntelligence"
                                            ? "Data & BI"
                                            : "Web app"}
                                    </div>
                                    <div>
                                        <h3>
                                            {project.name}
                                            {project.ai ? " · AI" : ""}
                                        </h3>
                                        <p>
                                            {firstSentence(project.description)}
                                        </p>
                                        <p className="resume-tech">
                                            {tech.join(" · ")}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </section>
                </div>
            </article>
        </div>
    );
}
