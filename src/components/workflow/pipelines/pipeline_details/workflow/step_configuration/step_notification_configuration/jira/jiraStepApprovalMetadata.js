const jiraStepApprovalMetadata = {
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
      label: "Notification Level",
      id: "jiraNotificationLevel",
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
      label: "Jira Primary Approval Assignee",
      id: "jiraPrimaryAssignee",
      isRequired: true,
    },
    {
      label: "Jira Secondary  Approval Assignees",
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
    // {
    //   label: "Jira Open Step",
    //   id: "jiraOpenStep",
    // },
    // {
    //   label: "Jira Closure Step",
    //   id: "jiraClosureStep",
    // },
    // {
    //   label: "Jira Approval Step",
    //   id: "jiraApprovalStep",
    //   isRequired: true
    // },
    // {
    //   label: "Jira Rejection Step",
    //   id: "jiraRejectionStep",
    //   isRequired: true
    // },
    {
      label: "Jira Notifications",
      id: "enabled",
    },
  ],
  newObjectFields: {
    type: "jira",
    jiraBoard: "",
    jiraNotificationLevel: "all",
    jiraToolId: "",
    jiraProject: "",
    jiraPriority: "",
    jiraSprint: "",
    jiraParentTicket: "",
    jiraPrimaryAssignee: "",
    jiraSecondaryAssignees: [],
    // jiraRejectionStep: "",
    // jiraApprovalStep: "",
    // jiraOpenStep: "",
    // jiraClosureStep: "",
    enabled: false,
  }
};

export default jiraStepApprovalMetadata;