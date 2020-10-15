// TODO: This will be used for both the regular and free trial registration screens, but putting it here so I can check in this half first
const jiraMetadata = {
  type: "Jira API Configuration",
  idProperty: "_id",
  fields: [
    {
      label: "Jira URL",
      id: "jiraUrl",
      isRequired: true
    },
    {
      label: "Jira Port",
      id: "jiraPort",
      isRequired: true
    },
    {
      label: "Jira Username",
      id: "jiraUserName",
      isRequired: true
    },
    {
      label: "Jira Password",
      id: "jiraPassword",
      isRequired: true
    },
    {
      label: "Jira Project Name",
      id: "projectName",
      isRequired: true,
    },
  ],
  newObjectFields:
    {
      jiraUrl: "",
      jiraPort: "",
      jiraUserName: "",
      jiraPassword: "",
      projectName: "",
    }
};

export default jiraMetadata;