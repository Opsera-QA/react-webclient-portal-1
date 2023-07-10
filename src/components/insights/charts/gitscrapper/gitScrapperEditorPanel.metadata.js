export const gitScrapperEditorPanelMetadata = {
    type: "Github Commits Statistics",
    fields: [
        {
            label: "Tags",
            id: "tags",
        },
        {
            label: "Date Range",
            id: "date",
        },
        {
            label: "Branches",
            id: "github-branch",
        },
    ],
    newObjectFields: {
        tags: [],
        date: undefined,
        repositories: [],
        branches: [],
    },
};
