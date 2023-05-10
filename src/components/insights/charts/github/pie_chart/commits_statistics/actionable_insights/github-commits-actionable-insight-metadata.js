const GithubCommitsActionableMetadata = {
  idProperty: "_id",
  type: "Github Commits Table Report",
  fields: [
    {
      label: "Repository Name",
      id: "repositoryName",
    },
    {
      label: "Collaborator Name",
      id: "collaboratorName",
    },
    {
      label: "MR Id",
      id: "mergeRequestsId"
    },
    {
      label: "Request created at",
      id: "createdAt",
    },
    {
      label: "Total Commits",
      id: "totalCommits",
    },
    {
      label: "Reviewer Name",
      id: "reviewerName",
    },
    {
      label: "Commit Message",
      id: "mergeRequestTitle",
    },
    {
      label: "Status",
      id: "status",
    },
    {
      label: "Closed at",
      id: "closedAt",
    },
  ],
  newObjectFields: {},
};

export default GithubCommitsActionableMetadata;
