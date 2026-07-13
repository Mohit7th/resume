import { Breadcrumbs, Button, Container, Link, Typography } from "@mui/material";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { Link as RouterLink } from "react-router-dom";

export function Crumbs({
    items,
}: {
    items: { label: string; to?: string }[];
}) {
    return (
        <Breadcrumbs
            separator={<NavigateNextRoundedIcon fontSize="small" />}
            sx={{ mb: 3 }}
        >
            {items.map((item, index) =>
                item.to ? (
                    <Link
                        key={index}
                        component={RouterLink}
                        to={item.to}
                        underline="hover"
                        color="inherit"
                    >
                        {item.label}
                    </Link>
                ) : (
                    <Typography
                        key={index}
                        color="text.primary"
                        sx={{ fontWeight: 600 }}
                    >
                        {item.label}
                    </Typography>
                )
            )}
        </Breadcrumbs>
    );
}

export function LearnNotFound({ message }: { message: string }) {
    return (
        <Container maxWidth="md" sx={{ py: 10, textAlign: "center" }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                {message}
            </Typography>
            <Button component={RouterLink} to="/learn" variant="contained">
                Back to Learn
            </Button>
        </Container>
    );
}
