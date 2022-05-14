export const sourceCommitFileMetadata = {
  type: "Source Commit File",
  fields: [
    {
      label: "File",
      id: "committedFile",
    },
    {
      label: "Component Name",
      id: "componentName",
    },
    {
      label: "Last Modified Date",
      id: "committedTime",
    },
    {
      label: "Action",
      id: "commitAction",
    },
    {
      label: "Last Modified By",
      id: "committedBy",
    },
    {
      label: "Latest Commit ID",
      id: "commitID",
    },
  ],
  newObjectFields: {
    committedFile: "",
    componentName: "",
    committedTime: "",
    commitAction: "",
    committedBy: "",
    commitID: "",
  }
};