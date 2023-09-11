import * as fs from "fs";
import * as path from "path";

import { Note } from "./Note.js";
import { NotesIndex } from "./NotesIndex.js";

const EXTENSION = ".md"

const removeMdExtension = (name: string): string => {
  return name.substring(0, name.length - EXTENSION.length)
}

const readNotesPaths = async (noteFolderPath: string): Promise<Note[]> => {
  const noteDirectoryEntries = await fs.promises.readdir(noteFolderPath, {
    withFileTypes: true
  })
  const firstLevelNotes: Note[] = noteDirectoryEntries
    .filter(entry => entry.isFile()
      && !entry.name.startsWith(".")
      && entry.name.endsWith(EXTENSION))
    .map(entry => ({
      title: removeMdExtension(entry.name),
      path: path.join(noteFolderPath, entry.name),
      referenced_by: [],
    }))
  const foldersPaths = noteDirectoryEntries
    .filter(entry => entry.isDirectory())
    .map(entry => path.join(noteFolderPath, entry.name))
  const nestedNotesPaths = await Promise.all(
    foldersPaths.map(async folderPath => readNotesPaths(folderPath))
  );
  nestedNotesPaths.push(firstLevelNotes)
  return nestedNotesPaths.flat()
}

const duplicateId = (note: Note, vaultDir: string): string =>
  removeMdExtension(note.path).substring(vaultDir.length + 1)

const buildNotesIndexFromArray = (notes: Note[], vaultDir: string): NotesIndex => {
  const index: NotesIndex = {}
  for (const note of notes) {
    if (!index[note.title]) {
      index[note.title] = note
    } else {
      const noteId = duplicateId(note, vaultDir)
      index[noteId] = note
      if (Array.isArray(index[note.title])) {
        // TODO: if unnecessary , remove?
        (index[note.title] as string[]).push(noteId)
      } else {
        const duplicateNote: Note = index[note.title] as Note
        const duplicateNoteId = duplicateId(duplicateNote, vaultDir)
        index[duplicateNoteId] = index[note.title]
        index[note.title] = [duplicateNoteId, noteId]
      }
    }
  }
  return index
}

export default async function getAllNotesInVault(vaultDir: string): Promise<NotesIndex> {
  const flattenNotesInVault: Note[] = await readNotesPaths(vaultDir)
  return buildNotesIndexFromArray(flattenNotesInVault, vaultDir)
}
