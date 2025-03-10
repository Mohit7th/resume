import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import { useUserData } from "../../context/UserContext";
import Grid from "@mui/material/Grid2";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme } from "@mui/material/styles";
import { SyntheticEvent, useState } from "react";

import CheckIcon from "@mui/icons-material/Check";
import { calculateYearsAndMonths } from "../../utils/dateUtils";

export default function WorkHistory() {
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const theme = useTheme();
    const userdata = useUserData();
    const accordianData = userdata.workHistory.map((work: any) => {
        const { years, months } = calculateYearsAndMonths(
            work.startDate,
            work.endDate
        );
        return (
            <Grid size={12}>
                <Accordion
                    key={work._id}
                    sx={{
                        backgroundColor: theme.palette.primary.dark,
                        color: theme.palette.primary.contrastText,
                    }}
                    expanded={expanded === work._id}
                    onChange={handleChange(work._id)}
                >
                    <AccordionSummary
                        expandIcon={
                            <ExpandMoreIcon
                                sx={{
                                    color: theme.palette.primary.contrastText,
                                }}
                            />
                        }
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography component="span">
                            <b>{work.company}</b>
                        </Typography>
                        <Divider
                            orientation="vertical"
                            flexItem
                            sx={{
                                mx: 1,
                                backgroundColor:
                                    theme.palette.primary.contrastText,
                            }}
                        />
                        <Typography
                            component="span"
                            sx={{
                                color: theme.palette.primary.contrastText,
                                fontWeight: 500,
                            }}
                        >
                            {work.position}
                        </Typography>
                        <Divider
                            orientation="vertical"
                            flexItem
                            sx={{
                                mx: 1,
                                backgroundColor:
                                    theme.palette.primary.contrastText,
                            }}
                        />
                        <Typography
                            component="span"
                            sx={{
                                color: theme.palette.primary.contrastText,
                                fontWeight: 500,
                            }}
                        >
                            {years} years {months > 0 ? `${months} months` : ""}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails
                        sx={{
                            backgroundColor: theme.palette.primary.light,
                            color: theme.palette.primary.contrastText,
                        }}
                    >
                        <List dense={true}>
                            {work.reponsibilities.map(
                                (resp: any, index: number) => (
                                    <ListItem key={index}>
                                        <ListItemIcon>
                                            <CheckIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={resp} />
                                    </ListItem>
                                )
                            )}
                        </List>
                    </AccordionDetails>
                </Accordion>
            </Grid>
        );
    });

    return (
        <Grid container spacing={1} sx={{ mb: 5, mt: 5 }}>
            {accordianData}
        </Grid>
    );
}
