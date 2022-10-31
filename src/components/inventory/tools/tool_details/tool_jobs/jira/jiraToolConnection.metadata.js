export const jiraToolConnectionMetadata = {
  type: "Jira API Configuration",
  idProperty: "_id",
  fields: [
    {
      label: "Jira URL",
      id: "toolURL",
      isRequired: true,
      isSecureUrl: true,
      maxLength: 2048,
    },
    {
      label: "Jira Port",
      id: "jiraPort",
      regexDefinitionName: "portField",
      maxLength: 5,
    },
    {
      label: "Jira Username",
      id: "userName",
      isRequired: true,
      maxLength: 256,
    },
    {
      label: "Jira API Token",
      id: "vaultSecretKey",
      isRequired: true,
      maxLength: 50,
    },
  ],
  newObjectFields: {
    toolURL: "",
    jiraPort: "",
    userName: "",
    vaultSecretKey: "",
  },
};