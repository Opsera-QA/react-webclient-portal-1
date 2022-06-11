export const salesforceToGitSourceCommitFileMetadata = {
  type: "Source Commit File",
  fields: [
    {
      label: "Salesforce Component ID",
      id: "committedFileId",
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
      label: "Component",
      id: "componentType",
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
    committedFileId: "",
    componentName: "",
    committedTime: "",
    componentType: "",
    committedBy: "",
    commitID: "",
  }
};