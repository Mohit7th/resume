import { useParams } from "react-router-dom";
import { getLesson, lessonKey } from "../content";
import { setCompleted } from "../storage";
import LessonPlayer from "../LessonPlayer";
import { LearnNotFound } from "./parts";

export default function LessonPage() {
    const { trackId = "", topicId = "", lessonId = "" } = useParams();
    const found = getLesson(trackId, topicId, lessonId);

    if (!found) {
        return <LearnNotFound message="That lesson doesn't exist." />;
    }

    const { track, topic, lesson, next } = found;
    const topicPath = `/learn/${track.id}/${topic.id}`;

    return (
        <LessonPlayer
            key={lesson.id} // reset player state when navigating between lessons
            lesson={lesson}
            topicPath={topicPath}
            nextHref={next ? `${topicPath}/${next.id}` : null}
            onComplete={() =>
                setCompleted(lessonKey(track.id, topic.id, lesson.id), true)
            }
        />
    );
}
