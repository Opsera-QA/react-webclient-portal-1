export const jiraToolConnectionMetadata = {
  type: "Jira API Configuration",
  idProperty: "_id",
  fields: [
    {
      label: "Jira URL",
      id: "toolURL",
      isRequired: true,
    },
    {
      label: "Jira Port",
      id: "jiraPort",
    },
    {
      label: "Jira Username",
      id: "userName",
      isRequired: true
    },
    {
      label: "Jira API Token",
      id: "vaultSecretKey",
      isRequired: true
    }
  ],
  newObjectFields:
    {
      toolURL: "",
      jiraPort: "",
      userName: "",
      vaultSecretKey: ""
    }
};