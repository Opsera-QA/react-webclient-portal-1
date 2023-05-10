export const customSettingMigrationTaskWizardMetadata = {
  idProperty: "_id",
  type: "Custom Setting Migration Task Wizard Metadata",
  activeField: "active",
  fields: [
    {
      label: "Salesforce Source Org",
      id: "sourceToolId",
    },
    {
      label: "Salesforce Destination Org",
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
      label: "Selected Field Properties",
      id: "selectedFieldList",
    },
    {
      label: "Query Filters",
      id: "queryFilters",
    },
    {
      label: "Query",
      id: "filterQuery"
    }
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
    selectedFieldList: [],
    queryFilters: [],
    filterQuery: "",
  }
};