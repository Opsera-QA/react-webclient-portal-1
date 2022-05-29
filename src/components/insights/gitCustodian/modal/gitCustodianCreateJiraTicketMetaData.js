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
      label: "Issues List",
      id: "issuesList",
      isRequired: true
    },
    {
      label: "Issue Description",
      id: "description",
    },
    {
      label: "Issue Summary",
      id: "summary",
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
    summary: "Git Vulnerabilities",
    issueTypeId: "",
    projectKey: ""
  }
};

export default GitCustodianCreateJiraTicketMetaData;
