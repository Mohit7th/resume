import Grid from "@mui/material/Grid2";
import { useState } from "react";
import { useUserData } from "../../context/UserContext";
import { Avatar, Box, Chip, Stack, Tooltip, Typography } from "@mui/material";
import FormDialog from "../ui/RatingFormDialog";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useTheme } from "@mui/material/styles";

export default function TitleHeader() {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const userdata = useUserData();
    const { titleHeader, summary } = userdata;
    const theme = useTheme();

    function handleDownloadCV() {
        const date = new Date();
        const pdfFilePath = "/assets/Mohit_Uniyal.pdf"; // Update with your actual PDF file path
        const link = document.createElement("a");
        link.href = pdfFilePath;
        link.download = `Mohit_Uniyal_${date}.pdf`; // Change this to desired file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function handleContactMe(recipientEmail: string) {
        window.location.href = `mailto:${recipientEmail}`;
    }

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const primaryTextColor = theme.palette.primary.contrastText;

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                borderRadius: 1,
                bgcolor: "primary.dark",
                pt: 5,
                mt: 8,
            }}
        >
            <Grid container spacing={2} sx={{ mb: 5 }} alignItems="center">
                {/* Profile Picture */}
                <Grid
                    size={{ xs: 12, md: 6 }}
                    sx={{
                        display: "flex",
                        justifyContent: { xs: "center", md: "flex-start" }, // Center on small screens, left-align on medium+
                        alignItems: "center",
                        pl: { md: 4 }, // Add padding only on medium+ screens
                        textAlign: { xs: "center", md: "left" }, // Center text on small screens
                    }}
                >
                    <img
                        alt={titleHeader.name}
                        src="/assets/programming.svg"
                        style={{
                            width: 250,
                            height: 250,
                        }}
                    />
                </Grid>

                {/* User Information */}
                <Grid
                    size={{ xs: 12, md: 6 }}
                    sx={{
                        display: "flex",
                        justifyContent: { xs: "center", md: "flex-end" }, // Center on small screens, right-align on medium+
                        textAlign: { xs: "center", md: "right" }, // Center text on small screens
                    }}
                >
                    <Box sx={{ p: 3 }}>
                        <Typography variant="h3">{titleHeader.name}</Typography>
                        <Typography variant="h5">
                            {titleHeader.title}
                        </Typography>
                        <Typography variant="h6">
                            {titleHeader.contact.email}
                        </Typography>
                        <Typography variant="body1">{summary.short}</Typography>

                        {/* Action Buttons */}
                        <Stack direction="row" spacing={2} mt={2}>
                            <Tooltip title="PDF" placement="top" arrow>
                                <Chip
                                    label="Download CV"
                                    variant="outlined"
                                    onClick={handleDownloadCV}
                                    sx={{ color: primaryTextColor }}
                                />
                            </Tooltip>
                            <Tooltip title="Email" placement="top" arrow>
                                <Chip
                                    label="Contact"
                                    variant="outlined"
                                    onClick={() =>
                                        handleContactMe(
                                            titleHeader.contact.email
                                        )
                                    }
                                    sx={{ color: primaryTextColor }}
                                />
                            </Tooltip>
                            <Tooltip title="Rate Website" placement="top" arrow>
                                <Chip
                                    icon={<FavoriteIcon color="primary" />}
                                    label="Rate"
                                    variant="outlined"
                                    onClick={handleOpenDialog}
                                    sx={{ color: primaryTextColor }}
                                />
                            </Tooltip>
                        </Stack>
                    </Box>
                </Grid>
            </Grid>

            {/* Dialog Component */}
            <FormDialog open={openDialog} handleClose={handleCloseDialog} />
        </Box>
    );
}
