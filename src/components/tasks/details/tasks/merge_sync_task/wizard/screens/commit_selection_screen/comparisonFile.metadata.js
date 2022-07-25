export const comparisonFileMetadata = {
  type: "Comparison File",
  fields: [
    {
      label: "User ID",
      id: "customerId",
    },
    {
      label: "Task ID",
      id: "taskId",
    },
    {
      label: "Run Count",
      id: "runCount",
    },
    {
      label: "File Name",
      id: "file",
    },
    {
      label: "Full File Name",
      id: "fullName",
    },
    {
      label: "Source Branch Content",
      id: "sourceContent",
    },
    {
      label: "Latest Version on Destination Branch",
      id: "destinationContent",
    },
    {
      label: "Advanced Editing Mode",
      id: "advancedEditingMode",
    },
    {
      label: "Manual Code Content",
      id: "manualContent",
    },
    {
      label: "File Content Field Name",
      id: "fileContentFieldName",
    },
  ],
  newObjectFields: {
    customerId: "",
    taskId: "",
    runCount: 0,
    file: "",
    fullName: "",
    sourceContent: "",
    destinationContent: "",
    advancedEditingMode: false,
    fileContentFieldName: "",
    manualContent: "",
  }
};