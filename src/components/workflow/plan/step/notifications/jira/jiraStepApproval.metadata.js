export const jiraStepApprovalMetadata = {
  idProperty: "name",
  type: "Jira Step Notification",
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
      label: "Project",
      id: "jiraProject",
      isRequired: true
    },
    {
      label: "Sprint",
      id: "jiraSprint",
      isRequired: true
    },
    {
      label: "Priority",
      id: "jiraPriority",
      isRequired: true
    },
    {
      label: "Primary Approval Assignee",
      id: "jiraPrimaryAssignee",
      isRequired: true,
    },
    {
      label: "Secondary Approval Assignees",
      id: "jiraSecondaryAssignees",
      maxItems: 10,
      formText: "You may select up to ten secondary assignees."
    },
    {
      label: "Board",
      id: "jiraBoard",
      isRequired: true
    },
    {
      label: "Parent Ticket",
      id: "jiraParentTicket",
    },
    {
      label: "Jira Notifications",
      id: "enabled",
    },
  ],
  newObjectFields: {
    type: "jira",
    jiraBoard: "",
    event: "all",
    jiraToolId: "",
    jiraProject: "",
    jiraPriority: "",
    jiraSprint: "",
    jiraParentTicket: "",
    jiraPrimaryAssignee: "",
    jiraSecondaryAssignees: [],
    enabled: false,
  }
};
