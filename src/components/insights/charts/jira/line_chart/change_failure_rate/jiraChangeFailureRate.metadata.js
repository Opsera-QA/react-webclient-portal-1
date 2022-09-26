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
      label: "Jira Change Types",
      id: "jira-change-types",
    },
    {
      label: "Jira Service Components",
      id: "jira-service-components"
    },
    {
      label: "Date Range",
      id: "date",
    },
  ],
  newObjectFields: {
    tags: [],
    date: undefined,
  }
};