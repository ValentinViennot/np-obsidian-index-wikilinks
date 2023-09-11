#!/usr/bin/env node

import * as fs from "fs";

import { getAllNotes } from "./getAllNotes.js";

const notesDir = process.argv[2] || 'example-notes'
const indexFile = process.argv[3] || 'index.json'

console.info(`Indexing notes folder "${notesDir}"...\n`)

await getAllNotes(notesDir).then(notes => {
    fs.writeFileSync(indexFile, JSON.stringify(notes))
    console.info(`\nIndex created at: ./${indexFile}`)
})
