import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import AdminPanel from "./AdminPanel";
import { UserDataProvider } from "../../context/UserContext";
import { AuthProvider } from "../../context/AuthContext";
import theme from "../../theme/theme";

function renderAdmin() {
    return render(
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <UserDataProvider>
                    <MemoryRouter>
                        <AdminPanel />
                    </MemoryRouter>
                </UserDataProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}

test("admin panel mounts and shows the header editor with seed data", () => {
    renderAdmin();

    expect(screen.getByText("Résumé admin")).toBeInTheDocument();
    // Header section is expanded by default and reflects the seed content.
    expect(screen.getByDisplayValue("Mohit Uniyal")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i })).toBeDisabled();
    // Note: the full editor mounts every section (many MUI inputs), which is
    // fast in a real browser but slow under jsdom — hence the generous timeout.
}, 30000);
