import "./App.css";
import MainLayout from "./pages/ResumeHome";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPanel from "./pages/Admin Panel/AdminPanel";

const App: React.FC = () => {
    return (
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </Router>
    );
};

export default App;