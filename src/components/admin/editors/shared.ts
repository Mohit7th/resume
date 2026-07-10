import { Updater } from "use-immer";
import { ResumeData } from "../../../types";

/** immer updater bound to the whole résumé draft, shared by all editors. */
export type ResumeUpdater = Updater<ResumeData>;

/** Generate a reasonably-unique id for newly-created list items. */
export function newId(): string {
    return `id-${Date.now().toString(36)}-${Math.random()
        .toString(36)
        .slice(2, 7)}`;
}
