import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { useUserData } from "../../context/UserContext";
import Grid from "@mui/material/Grid2";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function WorkHistory() {
    const userdata = useUserData();
    const accordianData = userdata.workHistory.map((work: any) => (
        <Accordion key={work._id}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <Typography component="span">
                    <b>{work.company}</b> {work.position}
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