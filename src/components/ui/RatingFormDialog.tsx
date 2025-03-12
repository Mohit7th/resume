import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    TextField,
    Rating,
} from "@mui/material";

// Define props for the component
interface FormDialogProps {
    open: boolean;
    onRatingDialogClose: () => void;
}

const RatingFormDialog: React.FC<FormDialogProps> = ({ open, onRatingDialogClose }) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        console.log("Form Data:", formJson);
        onRatingDialogClose(); // Close the dialog after submission
    };

    return (
        <Dialog open={open} onClose={onRatingDialogClose}>
            <DialogTitle>Website Feedback</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <DialogContentText>
                        Please provide your rating and feedback.
                    </DialogContentText>
                    <Rating name="rating" defaultValue={2.5} precision={0.5} />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="feedback"
                        name="feeback"
                        label="Feedback"
                        type="text"
                        fullWidth
                        variant="standard"
                        multiline
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onRatingDialogClose}>Cancel</Button>
                    <Button type="submit">Submit</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default RatingFormDialog;
