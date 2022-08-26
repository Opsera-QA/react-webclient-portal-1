const gitlabMergeRequestsByUserMetadata = {
    idProperty: "_id",
    type: "Gitlab Merge Requests By User",
    fields: [
      {
        label: "User",
        id: "_id",
      },
      {
        label: "Number Of Merge Requests",
        id: "Merge Requests",
      },
    ],
    newObjectFields: {
    "_id": "",
    "Merge Requests": ""
    }
  };

  export default gitlabMergeRequestsByUserMetadata;