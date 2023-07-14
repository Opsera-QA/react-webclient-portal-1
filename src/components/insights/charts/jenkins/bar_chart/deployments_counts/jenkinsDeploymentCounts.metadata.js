export const jenkinsDeploymentCountsMetadata = {
  type: "Deployment Counts",
  fields: [
    {
      label: "Tags",
      id: "tags",
    },
    {
      label: "Deployment Stage",
      id: "deployment-stage",
    },
    {
      label: "Date Range",
      id: "date",
    },
  ],
  newObjectFields: {
    tags: [],
    date: undefined,
  },
};
