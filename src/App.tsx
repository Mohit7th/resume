import "./App.css";
import { lazy, Suspense } from "react";
import ResumeHome from "./pages/ResumeHome";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/layout/MainLayout";
import { AuthProvider } from "./context/AuthContext";
import { UserDataProvider } from "./context/UserContext";
import RequireAuth from "./components/admin/RequireAuth";
import { siteConfig } from "./config/siteConfig";
import { getRouterBasename } from "./utils/publicPath";

const AdminPanel = lazy(() => import("./pages/admin/AdminPanel"));

const App: React.FC = () => {
    return (
        <AuthProvider>
            <UserDataProvider>
                <Router basename={getRouterBasename()}>
                    <Routes>
                        <Route element={<MainLayout />}>
                            <Route path="/" element={<ResumeHome />} />
                            {siteConfig.enableAdmin && (
                                <Route
                                    path="/admin"
                                    element={
                                        <RequireAuth>
                                            <Suspense fallback={null}>
                                                <AdminPanel />
                                            </Suspense>
                                        </RequireAuth>
                                    }
                                />
                            )}
                            {/* Catch-all 404 Route (Must be at the end) */}
                            <Route path="*" element={<NotFound />} />
                        </Route>
                    </Routes>
                </Router>
            </UserDataProvider>
        </AuthProvider>
    );
};

export default App;
