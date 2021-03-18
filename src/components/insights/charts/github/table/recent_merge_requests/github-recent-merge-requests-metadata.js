const githubRecentMergeRequestsMetadata = {
    idProperty: "_id",
    type: "Github Pending Merge Requests",
    fields: [
      {
        label: "Author",
        id: "AuthorName",
      },
      {
        label: "Assigned",
        id: "AssigneeName",
      },
      {
        label: "Merge Request",
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
        label: "Time",
        id: "mrCompletionTimeTimeStamp"
      },
    ],
    newObjectFields: {
    }
  };
  
  export default githubRecentMergeRequestsMetadata;