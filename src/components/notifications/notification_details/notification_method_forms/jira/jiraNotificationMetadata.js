const jiraNotificationMetadata = {
  idProperty: "name",
  type: "Jira Notification",
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
      label: "Priority",
      id: "jiraPriority",
      isRequired: true
    },
    {
      label: "Jira Tool Project",
      id: "toolProjectId",
      isRequired: true,
    },
    {
      label: "Jira Notification Assignee",
      id: "jiraPrimaryAssignee",
      isRequired: true,
    },
    {
      label: "Jira Notification Secondary Assignees",
      id: "jiraSecondaryAssignees",
      maxItems: 10,
      formText: "You may select up to ten secondary assignees."
    },
  ],
  newObjectFields: {
    type: "jira",
    event: "all",
    jiraToolId: "",
    toolProjectId: "",
    jiraPriority: "",
    jiraPrimaryAssignee: "",
    jiraSecondaryAssignees: [],
  }
};

export default jiraNotificationMetadata;