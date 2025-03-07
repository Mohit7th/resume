import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Divider,
    Typography,
} from "@mui/material";
import { useUserData } from "../../context/UserContext";
import Grid from "@mui/material/Grid2";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme } from "@mui/material/styles";
import { SyntheticEvent, useState } from "react";

export default function WorkHistory() {
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const theme = useTheme();
    const userdata = useUserData();
    const accordianData = userdata.workHistory.map((work: any) => (
        <Accordion
            key={work._id}
            sx={{
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.primary.contrastText
            }}
            expanded={expanded === work._id}
            onChange={handleChange(work._id)}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <Typography component="span">
                    <b>{work.company}</b><Divider orientation="vertical" flexItem /> {work.position}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                {work.reponsibilities.map((resp: any, index: number) => (
                    <p key={index}>{resp}</p>
                ))}
            </AccordionDetails>
        </Accordion>
    ));

    return (
        <Grid container spacing={2} sx={{ mb: 5 }}>
            <Grid size={12}>{accordianData}</Grid>
        </Grid>
    );
}
