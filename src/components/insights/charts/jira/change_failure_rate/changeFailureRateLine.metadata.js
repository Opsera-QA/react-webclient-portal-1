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
      label: "Jira Change Filter Rate",
      id: "jira-change-failure-rate",
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