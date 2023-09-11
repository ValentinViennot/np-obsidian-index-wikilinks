
export interface Note {
    title: string;
    path: string;
    referenced_by: string[];
}

// TODO: add pagerank sort for popular indexing and search results sorting
// see: http://stevemacn.github.io/tutorials/docs/pagerank.html
