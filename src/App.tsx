import "./App.css";
import { lazy, Suspense } from "react";
import ResumeHome from "./pages/ResumeHome";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/layout/MainLayout";
import { AuthProvider } from "./context/AuthContext";
import { siteConfig } from "./config/siteConfig";
import { getRouterBasename } from "./utils/publicPath";

const AdminPanel = lazy(() => import("./pages/Admin Panel/AdminPanel"));

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router basename={getRouterBasename()}>
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<ResumeHome />} />
                        {siteConfig.enableAdmin && (
                            <Route
                                path="/admin"
                                element={
                                    <Suspense fallback={null}>
                                        <AdminPanel />
                                    </Suspense>
                                }
                            />
                        )}
                        {/* Catch-all 404 Route (Must be at the end) */}
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
