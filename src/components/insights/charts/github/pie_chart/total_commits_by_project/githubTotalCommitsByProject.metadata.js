export const githubTotalCommitsByProjectMetadata = {
  type: "Github Total Commits By Project",
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
      label: "Repositories",
      id: "github-repository",
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
