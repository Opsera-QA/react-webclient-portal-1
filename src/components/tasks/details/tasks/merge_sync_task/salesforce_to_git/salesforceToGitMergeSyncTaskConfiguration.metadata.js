export const salesforceToGitMergeSyncTaskConfigurationMetadata = {
  type: "Salesforce to Git Merge Sync Task Configuration",
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
      isRequired: true,
      formText: "Salesforce Target Branch Tool cannot match Salesforce Source Branch Tool.",
    },    
  ],
  newObjectFields: {
    sourceToolId: "",
    targetToolId: "",
  }
};