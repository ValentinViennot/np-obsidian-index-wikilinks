#!/usr/bin/env node

import * as fs from "fs";

import { getAllNotes } from "./getAllNotes.js";

getAllNotes(process.argv[2] || 'example-notes').then(
    notes => fs.writeFileSync(process.argv[3] || 'index.json',
        JSON.stringify(notes)))
