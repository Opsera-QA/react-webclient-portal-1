export const sourceCommitFileMetadata = {
  type: "Source Commit File",
  fields: [
    {
      label: "File",
      id: "committedFile",
    },
    {
      label: "Commit Time",
      id: "committedTime",
    },
    {
      label: "Action",
      id: "commitAction",
    },
    {
      label: "Committed By",
      id: "committedBy",
    },
    {
      label: "Commit ID",
      id: "commitID",
    },
  ],
  newObjectFields: {
    committedFile: "",
    committedTime: "",
    commitAction: "",
    committedBy: "",
    commitID: "",
  }
};