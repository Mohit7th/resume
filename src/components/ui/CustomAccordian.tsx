import React, { SyntheticEvent } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Define the props for CustomAccordion
interface CustomAccordionProps {
    title: string;
    panel: string;
    expandedPanel: string | false;
    onChange: (panel: string | false) => void;
    children: React.ReactNode;
}

const CustomAccordion: React.FC<CustomAccordionProps> = ({ title, panel, expandedPanel, onChange, children }) => {
    const isExpanded = expandedPanel === panel;

    const handleChange = (event: SyntheticEvent, isExpanded: boolean) => {
        onChange(isExpanded ? panel : false);
    };

    return (
        <Accordion expanded={isExpanded} onChange={handleChange}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>{children}</AccordionDetails>
        </Accordion>
    );
};

export default CustomAccordion;
