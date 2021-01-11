const jiraConfigurationMetadata = {
  idProperty: "name",
  type: "Jira Configuration",
  fields: [
    {
      label: "Type",
      id: "type",
    },
    {
      label: "Jira Tool",
      id: "jiraToolId",
      isRequired: true
    },
    {
      label: "Jira Project",
      id: "jiraProject",
      isRequired: true
    },
    {
      label: "Jira Sprint",
      id: "jiraSprint",
      isRequired: true
    },
    {
      label: "Jira Board",
      id: "jiraBoard",
      isRequired: true
    },
    {
      label: "Jira Parent Ticket",
      id: "jiraParentTicket",
    },
  ],
  newObjectFields: {
    type: "jira",
    event: "all",
    jiraBoard: "",
    jiraToolId: "",
    jiraProject: "",
    jiraSprint: "",
    jiraParentTicket: "",
  }
};

export default jiraConfigurationMetadata;