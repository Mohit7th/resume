import "./App.css";
import MainLayout from "./pages/ResumeHome";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPanel from "./pages/Admin Panel/AdminPanel";
import NotFound from "./pages/NotFound";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainLayout />} />
                <Route path="/admin" element={<AdminPanel />} />
                {/* Catch-all 404 Route (Must be at the end) */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default App;
