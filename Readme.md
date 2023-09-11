# Turn an Obsidian vault into a JSON index with backlinks

This script reads in a folder of Markdown files, notes all the [[wiki-style links]] between them, then create an index (JSON format) with their indexes and backlinks ("referenced_by" field).

## Usage

### Installation

To install from this repo, run:

```
yarn global add https://github.com/ValentinViennot/np-obsidian-index-wikilinks.git
```

```
npm install -g https://github.com/ValentinViennot/np-obsidian-index-wikilinks.git
```

### Execution

```
index-wikilinks path/to/folder/containing/md/files index.json
```

That will run it once; you'll need to create a cron job or a launch daemon to run it regularly.

If you store your notes in a Git repository and would like to run it on every push, see this [Github Actions Workflow](https://gist.github.com/rajesh-s/749c99ef9e7c884828a1acda698e477b) from [Rajesh Shashi Kumar](https://github.com/rajesh-s).

## Building a local copy

You can use the provided [.devcontainer](./.devcontainer/devcontainer.json) config in VSCode.

```
npm install
npm run build
```

## Thanks

Inspired by the work of [Andy Matuschak](https://github.com/andymatuschak/note-link-janitor)
