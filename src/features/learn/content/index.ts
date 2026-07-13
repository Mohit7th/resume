import { Track, Topic, Lesson } from "../types";
import { dsa } from "./dsa";
import { lld } from "./lld";
import { hld } from "./hld";

// Register every track here — this is the single list the UI renders from.
export const tracks: Track[] = [dsa, lld, hld];

export function getTrack(trackId: string): Track | undefined {
    return tracks.find((track) => track.id === trackId);
}

export function getTopic(
    trackId: string,
    topicId: string
): { track: Track; topic: Topic } | undefined {
    const track = getTrack(trackId);
    const topic = track?.topics.find((t) => t.id === topicId);
    if (!track || !topic) return undefined;
    return { track, topic };
}

export function getLesson(
    trackId: string,
    topicId: string,
    lessonId: string
):
    | {
          track: Track;
          topic: Topic;
          lesson: Lesson;
          index: number;
          prev: Lesson | null;
          next: Lesson | null;
      }
    | undefined {
    const found = getTopic(trackId, topicId);
    if (!found) return undefined;
    const { track, topic } = found;
    const index = topic.lessons.findIndex((l) => l.id === lessonId);
    if (index === -1) return undefined;
    return {
        track,
        topic,
        lesson: topic.lessons[index],
        index,
        prev: index > 0 ? topic.lessons[index - 1] : null,
        next:
            index < topic.lessons.length - 1
                ? topic.lessons[index + 1]
                : null,
    };
}

/** Stable unique id for a lesson, used for progress tracking. */
export function lessonKey(
    trackId: string,
    topicId: string,
    lessonId: string
): string {
    return `${trackId}/${topicId}/${lessonId}`;
}
