import { Block } from "../types";
import { TextBlock, CodeBlock, CalloutBlock, DiagramBlock } from "./blocks";

// Renders a list of teaching blocks. Add a block variant + a case to extend.
function renderBlock(block: Block, index: number) {
    switch (block.type) {
        case "text":
            return <TextBlock key={index} block={block} />;
        case "code":
            return <CodeBlock key={index} block={block} />;
        case "callout":
            return <CalloutBlock key={index} block={block} />;
        case "diagram":
            return <DiagramBlock key={index} block={block} />;
        default: {
            const _never: never = block;
            return _never;
        }
    }
}

export default function BlocksView({ blocks }: { blocks: Block[] }) {
    return <>{blocks.map((block, index) => renderBlock(block, index))}</>;
}
