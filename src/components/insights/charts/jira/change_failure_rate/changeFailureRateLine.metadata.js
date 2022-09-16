export const changeFailureRateLineMetaData = {
  type: "Failure Rate Line",
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
      label: "Date Range",
      id: "date",
    },
  ],
  newObjectFields: {
    tags: [],
    date: undefined,
    "jira-projects": [],
    "jira-change-types": []
  }
};