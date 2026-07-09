import "./App.css";
import ResumeHome from "./pages/ResumeHome";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPanel from "./pages/Admin Panel/AdminPanel";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/layout/MainLayout";
import { AuthProvider } from "./context/AuthContext";
import { getRouterBasename } from "./utils/publicPath";

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router basename={getRouterBasename()}>
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<ResumeHome />} />
                        <Route path="/admin" element={<AdminPanel />} />
                        {/* Catch-all 404 Route (Must be at the end) */}
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
