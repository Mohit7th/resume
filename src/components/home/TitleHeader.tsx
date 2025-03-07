import Grid from "@mui/material/Grid2";
import { useState } from "react";
import { useUserData } from "../../context/UserContext";
import { Chip, Skeleton, Stack, Tooltip } from "@mui/material";
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
            <Grid container spacing={2} sx={{ mb: 5 }}>
                <Grid size={{ xs: 12, md: 6 }}>
                    {/* <img src="../../public/assets/logo192.png"></img> */}
                    <Skeleton variant="circular" width={200} height={200} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} sx={{ alignItems: "center" }}>
                    <h1>{userdata.titleHeader.name}</h1>
                    <h2>{userdata.titleHeader.title}</h2>
                    <h3>{userdata.titleHeader.contact.email}</h3>
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
                </Grid>
            </Grid>
            <FormDialog open={openDialog} handleClose={handleCloseDialog} />
        </>
    );
}