const githubRecentMergeRequestsMetadata = {
    idProperty: "_id",
    type: "Github Pending Merge Requests",
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
        label: "Time",
        id: "mrCompletionTimeTimeStamp"
      },
    ],
    newObjectFields: {
    }
  };
  
  export default githubRecentMergeRequestsMetadata;