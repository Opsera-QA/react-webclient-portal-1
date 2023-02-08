const gitlabMostActiveContributorsMetadata = {
  idProperty: "_id",
  type: "Gitlab Most Active Contributors",
  fields: [
    {
      label: "Author Name",
      id: "AuthorName",
    },
    {
      label: "Commit Count",
      id: "commitCount",
    },
    {
      label: "Tags",
      id: "tags",
    },
    {
      label: "Date Range",
      id: "date",
    },
    {
      label: "Excluded Users",
      id: "gitlab-excluded-users",
    },
  ],
  newObjectFields: {},
};

export default gitlabMostActiveContributorsMetadata;
