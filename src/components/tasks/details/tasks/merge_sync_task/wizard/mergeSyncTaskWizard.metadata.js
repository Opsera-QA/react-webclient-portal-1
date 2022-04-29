export const mergeSyncTaskWizardMetadata = {
  idProperty: "_id",
  type: "Sfdc Pipeline Wizard Metadata",
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
      label: "Selected File List",
      id: "selectedFileList",
    },{
      label: "Updated File List",
      id: "updatedFileList",
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
    taskId: "",
    recordId: "",
    runCount: 1,
  }
};