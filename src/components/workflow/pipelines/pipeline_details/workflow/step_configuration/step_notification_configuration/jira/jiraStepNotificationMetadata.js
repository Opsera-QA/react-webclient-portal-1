// TODO: put metadata on node server and pull down that way?
const jiraStepNotificationMetadata = {
  idProperty: "name",
  type: "Jira Step Notification",
  fields: [
    {
      label: "Type",
      id: "type",
    },
    {
      label: "Jira Tool ID",
      id: "jiraToolId",
      isRequired: true
    },
    {
      label: "Notification Level",
      id: "jiraNotificationLevel",
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
      label: "Priority",
      id: "jiraPriority",
      isRequired: true
    },
    {
      label: "Jira Assignee",
      id: "jiraAssignee",
      isRequired: true
    },
    {
      label: "Jira Board",
      id: "jiraBoard",
      isRequired: true
    },
    {
      label: "Jira Approval Step",
      id: "jiraApprovalStep",
      isRequired: true
    },
    {
      label: "Jira Rejection Step",
      id: "jiraRejectionStep",
      isRequired: true
    },
    {
      label: "Jira Notifications",
      id: "enabled",
    },
  ],
  newObjectFields: {
    type: "jira",
    jiraBoard: "",
    jiraNotificationLevel: "",
    jiraToolId: "",
    jiraProject: "",
    jiraPriority: "",
    jiraSprint: "",
    jiraAssignee: "",
    jiraRejectionStep: "",
    jiraApprovalStep: "",
    enabled: false,
  }
};

export default jiraStepNotificationMetadata;