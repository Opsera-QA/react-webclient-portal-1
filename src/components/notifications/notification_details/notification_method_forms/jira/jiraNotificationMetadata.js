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
      label: "Jira Project",
      id: "jiraProject",
      isRequired: true
    },
    {
      label: "Jira Sprint",
      id: "jiraSprint",
    },
    {
      label: "Priority",
      id: "jiraPriority",
      isRequired: true
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
    {
      label: "Jira Board",
      id: "jiraBoard",
      isRequired: true
    },
    {
      label: "Jira Parent Ticket",
      id: "jiraParentTicket",
    },
    {
      label: "Jira Open Step",
      id: "jiraOpenStep",
      isRequired: true
    },
    {
      label: "Jira Closure Step",
      id: "jiraClosureStep",
      isRequired: true
    },
    // {
    //   label: "Jira Approval Step",
    //   id: "jiraApprovalStep",
    // },
    // {
    //   label: "Jira Rejection Step",
    //   id: "jiraRejectionStep",
    // },
    // {
    //   label: "Jira Notifications",
    //   id: "enabled",
    // },
  ],
  newObjectFields: {
    type: "jira",
    event: "all",
    jiraBoard: "",
    jiraToolId: "",
    jiraProject: "",
    jiraPriority: "",
    jiraSprint: "",
    jiraParentTicket: "",
    jiraPrimaryAssignee: "",
    jiraSecondaryAssignees: [],
    // jiraRejectionStep: "",
    // jiraApprovalStep: "",
    jiraOpenStep: "",
    jiraClosureStep: "",
    // enabled: false,
  }
};

export default jiraNotificationMetadata;