export const githubOpenPullRequestStatisticsMetadata = {
  type: "Github Open Pull Request Statistics",
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
      label: "Duration",
      id: "timeSinceCreated",
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
