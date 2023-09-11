import { Note } from "./Note.js";

export interface NotesIndex {
    [index: string]: Note | string[]
}
