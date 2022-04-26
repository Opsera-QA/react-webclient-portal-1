export const mergeSyncTaskConfigurationMetadata = {
  type: "Merge Sync Task Configuration",
  fields: [
    {
      label: "Task ID",
      id: "_id",
    },
    {
      label: "Merge Type",
      id: "jobType",
      isRequired: true,
    },
    {
      label: "Git to Git Merge Sync Configuration",
      id: "git",
    },
    {
      label: "Salesforce to Salesforce Merge Sync Configuration",
      id: "sfdc",
    },
  ],
  newObjectFields: {
    jobType: "",
    git: {},
    sfdc: {},
  }
};