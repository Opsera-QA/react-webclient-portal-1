const gitlabTimeTakenToCompleteMergeRequestReviewMetadata = {
    idProperty: "_id",
    type: "Gitlab Time Taken To Complete Merge Request Review",
    fields: [
      {
        label: "Merge Request Completion Time",
        id: "mergeRequestCompletionTime",
      },
      {
        label: "Author Name",
        id: "AuthorName",
      },
      {
        label: "Assignee Name",
        id: "AssigneeName",
      },
      {
        label: "Merge Request Time Taken In Hours",
        id: "MergeRequestTimeTaken",
      },
      {
        label: "Merge Request Completion Time Stamp",
        id: "mrCompletionTimeTimeStamp",
      },
     {
       label: "Repository Link",
       id: "repositoryUrl",
     },
     {
       label: "Merge Request Title",
       id: "MergeRequestTitle"
     }
    ],
    newObjectFields: {
      mergeRequestCompletionTime: "",
      AuthorName: "",
      AssigneeName: "",
      MergeRequestTimeTaken: "",
      mrCompletionTimeTimeStamp: "",
      repositoryUrl: "",
      MergeRequestTitle: ""
    }
  };

  export default gitlabTimeTakenToCompleteMergeRequestReviewMetadata;