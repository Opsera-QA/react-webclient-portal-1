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
      id: "fileName",
    },
    {
      label: "Full File Name",
      id: "fullName",
    },
    {
      label: "Source Content",
      id: "sourceContent",
    },
    {
      label: "Destination Content",
      id: "destinationContent",
    },
  ],
  newObjectFields: {
    customerId: "",
    taskId: "",
    runCount: 0,
    fileName: "",
    fullName: "",
    sourceContent: "",
    destinationContent: "",
  }
};