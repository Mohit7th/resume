import {
    createContext,
    useContext,
    useState,
    useCallback,
    ReactNode,
} from "react";
import { siteConfig } from "../config/siteConfig";

// Define Auth Context Types
type AuthContextType = {
    isAuthenticated: boolean;
    /** Returns true when the supplied password is accepted. */
    login: (password: string) => boolean;
    logout: () => void;
};

// Create Context
const AuthContext = createContext<AuthContextType | null>(null);

const SESSION_KEY = "mohit-resume-admin-auth";

// Hook for using AuthContext
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

// Auth Provider Component
export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        if (typeof window === "undefined") {
            return false;
        }
        return window.sessionStorage.getItem(SESSION_KEY) === "true";
    });

    // NOTE: On a static site the bundle (and this comparison) is public, so
    // this gate only hides the editor UI. It is intentionally simple.
    const login = useCallback((password: string) => {
        if (password === siteConfig.adminPassword) {
            setIsAuthenticated(true);
            try {
                window.sessionStorage.setItem(SESSION_KEY, "true");
            } catch {
                // Ignore private-mode storage failures.
            }
            return true;
        }
        return false;
    }, []);

    const logout = useCallback(() => {
        setIsAuthenticated(false);
        try {
            window.sessionStorage.removeItem(SESSION_KEY);
        } catch {
            // Ignore private-mode storage failures.
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
