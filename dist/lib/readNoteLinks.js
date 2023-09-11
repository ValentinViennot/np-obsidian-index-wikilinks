import { ENCODING } from "./consts.js";
export default async function readNoteLinks(note) {
    // const noteContents = await fs.promises.readFile(note.path, {
    //   encoding: "utf-8"
    // });
    const fromMarkdown = (await import('mdast-util-from-markdown')).fromMarkdown;
    const syntaxWikiRefs = (await import('micromark-extension-wikirefs')).syntaxWikiRefs;
    const fromMarkdownWikiRefs = (await import('mdast-util-wikirefs')).fromMarkdownWikiRefs;
    const ast = fromMarkdown('[[fname]]', ENCODING, {
        extensions: [syntaxWikiRefs()],
        mdastExtensions: [fromMarkdownWikiRefs()]
    });
    console.log(ast);
    return [];
    // const parseTree = processor.parse(noteContents) as MDAST.Root;
    // const headingNode = await headingFinder.run(parseTree);
    // if (headingNode.type === "missingTitle") {
    //   throw new Error(`${notePath} has no title`);
    // }
    // const title = remark()
    //   .stringify({
    //     type: "root",
    //     children: (headingNode as MDAST.Heading).children
    //   })
    //   .trimEnd();
    // return { title, links: getNoteLinks(parseTree), parseTree, noteContents };
}
//# sourceMappingURL=readNoteLinks.js.map