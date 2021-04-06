const bitbucketRejectedMergeRequestsMetadata = {
  idProperty: "_id",
  type: "Bitbucket Rejected Pull Requests",
  fields: [
    {
      label: "Author",
      id: "AuthorName",
    },
    {
      label: "Reviewer",
      id: "AssigneeName",
    },
    {
      label: "Merge Request Title",
      id: "MergeRequestTitle",
    },
    {
      label: "Branch",
      id: "BranchName",
    },
    {
      label: "Project",
      id: "ProjectName",
    },
    {
      label: "Rejected Reason",
      id: "RejectedReason",
    },
    {
      label: "Time",
      id: "mrCompletionTimeTimeStamp",
    },
    {
      label: "Repository URL",
      id: "repositoryUrl",
    },
    {
      label: "Merge Request URL",
      id: "mergeRequestUrl",
    },
  ],
  newObjectFields: {
    AuthorName: "",
    AssigneeName: [],
    MergeRequestTitle: "",
    BranchName: "",
    ProjectName: "",
    RejectedReason: "",
    mrCompletionTimeTimeStamp: null
  },
};

export default bitbucketRejectedMergeRequestsMetadata;
