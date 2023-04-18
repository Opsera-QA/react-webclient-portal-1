export const customSettingMigrationTaskWizardMetadata = {
  idProperty: "_id",
  type: "Merge Sync Task Wizard Metadata",
  activeField: "active",
  fields: [
    {
      label: "Salesforce Source Tool ID",
      id: "sourceToolId",
    },
    {
      label: "Salesforce Target Tool ID",
      id: "targetToolId",
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
    {
      label: "Custom Setting",
      id: "selectedCustomSetting",
    },
    {
      label: "Field Properties",
      id: "selectedFieldProperties",
    },

  ],
  newObjectFields: {
    taskId: "",
    recordId: "",
    sourceToolId: "",
    targetToolId: "",
    runCount: 1,
    type: "",
    taskType: "",
    selectedCustomSetting: "",
    selectedFieldProperties: [],
  }
};