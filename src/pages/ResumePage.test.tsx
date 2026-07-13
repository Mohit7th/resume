import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import ResumePage from "./ResumePage";
import { UserDataProvider } from "../context/UserContext";
import theme from "../theme/theme";

test("resume page renders name, sections, and download action", () => {
    render(
        <ThemeProvider theme={theme}>
            <UserDataProvider>
                <MemoryRouter>
                    <ResumePage />
                </MemoryRouter>
            </UserDataProvider>
        </ThemeProvider>
    );

    expect(
        screen.getByRole("heading", { name: "Mohit Uniyal", level: 1 })
    ).toBeInTheDocument();
    expect(
        screen.getByRole("heading", { name: /experience/i, level: 2 })
    ).toBeInTheDocument();
    expect(
        screen.getByRole("heading", { name: /skills/i, level: 2 })
    ).toBeInTheDocument();
    expect(
        screen.getByRole("button", { name: /download pdf/i })
    ).toBeInTheDocument();
});
