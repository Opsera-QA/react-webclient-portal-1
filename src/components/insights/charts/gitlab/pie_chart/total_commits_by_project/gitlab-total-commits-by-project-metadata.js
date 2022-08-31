const gitlabTotalCommitsByProjectMetadata = {
    idProperty: "_id",
    type: "Gitlab Total Commits By Project",
    fields: [
      {
        label: "Project Name",
        id: "_id",
      },
      {
        label: "Total Commits",
        id: "commits",
      },
    ],
    newObjectFields: {
    _id: "",
    commits: ""
    }
  };

  export default gitlabTotalCommitsByProjectMetadata;