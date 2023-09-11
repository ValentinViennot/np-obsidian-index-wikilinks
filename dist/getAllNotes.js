import getAllNotesInVault from "./lib/getAllNotesInVault.js";
import getNoteLinks from "./lib/getNoteLinks.js";
const getNoteLinksFromNoteIndexEntry = (entry) => Array.isArray(entry) ? Promise.resolve([]) : getNoteLinks(entry);
const removeDuplicates = (arr) => arr.filter((item, index) => arr.indexOf(item) === index);
const updateNotesIndexWithBacklinks = async (index) => {
    const noteIds = Object.keys(index);
    const outLinksRequests = noteIds.map(noteId => getNoteLinksFromNoteIndexEntry(index[noteId]));
    const outLinks = await Promise.all(outLinksRequests);
    for (let i = 0; i < noteIds.length; i++) {
        const noteId = noteIds[i];
        const noteOutLinks = outLinks[i];
        for (const noteOutLink of noteOutLinks)
            if (!Array.isArray(index[noteOutLink]))
                if (index[noteOutLink] === undefined)
                    console.error(`/!\\ Broken link: ${noteId}-->${noteOutLink}`);
                else
                    index[noteOutLink].referenced_by.push(noteId);
    }
    //remove duplicates
    for (const nodeId in index)
        if (!Array.isArray(index[nodeId])) {
            const note = index[nodeId];
            note.referenced_by = removeDuplicates(note.referenced_by);
        }
    return index;
};
export const getAllNotes = async (vaultDir) => {
    const index = await getAllNotesInVault(vaultDir);
    return (await updateNotesIndexWithBacklinks(index));
};
//# sourceMappingURL=getAllNotes.js.map