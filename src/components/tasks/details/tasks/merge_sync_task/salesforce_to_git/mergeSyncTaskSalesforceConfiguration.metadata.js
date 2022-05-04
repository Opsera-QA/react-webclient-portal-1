export const mergeSyncTaskSalesforceConfigurationMetadata = {
  type: "Merge Sync Task Salesforce Configuration",
  fields: [
    {
      label: "Salesforce Source Branch Tool",
      id: "sourceToolId",
      isRequired: true,
      formText: "Salesforce Source Branch Tool cannot match Salesforce Target Branch Tool.",
    },
    {
      label: "Salesforce Target Branch Tool",
      id: "targetToolId",
      formText: "Salesforce Target Branch Tool cannot match Salesforce Source Branch Tool.",
    },    
  ],
  newObjectFields: {
    sourceToolId: "",
    targetToolId: "",
  }
};