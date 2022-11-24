// TODO: We should really rework the way the ids are for these at some point
export const jiraMeanTimeToResolutionMetadata = {
  type: "Jira Mean Time To Resolution",
  fields: [
    {
      label: "Tags",
      id: "tags",
    },
    {
      label: "Date Range",
      id: "date",
    },
    {
      label: "Jira Priorities",
      id: "jira-priorities",
    },
    {
      label: "Jira Projects",
      id: "jira-projects",
    },
    {
      label: "Jira Service Components",
      id: "jira-service-components",
    },
    {
      label: "Jira Team Names",
      id: "jira-team-names",
    },
  ],
  ticketFields:[
    {
      label: "Jira Project",
      id: "issueProjectName"
    },
    {
      label: "ID",
      id: "issueKey",
    },
    {
      label: "Created Date",
      id: "issueCreated"
    },
    {
      label: "Priority",
      id: "issuePriorityName"
    },
    {
      label: "Resolution Date",
      id: "issueResolutionDate"
    },
    {
      label: "Resolution Time (Hours)",
      id: "issueResolutionTime"
    },
    {
      label: "Service Component Name",
      id: "issueServiceComponent"
    },
    {
      label: "Team Name",
      id: "issueTeamName",
    },
    {
      label: "Status",
      id: "issueStatusName",
    },
  ],
  newObjectFields: {
    tags: [],
    date: undefined,
    "jira-priorities": [],
    "jira-projects": [],
    "jira-service-components": [],
    "jira-team-names": []
  }
};