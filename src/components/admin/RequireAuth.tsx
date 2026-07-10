import { ReactNode } from "react";
import { useAuth } from "../../context/AuthContext";
import AdminLogin from "./AdminLogin";

/**
 * Gates its children behind the admin login. Renders the login screen until the
 * session is authenticated. (See AuthContext for the "not real security" note.)
 */
export default function RequireAuth({ children }: { children: ReactNode }) {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <AdminLogin />;
    }

    return <>{children}</>;
}
