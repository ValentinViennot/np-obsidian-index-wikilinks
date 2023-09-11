import getAllNotesInVault from "./lib/getAllNotesInVault.js";
import getNoteLinks from "./lib/getNoteLinks.js";
const getNoteLinksFromNoteIndexEntry = (entry) => Array.isArray(entry) ? Promise.resolve([]) : getNoteLinks(entry);
const updateNotesIndexWithBacklinks = async (index) => {
    const noteIds = Object.keys(index);
    const outLinksRequests = noteIds.map(noteId => getNoteLinksFromNoteIndexEntry(index[noteId]));
    const outLinks = await Promise.all(outLinksRequests);
    for (let i = 0; i < noteIds.length; i++) {
        const noteId = noteIds[i];
        const noteOutLinks = outLinks[i];
        for (const noteOutLink of noteOutLinks)
            if (!Array.isArray(index[noteOutLink]))
                index[noteOutLink].referenced_by.push(noteId);
    }
    return index;
};
export const getAllNotes = async (vaultDir) => {
    const index = await getAllNotesInVault(vaultDir);
    return (await updateNotesIndexWithBacklinks(index));
};
//# sourceMappingURL=getAllNotes.js.map