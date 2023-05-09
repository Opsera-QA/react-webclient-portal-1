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
      label: "Field Properties",
      id: "fieldList",
    },
    {
      label: "CSV Field Properties",
      id: "csvFields",
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
      id: "filterQuery",
    },
    {
      label: "Field Mappings",
      id: "fieldMapping",
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
    fieldList: [],
    selectedFieldList: [],
    queryFilters: [],
    filterQuery: "",
    fieldMapping: [],
    csvFields: [],
  }
};