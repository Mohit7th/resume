import { Block, Lesson } from "../types";
import {
    TextBlock,
    CodeBlock,
    CalloutBlock,
    QuizBlock,
    ExerciseBlock,
    DiagramBlock,
} from "./blocks";

// One switch = the extension point. Add a block variant + a case to extend.
function renderBlock(block: Block, index: number) {
    switch (block.type) {
        case "text":
            return <TextBlock key={index} block={block} />;
        case "code":
            return <CodeBlock key={index} block={block} />;
        case "callout":
            return <CalloutBlock key={index} block={block} />;
        case "quiz":
            return <QuizBlock key={index} block={block} />;
        case "exercise":
            return <ExerciseBlock key={index} block={block} />;
        case "diagram":
            return <DiagramBlock key={index} block={block} />;
        default: {
            // Exhaustiveness guard — a new block type without a case errors here.
            const _never: never = block;
            return _never;
        }
    }
}

export default function LessonView({ lesson }: { lesson: Lesson }) {
    return <>{lesson.blocks.map((block, index) => renderBlock(block, index))}</>;
}
