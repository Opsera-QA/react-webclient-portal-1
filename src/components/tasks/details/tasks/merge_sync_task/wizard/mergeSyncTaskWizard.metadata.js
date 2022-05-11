export const mergeSyncTaskWizardMetadata = {
  idProperty: "_id",
  type: "Merge Sync Task Wizard Metadata",
  activeField: "active",
  fields: [
    {
      label: "From Date",
      id: "fromDate",
      mustBeInThePast: true,
      mustBeBefore: "toDate",
    },
    {
      label: "To Date",
      id: "toDate",
      mustBeInThePast: true,
      mustBeAfter: "fromDate",
    },
    {
      label: "Source Commit List",
      id: "sourceCommitFiles",
    },
    {
      label: "Salesforce Source Tool ID",
      id: "sfdcToolId",
    },
    {
      label: "Selected File List",
      id: "selectedFileList",
    },
    {
      label: "Updated File List",
      id: "updatedFileList",
    },
    {
      label: "Updated File Change Delta List",
      id: "updatedFileDeltas",
    },
    {
      label: "Diff Files List",
      id: "diffFileList",
    },
    {
      label: "Component Types",
      id: "selectedComponentTypes",
    },
    {
      label: "Merge Sync Task Record ID",
      id: "recordId",
    },
    {
      label: "File Selection Rules",
      id: "fileSelectionRules",
    },
    {
      label: "Task ID",
      id: "taskId",
    },
    {
      label: "Task Type",
      id: "taskType",
    },
    {
      label: "Run Count",
      id: "runCount",
    },
  ],
  newObjectFields: {
    selectedComponentTypes: [],
    fromDate: new Date(new Date().setHours(0,0,0,0)),
    toDate: new Date(),
    sourceCommitFiles: [],
    selectedFileList: [],
    diffFileList: [],
    fileSelectionRules: [],
    updatedFileList: [],
    updatedFileDeltas: [],
    taskId: "",
    recordId: "",
    sfdcToolId: "",
    runCount: 1,
    type: "",
  }
};