import { createContext, useContext, useState, ReactNode } from "react";

// Define Auth Context Types
type AuthContextType = {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
};

// Create Context
const AuthContext = createContext<AuthContextType | null>(null);

// Hook for using AuthContext
export function useAuth() {
    return useContext(AuthContext);
}

// Auth Provider Component
export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Simulate login/logout
    function login() {
        setIsAuthenticated(true);
    }

    function logout() {
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
