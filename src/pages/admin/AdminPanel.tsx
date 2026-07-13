import { useRef, useState } from "react";
import { useImmer } from "use-immer";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    AppBar,
    Box,
    Button,
    Chip,
    Container,
    Snackbar,
    Stack,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import UploadRoundedIcon from "@mui/icons-material/UploadRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { Link as RouterLink } from "react-router-dom";

import { useUserDataDispatch } from "../../context/UserContext";
import { useAuth } from "../../context/AuthContext";
import {
    getSeedData,
    loadResumeData,
    saveResumeData,
    clearResumeData,
    serializeResumeData,
    parseResumeData,
} from "../../data/resumeStorage";
import HeaderEditor from "../../components/admin/editors/HeaderEditor";
import SummaryEditor from "../../components/admin/editors/SummaryEditor";
import SkillsEditor from "../../components/admin/editors/SkillsEditor";
import ProjectsEditor from "../../components/admin/editors/ProjectsEditor";
import WorkHistoryEditor from "../../components/admin/editors/WorkHistoryEditor";

const SECTIONS = [
    { id: "header", label: "Header & contact" },
    { id: "summary", label: "Summary" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "work", label: "Work history" },
];

export default function AdminPanel() {
    // Dispatch is used only to preview the draft on the public pages within the
    // current session — the public site itself always loads the committed seed.
    const dispatch = useUserDataDispatch();
    const { logout } = useAuth();

    // `baseline` is the last-saved draft (from local storage) or the seed.
    // `draft` is the live editable copy; "dirty" = draft differs from baseline.
    const [baseline, setBaseline] = useState(() => loadResumeData());
    const [draft, updateDraft] = useImmer(baseline);
    const [expanded, setExpanded] = useState<string | false>("header");
    const [snackbar, setSnackbar] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const isDirty = JSON.stringify(draft) !== JSON.stringify(baseline);

    function handleSave() {
        saveResumeData(draft);
        setBaseline(draft);
        // Preview in this session; publish for everyone via Export → commit.
        dispatch({ type: "SET_RESUME", payload: draft });
        setSnackbar("Draft saved. Export and commit to publish for everyone.");
    }

    function handleDiscard() {
        updateDraft(() => baseline);
        setSnackbar("Reverted to last saved draft.");
    }

    function handleExport() {
        const blob = new Blob([serializeResumeData(draft)], {
            type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "resume-data.json";
        anchor.click();
        URL.revokeObjectURL(url);
    }

    function handleImportClick() {
        fileInputRef.current?.click();
    }

    function handleImportFile(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        // Reset so selecting the same file again still fires onChange.
        event.target.value = "";
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            try {
                const parsed = parseResumeData(String(reader.result));
                updateDraft(parsed);
                setSnackbar("File imported. Review, then Save to apply.");
            } catch (error) {
                setSnackbar(
                    error instanceof Error
                        ? `Import failed: ${error.message}`
                        : "Import failed: invalid file."
                );
            }
        };
        reader.readAsText(file);
    }

    function handleReset() {
        const confirmed = window.confirm(
            "Reset all content to the built-in defaults? This clears your locally-saved edits."
        );
        if (!confirmed) return;

        const seed = getSeedData();
        clearResumeData();
        setBaseline(seed);
        updateDraft(() => seed);
        dispatch({ type: "SET_RESUME", payload: seed });
        setSnackbar("Content reset to defaults.");
    }

    return (
        <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
            <AppBar
                position="sticky"
                elevation={0}
                sx={{
                    bgcolor: "background.paper",
                    color: "text.primary",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar disableGutters sx={{ gap: 1, flexWrap: "wrap", py: 1 }}>
                        <Typography sx={{ fontWeight: 700, mr: 1 }}>
                            Resume admin
                        </Typography>
                        {isDirty ? (
                            <Chip
                                size="small"
                                color="warning"
                                label="Unsaved changes"
                            />
                        ) : (
                            <Chip size="small" label="All changes saved" />
                        )}

                        <Box sx={{ flexGrow: 1 }} />

                        <Button
                            size="small"
                            startIcon={<UploadRoundedIcon />}
                            onClick={handleImportClick}
                        >
                            Import
                        </Button>
                        <Button
                            size="small"
                            startIcon={<DownloadRoundedIcon />}
                            onClick={handleExport}
                        >
                            Export
                        </Button>
                        <Tooltip title="Discard unsaved edits">
                            <span>
                                <Button
                                    size="small"
                                    color="inherit"
                                    startIcon={<UndoRoundedIcon />}
                                    disabled={!isDirty}
                                    onClick={handleDiscard}
                                >
                                    Discard
                                </Button>
                            </span>
                        </Tooltip>
                        <Button
                            size="small"
                            variant="contained"
                            startIcon={<SaveRoundedIcon />}
                            disabled={!isDirty}
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                        <Button
                            size="small"
                            color="inherit"
                            component={RouterLink}
                            to="/"
                            target="_blank"
                            startIcon={<OpenInNewRoundedIcon />}
                        >
                            View site
                        </Button>
                        <Button
                            size="small"
                            color="inherit"
                            startIcon={<LogoutRoundedIcon />}
                            onClick={logout}
                        >
                            Logout
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>

            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Box
                    sx={{
                        mb: 3,
                        p: 2,
                        borderRadius: 2,
                        bgcolor: "secondary.light",
                        color: "text.secondary",
                        fontSize: "0.85rem",
                    }}
                >
                    Edits here are a <strong>local draft</strong> saved to this
                    browser. The public site always shows the committed content —
                    to publish for everyone, use <strong>Export</strong> and
                    commit the JSON (or paste it into <code>src/components/data.tsx</code>).
                </Box>

                {SECTIONS.map((section) => (
                    <Accordion
                        key={section.id}
                        expanded={expanded === section.id}
                        onChange={(_, isExpanded) =>
                            setExpanded(isExpanded ? section.id : false)
                        }
                        sx={{ mb: 1.5 }}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
                            <Typography sx={{ fontWeight: 700 }}>
                                {section.label}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {section.id === "header" && (
                                <HeaderEditor
                                    data={draft.titleHeader}
                                    update={updateDraft}
                                />
                            )}
                            {section.id === "summary" && (
                                <SummaryEditor
                                    data={draft.summary}
                                    update={updateDraft}
                                />
                            )}
                            {section.id === "skills" && (
                                <SkillsEditor
                                    data={draft.skills}
                                    update={updateDraft}
                                />
                            )}
                            {section.id === "projects" && (
                                <ProjectsEditor
                                    data={draft.projects}
                                    update={updateDraft}
                                />
                            )}
                            {section.id === "work" && (
                                <WorkHistoryEditor
                                    data={draft.workHistory}
                                    update={updateDraft}
                                />
                            )}
                        </AccordionDetails>
                    </Accordion>
                ))}

                <Box sx={{ mt: 4 }}>
                    <Button
                        color="error"
                        variant="outlined"
                        startIcon={<RestartAltRoundedIcon />}
                        onClick={handleReset}
                    >
                        Reset to defaults
                    </Button>
                </Box>
            </Container>

            <input
                ref={fileInputRef}
                type="file"
                accept="application/json"
                hidden
                onChange={handleImportFile}
            />

            <Snackbar
                open={snackbar !== null}
                autoHideDuration={4000}
                onClose={() => setSnackbar(null)}
                message={snackbar ?? ""}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            />
        </Box>
    );
}
