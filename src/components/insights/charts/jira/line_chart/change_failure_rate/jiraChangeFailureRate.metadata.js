export const jiraChangeFailureRateMetadata = {
  type: "Change Failure Rate",
  fields: [
    {
      label: "Tags",
      id: "tags",
    },
    {
      label: "Jira Projects",
      id: "jira-projects",
    },
    {
      label: "Exclude Jira Change Types (Values will be excluded from results)",
      id: "jira-change-types",
    },
    {
      label: "Jira Service Components",
      id: "jira-service-components"
    },
    {
      label: "Jira Resolution Names",
      id: "jira-resolution-names"
    },
    {
      label: "Jira Team Names",
      id: "jira-team-names"
    },
    {
      label: "Date Range",
      id: "date",
    },
  ],
  commitFields:[
    {
      label: "Ticket Number",
      id: "ticket",
    },
    {
      label: "Status",
      id: "status"
    },
    {
      label: "Resolution Name",
      id: "resolution"
    },
    {
      label: "Date Created",
      id: "createdAt"
    },
    {
      label: "Priority",
      id: "priority"
    },
    {
      label: "Service Component Name",
      id: "serviceComponent",
    },
    {
      label: "Team Name",
      id: "teamName",
    },
  ],
  newObjectFields: {
    tags: [],
    date: undefined,
  }
};