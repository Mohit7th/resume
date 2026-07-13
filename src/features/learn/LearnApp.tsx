import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import LearnHome from "./pages/LearnHome";
import TrackPage from "./pages/TrackPage";
import TopicPage from "./pages/TopicPage";
import LessonPage from "./pages/LessonPage";

// Nested routing for the whole Learn feature (mounted at /learn/* in App).
export default function LearnApp() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <Routes>
            <Route index element={<LearnHome />} />
            <Route path=":trackId" element={<TrackPage />} />
            <Route path=":trackId/:topicId" element={<TopicPage />} />
            <Route
                path=":trackId/:topicId/:lessonId"
                element={<LessonPage />}
            />
            <Route path="*" element={<Navigate to="/learn" replace />} />
        </Routes>
    );
}
