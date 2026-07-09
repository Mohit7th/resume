import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material";
import TitleHeader from "./components/home/TitleHeader";
import { UserDataProvider } from "./context/UserContext";
import theme from "./theme/theme";

test("renders the resume hero and primary actions", () => {
    render(
        <ThemeProvider theme={theme}>
            <UserDataProvider>
                <TitleHeader />
            </UserDataProvider>
        </ThemeProvider>
    );

    expect(
        screen.getByRole("heading", { name: "Mohit Uniyal", level: 1 })
    ).toBeInTheDocument();
    expect(
        screen.getByRole("link", { name: /download résumé/i })
    ).toBeInTheDocument();
    expect(
        screen.getByRole("link", { name: /contact me/i })
    ).toBeInTheDocument();
});
