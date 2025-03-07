import Grid from "@mui/material/Grid2";
import { useState } from "react";
import { useUserData } from "../../context/UserContext";
import { Box, Chip, Skeleton, Stack, Tooltip, Typography } from "@mui/material";
import FormDialog from "../ui/RatingFormDialog";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function TitleHeader() {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const userdata = useUserData();
    function handleDownloadCV() {}

    function handleContactMe() {}

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <>
            <Grid
                container
                spacing={2}
                sx={{ mb: 5 }}
                justifyContent="space-between"
                alignItems="center"
            >
                <Grid size={{ xs: 12, md: 6 }}>
                    {/* <img src="../../public/assets/logo192.png"></img> */}
                    <Skeleton variant="circular" width={200} height={200} />
                </Grid>
                <Grid
                    size={{ xs: 12, md: 6 }}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end", // Push text to the right
                        textAlign: "right", // Align text inside the div
                    }}
                >
                    <Box sx={{ p: 3 }}>
                        <Typography variant="h3" component="div">
                            {userdata.titleHeader.name}
                        </Typography>
                        <Typography variant="h5" component="p">
                            {userdata.titleHeader.title}
                        </Typography>
                        <Typography variant="h6" component="p">
                            {userdata.titleHeader.contact.email}
                        </Typography>
                        <p>{userdata.summary.short}</p>
                        <Stack direction="row" spacing={2}>
                            <Tooltip title="PDF" placement="top" arrow>
                                <Chip
                                    label="Download CV"
                                    variant="outlined"
                                    onClick={handleDownloadCV}
                                />
                                {/* <Button variant="outlined">Download CV</Button> */}
                            </Tooltip>
                            <Tooltip title="Email" placement="top" arrow>
                                <Chip
                                    label="Contact"
                                    variant="outlined"
                                    onClick={handleContactMe}
                                />
                                {/* <Button variant="outlined">Contact</Button> */}
                            </Tooltip>
                            <Tooltip title="Rate Website" placement="top" arrow>
                                <Chip
                                    icon={<FavoriteIcon />}
                                    label="Rate"
                                    variant="outlined"
                                    onClick={handleOpenDialog}
                                />
                            </Tooltip>
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
            <FormDialog open={openDialog} handleClose={handleCloseDialog} />
        </>
    );
}
