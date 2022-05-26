const GitCustodianCreateJiraTicketMetaData = {
  type: "Git Custodian Create Jira Ticket",
  fields: [
    {
      label: "Jira Tool Id",
      id: "jiraToolId",
      isRequired: true
    },
    {
      label: "Issues",
      id: "issues",
    },
    {
      label: "Issue Description",
      id: "description",
      isRequired: true
    },
    {
      label: "Issue Summary",
      id: "summary",
      isRequired: true
    },
    {
      label: "Issue Type",
      id: "issueTypeId",
      isRequired: true
    },
    {
      label: "Project",
      id: "projectKey",
      isRequired: true
    }
  ],
  newObjectFields: {
    jiraToolId: "",
    issues: [],
    description: "",
    summary: "",
    issueTypeId: "",
    projectKey: ""
  }
};

export default GitCustodianCreateJiraTicketMetaData;
