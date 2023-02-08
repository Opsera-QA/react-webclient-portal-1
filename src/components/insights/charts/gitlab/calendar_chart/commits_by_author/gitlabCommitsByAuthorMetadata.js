const gitlabCommitsByAuthorMetadata = {
  idProperty: "_id",
  type: "Gitlab Commits By Author",
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
      label: "Excluded Users",
      id: "gitlab-excluded-users",
    },
  ],
  newObjectFields: {},
};

export default gitlabCommitsByAuthorMetadata;
