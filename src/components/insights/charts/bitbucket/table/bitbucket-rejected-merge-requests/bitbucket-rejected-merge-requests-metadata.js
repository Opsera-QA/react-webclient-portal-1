const BitbucketMostActiveContributorsMetadata = {
  idProperty: "_id",
  type: "Bitbucket Pending Merge Requests",
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
  ],
  newObjectFields: {},
};

export default BitbucketMostActiveContributorsMetadata;
