import { Note } from "./lib/Note.js";
import { NotesIndex } from "./lib/NotesIndex.js";
import getAllNotesInVault from "./lib/getAllNotesInVault.js";
import getNoteLinks from "./lib/getNoteLinks.js";

const getNoteLinksFromNoteIndexEntry = (entry: Note | string[]): Promise<string[]> =>
    Array.isArray(entry) ? Promise.resolve([]) : getNoteLinks(entry as Note)

const updateNotesIndexWithBacklinks = async (index: NotesIndex): Promise<NotesIndex> => {
    const noteIds = Object.keys(index)
    const outLinksRequests = noteIds.map(noteId => getNoteLinksFromNoteIndexEntry(index[noteId]))
    const outLinks = await Promise.all(outLinksRequests)
    for (let i = 0; i < noteIds.length; i++) {
        const noteId = noteIds[i];
        const noteOutLinks = outLinks[i];
        for (const noteOutLink of noteOutLinks)
            if (!Array.isArray(index[noteOutLink]))
                if (index[noteOutLink] === undefined)
                    console.error(`/!\\ Broken link: ${noteId}-->${noteOutLink}`);
                else
                    (index[noteOutLink] as Note).referenced_by.push(noteId)
    }
    return index
}

export const getAllNotes = async (vaultDir: string): Promise<NotesIndex> => {
    const index = await getAllNotesInVault(vaultDir)
    return (await updateNotesIndexWithBacklinks(index))
}
