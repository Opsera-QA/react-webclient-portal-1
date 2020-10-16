// TODO: This will be used for both the regular and free trial registration screens, but putting it here so I can check in this half first
const jiraConnectionMetadata = {
  type: "Jira API Configuration",
  idProperty: "_id",
  fields: [
    {
      label: "Jira URL",
      id: "toolURL",
      isRequired: true
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
      label: "Jira Password",
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

export default jiraConnectionMetadata;