const gitlabMergeRequestByMaximumTimeMetadata = {
    idProperty: "_id",
    type: "Gitlab Merge Request By Maximum Time",
    fields: [
      {
        label: "Repository Name",
        id: "_id"
      },
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
     },
    ],
    newObjectFields: {
      _id: "",
      MergeRequestTitle: "",
      repositoryUrl: "",
      mrCompletionTimeTimeStamp: "",
      MergeRequestTimeTaken: "",
      AssigneeName: "",
      AuthorName: "",
      mergeRequestCompletionTime: ""
    }
  };

  export default gitlabMergeRequestByMaximumTimeMetadata;