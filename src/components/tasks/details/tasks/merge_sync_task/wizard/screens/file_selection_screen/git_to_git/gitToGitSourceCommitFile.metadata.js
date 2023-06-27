export const gitToGitSourceCommitFileMetadata = {
  type: "Source Commit File",
  fields: [
    {
      label: "File",
      id: "committedFile",
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
    {
      label: "Component Type",
      id: "componentType",
    },
    {
      label: "Component Name",
      id: "componentName",
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