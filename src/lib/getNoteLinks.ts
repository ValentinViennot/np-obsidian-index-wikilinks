import * as fs from "fs";

import { Note } from "./Note.js";
import { WIKILINKSregex } from "./wikilinkRegex.js";

const encoding = "utf-8"

export default async function getNoteLinks(note: Note): Promise<string[]> {
  const content = await fs.promises.readFile(note.path, { encoding });
  const links: string[] = []
  const wikilinks = content.matchAll(WIKILINKSregex)
  for (const wikilink of wikilinks) links.push(wikilink[1])
  return links
}
