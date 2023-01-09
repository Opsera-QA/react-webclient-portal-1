export const githubRepositoryStatisticsMetadata = {
  type: "Github Repository Statistics",
  fields: [
    {
      label: "Repository",
      id: "repo",
    },
    {
      label: "Created At",
      id: "createdAt",
    },
  ],
  newObjectFields: { pageSize: 10, currentPage: 1 },
};
