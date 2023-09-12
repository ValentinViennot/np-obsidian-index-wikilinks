import * as fs from "fs";
import { WIKILINKSregex } from "./wikilinkRegex.js";
const encoding = "utf-8";
export default async function getNoteLinks(note) {
    const content = await fs.promises.readFile(note.path, { encoding });
    const links = [];
    const wikilinks = content.matchAll(WIKILINKSregex);
    for (const wikilink of wikilinks)
        links.push(wikilink[1]);
    return links;
}
//# sourceMappingURL=getNoteLinks.js.map