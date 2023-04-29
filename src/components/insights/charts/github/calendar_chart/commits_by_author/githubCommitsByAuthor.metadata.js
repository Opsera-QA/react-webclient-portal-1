export const githubCommitsByAuthorMetadata = {
  type: "Github Commits By Author",
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
