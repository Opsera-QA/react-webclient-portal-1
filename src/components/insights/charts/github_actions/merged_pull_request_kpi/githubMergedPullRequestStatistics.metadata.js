export const githubMergedPullRequestStatisticsMetadata = {
  type: "Github Merged Pull Request Statistics",
  fields: [
    {
      label: "Repository",
      id: "repo",
    },
    {
      label: "Source",
      id: "source",
    },
    {
      label: "Target",
      id: "target",
    },
    {
      label: "User",
      id: "user",
    },
    {
      label: "Changed Files",
      id: "changedFiles",
    },
    {
      label: "Created At",
      id: "createdAt",
    },
    {
      label: "Merged At",
      id: "mergedAt",
    },
    {
      label: "Duration",
      id: "timeToMerge",
    },
    {
      label: "Title",
      id: "title",
    },
    {
      label: "URL",
      id: "url",
    },
  ],
  newObjectFields: { pageSize: 10, currentPage: 1 },
};
